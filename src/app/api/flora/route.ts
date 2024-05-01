import {db} from "@/firebase";
import { collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { PlantInfo } from "@/types";


export async function POST(request : NextRequest){
    const pi : PlantInfo = await request.json()
    const result = await db.collection("flora").add(pi)
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