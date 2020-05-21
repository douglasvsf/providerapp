import React, { PureComponent } from 'react';
import { Keyboard, Alert, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default class AdditionalInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
      number: '',
    };
  }

  handleSubmit = () => {
    const { cep } = this.state;
    if (cep.length < 8) {
      Alert.alert('Atenção', 'Digite um CEP válido');
    } else
      cepApi(cep).then(data => {
        this.setState({ cep: data.cep });
        this.setState({ logradouro: data.logradouro });
        this.setState({ complemento: data.complemento });
        this.setState({ bairro: data.bairro });
        this.setState({ localidade: data.localidade });
        this.setState({ uf: data.uf });
        this.setState({ number: '' });
        Keyboard.dismiss();
      });
  };

  handleSubmitNewProvider = () => {
   
    const { onSubmitNewProvider } = this.props;
    onSubmitNewProvider(this.state);
  };

  handleFormSubmit = values => {
    console.warn(this.formRef.current);
  };

  render() {
    const { cep } = this.state;
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

            <FormInput
              value={this.state.logradouro}
              name="logradouro"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Logradouro"
            />

            <FormInput
              name="numero"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Numero"
              value={this.state.number}
              onChangeText={number => this.setState({ number })}
            />

            <FormInput
              value={this.state.bairro}
              name="bairro"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Bairro"
            />

            <FormInput
              value={this.state.complemento}
              name="complemento"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Complemento"
            />

            <FormInput
              value={this.state.localidade}
              name="cidade"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Cidade"
            />

            <FormInput
              value={this.state.uf}
              name="uf"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Estado"
            />

            {isNewProvider ? (
              <SubmitButton
                loading={submitting}
                onPress={() => this.handleSubmitNewProvider()}
              >
                Próximo
              </SubmitButton>
            ) : (
              <SubmitButton>Atualizar Endereço</SubmitButton>
            )}
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
