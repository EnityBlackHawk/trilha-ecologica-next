import { NextRequest } from "next/server";
import { AnimalInfoWithImage } from "../route";
import { db } from "@/firebase";

export async function PUT(request: NextRequest, {params} : {params : {id : string}}) {
    const form = await request.formData();
    const ai: AnimalInfoWithImage = JSON.parse(form.get("data") as string);
    const image = form.get("image") as File | null;
    const imageId = form.get("imageId") as string;
    let base64: string | null = null;

    if(image) {
        const buffer = await image.arrayBuffer();
        base64 = `data:${image.type || "image/png"};base64,${Buffer.from(buffer).toString("base64")}`;
    }
    const obj = {...ai};
    if(base64) {
        obj.image = base64;
    }

    const result = await db.collection("fauna").doc(params.id).update(obj);
    return Response.json({id: params.id});
}

export async function GET(request: NextRequest, {params} : {params : {id : string}}) {
    const result = await db.collection("fauna").doc(params.id).get();
    if(!result.exists) {
        return Response.json({});
    }
    const data = result.data()!!;
    return Response.json({...data});
}

export async function DELETE(request: NextRequest, {params} : {params : {id : string}}) {
    const dref = db.collection("fauna").doc(params.id);
    const result = dref.delete();
    return Response.json(result);
}