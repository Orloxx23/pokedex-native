import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { getPokemonsFavoriteApi } from "../api/favorite";
import { getPokemonByID } from "../api/pokemon";
import useAuth from "../hooks/useAuth";
import PokemonList from "../components/PokemonList";
import NoLogged from "../components/Auth/NoLogged";
import { View } from "react-native";

export default function Favorites() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          try {
            const response = await getPokemonsFavoriteApi();
            const pokemonsArray = [];
            for await (let id of response) {
              const pokemonDetails = await getPokemonByID(id);

              pokemonsArray.push({
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                type: pokemonDetails.types[0].type.name,
                order: pokemonDetails.order,
                image:
                  pokemonDetails.sprites.other["official-artwork"]
                    .front_default,
              });
            }

            setPokemons(pokemonsArray);
          } catch (error) {
            console.error("Error al cargar favoritos: " + error);
          }
        })();
      }
    }, [auth])
  );

  return (
    <View style={{backgroundColor: "#333", paddingBottom: 80, minHeight: "100%" }}>
      {!auth ? <NoLogged /> : <PokemonList pokemons={pokemons} />}
    </View>
  );
}
