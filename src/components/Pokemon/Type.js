import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { map, capitalize } from "lodash";

import getColorType from "../../utils/getColorType";

export default function Type(props) {
  const { types } = props;
  return (
    <View style={styles.content}>
      {map(types, (item, index) => (
        <View
          key={index}
          style={{
            ...styles.pill,
            backgroundColor: getColorType(item.type.name),
          }}
        >
          <Text style={styles.pillText}>{capitalize(item.type.name)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 10,
    height: 30,
  },
  pillText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
