import { PlantInfoWithImage } from "@/app/api/flora/route";
import { Button, CardActions, CardContent, CardMedia, SxProps, Theme, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Butcherman } from "next/font/google";
import Image from "next/image";

export default function _Card({data} : {data : PlantInfoWithImage}) {
  return (
    <Card>
      <CardMedia sx={{height : 140, overflow: "hidden"}}>
        <Image src={data.image} alt={data.nomeCientifico.value} width={500} height={140}/>
      </CardMedia>
      <CardContent sx={{backgroundColor : "white"}}>
        <h2 className="text-3xl">{data.nomeCientifico.value}</h2>
        <p className="text-lg">{data.nomePopular.value}</p>
      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
        <Button size="small" sx={{color : "red"}}>Deletar</Button>
      </CardActions>
    </Card>
  );
} 