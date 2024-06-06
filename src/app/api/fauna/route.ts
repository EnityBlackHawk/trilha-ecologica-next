import { db } from "@/firebase";
import { AnimalInfo } from "@/types";
import { NextRequest } from "next/server";



export type AnimalInfoWithImage = AnimalInfo & { imageId : string, image: string; id: string };

export async function POST(request: NextRequest) {
    
    const data: FormData = await request.formData();
    const ai: AnimalInfo = JSON.parse(data.get("data") as string);
    const image = data.get("image") as File;

    const buffer = await image.arrayBuffer();
    const base64 = `data:${
        image.type || "image/png"
    };base64,${Buffer.from(buffer).toString("base64")}`;
    const result = await db.collection("fauna").add({
        ...ai,
        image: base64,
    });

    return Response.json({ id: result.id });
}

export async function GET() {
    const result = await db.collection("fauna").get();
    const data = result.docs.map((e) => {
        return { ...e.data(), id: e.id };
    });
    return Response.json(data);    
}