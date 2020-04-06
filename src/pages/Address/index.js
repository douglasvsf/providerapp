import React, { PureComponent } from 'react';
import { Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import cepApi from '../../services/cep';
import Details from '../../components/details';
import Background from '../../components/Background';
import {
  Container,
  Form,
  FormInput,
  Submit,
  Separator,
  SubmitButton,
  Title,
} from './styles';
import { colors } from '~/values/colors';

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
  }

  render() {
    const { cep, endereco } = this.state;
    return (
      <Background>
        <Container>
          <Title>Endereço</Title>
          <Form>
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
            {endereco.cep === '' ? (
              <Details {...this.state} />
            ) : (
              <Details {...this.state} />
            )}

            <SubmitButton>Atualizar Endereço</SubmitButton>
          </Form>
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
