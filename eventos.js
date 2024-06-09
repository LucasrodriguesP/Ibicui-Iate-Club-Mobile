import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

export default function App() {
    return(
        <View style={styles.container}>
            <Text style={{fontSize :42, marginTop: 35, marginBottom: 50}}>Eventos</Text>
            <ScrollView style={{marginHorizontal :15}}>
              <Text style={{fontSize :30}}>Encontro náutico - 22/03</Text>
              <Image source={require('./assets/Nautico.jpg')} style={styles.image}></Image>
              <Text style={{fontSize :30}}>Evento dia 22 churrasco e cerveja</Text>
              <Image source={require('./assets/Nautico.jpg')} style={styles.image}></Image>
              <Text style={{fontSize :30}}>Encontro náutico - 22/03</Text>
              <Image source={require('./assets/Nautico.jpg')} style={styles.image}></Image>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    image: {
      width: 400,
      height: 400,
      resizeMode: 'contain',
      marginBottom: 60,
    },
  }); //teste github