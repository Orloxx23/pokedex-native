import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextInput } from "react-native-paper";

import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError("");
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError("The username or password is not correct");
      } else {
        login(userDetails);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Image
        source={require("../../assets/pokebalTBlack.png")}
        style={{ width: 75, height: 75, marginTop: 80 }}
      />
      <Text style={styles.title}>Welcome back</Text>
      <TextInput
        label="Username"
        mode="outlined"
        outlineColor="#666"
        activeOutlineColor="#666"
        backgroundColor="#666"
        textColor="#fff"
        underlineColor="#fff"
        activeUnderlineColor="#fff"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        label="Password"
        mode="outlined"
        outlineColor="#666"
        activeOutlineColor="#666"
        backgroundColor="#666"
        textColor="#fff"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <View style={styles.button}>
        <Button
          mode="contained"
          buttonColor="#fff"
          textColor="#333"
          textDecorationLine="underline line-through"
          onPress={formik.handleSubmit}
        >
          LOGIN
        </Button>
      </View>

      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>

      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("The user is required."),
    password: Yup.string().required("password is required."),
  };
}

const styles = StyleSheet.create({
  content: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 0,
    color: "white",
  },
  input: {
    //height: 50,
    width: "80%",
    margin: 12,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    marginRight: "3%",
    marginLeft: "3%",
    width: "80%",
  },
});
