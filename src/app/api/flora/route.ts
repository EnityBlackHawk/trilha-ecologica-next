import {db, storage} from "@/firebase";
import { collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { PlantInfo } from "@/types";
import { ref, uploadBytes } from "firebase/storage";

type PlantInfoWithImage = PlantInfo & { image: string };

export async function POST(request : NextRequest){
    const data : FormData = await request.formData();

    const pi : PlantInfo = JSON.parse(data.get("data") as string);
    const image = data.get("image") as File;

    const imageRef = ref(storage, `flora/${pi.nomeCientifico.value}`);
    const imageUpload = await uploadBytes(imageRef, image, {contentType: "image/png"});
    const result = await db.collection("flora").add({
        ...pi,
        image: imageUpload.metadata.fullPath
    })
    return Response.json({id : result.id});
}

export async function GET(){
    const result = await db.collection("flora").get();
    return Response.json(result.docs.map((e) => e.data()));
}

export async function DELETE(request : NextRequest){
    const {id} = await request.json();
    const result = await db.collection("flora").doc(id).delete();
    return Response.json(result);
}