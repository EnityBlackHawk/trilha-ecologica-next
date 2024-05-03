import { PlantInfoWithImage } from "@/app/api/flora/route";
import { PlantInfo } from "@/types";
import axios from "axios";

export async function get(id: string) {
    const response = await axios.get(`/api/flora/${id}`);
    return response.data;
}

export async function update(data: PlantInfo, image_file : File | null, imageId: string | null, id: string | null ) {

    if(id == null || id == undefined){
        return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if(image_file != null){
        formData.append("image", image_file);
    }
    if(imageId != null){
        formData.append("imageId", imageId);
    }

    const response = await axios.put(`/api/flora/${id}`, formData);
    return response.data;
}