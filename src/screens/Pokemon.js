import { ScrollView as View } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { getPokemonByID } from "../api/pokemon";
import {
  Header,
  Type,
  Stats,
  Evolutions,
  Favorite,
  About,
} from "../components/Pokemon";
import useAuth from "../hooks/useAuth";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await getPokemonByID(params.id);
        setPokemon(res);
      } catch (error) {
        console.error(error);
        navigation.goBack();
      }
    })();
  }, [params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite pokemonId={pokemon?.id} />,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={20}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, pokemon]);

  if (!pokemon) return null;

  return (
    <View>
      <Header
        name={pokemon.name}
        id={pokemon.id}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <About
        weight={pokemon.weight}
        height={pokemon.height}
        type={pokemon.types[0].type.name}
        moves={pokemon.moves}
      />
      <Stats stats={pokemon.stats} type={pokemon.types[0].type.name} />
      <Evolutions
        species={pokemon.species.url}
        type={pokemon.types[0].type.name}
      />
    </View>
  );
}
