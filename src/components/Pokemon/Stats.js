import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { map, capitalize } from "lodash";
import getColorType from "../../utils/getColorType";

export default function Stats(props) {
  const { stats, type } = props;
  const color = getColorType(type);
  const barStyles = (number) => {
    return {
      backgroundColor: color,
      width: `${number/2.55}%`,
    };
  };
  return (
    <View style={styles.content}>
      <Text style={{ ...styles.title, color: color }}>Base Stats</Text>
      {map(stats, (item, index) => (
        <View key={index} style={styles.block}>
          <View style={styles.blockTitle}>
            <Text style={{...styles.statName, color: color}}>{capitalize(item.stat.name)}</Text>
          </View>
          <View style={styles.blockInfo}>
            <Text style={styles.number}>{`${item.base_stat}`.padStart(3, 0)}</Text>
            <View style={styles.bgBar}>
              <View style={[styles.bar, barStyles(item.base_stat)]} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 50,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTitle: {
    width: "30%",
  },
  statName: {
    fontSize: 13,
    //color: "#6b6b6b",
    fontWeight: "bold",
  },
  blockInfo: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    width: "12%",
    fontSize: 14,
  },
  bgBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar: {
    height: 10,
    borderRadius: 20,
  },
});
