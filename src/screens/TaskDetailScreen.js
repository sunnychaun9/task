import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateTask} from '../store/slices/taskSlice';

export default function TaskDetailScreen({route, navigation}) {
  const {task} = route.params;
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'Medium');

  const handleSave = async () => {
    const updated = {
      ...task,
      title,
      description,
      priority,
    };

    await dispatch(updateTask(updated));

    Alert.alert('Success', 'Task updated', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  const toggleCompleted = async () => {
    await dispatch(updateTask({...task, completed: !task.completed}));
  };
console.log('task in detail screen---------:', task);
console.log('title in detail screen---------:', title);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Priority</Text>
        <TextInput
          style={styles.input}
          value={priority}
          onChangeText={setPriority}
        />

        <Text style={styles.info}>
          Created At: {task.createdAt ?? 'N/A'}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.statusBtn,
          {backgroundColor: task.completed ? '#FF9800' : '#4CAF50'},
        ]}
        onPress={toggleCompleted}>
        <Text style={styles.statusBtnText}>
          {task.completed ? 'Mark as Pending' : 'Mark Completed'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  block: {marginBottom: 20},
  label: {fontSize: 14, marginBottom: 4},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  info: {fontSize: 12, color: '#777'},
  statusBtn: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBtnText: {color: '#fff', fontSize: 16},
  saveBtn: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: {color: '#fff', fontSize: 16},
});
