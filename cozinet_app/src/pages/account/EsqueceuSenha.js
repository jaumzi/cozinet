import React, { useRef, useState, useContext } from 'react';
import { AppContext } from 'src/util/AppContext';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer } from 'src/components/screen_container/ScreenContainer';
import styles from 'src/assets/stylesheet';
import { Form } from '@unform/mobile';
import { TextField } from 'src/components/form/FormInputs';
import { CustomizeButton } from 'src/components/form/FormButtons';
import * as yup from 'yup';
import { api } from 'src/util/api';
import { CustomizeText } from 'src/components/form/CustomizeText';

const componentStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

function EsqueceuSenha(props) {
  const ctx = useContext(AppContext);
  const { showNotification, loadingMsg } = ctx;

  const formRef = useRef(null);
  const { navigation } = props;

  async function sumbit(data) {
    console.log(data);

    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        email: yup
          .string()
          .email()
          .required()
      });
      await schema.validate(data, {
        abortEarly: false // sempre fazer validação de todos os campos
      });

      // se chegar ate aqui é válido
      const axios = await api(showNotification, loadingMsg);

      loadingMsg(true);
      axios
        .post('/usuario/forgot_password', data) // trocar para data
        .then(() => {
          loadingMsg();
          showNotification(
            'success',
            'Sucesso!',
            `Pedido de alteração de senha enviado! Verifique a caixa de mensagens do email "${data.email}"!`,
            undefined,
            0
          );
          navigation.navigate('Login');
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <ScreenContainer
      dark
      style={{
        paddingTop: 20
      }}
    >
      <Form ref={formRef} onSubmit={sumbit}>
        <View style={[componentStyles.center]}>
          <CustomizeText strong>
            Digite seu email para receber o link de redefinição de senha!
          </CustomizeText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextField
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 12 }}>
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
            Recuperar Senha
          </CustomizeButton>
        </View>

        {/* <View style={styles.divider} />
        <View style={[componentStyles.center, { marginTop: 12 }]}>
          <CustomizeButton
            type="outlined"
            onPress={() => navigation.navigate('Login')}
          >
            Voltar
          </CustomizeButton>
        </View> */}
      </Form>
    </ScreenContainer>
  );
}

export default EsqueceuSenha;
