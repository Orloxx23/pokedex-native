import { API_HOST } from "../utils/constants";

export async function getPokemons(nextUrl) {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    const response = await fetch(nextUrl || url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetails(url) {
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonByID(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
