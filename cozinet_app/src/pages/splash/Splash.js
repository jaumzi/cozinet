import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { CustomizeText } from '../../components/form/CustomizeText';

import styles from '../../assets/stylesheet';

const componentStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    // backgroundColor: '#ffcf28'
  },
  msg: {
    color: '#b32c39',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1
  }
});

function Splash(props) {
  return (
    <SafeAreaView style={[styles.container, componentStyles.center]}>
      <StatusBar barStyle="dark-content" />
      {/* <Image source={logo} style={styles.imageLogo} /> */}
      <CustomizeText type="h1" strong>
        Iniciando aplicativo
      </CustomizeText>
    </SafeAreaView>
  );
}

export default Splash;
