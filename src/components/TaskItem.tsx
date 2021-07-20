import React, { Fragment, useEffect, useRef, useState } from "react";

import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import { Task } from "./TasksList";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, newTitle: string) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({
  index,
  task,
  editTask,
  toggleTaskDone,
  removeTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(task.title);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  const textInputRef = useRef<TextInput>(null);

  const handleStartEditing = () => setIsEditing(true);
  const handleCancelEditing = () => {
    setEditedValue(task.title);
    setIsEditing(false);
  };

  const handleSubmitEditing = () => {
    editTask(task.id, editedValue);
    setIsEditing(false);
  };

  return (
    <Fragment>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isEditing ? (
            <TextInput
              value={editedValue}
              onChangeText={setEditedValue}
              editable
              onSubmitEditing={handleSubmitEditing}
              style={task.done ? styles.taskTextDone : styles.taskText}
              ref={textInputRef}
            />
          ) : (
            <Text style={task.done ? styles.taskTextDone : styles.taskText}>
              {task.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 24,
        }}
      >
        {isEditing ? (
          <TouchableOpacity
            testID={`cancel-${index}`}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 8,
  },
});
