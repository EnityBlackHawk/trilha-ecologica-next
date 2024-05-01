"use client";

import { Button, TextField, styled } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlantInfo } from "@/types";

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
  const [inputData, setInputData] = useState<PlantInfo>(objPlantInfo);
  const [test, setTest] = useState<string>("");
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="grid grid-cols-2 gap-5 w-1/2 p-5">
        {Object.keys(objPlantInfo).map((e: keyof PlantInfo, i) => {
          return (
            <div key={i} className="grid grid-cols-1">
              <h2>{objPlantInfo[e].name}</h2>
              <TextField
                className="text-lg"
                variant="filled"
                value={inputData[e].value}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(c) => {
                  setInputData({
                    ...inputData,
                    [e]: c.currentTarget.value,
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      <Button variant="contained" sx={{ width: "30%" }}>
        Salvar
      </Button>
    </div>
  );
}