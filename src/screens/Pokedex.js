import { SafeAreaView as View, ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";

import { PokemonList } from "../components";
import { getPokemonDetails, getPokemons } from "../api/pokemon";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    (async () => {
      //showToast()
      Toast.show({
        type: "info",
        text1: "This is an info message",
      });
      await loadPokemons();
    })();
  }, []);

  // const showToast = () => {
  //   ToastAndroid.show("Cargando pokemons", ToastAndroid.LONG, ToastAndroid.CENTER);
  // };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query === "" || query.length === 0) {
      setPokemonsFilter(pokemons);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const search = searchQuery.toLowerCase();
      const tempPokemonsFilter = pokemons.filter((pokemon) =>
        pokemon.name.includes(search)
      );
      setPokemonsFilter(tempPokemonsFilter);
    }
  };

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
      setPokemonsFilter([...pokemons, ...pokemonsArrays]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ paddingTop: 30 }}
      />
      <PokemonList
        pokemons={pokemonsFilter}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
        isSearching={isSearching}
      />
    </View>
  );
}
