import React, { useRef, useContext, useEffect, useState } from "react";
import { AppContext } from "../../config/AppContext";
import { Form } from "@unform/mobile";
import * as yup from "yup";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScreenContainer } from "../../components/screen_container/ScreenContainer";
import { TextField } from "../../components/form/FormInputs";
import { CustomizeButton } from "../..//components/form/FormButtons";
import { CustomizeText } from "../../components/form/CustomizeText";

// import logo from "./src/assets/images/logo.png";
// import { ScrollView } from "react-native-gesture-handler";

const componentStyles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: 'row'
  },
});

function Login(props) {
  const ctx = useContext(AppContext);
  const { api, login, loadingMsg, showNotification } = ctx;

  const formRef = useRef(null);
  const { navigation } = props;

  async function logar(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().min(6).required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      // se chegar ate aqui é válido
      
      loadingMsg(true, "Entrando");
      api.post("/usuario/login", data)
        .then(async (data) => {
          loadingMsg();
          login(data.data); // ja redireciona direto para inicio
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <ScreenContainer light>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Form ref={formRef} onSubmit={logar}>
          <View style={componentStyles.center}>
            <View style={{ marginBottom: 12 }}>
              <CustomizeText primary strong>
                Cozinet - Acesse sua conta
              </CustomizeText>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextField
                name="email"
                label="Email"
                placeholder="Digite seu email"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextField
                name="senha"
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry={true}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <CustomizeButton
                fullWidth
                type="primary"
                onPress={() => {
                  formRef.current.submitForm();
                }}
                style={{
                  marginTop: 12,
                }}
              >
                Entrar
              </CustomizeButton>
            </View>
          </View>
        </Form>
      </View>
    </ScreenContainer>
  );
}


export default Login;
