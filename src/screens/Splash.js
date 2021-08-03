import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Vibration,
  Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Logo from '../assets/images/logoudg.png';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 5000);
  }, []);

  return (
    <View style={styles.backsplash}>
      <Animatable.View animation="fadeInDownBig" style={styles.backsplash}>
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          delay={500}
          source={Logo}
          style={styles.splashimage}
        />
      </Animatable.View>
      <Animatable.View
        animation="bounceInUp"
        delay={1050}
        style={styles.textanimation}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{ marginTop: -775 }}>
          <Text
            style={{
              fontFamily: 'sketchup',
              fontSize: 20,
              color: '#3819E2',
              opacity: 0.9,
            }}>
            Seminario de Solución de Problemas de Uso, Adaptación, Explotación
            de Sistemas Operativos
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="bounce"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.textanimation}>
          <Text
            style={{
              fontFamily: 'sketchup',
              fontSize: 33,
              color: '#00ACFF',
              opacity: 0.9,
            }}>
            Universidad De Guadalajara
            <Text style={styles.logotext2}>
              {' '}
              Centro Universitario De Ciencias Exactas E Ingenierías
            </Text>
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="bounce"
          easing="ease-out"
          iterationCount="infinite"
          style={{ marginTop: -380 }}>
          <Text style={styles.logotext}>
            ALUMNO
            <Text style={styles.logotext2}> Waldo Salazar Alejandro</Text>
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="bounce"
          easing="ease-out"
          iterationCount="infinite"
          style={{ marginTop: -340 }}>
          <Text style={styles.logotext}>
            CODIGO
            <Text style={styles.logotext2}> 214597832</Text>
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="bounce"
          easing="ease-out"
          iterationCount="infinite"
          style={{ marginTop: -300 }}>
          <Text style={styles.logotext}>
            CARRERA
            <Text style={styles.logotext2}> INNI</Text>
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="bounce"
          easing="ease-out"
          iterationCount="infinite"
          style={{ marginTop: -260 }}>
          <Text style={styles.logotext}>
            SECCION
            <Text style={styles.logotext2}> D01</Text>
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="bounce"
          easing="ease-out"
          iterationCount="infinite"
          style={{ marginTop: -220 }}>
          <Text style={styles.logotext}>
            MAESTRA
            <Text style={styles.logotext2}>
              {' '}
              Gutiérrez Salmerón Martha del Carmen
            </Text>
          </Text>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backsplash: {
    flex: 1,
    backgroundColor: 'rgba(169, 204, 227  ,.3)',
    alignItems: 'center',
  },
  splashimage: {
    width: 150,
    height: 200,
    margin: 100,
  },
  textanimation: {
    marginTop: -470,
  },
  logotext: {
    fontFamily: 'sketchup',
    fontSize: 35,
    color: '#00ACFF',
    opacity: 0.9,
  },
  logotext2: {
    fontSize: 20,
    fontFamily: 'coolvetica',
    color: '#3819E2',
  },
});

export default Splash;
