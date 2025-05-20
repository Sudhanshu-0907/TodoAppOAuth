import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function TodoItem({item, onComplete, onDelete}) {
  return (
    <View style={styles.item}>
      <Text style={[styles.text, item.completed && styles.completed]}>
        {item.todo}
      </Text>
      <View style={styles.actions}>
        {!item.completed && <Button title="Done" onPress={onComplete} />}
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  text: {fontSize: 16},
  completed: {textDecorationLine: 'line-through', color: 'gray'},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
