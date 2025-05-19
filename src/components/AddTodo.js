// src/components/AddTodo.js
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

export default function AddTodo({onAdd}) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New to-do..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
  },
});
