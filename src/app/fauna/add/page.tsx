"use client";
import AddComponent from "@/components/AddComponent";
import { AnimalInfo } from "@/types";

import { useRouter } from "next/navigation";
import { save } from "./service";

const animalInfo: AnimalInfo = {
  classTaxonomica: { value: "", name: "Class Taxonomica" },
  nomeCientifico: { value: "", name: "Nome Cientifico" },
  grauAmeaca: { value: "", name: "Grau Ameaca" },
  nomePopular: { value: "", name: "Nome Popular" },
  bioma: { value: "", name: "Bioma" },
  peso: { value: "", name: "Peso" },
  comprimento: { value: "", name: "Comprimento" },
  habitat: { value: "", name: "Habitat" },
  alimentacao: { value: "", name: "Alimentacao" },
  habitos: { value: "", name: "Habitos" },
  territorio: { value: "", name: "Territorio" },
  reproducao: { value: "", name: "Reproducao" },
  longevidade: { value: "", name: "Longevidade" },
};

export default function AddFauna() {
  const router = useRouter();
  return (
    <AddComponent<AnimalInfo>
      title="Cadastrar Animal"
      baseObject={animalInfo}
      onSave={save}
      id={null}
      showQr={false}
      onCompleted={null}
    />
  );
}
