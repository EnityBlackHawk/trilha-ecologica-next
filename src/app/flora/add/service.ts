import { storage } from "@/firebase";
import { PlantInfo } from "@/types";
import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";

export async function save(data: PlantInfo, image: File | null, imageId : string | null, id : string | undefined | null) {

  const formData = new FormData();
  if(image != null){
    formData.append("image", image);
  }
  formData.append("data", JSON.stringify(data));

  const result = await axios.post("/api/flora", formData);

  console.log(result);
  return result.data;
}
