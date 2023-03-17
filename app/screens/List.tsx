import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Ioniccons from '@expo/vector-icons/Ionicons';
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export interface Todo {
  titler : string;
  done : boolean;
  id : string;
}
const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const todoRef = collection(FIREBASE_DB, "todos");
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log('UPDATED');

        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos)
      },
    });

    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIREBASE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo('');
  };

  const renderTodo = ({item}:any) => {
    const ref = doc(FIREBASE_DB, `todos/${item.id}`);

    const toggleDone = async() => {
      updateDoc(ref, {done: !item.done});
    }

const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done && (
            <Ioniccons name="md-checkmark-circle" size={30} color="green" />
          )}
          {!item.done && <Entypo name="circle" size={30} color="black" />}

          <Text style={styles.todoText}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={deleteItem}
        />
      </View>
    );
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <Button onPress={addTodo} title=" Add Todo " disabled={todo === ""} />
      </View>
      {todos.length > 0 && (
        <view>
          <FlatList
            data={todos}
            renderItem={(item) => renderTodo(item)}
            keyExtractor={(todo: Todo) => todo.id}
          />
        </view>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});