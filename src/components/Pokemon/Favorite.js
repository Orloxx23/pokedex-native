import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  addPokemonFavoriteApi,
  isPokemonsFavoriteApi,
  removePokemonFavoriteApi,
} from "../../api/favorite";

export default function Favorite({ pokemonId }) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const addFavorite = async () => {
    try {
      await addPokemonFavoriteApi(pokemonId);
      setIsFavorite(true);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(pokemonId);
      setIsFavorite(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonsFavoriteApi(pokemonId);
        setIsFavorite(response);
      } catch (error) {
        console.error("Error al saber si es favorito: " + error);
      }
    })();
  }, [pokemonId]);
  return (
    <Icon
      name="heart"
      color="#fff"
      size={20}
      solid={isFavorite}
      onPress={isFavorite ? removeFavorite : addFavorite}
      style={{ marginRight: 15 }}
    />
  );
}
