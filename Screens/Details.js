import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { firebase } from "../config";

const Details = ({ navigation, route }) => {
  const todoRef = firebase.firestore().collection("todos");
  const [textHeading, setTextHeading] = useState(route.params.item.name);

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => navigation.navigate("Home"))
        .catch((error) => alert(error.message));
    }
  };
  return (
    <View style={style.container}>
      <TextInput
        style={style.textField}
        value={textHeading}
        onChangeText={setTextHeading}
        placeholder="Update todo"
      />
      <Pressable style={style.updateButton} onPress={() => updateTodo()}>
        <Text>UPDATE TODO</Text>
      </Pressable>
    </View>
  );
};

export default Details;

const style = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  textField: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: "#000000",
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  updateButton: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 10,
    backgroundColor: "#0de065 ",
  },
});
