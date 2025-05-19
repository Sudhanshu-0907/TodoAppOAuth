// src/screens/TodoListScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native';
import axios from 'axios';
import TodoItem from '../components/AddTodoItem';
import AddTodo from '../components/AddTodo';
import {useAuth0} from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoListScreen({setIsAuthenticated}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {clearSession, user} = useAuth0();

  const fetchTodos = async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/todos?limit=10');
      setTodos(response.data.todos);
    } catch (error) {
      console.log('Fetch Todos Error:', error);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };

  const addTodo = async title => {
    setLoading(true);
    try {
      const response = await axios.post('https://dummyjson.com/todos/add', {
        todo: title,
        completed: false,
        userId: 1,
      });
      setTodos(prev => [{...response.data, completed: false}, ...prev]);
    } catch (error) {
      console.log('Add Todo Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = id => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? {...todo, completed: true} : todo)),
    );
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleLogout = async () => {
    try {
      await clearSession();
      await AsyncStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {user?.name || 'User'}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <AddTodo onAdd={addTodo} />
      {loading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{marginTop: 10}}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TodoItem
              item={item}
              onComplete={() => updateTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => fetchTodos(true)}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
