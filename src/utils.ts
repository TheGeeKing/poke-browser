import axios from "axios";

const fetchPokemonDetails = async (name: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  return res;
};

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export { fetchPokemonDetails, capitalize };
