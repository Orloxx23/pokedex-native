import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

import getColorType from "../../utils/getColorType";
import { getPokemonByID } from "../../api/pokemon";
import { capitalize } from "lodash";

export default function Evolutions(props) {
  const { species, type, onPressTouch } = props;
  const [evolutions, setEvolutions] = React.useState([]);
  const navigation = useNavigation();

  const goToPokemon = (id) => {
    navigation.navigate("Pokemon", { id: id });
    setTimeout(() => {
      onPressTouch();
    }, 1000);
  };

  const getRequest = async (url) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Error con la peticion: " + error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        let newEvolutions = [];
        const res = await getRequest(species);
        const res2 = await getRequest(res.evolution_chain.url);

        const evolution1 = await getRequest(res2.chain.species?.url);
        const newEvolution1 = await getPokemonByID(evolution1.id);
        newEvolutions.push(newEvolution1);

        if (res2.chain.evolves_to.length > 0) {
          if (res2.chain.evolves_to.length >= 1) {
            for (const element of res2.chain.evolves_to) {
              const evolution2 = await getRequest(element.species.url);
              const newEvolution2 = await getPokemonByID(evolution2.id);
              newEvolutions.push(newEvolution2);
            }
          } else {
            const evolution2 = await getRequest(
              res2.chain.evolves_to[0].species.url
            );
            const newEvolution2 = await getPokemonByID(evolution2.id);
            newEvolutions.push(newEvolution2);
          }
        }

        if (res2.chain.evolves_to.length > 0) {
          if (res2.chain.evolves_to.length >= 1) {
            for (const element of res2.chain.evolves_to[0].evolves_to) {
              const evolution3 = await getRequest(element.species.url);
              const newEvolution3 = await getPokemonByID(evolution3.id);
              newEvolutions.push(newEvolution3);
            }
          } else {
            const evolution3 = await getRequest(
              res2.chain.evolves_to[0].evolves_to[0].species.url
            );
            const newEvolution3 = await getPokemonByID(evolution3.id);
            newEvolutions.push(newEvolution3);
          }
        }
        setEvolutions(newEvolutions);
      } catch (error) {
        console.error("Error con las evoluciones: " + error);
      }
    })();
  }, []);

  return (
    <>
      <View style={styles.content}>
        <Text
          style={{
            ...styles.title,
            color: getColorType(type),
          }}
        >
          Evolutions
        </Text>
        {evolutions.length > 3 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {evolutions.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => goToPokemon(item.id)}
              >
                <View>
                  <Image
                    source={{
                      uri: item.sprites.other["official-artwork"].front_default,
                    }}
                    style={styles.evolucionImage}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      color: getColorType(type),
                      fontWeight: "bold",
                    }}
                  >
                    {capitalize(item.name)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        ) : (
          <View style={styles.images}>
            {evolutions.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => goToPokemon(item.id)}
              >
                <View key={index} style={styles.imagesContainer}>
                  <View>
                    <Image
                      source={{
                        uri: item.sprites.other["official-artwork"]
                          .front_default,
                      }}
                      style={styles.evolucionImage}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: getColorType(type),
                        fontWeight: "bold",
                      }}
                    >
                      {capitalize(item.name)}
                    </Text>
                  </View>

                  {index < evolutions.length - 1 ? (
                    <Icon
                      name="arrow-right"
                      size={20}
                      color={getColorType(type)}
                    />
                  ) : null}
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  evolucionImage: {
    width: 90,
    height: 90,
    marginLeft: 10,
    marginRight: 10,
  },
});
