import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Paises from './Forms/Paises'


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <View style={styles.container}>
       <Paises/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});