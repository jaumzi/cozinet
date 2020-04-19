import React, { memo, useContext, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { CustomizeText } from 'src/components/form/CustomizeText';
import { ScreenContainer } from 'src/components/screen_container/ScreenContainer';
import { AppContext } from 'src/util/AppContext';
import SafeAreaView from 'react-native-safe-area-view';
import { api } from 'src/util/api';

import styles from 'src/assets/stylesheet';
import { CardContatoItem } from 'src/components/card/CardContatoItem';
import { ScrollView } from 'react-native-gesture-handler';

function ContatoListaComponent(props) {
  const { navigation, route: { params } } = props;

  const ctx = useContext(AppContext);
  const { loadingMsg, user } = ctx;

  const [state, setState] = useState({
    contatos: undefined
  });
  const { contatos } = state;

  useEffect(() => {
    carregaContatos(user);
  }, [params]); // forçar nova renderização ao voltar para pagina

  async function carregaContatos(user) {
    loadingMsg(true, 'Carregando');
    const axios = await api();
    axios.get(`/contato/listaPorUsuario/${user.id}`).then(data => {
      loadingMsg();
      setState(prev => {
        return {
          ...prev,
          contatos: data.data
        };
      });
    });
  }

  return (
    <ScreenContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <CustomizeText
            style={{
              textAlign: 'center',
              marginTop: 12,
              marginBottom: 8
            }}
            strong
          >
            Meus contatos
          </CustomizeText>
          <Text style={styles.divider}></Text>

          <View
            style={{
              marginBottom: 24
            }}
          >
            {contatos && contatos.length > 0 ? (
              contatos.map(item => (
                <CardContatoItem
                  key={String(item.id)}
                  contato={item}
                  nome={
                    user.id === item.idUsuario
                      ? item.Loja.nome
                      : item.Usuario.nome.split(' ')[0]
                  }
                  onPress={() =>
                    navigation.navigate('MensagensContato', { contato: item })
                  }
                />
              ))
            ) : (
              <Text style={{ padding: 4, textAlign: 'center' }}>
                Nenhum contato com loja encontrado!
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const ContatoLista = memo(ContatoListaComponent);

export default ContatoLista;
