import React, { PureComponent, createRef } from 'react';
import { Keyboard, Alert, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Form } from '@unform/mobile';

import cepApi from '../../services/cep';
import Background from '../../components/Background';
import {
  Container,
  FormInput,
  Submit,
  Separator,
  SubmitButton,
  Title,
} from './styles';
import { colors } from '~/values/colors';
import UnformInput from '~/components/UnformField';

export default class AdditionalInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      endereco: {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
      },
      cep: '',
    };

    this.formRef = createRef();
  }

  handleSubmit = () => {
    const { cep } = this.state;
    if (cep.length < 8) {
      Alert.alert('Atenção', 'Digite um CEP válido');
    } else
      cepApi(cep).then(data => {
        this.setState({ endereco: data });
        Keyboard.dismiss();
      });
  };

  handleSubmitNewProvider = () => {
    const { endereco } = this.state;
    const { onSubmitNewProvider } = this.props;
    onSubmitNewProvider(endereco);
  };

  handleFormSubmit = values => {
    console.warn(this.formRef.current);
  };

  render() {
    const { cep, endereco } = this.state;
    const { isNewProvider, submitting } = this.props;

    return (
      <Background>
        <Container>
          <Title>Endereço</Title>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 30 }}
          >
            <FormInput
              onChangeText={text => this.setState({ cep: text })}
              value={cep}
              name="cep"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Digite seu CEP"
              keyboardType="numeric"
              maxLength={8}
            />

            <Submit onPress={this.handleSubmit}>
              <Icon name="search" size={22} color="#FFF" />
            </Submit>

            <Separator />

            <Form ref={this.formRef} onSubmit={this.handleFormSubmit}>
              <UnformInput
                inputComponent={FormInput}
                // value={endereco.logradouro}
                name="logradouro"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Logradouro"
              />

              <UnformInput
                inputComponent={FormInput}
                name="numero"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Numero"
              />

              <UnformInput
                inputComponent={FormInput}
                // value={endereco.bairro}
                name="bairro"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Bairro"
              />

              <UnformInput
                inputComponent={FormInput}
                name="complemento"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Complemento"
              />

              <UnformInput
                inputComponent={FormInput}
                // value={endereco.localidade}
                name="cidade"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Cidade"
              />

              <UnformInput
                inputComponent={FormInput}
                // value={endereco.uf}
                name="uf"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Estado"
              />

              {isNewProvider ? (
                <SubmitButton
                  loading={submitting}
                  onPress={() => this.formRef.current.submitForm()}
                >
                  Próximo
                </SubmitButton>
              ) : (
                <SubmitButton>Atualizar Endereço</SubmitButton>
              )}
            </Form>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

AdditionalInfo.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Endereço',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="home" size={20} color={tintColor} />
  ),
};
