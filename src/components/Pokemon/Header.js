import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import React from "react";
import { capitalize } from "lodash";
import getColorType from "../../utils/getColorType";

export default function Header(props) {
  const { name, id, image, type } = props;
  const color = getColorType(type);

  const bgStyle = [{ backgroundColor: color, ...styles.bg }];

  return (
    <>
      <View style={bgStyle}></View>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{capitalize(name)}</Text>
          <Text style={styles.number}>#{`${id}`.padStart(3, 0)}</Text>
        </View>
        <Image
          source={require("../../assets/pokeballT.png")}
          style={styles.pokeball}
        />
        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text></Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 300,
    position: "absolute",
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  name: {
    position: "absolute",
    top: 67,
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  number: {
    position: "absolute",
    top: 110,
    color: "#fff",
    fontWeight: "bold",
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 60,
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: "contain",
  },
  pokeball: {
    position: "absolute",
    alignSelf: "center",
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});
