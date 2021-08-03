import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

//Path
import Filosofo from './src/screens/Filosofos';
import Home from './src/screens/Home';
import Router from './src/router/index';

export default function App() {
  const [carga, setCarga] = useState(false);
  //Se cargan las fuentes que seran utilizadas dentro de la app
  useEffect(() => {
    if (!carga) {
      loadFonts();
    }
  });
  //Funcion para cargar las fuentes
  const loadFonts = async () => {
    await Font.loadAsync({
      Shelter: require('./src/assets/fonts/Shelter.ttf'),
      moonstone: require('./src/assets/fonts/moonstone.ttf'),
    });
    setCarga(true);
  };
  return carga ? (
    <Router />
  ) : (
    <ActivityIndicator style={{ marginTop: 360 }} color="#00ACFF" />
  );
}
