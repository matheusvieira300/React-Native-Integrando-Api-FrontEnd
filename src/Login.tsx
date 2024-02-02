import { VStack, Image, Text, Box, Link, useToast } from 'native-base'
import { TouchableOpacity } from 'react-native';
import Logo from './assets/Logo.png'
import { Botao } from './componentes/Botao';
import { EntradaTexto } from './componentes/EntradaTexto';
import { Titulo } from './componentes/Titulo';
import React, { useEffect, useState } from 'react';
import { fazerLogin } from './servicos/AutenticacaoServico';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default function Login({ navigation }: any) {
  const [email,setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(true);//usado para corrigir o carregamento de login do Async
  const toast = useToast()

  useEffect(() =>{ //hook executado toda vez que a tela é carregada
    async function verificarLogin() {
      const token = await AsyncStorage.getItem('token');//verificar se possui o Token no "cache do aplicativo"
      if(token){ //se existir um token
        navigation.replace('Tabs')
      }
      setCarregando(false)
    } 
    verificarLogin()
  },[])

  async function login(){
    const resultado = await fazerLogin(email,senha)
    if(resultado){
      const {token} = resultado;
      AsyncStorage.setItem('token', token) //armazenando o token dentro do Async storage
      const tokenDecodificado = jwtDecode(token) as any//fazendo a operação de decode primeiro para dps capturar o id
      const pacienteId = tokenDecodificado.id// id do paciente
      AsyncStorage.setItem('pacienteId', pacienteId);

      // navigation.navigate deixaria a tela de Login para trás
      navigation.replace('Tabs') //replace abandona a tela anterior ele 
    } else {
      toast.show({ //toast pra apresentar o erro num card
        title: "Erro no Login",
        description: "O email ou senha não conferem",
        backgroundColor: "red.500"
      })
    }
  }

  if(carregando){ //a tela vai ficar vazia sem informação nenhuma, assim ele não vai exibir a tela de login
    //para não dar aquela transição estranha
    return null;
  }

  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
      <Image source={Logo} alt="Logo Voll" />

      <Titulo>
        Faça login em sua conta
      </Titulo>
      <Box>
        <EntradaTexto
          label="Email"
          placeholder="Insira seu endereço de e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <EntradaTexto
          label="Senha"
          placeholder="Insira sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </Box>
      <Botao onPress={login}>Entrar</Botao>

      <Link href='https://www.alura.com.br' mt={2}>
        Esqueceu sua senha?
      </Link>

      <Box w="100%" flexDirection="row" justifyContent="center" mt={8}>
        <Text>Ainda não tem cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text color="blue.500">
            Faça seu cadastro!
          </Text>
        </TouchableOpacity>
      </Box>
    </VStack>
  );
}