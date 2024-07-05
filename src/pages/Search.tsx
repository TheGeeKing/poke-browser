import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pokemon from "../data/pokemon.json";
import { fetchPokemonDetails } from "../utils";
import PokemonCard from "../components/PokemonCard";

export default function Search() {
  const { theme, setTheme } = useTheme();
  const [pokemonFound, setPokemonFound] = useState<string[]>([]);
  const [pokemonData, setPokemonData] = useState<Record<string, unknown>>({});
  const { register, handleSubmit, getValues } = useForm();

  useEffect(() => {
    if (theme === null) {
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? setTheme("dark")
        : setTheme("light");
    }
  }, [theme, setTheme]);

  const search = () => {
    // on cherche à travers pokemon.json dans les valeurs de la clé results un pokemon avec le nom rentré
    const pokemonFoundArray: string[] = [];
    for (const poke of pokemon.results) {
      if (
        poke.name.toLowerCase().includes(getValues("pokemon").toLowerCase())
      ) {
        pokemonFoundArray.push(poke.name);
      }
    }
    setPokemonFound(pokemonFoundArray);
  };
  useEffect(() => {
    const fetchPokemonInfo = async () => {
      const data: Record<string, unknown> = {};
      for (const name of pokemonFound) {
        const res = await fetchPokemonDetails(name);
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
          <span className="asterisk_input"></span>
          <button type="submit" className="btn">
            Rechercher
          </button>
        </form>
      ) : (
        pokemonFound.map((name) => (
          <PokemonCard
            name={name}
            pokemonData={pokemonData[name] as Record<string, unknown>}
          />
        ))
      )}
    </div>
  );
}
