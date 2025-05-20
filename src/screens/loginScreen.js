import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useAuth0} from 'react-native-auth0';

export default function LoginScreen({setIsAuthenticated}) {
  const {authorize} = useAuth0();

  const handleLogin = async () => {
    try {
      await authorize();
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Login Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Auth0" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
