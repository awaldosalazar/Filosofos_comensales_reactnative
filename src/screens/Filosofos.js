import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Avatar, Badge, Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';

const Filosofos = ({ filosofo, tenedor }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.name}>({filosofo.name})</Text>
        <Badge
          value={
            <Text style={{ fontFamily: 'moonstone', fontSize: 30 }}>
              {`${filosofo.estado}`}
            </Text>
          }
          status={filosofo.status}
        />

        <Avatar
          size="medium"
          rounded
          title={filosofo.name.substr(0, 2)}
          source={{
            uri: filosofo.image,
          }}
          titleStyle={{ color: 'rgba(27, 79, 114,1)' }}
        />
        <Text style={styles.text}>{`Puesto de mesa ${filosofo.id + 1}`}</Text>
        <Icon
          reverse
          name={tenedor ? 'utensils' : 'ban'}
          type="font-awesome-5"
          color="#80CDFF"
          onPress={() => console.log('hello')}
        />
        <View style={{ marginTop: -65, marginLeft: 60 }}>
          <Icon
            reverse
            name={tenedor ? 'drumstick-bite' : 'ban'}
            type="font-awesome-5"
            color="#80CDFF"
            onPress={() => console.log('hello')}
          />
        </View>
      </Card>
    </View>
  );
};

export default Filosofos;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
  },
  card: {
    width: 150,
    height: 190,
    alignItems: 'center',
    backgroundColor: 'rgba(115, 198, 182,0.2)',
    borderRadius: 0.5,
  },
  name: {
    fontFamily: 'Shelter',
    fontSize: 25,
    textAlign: 'center',
    color: '#2471A3',
  },
  text: {
    fontFamily: 'moonstone',
    fontSize: 30,
    color: '#2471A3',
  },
});
