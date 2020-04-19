import axios from 'axios';
import { STORAGE_USER } from '../util/Constants';
import { getItemInStorage } from './Storage';

const instance = axios.create({
  baseURL: 'http://192.168.42.225:5000'
});

const tratarErro = (respostaDeErro, errorDescription, showNotification, loadingMsg) => {
  // alert(respostaDeErro);
  if (axios.isCancel(respostaDeErro)) {
    // eslint-disable-next-line no-console
    console.warn('Requisição AJAX cancelada: ', respostaDeErro);
    showNotification('error', 'Erro!', respostaDeErro, undefined, 4000);
    loadingMsg();
  } else {
    // eslint-disable-next-line no-console
    console.log('Erro na requisição ajax: ', errorDescription);
    // showNotification('error', 'Erro', respostaDeErro, {
    //   name: 'Ok',
    //   action: () => {
    //     console.log('Uma ação uhuu');
    //   }
    // });
    showNotification(
      'error',
      'Erro!',
      errorDescription || 'Consulte o console para mais detalhes',
      undefined,
      0
    );
    loadingMsg();
  }
};

export const axiosConfig = async (showNotification, loadingMsg) => {
  const credentials = await getItemInStorage(STORAGE_USER);

  instance.defaults.headers = {
    User: credentials ? credentials : ''
  };
  // Add a response interceptor
  instance.interceptors.response.use(
    response =>
      // console.log(response);
      response,
    error => {
      const promessaRejeitada = Promise.reject(error);
      const { config } = error; // pega config do axios
      if (!config.disableDefaultCatch) {
        // verifica se desabilitou o catch padrão
        const erroDescription = error.response.data.error; // pega erro
        const catchTratament = props =>
          tratarErro(props, erroDescription, showNotification, loadingMsg);
        // adiciona erro aos parametro de tratamento
        promessaRejeitada.catch(catchTratament);
      }
      return promessaRejeitada;
    }
  );
  return instance;
};
