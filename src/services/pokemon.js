import http from "@/helpers/http.js";

const baseURL = process.env.VUE_APP_API || "";

async function getAll() {
  const pokemon = await http.get(`${baseURL}/pokemon?limit=-1`);
  const pattern = `${baseURL}/pokemon/`;
  pokemon.results.forEach((element) => {
    element.id = element.url.replace(/\/$/i, "").replace(pattern, "");
  });
  return pokemon.results;
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
