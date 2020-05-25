import React, { PureComponent } from 'react';
import { Keyboard, Alert, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import cepApi from '../../services/cep';
import Background from '../../components/Background';
import api from '../../services/api';
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

  async componentDidMount() {
    const { token, profileid } = this.props;

    console.log(profileid);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api
      .get(`users/10/address`)
      .then(response => {
        console.log('aa', response);
        this.setState({
          cep: response.data.zip_code,
          logradouro: response.data.public_place,
          complemento: response.data.complement,
          bairro: response.data.neighborhood,
          localidade: response.data.city,
          uf: response.data.state,
          number: response.data.number,
        });
      })
      .catch(err => {
        console.log('erromeudeus', err);
      });
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

  async updateAddress() {
    const { token, profileid } = this.props;
    const {
      cep,
      logradouro,
      number,
      bairro,
      localidade,
      uf,
      complemento,
    } = this.state;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api
      .put(`users/${profileid}/address`, {
        zipCode: cep,
        publicPlace: logradouro,
        number,
        neighborhood: bairro,
        city: localidade,
        state: uf,
        complement: complemento,
      })
      .then(response => {
        console.log('aa', response);
        this.setState({
          cep: response.data.zip_code,
          logradouro: response.data.public_place,
          complemento: response.data.complement,
          bairro: response.data.neighborhood,
          localidade: response.data.city,
          uf: response.data.state,
          number: response.data.number,
        });
      })
      .catch(err => {
        console.log('erro', err);
      });
  }

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
              maxLength={9}
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
              onChangeText={complemento => this.setState({ complemento })}
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
              <SubmitButton onPress={() => this.updateAddress()}>
                Atualizar Endereço
              </SubmitButton>
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
