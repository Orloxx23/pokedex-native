import { StyleSheet, View, Text } from "react-native";
import { map, capitalize } from "lodash";
import getColorType from "../../utils/getColorType";
import React from "react";
import Type from "./Type";

export default function About(props) {
  const { weight, height, moves, type, types } = props;

  return (
    <View style={styles.content}>
      <Text
        style={{
          ...styles.titleMax,
          color: getColorType(type),
        }}
      >
        About
      </Text>
      <View style={styles.block}>
        <View>
          <View style={styles.blockInfo}>
            <Text style={styles.number}>{capitalize(weight / 10)} kg</Text>
            <Text style={styles.number}>{capitalize(height / 10)} m</Text>
          </View>

          <View style={styles.blockTitle}>
            <Text style={styles.title}>Weight</Text>
            <Text style={styles.title}>Height</Text>
          </View>
        </View>
        <Type types={types} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 60,
    marginTop: 40,
    marginBottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  titleMax: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    width: "33.33333333%",
    textAlign: "center",
    height: 50,
    fontSize: 12,
    color: "#666666",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },
  blockInfo: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },
  blockTitle: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },
  blockInfoMoves: {
    width: "33.333333%",
  },
  number: {
    width: "33.3333333%",
    textAlign: "center",
    height: "100%",
    paddingTop: 14,
    marginTop: 2,
    fontSize: 16,
    color: "#000",
  },
  movesT: {
    textAlign: "center",
    width: 110,
    height: 30,
    fontSize: 16,
    color: "#000",
  },
});
