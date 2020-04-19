import React, { memo, useContext, useState, useEffect } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { CustomizeText } from 'src/components/form/CustomizeText';
import { ScreenContainer } from 'src/components/screen_container/ScreenContainer';
import { AppContext } from 'src/util/AppContext';
import { Card } from 'src/components/card/Card';
// import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { api } from 'src/util/api';
import { BoxCollapse } from 'src/components/card/BoxCollapse';
import CardProductItem from 'src/components/card/CardProductItem';

import styles from 'src/assets/stylesheet';
import { ScrollView } from 'react-native-gesture-handler';

function PromocaoComponent(props) {
  const { route: { params } } = props;

  const ctx = useContext(AppContext);
  const { loadingMsg } = ctx;

  const [state, setState] = useState({
    ofertas: undefined,
  });
  const { ofertas } = state;

  useEffect(() => {
    let loja = {
      id: 1
    };
    carregaPromocoesProdutos(loja);
  }, [params]);

  async function carregaPromocoesProdutos(loja) {
    loadingMsg(true, 'Carregando');
    const axios = await api();
    axios.get(`/folheto/buscaFolhetosPorLoja/${loja.id}`).then(data => {
      // console.log(data.data);
      const result = data.data.map(oferta => {
        oferta.inicio = new Date(oferta.inicio);
        oferta.termino = new Date(oferta.termino);
        return oferta;
      });
      loadingMsg();
      setState(prev => {
        return {
          ...prev,
          ofertas: result
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
            Promoções
          </CustomizeText>
          <Text style={styles.divider}></Text>

          <View
            style={{
              marginBottom: 24
            }}
          >
            {ofertas && ofertas.length > 0 ? (
              ofertas.map((oferta, i) => (
                <BoxCollapse
                  key={`${oferta.id}-${i}`}
                  title={`${
                    oferta.nome
                  } (${oferta.inicio.toLocaleDateString()} - ${oferta.termino.toLocaleDateString()})`}
                open
                >
                  {oferta.Promocaos.map(item => {
                    return !!item.Produto ? (
                      <CardProductItem
                        key={String(item.id)}
                        produto={item.Produto}
                      />
                    ) : (
                      <Card key={String(item.id)}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}
                        >{`Toda a seção de ${item.Secao.nome}`}</Text>
                      </Card>
                    );
                  })}
                </BoxCollapse>
              ))
            ) : (
              <Text style={{ padding: 4, textAlign: 'center' }}>
                Nenhuma promoção encontrada!
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const Promocao = memo(PromocaoComponent);

export default Promocao;
