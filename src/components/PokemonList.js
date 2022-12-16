import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View
} from "react-native";
import React from "react";

import PokemonCard from "./PokemonCard";

export default function PokemonList(props) {
  const { pokemons, loadPokemons, isNext, isSearching } = props;

  const loadMore = () => {
    loadPokemons();
  };

  return (
    <View style={{ backgroundColor: "#333" }}>
      <FlatList
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={!isSearching && isNext && loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          !isSearching && isNext && (
            <ActivityIndicator
              size="large"
              style={styles.spinner}
              color="#AEAEAE"
            />
          )
        }
      />
    </View>
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
