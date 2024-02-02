import { Input, FormControl } from "native-base";
import React from "react";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string //interrogação opcional
  onChangeText?: (text: string) => void;//function
}

export function EntradaTexto ({ 
  label, 
  placeholder, 
  secureTextEntry = false,
  value, 
  onChangeText
} : InputProps) : JSX.Element {
  return (
    <FormControl mt={3}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        placeholder={placeholder}
        size="lg"
        w="100%"
        borderRadius="lg"
        bgColor="gray.100"
        secureTextEntry={secureTextEntry}
        shadow={3}
        value={value}// preparando os inputs para armazenar informações
        onChangeText={onChangeText} //
      />
    </FormControl>
  );
};