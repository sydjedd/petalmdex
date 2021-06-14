import http from "@/helpers/http.js";

const baseURL = process.env.VUE_APP_API || "";

async function getAll() {
  const pattern = `${baseURL}/pokemon/`;
  const pokemon = await http.get(`${baseURL}/pokemon?limit=-1`);
  let newPokemon = [];
  pokemon.results.forEach((element) => {
    element.id = element.url.replace(/\/$/i, "").replace(pattern, "");
    element.detail = {};
    newPokemon[element.id] = element;
  });
  return newPokemon;
}

async function getById(id) {
  const pokemon = await http.get(`${baseURL}/pokemon/${id}`);
  const species = await http.get(pokemon.species.url);
  const evolution = await http.get(species.evolution_chain.url);
  pokemon.evolution = evolution.chain;
  return pokemon;
}

export default {
  getAll,
  getById,
};
