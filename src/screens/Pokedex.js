import { SafeAreaView as View } from "react-native";
import React from "react"

import { PokemonList } from "../components";

export default function Pokedex() {
  return (
    <View>
      <PokemonList />
    </View>
  );
}
