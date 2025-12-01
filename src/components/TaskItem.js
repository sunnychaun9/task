import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function TaskItem({task, onPress}) {
    console.log('taskkkkkk---------:', task);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {task.title}
        </Text>

        <View style={[
          styles.status,
          {backgroundColor: task.completed ? '#4CAF50' : '#FF9800'},
        ]}>
          <Text style={styles.statusText}>
            {task.completed ? 'Done' : 'Pending'}
          </Text>
        </View>
      </View>

      {task.isLocal && (
        <Text style={styles.localTag}>Local</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  localTag: {
    marginTop: 8,
    color: '#007AFF',
    fontSize: 12,
  },
});
