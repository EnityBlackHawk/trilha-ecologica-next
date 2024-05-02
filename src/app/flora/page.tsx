"use client";
import { PlantInfo } from "@/types";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlantInfoWithImage } from "../api/flora/route";
import Card from "@/components/card";
import _Card from "@/components/card";

const { theme } = resolveConfig(tailwindConfig);

const mock = [
  {
    familiaBotanica: {
      name: "Familia Botanica",
      value: "Teste",
    },
    biomaEstados: {
      name: "Bioma Estados",
      value: "Teste",
    },
    solos: {
      value: "Teste",
      name: "Solos",
    },
    nomePopular: {
      value: "Teste",
      name: "Nome Popular",
    },
    idadeMaxima: {
      name: "Idade Maxima",
      value: "Teste",
    },
    nomeCientifico: {
      name: "Nome Cientifico",
      value: "Teste",
    },
    dispersores: {
      name: "Dispersores",
      value: "Teste",
    },
    grauAmeaca: {
      name: "Grau Ameaca",
      value: "Teste",
    },
    DAP: {
      value: "Teste",
      name: "DAP",
    },
    extratoVertical: {
      value: "Teste",
      name: "Extrato Vertical",
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/utfpr-trilha.appspot.com/o/flora%2FTeste.png?alt=media&token=7ee6902b-4876-4c2b-87a9-050da2da2c2c",
    populacao: {
      value: "Teste",
      name: "Populacao",
    },
    produtos: {
      name: "Produtos",
      value: "Teste",
    },
    altitude: {
      value: "Teste",
      name: "Altitude",
    },
    classTaxonomica: {
      name: "Class Taxonomica",
      value: "Teste",
    },
    estagio: {
      name: "Estagio",
      value: "Teste",
    },
  },
];

export default function Flora() {
  const [items, setItems] = useState<PlantInfoWithImage[]>([]);
  const router = useRouter();

  useEffect(() => {
    setItems(mock);
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-3/4 h-screen ">
        <div className="flex justify-between items-center">
          <h1 className="text-main_darker font-bold text-5xl p-4 w-1/2 text-left">
            Flora
          </h1>
          <Button
            variant="contained"
            sx={{
              width: "15%",
              height: "100%",
              //@ts-expect-error
              backgroundColor: theme.colors.main,
              color: "black",
              ":hover": {
                //@ts-expect-error
                backgroundColor: theme.colors.main_darker,
                color: "white",
              },
            }}
            onClick={() => router.push("/flora/add")}
          >
            Cadastrar
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5 p-5">
          {[1, 2, 3].map((e) => {
            return <_Card data={mock[0]}/>;
          })}
        </div>
      </div>
    </div>
  );
}
