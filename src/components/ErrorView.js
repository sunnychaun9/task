import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ErrorView({message, onRetry}) {
    console.log('error message--------------', message);
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{message}</Text>
      <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  error: {
    color: '#ff3b30',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
});
