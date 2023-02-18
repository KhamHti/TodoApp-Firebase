import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "react-native-vector-icons";
import { firebase } from "../config";

const Home = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection("todos");
  const [addData, setAddData] = useState("");

  //fetch or read the data from firebase
  useEffect(() => {
    todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading } = doc.data();
        todos.push({
          id: doc.id,
          heading,
        });
      });
      setTodos(todos);
    });
  }, []);

  // add a todo
  const addHandler = () => {
    //check if we have a todo
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData("");
          //release keyboard
          Keyboard.dismiss();
        })
        .catch((error) => alert(error));
    }
  };

  // delete a todo from firebase db
  const deleteHandler = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then(() => {
        alert("Deleted Successfully");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={style.formConatiner}>
        <TextInput
          style={style.input}
          placeholder="Enter todo"
          placeholderTextColor="#aaaaaa"
          value={addData}
          onChangeText={(heading) => setAddData(heading)}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={style.button} onPress={addHandler}>
          <Text style={style.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={style.container}
              onPress={() => navigation.navigate("Details", { item })}
            >
              <FontAwesome
                style={style.todoIcon}
                name="trash-o"
                color="red"
                onPress={() => deleteHandler(item)}
              />
              <View style={style.innerContainer}>
                <Text style={style.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const style = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#e5e5e5",
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
  formConatiner: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    flex: 1,
    marginRight: 15,
  },
  button: {
    height: 47,
    borderRadius: 9,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#788eec",
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff",
  },
  todoIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
});
