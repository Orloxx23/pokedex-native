import { ScrollView as View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getPokemonByID } from "../api/pokemon";
import { Header } from "../components/Pokemon";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPokemonByID(params.id);
        setPokemon(res)
      } catch (error) {
        console.error(error)
        navigation.goBack();
      }
    })();
  }, [params]);

  if(!pokemon) return null;

  return (
    <View>
      <Header name={pokemon.name} id={pokemon.id} image={pokemon.sprites.other["official-artwork"].front_default} type={pokemon.types[0].type.name}/>
    </View>
  );
}
