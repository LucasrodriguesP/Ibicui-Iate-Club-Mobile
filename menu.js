import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, View,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function Menu({ navigation }) {
  const apertar = () => {
    navigation.navigate('eventos');
    navigation.navigate('churrasqueira1');
    navigation.navigate('churrasqueira2');
    navigation.navigate('churrasqueira3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Menu
      </Text>
      <Text> </Text>
      <Button
      title="Churrasqueira 1"
      color='#cd853f'
      onPress={() => navigation.navigate('churrasqueira1')} 
      />
      <Text> </Text>
      <Button
      title="Churrasqueira 2"
      color='#cd853f'
      onPress={() => navigation.navigate('churrasqueira2')} 
      />
      <Text> </Text>
      <Button
      title="Churrasqueira 3"
      color='#cd853f'
      onPress={() => navigation.navigate('churrasqueira3')} 
      />
      <Text> </Text>
      <Button
      title="Eventos"
      color='#ffa07a'
      onPress={() => navigation.navigate('eventos')} 
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center'
  },
});