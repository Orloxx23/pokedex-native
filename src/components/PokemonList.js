import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import { getPokemons, getPokemonDetails } from "../api/pokemon";
import PokemonCard from "./PokemonCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  const loadMore = () => {
    loadPokemons();
  };

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
    <SafeAreaView>
      <FlatList
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={nextUrl && loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          nextUrl && (
            <ActivityIndicator
              size="large"
              style={styles.spinner}
              color="#AEAEAE"
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  },
});
