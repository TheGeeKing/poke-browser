import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../utils";

type Props = {
  name: string;
  pokemonData: Record<string, unknown>;
};

export default function PokemonCard({ name, pokemonData }: Props) {
  const navigate = useNavigate();
  return (
    <div
      key={name}
      onClick={() => navigate(`/pokemon/${name}`)}
      className="w-1/4 mb-4"
    >
      <Card>
        <CardHeader className="pb-0">
          {pokemonData ? (
            <Image
              alt={name}
              radius="sm"
              src={pokemonData.sprites.other["official-artwork"].front_default}
              className="w-full h-auto"
            />
          ) : (
            <span>Chargement de l'image...</span>
          )}
        </CardHeader>
        <CardBody className="text-center">{capitalize(name)}</CardBody>
      </Card>
    </div>
  );
}
