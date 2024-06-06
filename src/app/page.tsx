"use client";

import { Button, TextField, styled } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlantInfo } from "@/types";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

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


export default function Home() {
  return (<div></div>)
}
