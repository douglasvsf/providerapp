import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  CheckBox,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Bancos from '~/components/Bancos';
import api from '~/services/api';
import { colors } from '~/values/colors';
import Background from '../../components/Background';
import {
  Container,
  ContainerSwitch,
  Form,
  FormInput,
  NewPicker,
  Row,
  Separator,
  TInput,
  Title,
  TitleInto,
  TitleIntoSwitch,
  TitleDigit,
} from './styles';

const KEY_EXTRACTOR = item => item.city;


const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft : '65 %',
  },
  checkbox: {
    alignSelf: 'flex-end',
  },
  label: {
    margin: 8,
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

export default class BankAccount extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
      type: 'cpf',
      placeHolderS: 'cpf',
      selectedBank: '',
      agencia: '',
      agenciaDv: '',
      conta: '',
      contaDv: '',
      accountType: '',
      documentNumber: '',
      legalName: '',
      loading: false,
      agenciaDvEnable : false,
    };
  }

  handleSubmitNewBankAccount = async () => {
    const {
      selectedBank,
      agencia,
      agenciaDv,
      conta,
      contaDv,
      documentNumber,
      legalName,
      accountType,
    } = this.state;

    if (
      !selectedBank ||
      !agencia.length ||
      !agenciaDv.length ||
      !conta.length ||
      !contaDv.length ||
      !documentNumber.length ||
      !legalName.length ||
      !accountType.length
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    this.setState({ loading: true });

    try {
      const payload = {
        bank_code: selectedBank.value,
        agencia,
        agencia_dv: agenciaDv,
        conta,
        conta_dv: contaDv,
        type: accountType,
        document_number: documentNumber.replace(/[^\w\s]|_/g, ''),
        legal_name: legalName,
      };

      await api.post('/gateway/recipient', payload);

      Snackbar.show({
        text: 'Conta bancária cadastrada',
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível cadastrar a conta bancária, verifique os campos e tente novamente'
      );
    } finally {
      this.setState({ loading: false });
    }
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  onSelectBank = bank => {
    this.setState({
      selectedBank: bank,
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


  toggleCheck = value => {
    // onValueChange of the switch this function will be called
    this.setState({ agenciaDvEnable: value });

    // state changes according to switch
    // which will result in re-render the text
  };

  

  render() {
    const {
      selectedBank,
      agencia,
      agenciaDv,
      agenciaDvEnable,
      conta,
      contaDv,
      type,
      documentNumber,
      legalName,
      accountType,
      loading,
    } = this.state;



    return (
      <Background>
        <Container>
          <Title> Conta Bancaria </Title>
          <Form keyboardShouldPersistTaps="handled">
            <TitleInto>Banco

            </TitleInto>
            <View key={selectedBank.value} style={styles.areaAtuacaoItem}>
              <Text style={styles.areaAtuacaoTitle}>
                {selectedBank.value} - {selectedBank.label}
              </Text>
            </View>
            <Separator />
            <Bancos selectedBanco={selectedBank} onSelect={this.onSelectBank} />

            <TitleInto>Agência 
            <TitleDigit>  (Dig Verif não obrigatório )</TitleDigit>
            

            </TitleInto>

            {/* <View style={styles.checkboxContainer}>
                <CheckBox
                  value={agenciaDvEnable}
                  onValueChange={this.toggleCheck}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>teste</Text>
              </View> */}

            <Row>


              
              <FormInput
                style={{ width: '48%', marginRight: '10%' }}
                name="cod_agencia"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Código Agência"
                value={agencia}
                onChangeText={text => this.setState({ agencia: text })}
              />


    

              <FormInput
                style={{ width: '37%' }}
                name="verif_agencia"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Dig Verif"
                value={agenciaDv}
                onChangeText={text => this.setState({ agenciaDv: text })}
              />
            </Row>

            <TitleInto>Conta</TitleInto>

            <Row>
         
              <FormInput
                style={{ width: '48%', marginRight: '10%' }}
                name="cod_conta"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Código Conta"
                value={conta}
                onChangeText={text => this.setState({ conta: text })}
              />

              <FormInput
                style={{ width: '37%' }}
                name="verif_conta"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Dig Verif"
                value={contaDv}
                onChangeText={text => this.setState({ contaDv: text })}
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
                type={type}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={this.state.placeHolderS}
                value={documentNumber}
                onChangeText={text => this.setState({ documentNumber: text })}
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
                  value={legalName}
                  onChangeText={text => this.setState({ legalName: text })}
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
                  value={legalName}
                  onChangeText={text => this.setState({ legalName: text })}
                />

                <Separator />
              </>
            )}

            <ContainerSwitch>
              <TitleIntoSwitch> Tipo da Conta: </TitleIntoSwitch>
              <NewPicker
                selectedValue={accountType}
                style={{
                  height: 50,
                  width: 100,
                }}
                onValueChange={itemValue => {
                  this.setState({ accountType: itemValue });
                }}
              >
                <NewPicker.Item label="Selecione" value="" />
                <NewPicker.Item label="Conta Corrente" value="conta_corrente" />
                <NewPicker.Item
                  label="Conta Corrente Conjunta"
                  value="conta_corrente_conjunta"
                />
                <NewPicker.Item label="Conta Poupança" value="conta_poupanca" />
                <NewPicker.Item
                  label="Conta Poupança Conjunta"
                  value="conta_poupanca_conjunta"
                />
              </NewPicker>
            </ContainerSwitch>

            <Separator />

            <Button
              style={styles.submitNewProviderButton}
              title="Cadastrar"
              onPress={this.handleSubmitNewBankAccount}
            />
            {loading ? (
              <ActivityIndicator
                color="black"
                animating
                size="large"
                style={{ marginTop: 12 }}
              />
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
