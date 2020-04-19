import React, { memo, useContext, useState, useEffect, useRef } from 'react';
import { Text, FlatList, View, StyleSheet, Button } from 'react-native';
import { CustomizeText } from 'src/components/form/CustomizeText';
import { ScreenContainer } from 'src/components/screen_container/ScreenContainer';
import { AppContext } from 'src/util/AppContext';
import { Form } from '@unform/mobile';
import * as yup from 'yup';
import { TextField } from 'src/components/form/FormInputs';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { api } from 'src/util/api';
import { IconButton } from 'src/components/form/FormButtons';
import { ScrollView } from 'react-native-gesture-handler';

import styles from 'src/assets/stylesheet';
import CardMensagemItem from 'src/components/card/CardMensagemItem';

function MensagensContatoComponent(props) {
  const { route } = props;
  const { contato } = route.params;

  const formRef = useRef(null);
  const scrollRef = useRef(null);

  const ctx = useContext(AppContext);
  const { showNotification, loadingMsg, user } = ctx;

  const [state, setState] = useState({
    mensagens: undefined
  });
  const { mensagens } = state;

  useEffect(() => {
    scrollRef.current.scrollToEnd();
  }, [mensagens, contato]);

  useEffect(() => {
    carregaMensagens(contato);
  }, [contato]);

  async function carregaMensagens(contato) {
    loadingMsg(true, 'Carregando');
    const axios = await api();
    axios.get(`/mensagem/buscarPorContato/${contato.id}`).then(data => {
      // console.log(data.data);
      loadingMsg();
      setState(prev => {
        return {
          ...prev,
          mensagens: data.data
        };
      });
    });
  }
  async function enviarMensagem(mensagem) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        mensagem: yup.string().required()
      });
      await schema.validate(
        { mensagem },
        {
          abortEarly: false
        }
      );

      // se chegar ate aqui é válido
      const axios = await api(showNotification, loadingMsg);
      
      loadingMsg(true, 'Enviando mensagem');
      axios
        .post(
          `${
            user.id === contato.idUsuario ? '/mensagem' : '/mensagem/resposta'
          }`,
          {
            mensagem,
            idUsuario: user.id,
            idContato: contato.id
          }
        )
        .then(data => {
          loadingMsg();
          showNotification(
            'success',
            'Sucesso!',
            'Mensagem enviada com sucesso!',
            undefined,
            0
          );
          formRef.current.reset();
          setState(prev => {
            const msgs = prev.mensagens;
            msgs.push(data.data);
            return {
              ...prev,
              mensagens: msgs
            };
          });
        });
    } catch (err) {
      console.log(err);
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        console.log(validationErrors);
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <ScreenContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomizeText
          style={{
            textAlign: 'center',
            marginTop: 12,
            marginBottom: 8
          }}
          strong
        >
          Mensagens
        </CustomizeText>
        <Text style={styles.divider}></Text>

        <View
          forceInset={{ top: 'always', horizontal: 'never' }}
          style={{ flex: 1 }}
        >
          <ScrollView ref={scrollRef}>
            {/* <CardMensagemItem
              mensagem={{
                Usuario: contato.Usuario,
                mensagem: contato.descricao,
                createdAt: contato.createdAt,
                isResposta: user.id !== contato.idUsuario
              }}
            /> */}
            {mensagens?.length > 0 &&
              mensagens.map(mensagem => (
                <CardMensagemItem
                  key={String(mensagem.id)}
                  mensagem={{
                    ...mensagem,
                    // inverte parametro pois quando o contato não for do usuario logado para ele é uma resposta
                    isResposta:
                      user.id !== contato.idUsuario
                        ? !mensagem.isResposta
                        : mensagem.isResposta
                  }}
                />
              ))}
          </ScrollView>
        </View>
        <Form
          ref={formRef}
          onSubmit={({ mensagem }) => enviarMensagem(mensagem)}
        >
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 12,
              alignItems: 'flex-start'
            }}
          >
            <TextField name="mensagem" placeholder="Mensagem" />
            <IconButton
              size={25}
              icon="send"
              onPress={() => formRef.current.submitForm()}
              iconStyles={{
                marginLeft: 12,
                backgroundColor: '#3b5998',
                padding: 8,
                marginTop: 8,
                borderRadius: 4
              }}
            />
          </View>
        </Form>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const MensagensContato = memo(MensagensContatoComponent);

export default MensagensContato;
