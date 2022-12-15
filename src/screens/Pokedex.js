import { SafeAreaView as View } from "react-native";
import React, { useState, useEffect } from "react";

import { PokemonList } from "../components";
import { getPokemonsFavoriteApi } from "../api/favorite";
import { getPokemonDetails, getPokemons } from "../api/pokemon";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const res = await getPokemons(nextUrl);
      setNextUrl(res.next);
      const pokemonsArrays = [];
      for await (const pokemon of res.results) {
        const pokemonDetails = await getPokemonDetails(pokemon.url);
        pokemonsArrays.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }
      setPokemons([...pokemons, ...pokemonsArrays]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </View>
  );
}
