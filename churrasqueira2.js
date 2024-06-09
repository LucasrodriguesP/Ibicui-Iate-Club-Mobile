import { Alert, StyleSheet, Text, TextInput, View, Button, FlatList} from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Calendar, CalendarUtils} from 'react-native-calendars';
import * as FileSystem from 'expo-file-system';



export default function App() {
    console.log('-----------------------')

    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    const umAnoPraFrente = new Date(hoje);
    umAnoPraFrente.setFullYear(hoje.getFullYear() + 1);

    const [diasMarcados, setDiasMarcados] = useState({});
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [mostrarAgenda, setMostrarAgenda] = useState(false);
    const [refresh, setRefresh] = useState(false);


    const filePath = FileSystem.documentDirectory + 'datas.txt';


    useEffect(() => {
      const lerEParsear = async () => {
              const content = await readTxtFile(filePath);
              if (content) {
                  setDiasMarcados(JSON.parse(content));
              }
      };

      lerEParsear(); // Vai ser preciso para ler o arquivo quando a pagina iniciar, colchetes para fazer 1 vez so, tava dando loop. Async/await necessario pois sem ele o JSON.parse() fazia antes da resposta
    }, []);


    const writeTxtFile = (filePath, content) => {

      const jsonData = JSON.stringify(content);
      return FileSystem.writeAsStringAsync(filePath, jsonData)
    };


    const readTxtFile = (filePath) => { //explucao da necessidade async no useeffect
      return FileSystem.readAsStringAsync(filePath)
        .then((content) => {
          console.log('File content:', content);
          return content;
        });
    };

    const marcarDesmarcar = (day) => {
      const newDiasMarcados = { ...diasMarcados };
      if (newDiasMarcados[day.dateString]) {
        Alert.alert(
          'Confirmar exclusão',
          `Deseja desmarcar o evento de ${newDiasMarcados[day.dateString].nome} ?`,
          [
            {text:'cancelar', style:"cancel"},
            {text: 'Desmarcar', onPress:() =>{
              delete newDiasMarcados[day.dateString];
              console.log(newDiasMarcados);
              writeTxtFile(filePath,newDiasMarcados);
              setDiasMarcados(newDiasMarcados);
              setRefresh(!refresh); //vi no stackoverflow como renderizar a pagina dnv

            }}
          ]
        )
      } else {
        newDiasMarcados[day.dateString] = {
          selected: true,
          selectedColor: 'yellow',
          eventName: nome,
          numero: numero,
        };
      }
      console.log(newDiasMarcados);
      setDiasMarcados(newDiasMarcados);
      writeTxtFile(filePath,newDiasMarcados);
    };

    const acaoMostrarAgenda = () => {
      console.log(diasMarcados);
      setMostrarAgenda(true);
    };

    const diasMarcadosParaArray = Object.keys(diasMarcados).map((key) => ({
      dateString: key,
      ...diasMarcados[key],
    }));
  
    return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput style={styles.inputNome}
        placeholder="nome"
        onChangeText={setNome}
      />
      <TextInput style={styles.inputNumero}
        placeholder="Número da pessoa"
        onChangeText={setNumero}
        value={numero}
      />
      <Calendar
        current={CalendarUtils.getCalendarDateString(hoje)}
        minDate={CalendarUtils.getCalendarDateString(amanha)} 
        maxDate={CalendarUtils.getCalendarDateString(umAnoPraFrente)} 
        onDayLongPress={marcarDesmarcar} 
        markedDates={diasMarcados}   
      />
      <Text style={styles.title}>Pessoas com Dias Marcados:</Text>
          {mostrarAgenda ? ( //ternario
              <FlatList
                  data={diasMarcadosParaArray}
                  renderItem={({ item }) => (
                      <View style={styles.item}>
                        <Text>{item.dateString}: {item.eventName} - {item.numero}</Text>
                      </View>
                  )}
                  keyExtractor={(item) => item.dateString}
              />) : (
              <Button title="Exibir Pessoas Marcadas" onPress={acaoMostrarAgenda} />
          )}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    },
  calendar: {
      marginTop: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
    },
  inputNome: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '80%',
    },
  inputNumero: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '80%',
    },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
  item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
});