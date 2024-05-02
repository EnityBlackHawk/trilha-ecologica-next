"use client";

import { Backdrop, Button, CircularProgress, TextField, styled } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PlantInfo } from "@/types";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";
import { save } from "./service";
import { setRequestMeta } from "next/dist/server/request-meta";
import { CloudUpload } from "@mui/icons-material";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  const [qrUrl, setQrUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>();

  return (
    <div className="w-full flex justify-center items-center flex-row">
      <div className="w-1/2">
        <h1 className="text-main font-bold text-4xl p-4 w-1/2 text-left">
          Cadastrar Planta
        </h1>
        <div className="grid grid-cols-2 gap-5 p-5">
          {
          //@ts-expect-error
          Object.keys(objPlantInfo).map((e: keyof PlantInfo, i) => {
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
                      [e]: {value : c.currentTarget.value, name : objPlantInfo[e].name},
                    });
                  }}
                />
              </div>
            );
          })}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{
              width: "100%",
              height: "75%",
              alignSelf : "self-end",
              //@ts-expect-error
              backgroundColor: theme.colors.main,
              color: "black",
              ":hover": {
                //@ts-expect-error
                backgroundColor: theme.colors.main_darker,
                color: "white",
              },
            }}
          >
            {image?.name ?? "Upload file"}
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                setImage(e.target.files?.[0] ?? null);
              }}
            />
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "30%",
              //@ts-expect-error
              backgroundColor: theme.colors.main,
              color: "black",
              ":hover": {
                //@ts-expect-error
                backgroundColor: theme.colors.main_darker,
                color: "white",
              },
            }}
            onClick={async () => {
              const o = Object.keys(inputData);
              let allValid = true;
              if(image == null){
                alert("Please upload an image");
                allValid = false;
              }
              // for (let i = 0; i < o.length; i++) {
              //   if (inputData[o[i] as keyof PlantInfo].value.length < 1) {
              //     alert(o[i] as keyof PlantInfo);
              //     allValid = false;
              //     break;
              //   }
              // }
              if (allValid) {
                setIsLoading(true);
                setQrUrl("");
                const result = await save(inputData, image!!);
                setQrUrl(
                  `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${result.id}`
                );
                setInputData(objPlantInfo);
                setImage(null);
              }
              setIsLoading(false);
            }}
          >
            Salvar
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/3">
        {qrUrl && (
          <Image
            className="border-main_darker border-8 p-2 rounded w-1/2"
            src={qrUrl}
            width={200}
            height={200}
            alt="Qr Code"
          />
        )}
      </div>
      <Backdrop sx={{ color: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
