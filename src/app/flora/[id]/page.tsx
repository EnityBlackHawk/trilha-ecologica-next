"use client";
import AddComponent from "@/components/AddComponent";
import { PlantInfo } from "@/types";
import { useEffect, useState } from "react";
import { save } from "../add/service";
import { get, update } from "./service";
import { PlantInfoWithImage } from "@/app/api/flora/route";
import { useRouter } from "next/navigation";


export default function EditFloraPage({params} : {params: {id: string}}) {

    const [data, setData] = useState<PlantInfoWithImage>();
    const router = useRouter();

    useEffect(() => {
        get(params.id).then((data) => {
          setData(data);
        })
    }, []);

    if(data){

      return (
        <AddComponent<PlantInfo>
          title="Editar Planta"
          baseObject={data!!}
          onSave={update}
          id={params.id}
          showQr={true}
          onCompleted={() => {router.push("/flora")}}
        />
      );
    }
    else {
      return <h1>Carregando...</h1>
    }

}