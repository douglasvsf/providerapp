import React from 'react';
import { View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Background from "../../components/Background";
import { Container, Form, FormInput, Submit,Separator,SubmitButton,Title } from "./styles";

export default function AdditionalInfo() {
  return (
    <Background>
      <Container>
      <Title> Informações Adicionais </Title>
    <TextInputMask
    type={'cpf'}
    value={this.state.cpf}
    onChangeText={text => {
      this.setState({
        cpf: text
      })
    }}
  />
  </Container>
  </Background>
  );
}
