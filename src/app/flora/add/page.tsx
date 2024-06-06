"use client";

import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlantInfo } from "@/types";
import { save } from "./service";
import { setRequestMeta } from "next/dist/server/request-meta";
import { AddComment, CloudUpload } from "@mui/icons-material";
import AddComponent from "@/components/AddComponent";
import { useSearchParams } from "next/navigation";
import { PlantInfoWithImage } from "@/app/api/flora/route";
import { useRouter } from "next/navigation";


const objPlantInfo: PlantInfo = {
  nomeCientifico: { value: "", name: "Nome Cientifico" },
  grauAmeaca: { value: "", name: "Grau Ameaca" },
  nomePopular: { value: "", name: "Nome Popular" },
  bioma: { value: "", name: "Bioma" },
  fitofisionomia: { value: "", name: "Fitofisionomia" },
  altura: { value: "", name: "Altura" },
  diametro: { value: "", name: "Diametro" },
  habitat: { value: "", name: "Habitat" },
  longevidade: { value: "", name: "Longevidade" },
  dispersao: { value: "", name: "Dispersao" },
  uso: { value: "", name: "Uso" },
  polinizacao: { value: "", name: "Polinizacao" },
  gs: { value: "", name: "Gs" },
};

export default function Home() {
  const router = useRouter();

  return (
    <AddComponent<PlantInfo>
      title="Cadastrar Planta"
      baseObject={objPlantInfo}
      onSave={save}
      id={null}
      showQr={false}
      onCompleted={() => {
        router.push("/flora");
      }}
    />
  );
}
