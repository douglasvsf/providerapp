import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import Background from '~/components/Background';

import { Container, Title, Separator, Form, SubmitButton } from './styles';
import { colors } from '~/values/colors';

export default class Payment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
    };
  }

  render() {
    const {
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
    } = this.state;

    return (
      <Background>
        <Container>
          <Title>Formas De Pagamento</Title>

          <Form>
            <CheckBox
              center
              title="Dinheiro"
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="green"
              checked={checked1}
              onPress={() => this.setState({ checked1: !checked1 })}
            />

            <CheckBox
              center
              title="Cheque"
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="green"
              checked={checked2}
              onPress={() => this.setState({ checked2: !checked2 })}
            />

            <CheckBox
              center
              title="Cartão de Débito"
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="green"
              checked={checked3}
              onPress={() => this.setState({ checked3: !checked3 })}
            />

            <CheckBox
              center
              title="Cartão de Crédito"
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="green"
              checked={checked4}
              onPress={() => this.setState({ checked4: !checked4 })}
            />

            <CheckBox
              center
              title="Paypal"
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="green"
              checked={checked5}
              onPress={() => this.setState({ checked5: !checked5 })}
            />

            <CheckBox
              center
              title="Outras Formas de Pagamento"
              checkedIcon="check-square"
              uncheckedIcon="square"
              checkedColor="green"
              checked={checked6}
              onPress={() => this.setState({ checked6: !checked6 })}
            />

            <Separator />

            <SubmitButton>Atualizar Formas de Pagamento</SubmitButton>
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
    <Icon name="person" size={20} color={tintColor} />
  ),
};
