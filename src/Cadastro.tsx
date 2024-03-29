import { VStack, Image, Text, Box, Link, Checkbox, ScrollView } from 'native-base'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Logo from './assets/Logo.png'
import { Botao } from './componentes/Botao';
import { EntradaTexto } from './componentes/EntradaTexto';
import { Titulo } from './componentes/Titulo';
import { secoes } from './utils/CadastroEntradaTexto';
import React from 'react';

export default function Cadastro() {
  const [numSecao, setNumSecao] = useState(0);
  const [dados, setDados] = useState({} as any);//definindo que ele é um objeto e qualquer coisa pode ser armazenada dentro dele
  const [planos, setPlanos] = useState([] as number [])//informando ao typescript que é um veetor de números
  
  

  function avancarSecao(){
    if(numSecao < secoes.length - 1){
      setNumSecao(numSecao+1)
    } else {
      console.log(dados)
    }
  }

  function voltarSecao(){
    if(numSecao > 0){
      setNumSecao(numSecao - 1)
    }
  }

  function atualizarDados(id: string, valor: string){
    setDados({...dados,[id]: valor})//...dados copie tudo que está dentro de dados
    //...dados para não ter que criar vários inputs,EX: email,nome,idade, etc.
    //[id]: valor armazenando o novo valor que está sendo digitado
  }

  return (
    <ScrollView flex={1} p={5}>
      <Image source={Logo} alt="Logo Voll" alignSelf="center" />

      <Titulo>
        {secoes[numSecao].titulo}
      </Titulo>
      <Box>
        {
          secoes[numSecao]?.entradaTexto?.map(entrada => {
            return (
            <EntradaTexto 
              label={entrada.label} 
              placeholder={entrada.placeholder} 
              key={entrada.id} 
              secureTextEntry={entrada.secureTextEntry}
              value={dados [entrada.name]}
              onChangeText={(text) => atualizarDados(entrada.name, text)} 
              />)
          })
        }
      </Box>
      <Box>
{/* para poder aparecer na seção 2 o texto selecione o plano */}
       { numSecao == 2 && <Text color="blue.800" fontWeight="bold" fontSize="md" mt="2" mb={2}> 
          Selecione o plano:
        </Text>}
        {
          secoes[numSecao].checkbox.map(checkbox => {
            return (
            <Checkbox 
            key={checkbox.id} 
            value={checkbox.value}
            onChange={() => {
              setPlanos((planosAnteriores) => {
                if(planosAnteriores.includes(checkbox.id)){
                  return planosAnteriores.filter((id) => id !== checkbox.id)
                }
              })
            }}  
            >
              {checkbox.value}
            </Checkbox>)
          })
        }
      </Box>
      {numSecao > 0 && <Botao onPress={() => voltarSecao()} bgColor="gray.400">Voltar</Botao>}
      <Botao onPress={() => avancarSecao()} mt={4} mb={20}>Avançar</Botao>
    </ScrollView>
  );
}