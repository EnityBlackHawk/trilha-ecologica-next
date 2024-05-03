import { db, storage } from "@/firebase";
import { collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { PlantInfo } from "@/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PlantInfoWithImage } from "../route";

export async function PUT(request: NextRequest, {params} : {params : {id : string}}) {
  const form = await request.formData();

  const pi: PlantInfoWithImage = JSON.parse(form.get("data") as string);
  const image = form.get("image") as File | null;
  const imageId = form.get("imageId") as string;
  const path = imageId;


  if(image) {
    const imageRef = ref(storage, path);
    const result = await uploadBytes(imageRef, image, {
      contentType: image.type
    });
  }

  const result = await db.collection("flora").doc(params.id).update({...pi, image: path});
  return Response.json({id : params.id})
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await db.collection("flora").doc(params.id).get();
  if(!result.exists){
    return Response.json({});
  }
  const data = result.data()!!;
  const imageId = data.image;
  const image =  await getDownloadURL(ref(storage, data.image));
  return Response.json({ ...data, imageId, image });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dref = db.collection("flora").doc(params.id);
  const data = await dref.get();
  if(data.exists){
    const imageId = data.data()!!.image;
    await storage.ref(imageId).delete();
  }
  const result = dref.delete();
  return Response.json(result);
}
