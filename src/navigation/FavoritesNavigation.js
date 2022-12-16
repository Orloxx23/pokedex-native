import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Favorites, Pokemon } from "../screens";

const Stack = createStackNavigator();

export default function FavoritesNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favorites",
          headerTransparent: false,
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#444" },
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{ title: "", headerTransparent: true,  }}
      />
    </Stack.Navigator>
  );
}
