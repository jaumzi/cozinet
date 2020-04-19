import React, { useState, createContext } from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { STORAGE_USER } from "../util/Constants";
import { setItemInStorage, getItemInStorage } from "./Storage";
import Loading from "../components/modal/Loading";
// import { logout as appLogout } from './src/config/storage';
// import Toast from './src/components/toast/Toast';
import { axiosConfig } from "./ApiConfig";
// import { LoadingBlockScreen } from './src/layout/LoadingBlockScreen';

const componentStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#0004",
  },
  box: {
    margin: 20,
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  textLoading: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
});

export const AppContext = createContext({
  loading: false,
  aplicationInit: false,
  user: undefined,
  notification: false,
  loadingMsg: () => {},
  verifyLogin: async () => {},
  login: () => {},
  logout: () => {},
  showNotification: () => {},
  api: () => {},
});

export function AppContextProvider(props) {
  const { children } = props;
  const [state, setState] = useState({
    loading: false,
    text: "Carregando",
    user: undefined,
    aplicationInit: false,
    notification: undefined,
  });
  const { loading, text, notification } = state;

  const loadingMsg = (show = false, text = "Carregando") => {
    setState((prev) => {
      return {
        ...prev,
        loading: show,
        text,
      };
    });
  };
  const verifyLogin = async () => {
    const credentials = await getItemInStorage(STORAGE_USER);

    if (credentials) {
      const axios = await api();
      setState((prev) => {
        return {
          ...prev,
          aplicationInit: false,
        };
      });
      axios
        .post("/usuario/login_validate")
        .then(({ data }) => {
          console.log(data);
          setState((prev) => {
            return {
              ...prev,
              aplicationInit: true,
              user: data,
            };
          });
        })
        .catch(
          ({
            response: {
              data: { error },
            },
          }) => {
            setState((prev) => {
              return {
                ...prev,
                aplicationInit: true,
                user: undefined,
              };
            });
          }
        );
    } else {
      setState((prev) => {
        return {
          ...prev,
          aplicationInit: true,
          user: undefined,
        };
      });
    }
  };

  const login = (u) => {
    setItemInStorage(STORAGE_USER, u);
    setState((prev) => {
      return {
        ...prev,
        user: u,
      };
    });
  };
  const logout = () => {
    appLogout();
    setState((prev) => {
      return {
        ...prev,
        user: undefined,
      };
    });
  };

  const showNotification = (
    type = "info",
    title,
    msg = "",
    action = undefined,
    showTime = 2500
  ) => {
    setState((prev) => {
      return {
        ...prev,
        notification: {
          type,
          msg,
          action,
          title,
        },
      };
    });
    if (showTime > 0) {
      setTimeout(() => {
        closeNotification();
      }, showTime);
    }
  };
  const closeNotification = () => {
    setState((prev) => {
      return {
        ...prev,
        notification: undefined,
      };
    });
  };

  const api = async () => {
    return await axiosConfig(showNotification, loadingMsg);
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        loadingMsg,
        verifyLogin,
        login,
        logout,
        showNotification,
        api
      }}
    >
      <Loading open={loading} text={text} />
      {/* 
      <Toast notification={notification} close={closeNotification} /> */}
      {children}
    </AppContext.Provider>
  );
}
