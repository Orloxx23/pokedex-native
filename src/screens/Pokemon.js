import { ScrollView as View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { getPokemonByID } from "../api/pokemon";
import { Header, Type, Stats } from "../components/Pokemon";

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
        setPokemon(res);
      } catch (error) {
        console.error(error);
        navigation.goBack();
      }
    })();
  }, [params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Icon
      name="heart"
      color="#fff"
      size={20}
      style={{ marginRight: 20 }}
    />,
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
  }, [navigation, params]);

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
      <Stats stats={pokemon.stats} />
    </View>
  );
}
