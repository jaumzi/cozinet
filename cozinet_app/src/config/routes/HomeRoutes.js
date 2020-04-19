import React, { useContext } from 'react';
import { AppContext } from '../../config/AppContext';
import { View, Text, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import HomeScreen from '../../pages/home/Home';
// import PromocaoScreen from './src/pages/promocao/Promocao';
// import ContatoListaScreen from './src/pages/contato/ContatoLista';
import { CustomizeButton } from '../../components/form/FormButtons';

const drawerStyles = StyleSheet.create({
  btn: {
    marginBottom: 24,
    marginLeft: 12,
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

function HomeRoutes(props) {
  const { navigation } = props;
  const ctx = useContext(AppContext);
  const { user, logout } = ctx;

  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      backBehavior="history"
      drawerPosition="left"
      drawerType="slide"
      keyboardDismissMode="none"
      lazy={true}
      drawerContentOptions={{
        activeTintColor: '#b32c39',
        labelStyle: {
          fontWeight: 'bold'
        }
      }}
      drawerContent={props => {
        const { navigation, state, descriptors } = props;

        return (
          <>
            <View
              style={{
                marginTop: 12,
                paddingVertical: 12,
                marginHorizontal: 8,
                borderRadius: 4,
                backgroundColor: '#8BC34A'
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 15
                }}
              >
                {`${user?.nome ?? 'Nenhum user'}`}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 15
                }}
              >
                {user?.email}
              </Text>
            </View>

            <DrawerContentScrollView
              {...props}
              contentContainerStyle={drawerStyles.scroll}
            >
              <View forceInset={{ top: 'always', horizontal: 'never' }}>
                {/* <DrawerItemList
                  forceInset={{ top: 'always', horizontal: 'never' }}
                  {...props}
                /> */}
                {state.routes.map(route => {
                  return (
                    <DrawerItem
                      key={route.key}
                      label={({ focused, color }) => (
                        <Text
                          style={{
                            color,
                            fontWeight: focused ? 'bold' : '400'
                          }}
                        >
                          {route.name}
                        </Text>
                      )}
                      onPress={() => {
                        navigation.navigate(route.name, { ...route.params });
                      }}
                      focused={descriptors[route.key].navigation.isFocused()}
                      activeTintColor={'#b32c39'}
                    />
                  );
                })}
              </View>
              <CustomizeButton
                type="outlined"
                style={drawerStyles.btn}
                onPress={logout}
              >
                Sair dessa conta
              </CustomizeButton>
            </DrawerContentScrollView>
          </>
        );
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default HomeRoutes;
