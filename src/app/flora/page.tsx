"use client";
import { PlantInfo } from "@/types";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { theme } = resolveConfig(tailwindConfig);

export default function Flora() {
  const [items, setItems] = useState<PlantInfo[]>([]);
  const router = useRouter();

  useEffect(() => {
    // axios.get("/api/flora").then((e) => {
    //     setItems(e.data);
    // })
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
        {items.map((e) => {
          return <h2 className="text-black">{e.nomeCientifico.value}</h2>;
        })}
      </div>
    </div>
  );
}
