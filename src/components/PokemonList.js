import { StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import { getPokemons, getPokemonDetails } from "../api/pokemon";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const res = await getPokemons();
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
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
});
