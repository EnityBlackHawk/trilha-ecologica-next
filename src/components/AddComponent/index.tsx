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
import { setRequestMeta } from "next/dist/server/request-meta";
import { CloudUpload } from "@mui/icons-material";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";
import {FormEventHandler} from "react";
const { theme } = resolveConfig(tailwindConfig);

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

interface AddComponentProps<T extends object> {
  title: string;
  baseObject: T;
  onSave: (
    data: T,
    image: File | null,
    imageId: string | null,
    id: string | null
  ) => Promise<{ id: string }>;
  id: string | null;
  onCompleted: (() => void) | null;
}

export default function AddComponent<T extends object>({
  title,
  baseObject,
  onSave,
  id,
  onCompleted,
}: AddComponentProps<T>) {
  const [inputData, setInputData] = useState<T>(baseObject);
  const [image, setImage] = useState<File | null>(null);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit : FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const o = Object.keys(inputData);
    let allValid = true;
    if ((baseObject as any)["image"] == undefined && image == null) {
      alert("Please upload an image");
      allValid = false;
    }
    if (allValid) {
      setIsLoading(true);
      setQrUrl("");
      const result = await onSave(
        inputData,
        image,
        (baseObject as any)["imageId"] ?? null,
        id
      );
      setQrUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${result.id}`
      );
      setInputData(baseObject);
      setImage(null);
    }
    setIsLoading(false);
    if (id != null && onCompleted != null) {
      onCompleted();
    }
  }

  return (
    <div className="w-full flex justify-center items-center flex-row">
      <div className="w-1/2">
        <h1 className="text-main font-bold text-4xl p-4 w-1/2 text-left">
          {title}
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5 p-5">
          {Object.keys(baseObject)
            .sort()
            //@ts-expect-error
            .map((e: keyof T, i) => {
              if ((baseObject[e] as any)["value"] === undefined) {
                return;
              }
              return (
                <div key={i} className="grid grid-cols-1">
                  <h2>{(baseObject[e] as any)["name"]}</h2>
                  <TextField
                    required={true}
                    className="text-lg"
                    variant="filled"
                    value={(inputData[e] as any)["value"]}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(c) => {
                      setInputData({
                        ...inputData,
                        [e]: {
                          value: c.currentTarget.value,
                          name: (inputData[e] as any)["name"],
                        },
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
              alignSelf: "self-end",
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
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-1 justify-center items-center w-1/3 h-full justify-items-center">
        {id && (
          <div className="flex flex-col gap-2 f-full h-1/2">
            <h2 className="text-lg">Imagem atual:</h2>
            <Image
              src={(baseObject as any)["image"]}
              alt="Current Image"
              width={250}
              height={250}
            />
          </div>
        )}
        <div className="flex h-full aspect-square">
          {qrUrl && (
            <Image
              className="border-main_darker border-8 p-2 rounded"
              src={qrUrl}
              width={200}
              height={200}
              alt="Qr Code"
            />
          )}
        </div>
      </div>
      <Backdrop sx={{ color: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
