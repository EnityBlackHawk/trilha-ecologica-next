import { PlantInfoWithImage } from "@/app/api/flora/route";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import Image from "next/image";

export default function _Card({
  data,
  onEdit,
  onDelete,
}: {
  data: PlantInfoWithImage;
  onEdit: (data_id : string) => void;
  onDelete: (data_id: string) => void;
}) {
  return (
    <Card>
      <CardMedia sx={{ height: 140, overflow: "hidden" }}>
        <img
          src={data.image}
          alt={data.nomeCientifico.value}
          width={500}
          height={140}
        />
      </CardMedia>
      <CardContent sx={{ backgroundColor: "white" }}>
        <h2 className="text-3xl">{data.nomeCientifico.value}</h2>
        <p className="text-lg">{data.nomePopular.value}</p>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(data.id)}>Editar</Button>
        <Button size="small" onClick={() => onDelete(data.id)} sx={{ color: "red" }}>
          Deletar
        </Button>
      </CardActions>
    </Card>
  );
}
