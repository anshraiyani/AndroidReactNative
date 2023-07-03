import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Todo(props) {
  const [completed, setCompleted] = React.useState(false);
  const [editable, setEditable] = React.useState(false);

    function editTask(){
        setEditable(!editable)
    }

  return (
    <View style={styles.todoContainer}>
      <View style={{ flexDirection: "row", maxWidth: "75%" }}>
        <BouncyCheckbox
          isChecked={completed}
          onPress={() => setCompleted(!completed)}
        />
        <View style={{ maxWidth: "100%" }}>
          <TextInput
            style={
              completed ? styles.todoTextCompleted : styles.todoTextIncomplete
            }
            value={props.text}
            editable={editable}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        { !editable ? (
          <TouchableOpacity onPress={() => props.deleteTask(props.id)}>
            <Text style={{ fontSize: 20, marginRight: 15 }}>❌</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={()=>setEditable(!editable)}>
            <Text style={{ fontSize: 20, marginRight: 15 }}>✅</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={editTask}>
          <Text style={{ fontSize: 20 }}>{!editable? '📝' : '❌'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    backgroundColor: "beige",
    margin: 15,
    padding: 10,
    borderWidth: 0.5,
    justifyContent: "space-between",
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    fontSize: 15,
    color: "black",
  },
  todoTextIncomplete: {
    fontSize: 15,
    color: "black",
  },
});
