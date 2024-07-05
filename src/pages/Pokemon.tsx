import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";
import { capitalize, fetchPokemonDetails } from "../utils";

export default function Pokemon() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPokemonDetails(name as string)
      .then((res) => {
        if (res.status === 200) {
          setPokemonData(res.data);
        } else {
          setError(res.statusText);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError("Ce Pokémon n'existe pas");
          // setTimeout(() => navigate("/"), 5000);
        } else {
          setError(err.message);
        }
      });
  }, [name]);

  return pokemonData ? (
    <div className="flex flex-col items-center justify-center w-screen screen mt-[7vh]">
      <Card>
        <CardHeader className="pb-0">
          <Image
            alt={name}
            radius="sm"
            src={pokemonData.sprites.other["official-artwork"].front_default}
            className="w-full h-auto"
          />
        </CardHeader>
        <CardBody className="text-center">
          <b className="text-3xl">{capitalize(name as string)}</b>
          <p>
            Type :{" "}
            {(pokemonData.types as { type: { name: string } }[])
              .map((typeInfo) => typeInfo.type.name)
              .join(", ")}{" "}
            - {(pokemonData.weight as number) / 10} kg
          </p>
          <Divider className="my-2" />
          <p>Attaques :</p>
          <ol>
            {(pokemonData.abilities as { ability: { name: string } }[]).map(
              (abilityInfo) => (
                <li key={abilityInfo.ability.name}>
                  {abilityInfo.ability.name}
                </li>
              )
            )}
          </ol>
          <Divider className="my-2" />
          <ul>
            {(
              pokemonData.stats as {
                stat: { name: string };
                base_stat: number;
              }[]
            ).map((statInfo) => (
              <li key={statInfo.stat.name}>
                {statInfo.stat.name} : {statInfo.base_stat}
              </li>
            ))}
          </ul>
          <Divider className="my-2" />
          {Object.entries(pokemonData.cries as Record<string, string>).map(
            ([key, value]) => (
              <AudioPlayer
                src={value}
                key={key}
                volume={0.5}
                className="mt-2 dark:bg-[#242424] dark:text-white"
              />
            )
          )}
        </CardBody>
        <CardFooter
          className="flex justify-center cursor-pointer"
          onClick={() =>
            (window.location.href = `https://bulbapedia.bulbagarden.net/wiki/${name}`)
          }
        >
          Voir le wiki
        </CardFooter>
      </Card>
    </div>
  ) : error ? (
    <b>
      <p className="flex justify-center w-screen">{error}</p>
    </b>
  ) : null;
}
