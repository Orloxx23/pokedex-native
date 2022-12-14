import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { set, size } from "lodash";
import { Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import useAuth from "../../hooks/useAuth";
import { getPokemonsFavoriteApi } from "../../api/favorite";

export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonsFavoriteApi();
          setTotal(size(response));
        } catch (error) {
          console.log(error);
          setTotal(0);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>{`${auth.firstName} ${auth.lastName}`}</Text>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Username" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total Favoritos" text={`${total} pokemons`} />
      </View>

      <Button
        mode="contained"
        buttonColor="#fff"
        textColor="#333"
        textDecorationLine="underline line-through"
        onPress={logout}
        style={styles.btnLogout}
      >
        LOG OUT
      </Button>
    </View>
  );
}

function ItemMenu(props) {
  const { title, text } = props;

  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text style={{color: "white"}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#333",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  titleBlock: {
    marginBottom: 30,
  
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#fff",
  },
  dataContent: {
    marginBottom: 20,
    color: "#fff",
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
    color: "#fff",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
    color: "#fff",
  },
  btnLogout: {
    paddingRight: 10,
  },
});
