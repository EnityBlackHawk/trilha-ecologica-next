export interface PlantInfo {
  classTaxonomica: { value: string; name: string };
  nomeCientifico: { value: string; name: string };
  grauAmeaca: { value: string; name: string };
  nomePopular: { value: string; name: string };
  bioma: { value: string; name: string };
  fitofisionomia: { value: string; name: string };
  altura: { value: string; name: string };
  diametro: { value: string; name: string };
  habitat : { value: string; name: string };
  longevidade : { value: string; name: string };
  dispersao: { value: string; name: string };
  uso : { value: string; name: string };
  polinizacao : { value: string; name: string };
  gs: { value: string; name: string };
};

export interface AnimalInfo {
  tipo: { value: string; name: string}
  classTaxonomica: { value: string; name: string };
  nomeCientifico: { value: string; name: string };
  grauAmeaca: { value: string; name: string };
  nomePopular: { value: string; name: string };
  bioma: { value: string; name: string };
  peso: { value: string; name: string };
  comprimento: { value: string; name: string };
  habitat : { value: string; name: string };
  alimentacao : { value: string; name: string };
  habitos : { value: string; name: string };
  territorio: { value: string; name: string };
  reproducao : { value: string; name: string };
  longevidade : { value: string; name: string };
}
