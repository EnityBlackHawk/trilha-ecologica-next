import { PlantInfo } from "@/types";
import axios from "axios";

export async function save(data : PlantInfo){
    console.log(data);
    
    const result = await axios.post('/api/flora', data);
    console.log(result);
    return result;
}