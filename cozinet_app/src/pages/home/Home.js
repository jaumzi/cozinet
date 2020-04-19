import React, { useRef, useContext, useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { Form } from "@unform/mobile";
import * as yup from "yup";
import { AppContext } from "../../config/AppContext";
import { ScreenContainer } from "../../components/screen_container/ScreenContainer";
import SafeAreaView from "react-native-safe-area-view";

// import { getBeaconsInit, exitSearchBeacons } from './src/config/Beacon.js';

import styles from "../../assets/stylesheet";
import { ScrollView } from "react-native-gesture-handler";
import { StringPrepare } from "../../util/Methods";
import { SeachTextFied } from "../../components/form/FormInputs";
import CardTypeRecipe from "../../components/card/CardTypeRecipe";

function Home(props) {
  const {
    route: { params },
    navigation,
  } = props;

  useEffect(() => {}, [params]); // 'params' forçar nova renderização ao voltar para pagina

  const formRef = useRef(null);

  const ctx = useContext(AppContext);
  const { showNotification, loadingMsg, api } = ctx;

  const [state, setState] = useState({
    secoes: undefined,
  });
  const {} = state;

  async function handleSubmit_search(data) {
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
      api.post("/usuario/login", data).then(async (data) => {
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
  const tipos = [
    {
      id: 0,
      description: "Sobremesas",
    },
    {
      id: 1,
      description: "Sobremesas 1",
    },
    {
      id: 2,
      description: "Sobremesas 2",
    },
    {
      id: 3,
      description: "Sobremesas 3",
    },
    {
      id: 4,
      description: "Sobremesas 4",
    },
    {
      id: 5,
      description: "Sobremesas 5",
    },
    {
      id: 6,
      description: "Sobremesas 6",
    },
  ];

  return (
    <ScrollView>
      <ScreenContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ marginBottom: 12 }}>
            <Form ref={formRef} onSubmit={handleSubmit_search}>
              <SeachTextFied
                name="search"
                placeholder="Buscar receitas"
                searchOnpress={() => {
                  formRef.current.submitForm();
                }}
              />
            </Form>
          </View>
          <View style={{ marginBottom: 18 }}>
            {tipos.map((tipo) => (
              <CardTypeRecipe key={`tipo-${tipo.id}`} recipe={tipo} onPress={() => {}} />
            ))}
          </View>
        </SafeAreaView>
      </ScreenContainer>
    </ScrollView>
  );
}

export default Home;
