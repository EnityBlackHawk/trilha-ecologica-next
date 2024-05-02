import { storage } from "@/firebase";
import { PlantInfo } from "@/types";
import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";

export async function save(data: PlantInfo, image: File) {
  const fr = new FileReader();
  fr.readAsArrayBuffer(image);
  const byteArray = await image.arrayBuffer();
  console.log(byteArray.byteLength, (fr.result as ArrayBuffer).byteLength);

  // const imageRef = ref(storage, `flora/${data.nomeCientifico.value}`);
  // const imageUpload = await uploadBytes(imageRef, image, {
  //   contentType: "image/png",
  // });
  const formData = new FormData();
  formData.append("image", image);
  formData.append("data", JSON.stringify(data));

  const request = await fetch("/api/flora", {
    method: "POST",
    body: formData,
  });
  const result = await request.json();

  console.log(result);
  return result;
}
