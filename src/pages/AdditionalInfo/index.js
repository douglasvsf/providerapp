import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';

import {
  Container,
  ContainerFull,
  TInput,
  Separator,
  Title,
  Form,
} from './styles';
import { colors } from '~/values/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    backgroundColor: 'rgba(17,17,17,0.1)',
    borderRadius: 5,
    paddingHorizontal: 5,
    width: '100%',
  },
  textarea: {
    width: '100%',
    color: 'white',
    textAlignVertical: 'top',
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

          <View style={styles.textareaContainer}>
            <TextInput
              multiline
              maxLength={120}
              numberOfLines={6}
              style={styles.textarea}
              placeholderTextColor="#c7c7c7"
            />
          </View>
        </Form>
      </ContainerFull>
    </Background>
  );
}

AdditionalInfo.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Informações Adicionais',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="info" size={20} color={tintColor} />
  ),
};
