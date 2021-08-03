import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import Constants from 'expo-constants';
import { Button, Icon } from 'react-native-elements';
import { Mutex, Semaphore, withTimeout } from 'async-mutex';

//Data
import { Filosofos } from '../data/Filosofos';

//Diseño
import FilosofosDesing from './Filosofos';

//Variables
var tenedores = [true, true, true, true, true];

//Actualiza la lista de filosofos
var comensalinfo = [
  { estado: 'pensando...', status: 'primary', lleno: false },
  { estado: 'pensando...', status: 'primary', lleno: false },
  { estado: 'pensando...', status: 'primary', lleno: false },
  { estado: 'pensando...', status: 'primary', lleno: false },
  { estado: 'pensando...', status: 'primary', lleno: false },
];
var personas = [0, 1, 2, 3, 4];

const Home = ({ navigation }) => {
  //Creamos un mutex para pruebas y un semaforo pero el ejercicio esta resuelto con semaforo
  const mutex = new Mutex();
  //Nuestro semaforo tiene una variable los cuales pudieran ser los meseros entre mas meseros se evalua si pueden entrar mas comensales
  const semaphore = new Semaphore(2);

  //Se crea una data local de los filosofos y en estado cargando por las imagenes
  const [filosofosDatal, setFilosofosdatal] = useState();
  const [cargafilosofo, setCargafilosos] = useState(false);

  //Funcion principal para atender a los comensales que van llegando, el cual recibe el lugar del comensal que estas siendo atendido
  const atender = (lugar) => {
    comensalinfo[lugar].estado = 'esperando...';
    comensalinfo[lugar].status = 'warning';
    modifica(personas)
    mutex
    .acquire()
    .then(function(release) {
    if (lugar != 0 && lugar != 4) {
      if (tenedores[lugar - 1] === true && tenedores[lugar] === true) {
        tenedores[lugar-1] = false;
        tenedores[lugar] = false;
        comensalinfo[lugar].estado = 'comiendo...';
        comensalinfo[lugar].status = 'success';
        modifica(personas);
        setTimeout(() => {
          comensalinfo[lugar].estado = 'llenoo...';
          comensalinfo[lugar].status = 'error';
          comensalinfo[lugar].lleno = true;
          modifica(personas);
          tenedores[lugar-1] = true;
          tenedores[lugar] = true;
          release();
          },3000);
      } else {
        setTimeout(() => {
          release();
          atender(lugar);
          },3000);
      }
    } else if (lugar === 0) {
      if (tenedores[4] === true && tenedores[lugar + 1] === true) {
        tenedores[0] = false;
        tenedores[4] = false;
        comensalinfo[lugar].estado = 'comiendo...';
        comensalinfo[lugar].status = 'success';
        modifica(personas);
        setTimeout(() => {
          comensalinfo[lugar].estado = 'llenoo...';
          comensalinfo[lugar].status = 'error';
          comensalinfo[lugar].lleno = true;
          modifica(personas);
          tenedores[0] = true;
          tenedores[4] = true;
          release();
          },3000);
      } else {
       setTimeout(() => {
          atender(lugar);
          release();
          },3000);
      }
    } else {
      if (tenedores[lugar - 1] === true && tenedores[0] === true) {
        tenedores[4] = false;
        tenedores[3] = false;
        comensalinfo[lugar].estado = 'comiendo...';
        comensalinfo[lugar].status = 'success';
        modifica(personas);
        setTimeout(() => {
          comensalinfo[lugar].estado = 'llenoo...';
          comensalinfo[lugar].status = 'error';
          comensalinfo[lugar].lleno = true;
          modifica(personas);
          tenedores[4] = true;
          tenedores[3] = true;
          release();
          },3000);
      } else {
        setTimeout(() => {
          atender(lugar);
          release();
          },3000);
      }
    }
      //console.log(tenedores);
    });
  };

  useEffect(() => {
    setFilosofosdatal(Filosofos);
    setCargafilosos(true);
  }, []);

  const getDatoRandom = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const modifica = (select) => {
    //ordenamos el arreglo
    select.sort();
    let i = -1;
    const newdato = Filosofos.map((dato) => {
      i++;
      if (dato.id === select[i]) {
        return {
          ...dato,
          estado: comensalinfo[i].estado,
          status: comensalinfo[i].status,
          lleno: comensalinfo[i].lleno,
        };
      }
      return dato;
    });

    setFilosofosdatal(newdato);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>
        ( Filosofos
        <Text style={{ color: '#3819E2' }}> Comensales </Text>)
      </Text>
      {cargafilosofo ? (
        <View>
          <FlatList
            numColumns={2}
            data={filosofosDatal}
            renderItem={({ item }) => (
              <FilosofosDesing filosofo={item} tenedor={tenedores[item.id]} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <ActivityIndicator size={200} color="#3819E2" />
      )}

      <View>
        <Button
          icon={
            <Icon
              name="utensils"
              type="font-awesome-5"
              size={15}
              color="white"
            />
          }
          buttonStyle={{ backgroundColor: '#5CAADC' }}
          iconRight
          title="COMENZAR  "
          onPress={() => {
            setTimeout(() => atender(0), getDatoRandom(5000, 3000));
            setTimeout(() => atender(1), getDatoRandom(5000, 3000));
            setTimeout(() => atender(2), getDatoRandom(5000, 3000));
            setTimeout(() => atender(3), getDatoRandom(5000, 3000));
            setTimeout(() => atender(4), getDatoRandom(5000, 3000));
          }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          icon={
            <Icon
              name="redo-alt"
              type="font-awesome-5"
              size={15}
              color="white"
            />
          }
          buttonStyle={{ backgroundColor: '#5CAADC' }}
          iconRight
          title="RESET  "
          onPress={() => {
            setCargafilosos(false);
            comensalinfo = [
              { estado: 'pensando...', status: 'primary', lleno: false },
              { estado: 'pensando...', status: 'primary', lleno: false },
              { estado: 'pensando...', status: 'primary', lleno: false },
              { estado: 'pensando...', status: 'primary', lleno: false },
              { estado: 'pensando...', status: 'primary', lleno: false },
            ];
            tenedores = [true, true, true, true, true];
            modifica(personas);
            setCargafilosos(true);
          }}
        />
      </View>
      </ScrollView> 
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: 'rgba(169, 204, 227  ,.4)',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Shelter',
    fontSize: 40,
    color: '#00ACFF',
  },
});
