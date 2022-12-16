import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function NoLogged() {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Text style={{...styles.text, color: "white", fontSize: 15}}>To see this screen you have to log in</Text>
      <View style={styles.contentB}>
        <Button
          mode="outlined"
          textColor="#fff"
          textDecorationLine="underline line-through"
          onPress={() => navigation.navigate("Account")}
        >
          Go to login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#333",
  },
  contentB: {
    marginTop: 20,
  },
});
