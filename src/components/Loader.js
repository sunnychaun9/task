import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

export default function Loader({style}) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
