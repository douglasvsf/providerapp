import React, { PureComponent } from 'react';

import {
  Keyboard,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableNativeFeedback,
  Alert,
  Button,
  Switch,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-community/async-storage';
import { estados } from '../../jsons/estados-cidades.json';
import SelectEstados from '../../components/Estados';
import SelectCidades from '../../components/Cidades';
import Background from '../../components/Background';

import {
  Container,
  Form,
  Separator,
  Title,
  TitleInto,
  Row,
  FormInput,
  ContainerSwitch,
  TitleIntoSwitch,
  TInput,
  NewPicker,
} from './styles';
import { colors } from '~/values/colors';
import AreaAtuacao from '~/components/Bancos';

const KEY_EXTRACTOR = item => item.city;

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 8,
  },
  input: { maxHeight: 40 },
  inputContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cityItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: 8,
  },
  plus: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  flatList: {
    marginVertical: 8,
  },
  addCityButton: {
    marginTop: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
  },
  areaAtuacaoTitle: {
    flex: 1,
  },
  areaAtuacaoItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    padding: 8,
    marginTop: 6,
  },
  submitNewProviderButton: {
    marginTop: 20,
  },
});

const WORK_CITY_LIMIT = 3;

export default class BankAccount extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      actuations: [],
      selectedAreaAtuacao: [],
      switchValue: false,
      type: 'cpf',
      placeHolderS: 'cpf',
      fullname: '',
      companyname: '',
      accountType: '',
    };
  }

  async componentDidMount() {
    const actuations = await AsyncStorage.getItem('actuations');

    if (actuations) {
      this.setState({ actuations: JSON.parse(actuations) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { actuations } = this.state;

    if (prevState.actuations !== actuations) {
      AsyncStorage.setItem('actuations', JSON.stringify(actuations));
    }
  }

  handleSubmitNewProvider = () => {
    const { onSubmitNewProvider } = this.props;
    const { selectedAreaAtuacao } = this.state;

    onSubmitNewProvider({ selectedAreaAtuacao });
  };

  handleSelectItem = (item, index) => {
    const { actuations } = this.state;

    // const response = await api.get(`/users/${newUser}`);

    const data = {
      item,
      index,
    };

    this.setState({
      actuations: [...actuations, data],
    });

    Keyboard.dismiss();
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  onSelectAreaAtuacao = areaAtuacao => {
    // const { selectedAreaAtuacao } = this.state;

    // Request pro back aqui
    this.setState({
      selectedAreaAtuacao: [areaAtuacao],
    });
  };

  toggleSwitch = value => {
    // onValueChange of the switch this function will be called
    this.setState({ switchValue: value });

    if (!this.state.switchValue === true) {
      this.setState({ type: 'cnpj' });
      this.setState({ placeHolderS: 'CNPJ' });
    } else {
      this.setState({ type: 'cpf' });
      this.setState({ placeHolderS: 'CPF' });
    }
    // state changes according to switch
    // which will result in re-render the text
  };

  //  toggleSwitch = () => {
  //   setIsEnabled(previousState => !previousState);
  //   if (!isEnabled === true) {
  //     setType('cnpj');
  //     setPlaceholder('CNPJ');
  //   } else {
  //     setType('cpf');
  //     setPlaceholder('CPF');
  //   }
  // };

  removeAreaAtuacao = index => {
    const { selectedAreaAtuacao } = this.state;
    const newSelectedAreasAtuacao = [...selectedAreaAtuacao];
    newSelectedAreasAtuacao.splice(index, 1);
    this.setState({ selectedAreaAtuacao: newSelectedAreasAtuacao });
  };

  renderAreaAtuacao = (areaAtuacao, index) => {
    return (
      <View key={areaAtuacao.value} style={styles.areaAtuacaoItem}>
        <Text style={styles.areaAtuacaoTitle}>
          {areaAtuacao.value} - {areaAtuacao.label}
        </Text>
        {/* <TouchableNativeFeedback
          onPress={() =>
            Alert.alert(
              'Remover área de atuação',
              'Você tem certeza que deseja remover esta área de atuação?',
              [
                {
                  text: 'Não',
                },
                {
                  text: 'Sim',
                  onPress: () => this.removeAreaAtuacao(index),
                },
              ]
            )
          }
        >
          <Icon name="delete-outline" size={28} color="red" />
        </TouchableNativeFeedback> */}
      </View>
    );
  };

  render() {
    const { selectedAreaAtuacao } = this.state;

    const { isNewProvider } = this.props;

    return (
      <Background>
        <Container>
          <Title> Conta Bancaria </Title>
          <Form keyboardShouldPersistTaps="handled">
            <TitleInto>Banco </TitleInto>
            {selectedAreaAtuacao.map(this.renderAreaAtuacao)}
            <Separator />
            <AreaAtuacao
              selectedAreaAtuacao={selectedAreaAtuacao}
              onSelect={this.onSelectAreaAtuacao}
            />

            <TitleInto>Agência </TitleInto>

            <Row>
              <FormInput
                style={{ width: '48%', marginRight: '10%' }}
                name="cod_agencia"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Código Agência"
              />

              <FormInput
                style={{ width: '37%' }}
                name="verif_agencia"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Dig Verif"
              />
            </Row>

            <TitleInto>Conta </TitleInto>
            <Row>
              <FormInput
                style={{ width: '48%', marginRight: '10%' }}
                name="cod_conta"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Código Conta"
              />

              <FormInput
                style={{ width: '37%' }}
                name="verif_conta"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Dig Verif"
              />
            </Row>

            <ContainerSwitch>
              <TitleIntoSwitch> Pessoa Jurídica </TitleIntoSwitch>

              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={this.state.switchValue ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch}
                value={this.state.switchValue}
              />
            </ContainerSwitch>
            <Separator />

            <ContainerSwitch>
              <Icon
                name="lock-outline"
                size={20}
                color="rgba(255, 255, 255, 0.6)"
              />

              <TInput
                type={this.state.type}
                autoCorrect={false}
                value={this.state.cpf}
                autoCapitalize="none"
                placeholder={this.state.placeHolderS}
                onChangeText={cpf => this.setState({ cpf })}
              />
            </ContainerSwitch>
            <Separator />
            {this.state.switchValue === true ? (
              <>
                <FormInput
                  icon="person-outline"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Razão Social"
                  value={this.state.companyname}
                  onChangeText={companyname => this.setState({ companyname })}
                />

                <Separator />
              </>
            ) : (
              <>
                <FormInput
                  icon="person-outline"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Nome Completo"
                  value={this.state.fullname}
                  onChangeText={fullname => this.setState({ fullname })}
                />

                <Separator />

              </>
            )}

            <ContainerSwitch>
              <TitleIntoSwitch> Tipo da Conta: </TitleIntoSwitch>
              <NewPicker
                selectedValue={this.state.accountType}
                style={{
                  height: 50,
                  width: 100,
                }}
                onValueChange={itemValue => {
                  this.setState({ accountType: itemValue });
                }}
              >
                <NewPicker.Item label="Selecione" value="" />
                <NewPicker.Item label="Conta Corrente" value="CC" />
                <NewPicker.Item label="Conta Corrente Conjunta" value="CCC" />
                <NewPicker.Item label="Conta Poupança" value="CP" />
                <NewPicker.Item label="Conta Poupança Conjunta" value="CPC" />
              </NewPicker>
            </ContainerSwitch>

            {isNewProvider ? (
              <>
                <Separator />

                <Button
                  style={styles.submitNewProviderButton}
                  title="Próximo"
                  onPress={this.handleSubmitNewProvider}
                />
              </>
            ) : null}
          </Form>
        </Container>
      </Background>
    );
  }
}

BankAccount.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Conta Bancaria',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="worker" size={20} color={tintColor} />
  ),
};
