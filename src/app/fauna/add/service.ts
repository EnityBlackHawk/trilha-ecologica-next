import { AnimalInfo } from "@/types";
import axios from "axios";

export async function save(
  data: AnimalInfo,
  image: File | null,
  imageId: string | null,
  id: string | undefined | null
) {
  const formData = new FormData();

  if(image != null)
    formData.append("image", image);

  formData.append("data", JSON.stringify(data));
  const result = await axios.post("/api/fauna", formData);
  return result.data;
}