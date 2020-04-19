import React from 'react';
import Routes from './src/config/routes/Routes';
import { AppContextProvider } from './src/config/AppContext';
import './src/config/YupConfig';

function App() {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
}
export default App;