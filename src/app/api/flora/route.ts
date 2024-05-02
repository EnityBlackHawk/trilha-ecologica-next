import { db, storage } from "@/firebase";
import { collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { PlantInfo } from "@/types";
import { getBlob, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type PlantInfoWithImage = PlantInfo & { image: string };

export async function POST(request: NextRequest) {
  const data: FormData = await request.formData();

  const pi: PlantInfo = JSON.parse(data.get("data") as string);
  const image = data.get("image") as File;

  const id = data.get("id") as string;

  const imageRef = ref(storage, `flora/${pi.nomeCientifico.value}`);
  const imageUpload = await uploadBytes(imageRef, image, {
    contentType: "image/png",
  });
  if (id.length > 0) {
    const result = await db.collection("flora").add({
      ...pi,
      image: imageUpload.metadata.fullPath,
    });
    return Response.json({ id: result.id });
  }
  
  const update = await db
    .collection("flora")
    .doc(id)
    .update({ ...pi });
  return Response.json({ id });
}

export async function GET() {
  const result = await db.collection("flora").get();
  const data = result.docs.map((e) => e.data());
  const data_i = data.map(async (e) => {
    const image = await getDownloadURL(ref(storage, e.image));
    return { ...e, image };
  });
  return Response.json(await Promise.all(data_i));
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const result = await db.collection("flora").doc(id).delete();
  return Response.json(result);
}
