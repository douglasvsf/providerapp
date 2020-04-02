import React, { useRef, useState, useEffect, Fragment } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, Alert, AlertButton, View, TextInput, StyleSheet, Text, SafeAreaView } from "react-native";
import { TextInputMask } from 'react-native-masked-text'
import { Input } from 'react-native-elements';
import Background from "../../components/Background";
import Textarea from 'react-native-textarea';

import { Container, ContainerFull, TInput, Submit, Separator, SubmitButton, Title, Form, ContainerText } from "./styles";

export default function AdditionalInfo() {


  const [type, setType] = useState('cpf');

  const [cpf, setCpf] = useState('');




  return (
    <Background>
      <ContainerFull>
        <Title> Informações Adicionais </Title>

        <Form>
          <Container >
            <Icon name="lock-outline" size={20} color="rgba(255, 255, 255, 0.6)" />
            <TInput type={type}
              autoCorrect={false}
              value={cpf}
              autoCapitalize="none"
              placeholder="CNPJ/CPF"
              onChangeText={setCpf}
            />
          </Container>
          <Separator />

          <View style={styles.container}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              maxLength={120}
              placeholder={'Breve Descrição'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
          </View>

        </Form>


      </ContainerFull>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 332,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#111',
    opacity: 0.1,
    borderRadius: 5,
    width: 332,
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    width: 332,

  },
});

AdditionalInfo.navigationOptions = {
  tabBarLabel: 'Informações Adicionais',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="info" size={20} color={tintColor} />
  ),
};
