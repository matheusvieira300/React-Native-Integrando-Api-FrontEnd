import { NativeBaseProvider, StatusBar } from 'native-base';

import { TEMAS } from './src/estilos/temas';
import Rotas from './src/Rotas';
import React, { useEffect } from 'react';
import api from './src/servicos/api';

export default function App() {

  // useEffect(() => {
  //   async function pegarDados(){
  //     const resultado = await api.get('/paciente')//salvando os dados dentro de uma constante 
  //     console.log(resultado.data) //onde contem as informações
  //   }
  //   pegarDados()//chamando o método
  // },[])

  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.blue[800]} />
      <Rotas />
    </NativeBaseProvider>
  );
}
