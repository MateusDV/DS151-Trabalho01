import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Paises from './Forms/Paises';
import Detalhe from './Forms/Detalhe';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [pais, setPais] = useState(null);

  const navigate = (screen, pais) => {
    console.log(`${screen} - ${pais}`);
    setCurrentScreen(screen);
    setPais(pais);
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'home' ? <Paises navigate={navigate}/> : null}
      {currentScreen === 'pais' ? <Detalhe navigate={navigate} nome={pais}/> : null}
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