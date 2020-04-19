import React, { useEffect, useContext, memo, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from '../../pages/splash/Splash';
import LoginScreen from '../../pages/account/Login';
// import CadastroScreen from './src/pages/account/Cadastro';
// import MensagensContatoScreen from './src/pages/contato/MensagensContato';
// import ContatoScreen from './src/pages/contato/Contato';
import { IconButton } from '../../components/form/FormButtons';
// import EsqueceuSenha from './src/pages/account/EsqueceuSenha';
import { AppContext } from '../AppContext';
import HomeRoutes from './HomeRoutes';
import styles from '../../assets/stylesheet';

const WIDTH = Dimensions.get('window').width;

const Stack = createStackNavigator();

function AppRoutes(props) {
  const ctx = useContext(AppContext);
  const { user, aplicationInit, verifyLogin, loadingMsg } = ctx;

  useEffect(() => {
    // verificar login
    verifyLogin();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!aplicationInit && <SplashScreen />}
        {aplicationInit && !!user && (
          <Stack.Navigator initialRouteName={'Inicio'}>
            <Stack.Screen
              name="Inicio"
              component={HomeRoutes}
              options={({ navigation }) => ({
                headerTitle: props => (
                  <Text {...props} ellipsizeMode="tail" numberOfLines={1}>
                    Cozinet
                  </Text>
                ),
                headerLeft: () => (
                  <IconButton
                    icon="menu"
                    type="secondary"
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  />
                ),
                // headerRight: () =>
                //   !user.Loja ? (
                //     <IconButton
                //       icon="customerservice"
                //       iconType="AntDesign"
                //       onPress={() => navigation.navigate('Contato', { loja: user?.Loja })}
                //       iconStyles={{ padding: 12 }}
                //     />
                //   ) : null,
                headerStyle: {
                  backgroundColor: '#b32c39',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 17,
                  width: WIDTH - (!user.Loja ? 120 : 90) // 120 com btn direito e esquerdo // 90, com btn esquerdo // 32, sem btn
                }
              })}
            />
          </Stack.Navigator>
        )}
        {aplicationInit && !user && (
          <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerTintColor: '#fff0', // texto transparente
                headerTransparent: true
              }}
            />
            {/* <Stack.Screen
              name="Cadastro"
              component={CadastroScreen}
              options={
                {
                  // headerTintColor: '#fff0', // texto transparente
                  // headerTransparent: true
                }
              }
            /> */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  
  );
}
export default memo(AppRoutes);
