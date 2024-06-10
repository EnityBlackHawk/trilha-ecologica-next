"use client";
import AddComponent from "@/components/AddComponent";
import { PlantInfo } from "@/types";
import { useEffect, useState } from "react";
import { save } from "../add/service";
import { get, update } from "./service";
import { PlantInfoWithImage } from "@/app/api/flora/route";
import { useRouter } from "next/navigation";
import { AnimalInfoWithImage } from "@/app/api/fauna/route";

export default function EditFloraPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<AnimalInfoWithImage>();
  const router = useRouter();

  useEffect(() => {
    get(params.id).then((data) => {
      setData(data);
    });
  }, []);

  if (data) {
    return (
      <AddComponent
        title="Editar Animal"
        baseObject={data!!}
        onSave={update}
        id={params.id}
        showQr={true}
        onCompleted={() => {
          router.push("/fauna");
        }}
      />
    );
  } else {
    return <h1>Carregando...</h1>;
  }
}
