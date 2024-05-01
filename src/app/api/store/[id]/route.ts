import { db } from "@/firebase";
import { collection } from "firebase/firestore";
import { NextRequest } from "next/server";
import { PlantInfo } from "@/types";

export async function PUT(request: NextRequest, {params} : {params : {id : string}}) {
  const pi: PlantInfo = await request.json();
  const result = await db.collection("flora").doc(params.id).update(pi);
  return Response.json(result)
}
