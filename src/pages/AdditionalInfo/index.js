import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';
import Textarea from 'react-native-textarea';
import Background from '../../components/Background';

import {
  Container,
  ContainerFull,
  TInput,
  Separator,
  Title,
  Form,
} from './styles';

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
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    width: 332,
  },
});

export default function AdditionalInfo() {
  const [type, setType] = useState('cpf');

  const [cpf, setCpf] = useState('');

  return (
    <Background>
      <ContainerFull>
        <Title> Informações Adicionais </Title>

        <Form>
          <Container>
            <Icon
              name="lock-outline"
              size={20}
              color="rgba(255, 255, 255, 0.6)"
            />
            <TInput
              type={type}
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
              placeholder="Breve Descrição"
              placeholderTextColor="#c7c7c7"
              underlineColorAndroid="transparent"
            />
          </View>
        </Form>
      </ContainerFull>
    </Background>
  );
}

AdditionalInfo.navigationOptions = {
  tabBarLabel: 'Informações Adicionais',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="info" size={20} color={tintColor} />
  ),
};
