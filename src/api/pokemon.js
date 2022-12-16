import { API_HOST } from "../utils/constants";

export async function getPokemons(nextUrl) {
  try {
    const url = `${API_HOST}/pokemon?limit=1153&offset=0`;
    //const response = await fetch(nextUrl || url);
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonsPage(offset) {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=${offset}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAllPokemons() {
  try {
    const url = `${API_HOST}/pokemon?limit=1118&offset=0`;
    const response = await fetch(url);
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

export async function getPokemonByName(name) {
  try {
    const url = `${API_HOST}/pokemon/${name}`;
    const response = await fetch(url);
    if (response !== undefined || response !== null || response !== "" || !response) {
      const result = await response.json();
      return result;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
