import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Pokedex, Pokemon } from "../screens";

const Stack = createStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={Pokedex}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
      />
    </Stack.Navigator>
  );
}