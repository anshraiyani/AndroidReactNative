import React from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Todo from "./components/Todo";

export default function App() {
  const [todo, setTodo] = React.useState({
    text: "",
    id: "",
  });

  const [todos, setTodos] = React.useState([]);

  function handleTouch() {
    if (todo.text) {
      setTodos((prev) => [...prev, todo]);
      setTodo({ text: "" });
    }
  }

  function deleteTask(id) {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id != id);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Todo List</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add Items"
          style={styles.input}
          value={todo.text}
          onChangeText={(txt) =>
            setTodo({ text: txt, id: new Date().valueOf() })
          }
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleTouch}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* {todos.map((t)=>{
        return(
          <View>
            <Text>{t.text}</Text>
          </View>
        )
      })} */}

      {todos.length == 0 ? (
        <Text style={{ textAlign: "center", fontSize: 25 }}>
          Nothing to do ...{" "}
        </Text>
      ) : (
        <View style={styles.flatListContainer}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todo text={item.text} deleteTask={deleteTask} id={item.id} />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 50,
    fontSize: 40,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainer: {
    justifyContent: "center",
    backgroundColor: "beige",
    alignItems: "center",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    padding: 7,
    flex: 3,
    marginRight: 10,
  },

  addBtn: {
    backgroundColor: "beige",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  addBtnText: {
    fontSize: 20,
    fontWeight: "500",
  },
  flatListContainer: {
    backgroundColor: "#F0F0F0",
    marginHorizontal: 15,
    borderRadius: 10,
    maxHeight: "78%",
  },
});
