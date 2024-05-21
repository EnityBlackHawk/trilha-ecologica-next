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

/* 

classTaxonomica: "Gimnosperma",
    familiaBotanica: "Araucariaceae",
    grauAmeaca: "EN",
    nomePopular: "Araucária - Pinheiro do Paraná",
    nomeCientifico: "Araucaria angustifolia (Bertol.) Kuntze",
    biomaEstados: "FOM (RS-PR)",
    extratoVertical: "DOSSEL (30m)",
    populacao: "ABUNDANTE",
    DAP: "50-60 cm",
    solos: "SOLOS BEM DRENADOS",
    idadeMaxima: "300 anos",
    altitude: "500m - 1200m",
    dispersores: "Aves-Mamíferos",
    estagio: "PIONEIRA-MÉDIO",
    produtos: "MADEIRA, FRUTO",

*/

const objPlantInfo: PlantInfo = {
  classTaxonomica: { value: "", name: "Class Taxonomica" },
  familiaBotanica: { value: "", name: "Familia Botanica" },
  grauAmeaca: { value: "", name: "Grau Ameaca" },
  nomePopular: { value: "", name: "Nome Popular" },
  nomeCientifico: { value: "", name: "Nome Cientifico" },
  biomaEstados: { value: "", name: "Bioma Estados" },
  extratoVertical: { value: "", name: "Extrato Vertical" },
  populacao: { value: "", name: "Populacao" },
  DAP: { value: "", name: "DAP" },
  solos: { value: "", name: "Solos" },
  idadeMaxima: { value: "", name: "Idade Maxima" },
  altitude: { value: "", name: "Altitude" },
  dispersores: { value: "", name: "Dispersores" },
  estagio: { value: "", name: "Estagio" },
  produtos: { value: "", name: "Produtos" },
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
