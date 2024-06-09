import React, { useState, useEffect } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import db, { createTable, getUser } from './db';
import menu from './menu';
import eventos from './eventos';
import churrasqueira1 from './churrasqueira1';
import churrasqueira2 from './churrasqueira2';
import churrasqueira3 from './churrasqueira3';

const Stack = createNativeStackNavigator();

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    createTable();
  }, []);

  const handleLogin = () => {
    getUser(username, password, user => {
      navigation.navigate('Menu');
    }, errorMessage => {
      setError(errorMessage);
    });
  };

  return (
    <ImageBackground source={require('./assets/yacht-club.png')} resizeMode='cover' style={styles.image}>
      <View style={styles.container}>
        <Text style={{ fontSize: 22 }}>Ibicuí Iate Club</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Usuário'
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button title='Login' onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={menu} />
        <Stack.Screen name="eventos" component={eventos} />
        <Stack.Screen name="churrasqueira1" component={churrasqueira1} />
        <Stack.Screen name="churrasqueira2" component={churrasqueira2} />
        <Stack.Screen name="churrasqueira3" component={churrasqueira3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    width: 200,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});
