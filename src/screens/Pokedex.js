import { SafeAreaView as View, ToastAndroid } from "react-native";
import Toast, { BaseToast } from "react-native-toast-message";
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

  const toastConfig = {
    info: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "white", backgroundColor: "#444",  }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "bold",
          color: "white"
        }}
        text2Style={{
          fontSize: 11,
        }}
      />
    ),
  };

  useEffect(() => {
    (async () => {
      //showToast();
      Toast.show({
        type: "info",
        text1: "Loading pokemons",
        text2: "This may take a while  ⏳",
        autoHide: false,
      });
      await loadPokemons();
      Toast.hide();
    })();
  }, []);

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "🐱 Loading pokemons, this may take a while ⏳",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (pokemons.length > 0) {
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
    <View style={{ backgroundColor: "#333", minHeight: "100%" }}>
      <Toast position="bottom" bottomOffset={30} config={toastConfig} />
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={pokemons.length > 0 ? searchQuery : "Loading..."}
          iconColor="#aaa"
          inputStyle={{ color: "#fff" }}
          style={{
            paddingTop: 20,
            backgroundColor: "#444",
            color: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
        <PokemonList
          pokemons={pokemonsFilter}
          loadPokemons={loadPokemons}
          isNext={nextUrl}
          isSearching={isSearching}
        />
      </View>
    </View>
  );
}
