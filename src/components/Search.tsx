import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import axios from "axios";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pokemon from "../data/pokemon.json";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { theme, setTheme } = useTheme();
  const [pokemonFound, setPokemonFound] = useState<string[]>([]);
  const [pokemonData, setPokemonData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (theme === null) {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [theme, setTheme]);

  useEffect(() => {
    console.log("pokemonFound", pokemonFound);
  }, [pokemonFound]);

  const search = () => {
    // on cherche à travers pokemon.json dans les valeurs de la clé results un pokemon avec le nom rentré
    const pokemonFoundArray: string[] = [];
    for (const poke of pokemon.results) {
      console.log(
        poke.name.toLowerCase().includes(getValues("pokemon").toLowerCase())
      );
      if (
        poke.name.toLowerCase().includes(getValues("pokemon").toLowerCase())
      ) {
        pokemonFoundArray.push(poke.name);
      }
    }
    console.log(pokemonFoundArray);
    setPokemonFound(pokemonFoundArray);
  };
  useEffect(() => {
    console.log("pokemonFound", pokemonFound);
    const fetchPokemonInfo = async () => {
      const data: Record<string, unknown> = {};
      for (const name of pokemonFound) {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}/`
        );
        if (res.status === 200) {
          data[name] = res.data;
        }
      }
      setPokemonData(data);
    };
    if (pokemonFound.length > 0) {
      fetchPokemonInfo();
    }
  }, [pokemonFound]);

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen mt-[7vh]">
      {pokemonFound.length === 0 ? (
        <form
          onSubmit={handleSubmit(search)}
          className="flex col-span-1 flex-col items-center center mb-4"
        >
          <input
            type="text"
            {...register("pokemon")}
            placeholder="Nom du Pokémon"
            required
            className="mb-4 rounded-lg p-2"
          />
          <button type="submit" className="btn">
            Rechercher
          </button>
        </form>
      ) : (
        pokemonFound.map((name) => (
          <Card
            key={name}
            onClick={() => navigate(`/pokemon/${name}`)}
            className="w-1/4 mb-4"
          >
            <CardHeader className="pb-0">
              {pokemonData[name] ? (
                <Image
                  alt={name}
                  radius="sm"
                  src={
                    pokemonData[name].sprites.other["official-artwork"]
                      .front_default
                  }
                  className="w-full h-auto"
                />
              ) : (
                <span>Loading...</span>
              )}
            </CardHeader>
            <CardBody className="text-center">{capitalize(name)}</CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
