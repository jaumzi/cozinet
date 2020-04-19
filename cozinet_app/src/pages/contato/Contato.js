import React, { memo, useContext, useRef } from 'react';
import { Text, View } from 'react-native';
import { Form } from '@unform/mobile';
import * as yup from 'yup';
import { TextField, LongTextField } from 'src/components/form/FormInputs';
import { CustomizeButton } from 'src/components/form/FormButtons';
import { CustomizeText } from 'src/components/form/CustomizeText';
import { ScreenContainer } from 'src/components/screen_container/ScreenContainer';
import { AppContext } from 'src/util/AppContext';
import SafeAreaView from 'react-native-safe-area-view';
import { api } from 'src/util/api';
import styles from 'src/assets/stylesheet';
import { ScrollView } from 'react-native-gesture-handler';

function ContatoComponent(props) {
  const { navigation, route } = props;
  const { loja } = route.params;

  const formRef = useRef(null);

  const ctx = useContext(AppContext);
  const { loadingMsg, showNotification } = ctx;

  async function enviaContato(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        titulo: yup
          .string()
          .min(3)
          .required(),
        descricao: yup
          .string()
          .min(3)
          .required()
      });
      await schema.validate(data, {
        abortEarly: false
      });

      // se chegar ate aqui é válido
      const axios = await api(showNotification, loadingMsg);

      console.log('enviaa', { ...data, idLoja: loja.id });
      loadingMsg(true, 'Enviando');
      axios
        .post('/contato', { ...data, idLoja: loja.id }) // trocar para data
        .then(async data => {
          loadingMsg();
          showNotification('success', 'Sucesso!', 'Contato envado!');
          navigation.navigate('Inicio');
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
        <ScrollView>
          <CustomizeText
            style={{
              marginTop: 12,
              marginBottom: 8
            }}
            type="h3"
          >
            {`Preencha o formulário para entrar em contato com a loja: `}
          </CustomizeText>
          <CustomizeText
            style={{
              textAlign: 'center',
              marginBottom: 8
            }}
            strong
          >
            {loja.nome}
          </CustomizeText>
          <Text style={styles.divider}></Text>

          <View
            style={{
              marginBottom: 24
            }}
          >
            <Form ref={formRef} onSubmit={enviaContato}>
              <TextField name="titulo" placeholder="Título" />
              <LongTextField name="descricao" placeholder="Descrição" />

              <CustomizeButton
                yellow
                type="contained"
                onPress={() => formRef.current.submitForm()}
                style={{
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                Enviar mensagem
              </CustomizeButton>
            </Form>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenContainer>
  );
}

const Contato = memo(ContatoComponent);

export default Contato;
