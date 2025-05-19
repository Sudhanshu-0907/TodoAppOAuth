// App.js
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Auth0Provider} from 'react-native-auth0';
import config from './src/services/api';
import LoginScreen from './src/screens/loginScreen';
import TodoListScreen from './src/screens/TodoListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Load auth state on app start
  useEffect(() => {
    const checkAuth = async () => {
      const storedAuth = await AsyncStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  // Update stored auth when changed
  const handleAuthChange = async value => {
    setIsAuthenticated(value);
    await AsyncStorage.setItem('isAuthenticated', value.toString());
  };

  if (isCheckingAuth) return null; // or splash screen

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAuthenticated ? (
            <Stack.Screen name="Home">
              {() => <TodoListScreen setIsAuthenticated={handleAuthChange} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Login">
              {() => <LoginScreen setIsAuthenticated={handleAuthChange} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Auth0Provider>
  );
}
