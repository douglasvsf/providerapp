/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { StyleSheet, View, Button, CheckBox } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '~/components/Background';
import CardBrands from '~/components/CardBrands';
import api from '../../services/api';
import {
  Container,
  Title,
  Separator,
  Form,
  SubmitButton,
  ContainerCards,
  ContainerNormal,
  EditButton,
  SeparatorModal,
  Header,
  TitleMethods,
  CategoriesList,
  Item,
  ItemImage,
  VerticalSeparator,
  ItemTitle,
} from './styles';
import { colors } from '~/values/colors';

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 22,
    paddingBottom: 22,
    flex: 1,
    maxHeight: 500,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  buttonPress: {
    borderColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  buttonUnPress: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  button: {
    width: '100%',
  },
});

class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onlinepayment: false,
      cashpayment: false,
      visacredit: false,
      visadebit: false,
      mastercredit: false,
      masterdebit: false,
      americancredit: false,
      elocredit: false,
      elodebit: false,
      hipercredit: false,
      isBack: false,
      debitBanner: [],
      creditBanner: [],
      paymentId: '',
    };
  }

  async componentDidMount() {
    const { token, profileid, isNewProvider } = this.props;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api
      .get(`providers/${profileid}/payment_methods`)
      .then(response => {
        if (response.data !== null) {
          this.setState({
            onlinepayment: response.data.online_payment,
            cashpayment: response.data.cash,
            paymentId: response.data.id,
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

    await api
      .get(`providers/${profileid}/allowed_card_banners`)
      .then(response => {
        if (response.data !== null) {
          this.setState({
            visacredit: response.data.allowedCreditBanners.visa,
            mastercredit: response.data.allowedCreditBanners.mastercard,
            americancredit: response.data.allowedCreditBanners.american_express,
            hipercredit: response.data.allowedCreditBanners.hipercard,
            elocredit: response.data.allowedCreditBanners.elo,
            visadebit: response.data.allowedDebitBanners.visa,
            masterdebit: response.data.allowedDebitBanners.mastercard,
            elodebit: response.data.allowedDebitBanners.elo,
          });
        }
      })
      .catch(err => {
        Snackbar.show({
          text: 'Certifique-se que possui conexão com internet',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  handleSubmitNewProvider = async () => {
    const { onSubmitNewProvider } = this.props;

    // onSubmitNewProvider(this.state);
    // this.setState({ isBack: true });

    const responseSubmitNew = await onSubmitNewProvider(this.state);
    if (responseSubmitNew === 0) {
      Snackbar.show({
        text: 'Certifique-se que possui pelo menos um método de pagamento',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      this.setState({ isBack: true });
    }
  };

  async updatePaymenthMethods() {
    const { token, profileid, isNewProvider, navigation } = this.props;
    const {
      onlinepayment,
      cashpayment,
      visacredit,
      visadebit,
      mastercredit,
      masterdebit,
      americancredit,
      elocredit,
      elodebit,
      hipercredit,
      isBack,
      debitBanner,
      creditBanner,
      paymentId,
    } = this.state;

    const allowedDebitBanner = Array.from(debitBanner);
    const allowedCreditBanner = Array.from(creditBanner);

    const machinecredit = !!(
      visacredit === true ||
      mastercredit === true ||
      americancredit === true ||
      hipercredit === true ||
      elocredit === true
    );
    const machinedebit = !!(
      visadebit === true ||
      masterdebit === true ||
      elodebit === true
    );

    // console.log(selectedCities.city);
    // console.log(selectedCities.uf.nome);

    allowedCreditBanner.push({
      visa: visacredit,
      americanExpress: americancredit,
      elo: elocredit,
      mastercard: mastercredit,
      hipercard: hipercredit,
    });

    allowedDebitBanner.push({
      visa: visadebit,
      mastercard: masterdebit,
      elo: elodebit,
    });

    const resultAllowedCreditBanner = allowedCreditBanner.find(obj => {
      return obj;
    });
    const resultAllowedDebitBanner = allowedDebitBanner.find(obj => {
      return obj;
    });
    try {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const responseBanner = await api
        .put(`providers/${profileid}/allowed_card_banners`, {
          credit: resultAllowedCreditBanner,
          debit: resultAllowedDebitBanner,
        })
        .then(responseBanner => {
          this.setState({
            visacredit: responseBanner.data.allowedCreditBanners.visa,
            mastercredit: responseBanner.data.allowedCreditBanners.mastercard,
            americancredit:
              responseBanner.data.allowedCreditBanners.american_express,
            hipercredit: responseBanner.data.allowedCreditBanners.hipercard,
            elocredit: responseBanner.data.allowedCreditBanners.elo,
            visadebit: responseBanner.data.allowedDebitBanners.visa,
            masterdebit: responseBanner.data.allowedDebitBanners.mastercard,
            elodebit: responseBanner.data.allowedDebitBanners.elo,
          });
        });

      await api
        .get(`providers/${profileid}/payment_methods`)
        .then(async Newresponse => {
          if (Newresponse.data !== null) {
            const response = await api
              .put(
                `providers/${profileid}/payment_methods/${Newresponse.data.id}`,
                {
                  cash: cashpayment,
                  machineCredit: machinecredit,
                  machineDebit: machinedebit,
                  onlinePayment: onlinepayment,
                }
              )
              .then(response => {
                this.setState({
                  onlinepayment: response.data.online_payment,
                  cashpayment: response.data.cash,
                  paymentId: response.data.id,
                });

                const verifyIsBack = !!(
                  isNewProvider && response.data !== null
                );
                if (verifyIsBack) {
                  navigation.navigate('AditionalInfoScreen');
                }

                const NewverifyIsBack = !!(
                  isNewProvider && response.data !== null
                );
                this.setState({ isBack: NewverifyIsBack });
                // const verifyIsBack = !!(isNewProvider && response.data !== null); // if is a newprovider and get sucessfull --> then he is turning back on flow
              });
          }
        });
    } catch (ex) {
      Snackbar.show({
        text: 'Certifique-se que possui pelo menos um método de pagamento',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  render() {
    const { isNewProvider } = this.props;

    const {
      onlinepayment,
      cashpayment,
      visacredit,
      visadebit,
      mastercredit,
      masterdebit,
      americancredit,
      elocredit,
      elodebit,
      hipercredit,
      isBack,
    } = this.state;

    const AMERICAN_EXPRESS = 'AMERICAN_EXPRESS';
    const ELO = 'ELO';
    const HIPERCARD = 'HIPERCARD';
    const MASTERCARD = 'MASTERCARD';
    const VISA = 'VISA';
    const ONLINE_PAYMENT = 'ONLINE_PAYMENT';
    const CASH_PAYMENT = 'CASH_PAYMENT';

    return (
      <Background>
        <Container>
          <Title>Formas De Pagamento Aceitas</Title>

          <Header>
            <TitleMethods>Padrões</TitleMethods>
          </Header>

          <View
            style={{
              height: 110,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 12,
              marginBottom: 15,
            }}
          >
            <CategoriesList horizontal>
              <Item
                key="1"
                onPress={() => this.setState({ onlinepayment: !onlinepayment })}
                style={
                  this.state.onlinepayment
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`ONLINE_PAYMENT_${onlinepayment}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={onlinepayment}
                    onValueChange={() =>
                      this.setState({ onlinepayment: !onlinepayment })
                    }
                  />
                  <ItemTitle>Tecne App</ItemTitle>
                </View>
              </Item>
              <Item
                key="2"
                onPress={() => this.setState({ cashpayment: !cashpayment })}
                style={
                  this.state.cashpayment
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`CASH_PAYMENT_${cashpayment}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={cashpayment}
                    onValueChange={() =>
                      this.setState({ cashpayment: !cashpayment })
                    }
                  />
                  <ItemTitle>Dinheiro</ItemTitle>
                </View>
              </Item>
            </CategoriesList>
          </View>
          <Header>
            <TitleMethods>Máquina Cartão de Crédito</TitleMethods>
          </Header>
          <View
            style={{
              height: 110,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 12,
              marginBottom: 15,
            }}
          >
            <CategoriesList horizontal>
              <Item
                key="3"
                onPress={() =>
                  this.setState({ americancredit: !americancredit })
                }
                style={
                  this.state.americancredit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`AMERICAN_EXPRESS_${americancredit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={americancredit}
                    onValueChange={() =>
                      this.setState({ americancredit: !americancredit })
                    }
                  />
                  <ItemTitle>American Express</ItemTitle>
                </View>
              </Item>

              <Item
                key="4"
                onPress={() => this.setState({ elocredit: !elocredit })}
                style={
                  this.state.elocredit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`ELO_${elocredit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={elocredit}
                    onValueChange={() =>
                      this.setState({ elocredit: !elocredit })
                    }
                  />
                  <ItemTitle>Elo</ItemTitle>
                </View>
              </Item>

              <Item
                key="5"
                onPress={() => this.setState({ hipercredit: !hipercredit })}
                style={
                  this.state.hipercredit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`HIPERCARD_${hipercredit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={hipercredit}
                    onValueChange={() =>
                      this.setState({ hipercredit: !hipercredit })
                    }
                  />
                  <ItemTitle>HiperCard</ItemTitle>
                </View>
              </Item>

              <Item
                key="6"
                onPress={() => this.setState({ mastercredit: !mastercredit })}
                style={
                  this.state.mastercredit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`MASTERCARD_${mastercredit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={mastercredit}
                    onValueChange={() =>
                      this.setState({ mastercredit: !mastercredit })
                    }
                  />
                  <ItemTitle>Mastercard</ItemTitle>
                </View>
              </Item>

              <Item
                key="7"
                onPress={() => this.setState({ visacredit: !visacredit })}
                style={
                  this.state.visacredit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`VISA_${visacredit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={visacredit}
                    onValueChange={() =>
                      this.setState({ visacredit: !visacredit })
                    }
                  />
                  <ItemTitle>Visa</ItemTitle>
                </View>
              </Item>
            </CategoriesList>
          </View>

          <Header>
            <TitleMethods>Máquina Cartão de Débito</TitleMethods>
          </Header>
          <View
            style={{
              height: 110,
              marginRight: 20,
              marginLeft: 20,
              marginTop: 12,
              marginBottom: 15,
            }}
          >
            <CategoriesList horizontal>
              <Item
                key="8"
                onPress={() => this.setState({ visadebit: !visadebit })}
                style={
                  this.state.visadebit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`VISA_${visadebit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={visadebit}
                    onValueChange={() =>
                      this.setState({ visadebit: !visadebit })
                    }
                  />
                  <ItemTitle>Visa</ItemTitle>
                </View>
              </Item>

              <Item
                key="9"
                onPress={() => this.setState({ masterdebit: !masterdebit })}
                style={
                  this.state.masterdebit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`MASTERCARD_${masterdebit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={masterdebit}
                    onValueChange={() =>
                      this.setState({ masterdebit: !masterdebit })
                    }
                  />
                  <ItemTitle>Mastercard</ItemTitle>
                </View>
              </Item>

              <Item
                key="10"
                onPress={() => this.setState({ elodebit: !elodebit })}
                style={
                  this.state.elodebit
                    ? styles.buttonUnPress
                    : styles.buttonPress
                }
              >
                <CardBrands
                  brand={`ELO_${elodebit}`}
                  width={100}
                  height={50}
                  marginTop={5}
                />

                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    style={{
                      marginTop: 5,
                    }}
                    value={elodebit}
                    onValueChange={() => this.setState({ elodebit: !elodebit })}
                  />
                  <ItemTitle>Elo</ItemTitle>
                </View>
              </Item>
            </CategoriesList>
          </View>

          {isNewProvider && !isBack ? (
            <SubmitButton onPress={() => this.handleSubmitNewProvider()}>
              Próximo
            </SubmitButton>
          ) : (
            <SubmitButton onPress={() => this.updatePaymenthMethods()}>
              Atualizar Formas de Pagamento
            </SubmitButton>
          )}
        </Container>
      </Background>
    );
  }
}

Payment.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Informações de Pagamento',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="cash-multiple" size={20} color={tintColor} />
  ),
};

export default withNavigation(Payment);
