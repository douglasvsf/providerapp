import React, { PureComponent } from 'react';
import { Keyboard, Alert, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputD from '../../components/Input-d';
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

class Address extends PureComponent {
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
      isBack: false,
    };
  }

  async componentDidMount() {
    const { token, profileid, isNewProvider } = this.props;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api
      .get(`users/${profileid}/address`)
      .then(response => {
        if (response.data !== null) {
          this.setState({
            cep: response.data.zip_code,
            logradouro: response.data.public_place,
            complemento: response.data.complement,
            bairro: response.data.neighborhood,
            localidade: response.data.city,
            uf: response.data.state,
            number: response.data.number,
          });
        }
        const verifyIsBack = !!(isNewProvider && response.data !== null);
        this.setState({ isBack: verifyIsBack });
      })
      .catch(err => {
        Snackbar.show({
          text: 'Certifique-se que possui conexão com internet',
          duration: Snackbar.LENGTH_LONG,
        });
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

  handleSubmitNewProvider = async () => {
    const { onSubmitNewProvider } = this.props;

    const responseSubmitNew = await onSubmitNewProvider(this.state);
    if (responseSubmitNew === 0) {
      Snackbar.show({
        text: 'Certifique-se que todos campos estão preenchidos',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      this.setState({ isBack: true });
    }
  };

  async updateAddress() {
    const { token, profileid, isNewProvider, navigation } = this.props;
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
        this.setState({
          cep: response.data.zip_code,
          logradouro: response.data.public_place,
          complemento: response.data.complement,
          bairro: response.data.neighborhood,
          localidade: response.data.city,
          uf: response.data.state,
          number: response.data.number,
        });

        const verifyIsBack = !!(isNewProvider && response.data !== null); // if is a newprovider and get sucessfull --> then he is turning back on flow

        if (verifyIsBack) {
          navigation.navigate('ActuationAreaScreen');
        }
      })
      .catch(err => {
        Snackbar.show({
          text: 'Certifique-se que todos campos estão preenchidos',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  render() {
    const { cep, isBack } = this.state;
    const { isNewProvider, submitting } = this.props;

    return (
      <Background>
        <Container>
          <Title>Endereço</Title>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 30 }}
          >
            {/* <InputD              onChangeText={text => this.setState({ cep: text })}
              value={cep}
              name="cep"
              autoCapitalize="none"
              placeholderTextColor= "#FFFFFF"
              autoCorrect={false}
              placeholder="Digite seu CEP"
              keyboardType="numeric"
              maxLength={9}/> */}

            <FormInput
              icon="search"
              style={{
                backgroundColor: '#15162C',
                color: '#FFFFFF',
                placeholderTextColor: '#FFFFFF',
                borderRadius: 20,
              }}
              inputStyle={{
                backgroundColor: '#15162C',
                color: '#FFFFFF',
                placeholderTextColor: '#FFFFFF',
              }}
              onChangeText={text => this.setState({ cep: text })}
              value={cep}
              name="cep"
              autoCapitalize="none"
              placeholderTextColor="#FFFFFF"
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
              onChangeText={logradouro => this.setState({ logradouro })}
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
              onChangeText={bairro => this.setState({ bairro })}
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

            {isNewProvider && !isBack ? ( // esta no fluxo e não voltou
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

Address.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Endereço',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="home" size={20} color={tintColor} />
  ),
};

export default withNavigation(Address);
