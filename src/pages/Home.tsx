import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      Alert.alert("Task já cadastrada");
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => task);
    const newTasks = updatedTasks.map((task) => {
      if (task.id === id) return { ...task, done: !task.done };
      else return task;
    });
    setTasks(newTasks);
  }

  function handleEditTask(taskId: Number, taskNewTitle: string){
    const updatedTasks = tasks.map((task) => task);
    const newTasks = updatedTasks.map((task) => {
      if (task.id === taskId) return { ...task, title: taskNewTitle };
      else return task;
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Remover item", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          const filteredTaks = tasks.filter((task) => task.id !== id);
          setTasks(filteredTaks);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
