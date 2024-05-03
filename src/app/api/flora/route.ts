import { db, storage } from "@/firebase";
import { collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { PlantInfo } from "@/types";
import { getBlob, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import * as random from "randomstring";

export type PlantInfoWithImage = PlantInfo & { imageId : string, image: string; id: string };

export async function POST(request: NextRequest) {
  const data: FormData = await request.formData();

  const pi: PlantInfo = JSON.parse(data.get("data") as string);
  const image = data.get("image") as File;

  let path = `flora/${random.generate()}`;

  const imageRef = ref(storage, path);
  const prefix = (await listAll(ref(storage, "flora/"))).items.map((e) => e.fullPath);

  while(prefix.some((e) => e == path)){
    path = `flora/${random.generate()}`;
  }

  const imageUpload = await uploadBytes(imageRef, image, {
    contentType: image.type,
  });

  const result = await db.collection("flora").add({
    ...pi,
    image: path,
  });
  
  return Response.json({ id: result.id });
  

}

export async function GET() {
  const result = await db.collection("flora").get();
  const data = result.docs.map((e) => {
    return { ...e.data(), id: e.id };
  });
  const data_i = data.map(async (e: any) => {
    const image = await getDownloadURL(ref(storage, e.image));
    return { ...e, imageId : e.image,  image };
  });
  return Response.json(await Promise.all(data_i));
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const result = await db.collection("flora").doc(id).delete();
  return Response.json(result);
}
