import React, { PureComponent } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import Background from '~/components/Background';

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
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  button: {
    width: '100%',
  },
});

export default class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked3: false,
      checked4: false,
      checked6: false,
      visacredit: false,
      visadebit: false,
      mastercredit: false,
      masterdebit: false,
      americancredit: false,
      elocredit: false,
      elodebit: false,
      hipercredit: false,
      modalCreditVisible: false,
      modalDebitVisible: false,
    };
  }

  _handleSubmitNewProvider = () => {
    const { onSubmitNewProvider } = this.props;

    onSubmitNewProvider({});
  };

  _handleCreditBanner = () => {
    const { modalCreditVisible } = this.state;
    this.setState({ modalCreditVisible: !modalCreditVisible });
  };

  _handleDebitBanner = () => {
    const { modalDebitVisible } = this.state;
    this.setState({ modalDebitVisible: !modalDebitVisible });
  };

  _toggleModalCreditVisible = () => {
    const { checked4, modalCreditVisible } = this.state;
    if (checked4 === false) {
      this.setState({ checked4: true });
    }
    this.setState({ modalCreditVisible: !modalCreditVisible });
  };

  _toggleModalDebitVisible = () => {
    const { checked3, modalDebitVisible } = this.state;
    if (checked3 === false) {
      this.setState({ checked3: true });
    }
    this.setState({ modalDebitVisible: !modalDebitVisible });
  };

  _onCheckCredit = () => {
    const { checked4 } = this.state;
    if (checked4 === true) {
      this.setState({ modalCreditVisible: false });
      this.setState({ visacredit: false });
      this.setState({ mastercredit: false });
      this.setState({ americancredit: false });
      this.setState({ elocredit: false });
      this.setState({ hipercredit: false });
    } else {
      this.setState({ modalCreditVisible: true });
    }

    this.setState({ checked4: !checked4 });
  };

  _onCheckDebit = () => {
    const { checked3 } = this.state;
    if (checked3 === true) {
      this.setState({ modalDebitVisible: false });
      this.setState({ modalCreditVisible: false });
      this.setState({ visadebit: false });
      this.setState({ masterdebit: false });
      this.setState({ elodebit: false });
    } else {
      this.setState({ modalDebitVisible: true });
    }

    this.setState({ checked3: !checked3 });
  };

  render() {
    const { isNewProvider } = this.props;

    const {
      checked1,
      checked3,
      checked4,
      checked6,
      visacredit,
      visadebit,
      mastercredit,
      masterdebit,
      americancredit,
      elocredit,
      elodebit,
      hipercredit,
      modalCreditVisible,
      modalDebitVisible,
    } = this.state;

    // const onDismiss = () => {
    //   Keyboard.dismiss();
    //   // setFilteredAreaAtuacao([]);
    //   this.setState({ modalVisible: false });
    // };

    // onDismissCredit = () => {
    //   this.setState({ modalVisible: !this.state.modalVisible });
    // };
    // onDismissDebit = () => {
    //   this.setState({ modalVisible: !this.state.modalVisible });
    // };
    return (
      <Background>
        <Container>
          <Title>Formas De Pagamento</Title>

          <Form>
            <ContainerNormal>
              <CheckBox
                center="true"
                containerStyle={{ width: '95%' }}
                title="Pagamento Pelo Tecne"
                checkedIcon="check-square"
                uncheckedIcon="square"
                checkedColor="green"
                checked={checked6}
                onPress={() => this.setState({ checked6: !checked6 })}
              />
            </ContainerNormal>

            <ContainerCards>
              <CheckBox
                center="true"
                title="Cartão de Crédito (máquina)"
                checkedIcon="check-square"
                uncheckedIcon="square"
                checkedColor="green"
                checked={checked4}
                onPress={this._onCheckCredit}
              />
              <View>
                <EditButton onPress={this._toggleModalCreditVisible}>
                  <Icon
                    name="credit-card"
                    size={32}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                </EditButton>

                <Modal
                  isVisible={modalCreditVisible}
                  style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                  }}
                  onSwipeComplete={this._toggleModalCreditVisible}
                  swipeDirection={['down']}
                >
                  <View style={styles.content}>
                    <Title
                      style={{
                        color: 'black',
                      }}
                    >
                      Selecione as bandeiras(crédito)
                    </Title>
                    <Form>
                      <CheckBox
                        center="true"
                        containerStyle={{ width: '95%' }}
                        title="Visa"
                        checkedIcon="check-square"
                        uncheckedIcon="square"
                        checkedColor="green"
                        checked={visacredit}
                        onPress={() =>
                          this.setState({ visacredit: !visacredit })
                        }
                      />
                      <ContainerCards>
                        <CheckBox
                          center="true"
                          containerStyle={{ width: '95%' }}
                          title="Mastercard"
                          checkedIcon="check-square"
                          uncheckedIcon="square"
                          checkedColor="green"
                          checked={mastercredit}
                          onPress={() =>
                            this.setState({ mastercredit: !mastercredit })
                          }
                        />
                      </ContainerCards>

                      <CheckBox
                        center="true"
                        containerStyle={{ width: '95%' }}
                        title="American Express"
                        checkedIcon="check-square"
                        uncheckedIcon="square"
                        checkedColor="green"
                        checked={americancredit}
                        onPress={() =>
                          this.setState({ americancredit: !americancredit })
                        }
                      />

                      <CheckBox
                        center="true"
                        containerStyle={{ width: '95%' }}
                        title="Elo"
                        checkedIcon="check-square"
                        uncheckedIcon="square"
                        checkedColor="green"
                        checked={elocredit}
                        onPress={() => this.setState({ elocredit: !elocredit })}
                      />

                      <CheckBox
                        center="true"
                        containerStyle={{ width: '95%' }}
                        title="Hipercard"
                        checkedIcon="check-square"
                        uncheckedIcon="square"
                        checkedColor="green"
                        checked={hipercredit}
                        onPress={() =>
                          this.setState({ hipercredit: !hipercredit })
                        }
                      />
                      <SeparatorModal />
                      <Button
                        title="Salvar"
                        onPress={this._handleCreditBanner}
                      />

                      <SeparatorModal />

                      <Button
                        title="Fechar"
                        onPress={this._toggleModalCreditVisible}
                      />
                    </Form>
                  </View>
                </Modal>
              </View>
            </ContainerCards>

            <ContainerCards>
              <CheckBox
                title="Cartão de Débito (máquina)  "
                checkedIcon="check-square"
                uncheckedIcon="square"
                checkedColor="green"
                checked={checked3}
                onPress={this._onCheckDebit}
              />
              <View>
                <EditButton onPress={this._toggleModalDebitVisible}>
                  <Icon
                    name="credit-card"
                    size={32}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                </EditButton>

                <Modal
                  isVisible={modalDebitVisible}
                  style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                  }}
                  onSwipeComplete={this._toggleModalDebitVisible}
                  swipeDirection={['down']}
                >
                  <View style={styles.content}>
                    <Title
                      style={{
                        color: 'black',
                      }}
                    >
                      Selecione as bandeiras(débito)
                    </Title>
                    <Form>
                      <CheckBox
                        center="true"
                        containerStyle={{ width: '95%' }}
                        title="Visa"
                        checkedIcon="check-square"
                        uncheckedIcon="square"
                        checkedColor="green"
                        checked={visadebit}
                        onPress={() => this.setState({ visadebit: !visadebit })}
                      />
                      <ContainerCards>
                        <CheckBox
                          center="true"
                          containerStyle={{ width: '95%' }}
                          title="Mastercard"
                          checkedIcon="check-square"
                          uncheckedIcon="square"
                          checkedColor="green"
                          checked={masterdebit}
                          onPress={() =>
                            this.setState({ masterdebit: !masterdebit })
                          }
                        />
                      </ContainerCards>

                      <CheckBox
                        center="true"
                        containerStyle={{ width: '95%' }}
                        title="Elo"
                        checkedIcon="check-square"
                        uncheckedIcon="square"
                        checkedColor="green"
                        checked={elodebit}
                        onPress={() => this.setState({ elodebit: !elodebit })}
                      />
                      <SeparatorModal />
                      <Button
                        title="Salvar"
                        onPress={this._handleDebitBanner}
                      />
                      <SeparatorModal />
                      <Button
                        title="Fechar"
                        onPress={this._toggleModalDebitVisible}
                      />
                    </Form>
                  </View>
                </Modal>
              </View>
            </ContainerCards>

            <ContainerNormal>
              <CheckBox
                center="true"
                containerStyle={{ width: '95%' }}
                title="Dinheiro"
                checkedIcon="check-square"
                uncheckedIcon="square"
                checkedColor="green"
                checked={checked1}
                onPress={() => this.setState({ checked1: !checked1 })}
              />
            </ContainerNormal>

            <Separator />

            {isNewProvider ? (
              <SubmitButton onPress={this._handleSubmitNewProvider}>
                Próximo
              </SubmitButton>
            ) : (
              <SubmitButton>Atualizar Formas de Pagamento</SubmitButton>
            )}
          </Form>
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
