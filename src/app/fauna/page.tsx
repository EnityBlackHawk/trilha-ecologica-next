"use client";
import _Card from "@/components/card/animalCard";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimalInfoWithImage } from "../api/fauna/route";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

export default function Flora() {
  const [items, setItems] = useState<AnimalInfoWithImage[]>([]);
  const router = useRouter();

  const onEdit = (data_id: string) => {
    router.push("/fauna/" + data_id);
  };

  const onDelete = (data_id: string) => {
    axios.delete(`/api/fauna/${data_id}`).then(() => {
      setItems(items.filter((e) => e.id != data_id));
    });
  };

  useEffect(() => {
    axios.get("/api/fauna").then((res) => {
      setItems(res.data);
    });
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-3/4 h-screen ">
        <div className="flex justify-between items-center">
          <h1 className="text-main_darker font-bold text-5xl p-4 w-1/2 text-left">
            Fauna
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
            onClick={() => router.push("/fauna/add")}
          >
            Cadastrar
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5 p-5">
          {items.map((e, i) => {
            return (
              <_Card data={e} key={i} onEdit={onEdit} onDelete={onDelete} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
