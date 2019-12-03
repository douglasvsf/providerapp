import React, { useEffect, useState, PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements'
import CheckboxFormX from 'react-native-checkbox-form';
import Background from '~/components/Background';


import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';




export default class Payment extends PureComponent {

  state = {

    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6:false
  };
  render() {
    return (
      <Background>
        <Container>
          <Title>Formas De Pagamento</Title>

          <Form>

            <CheckBox
              center
              title='Dinheiro'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checkedColor='green'
              checked={this.state.checked1}
              onPress={() => this.setState({ checked1: !this.state.checked1 })}
            />

            <CheckBox
              center
              title='Cheque'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checkedColor='green'
              checked={this.state.checked2}
              onPress={() => this.setState({ checked2: !this.state.checked2 })}
            />

<CheckBox
              center
              title='Cartão de Débito'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checkedColor='green'
              checked={this.state.checked3}
              onPress={() => this.setState({ checked3: !this.state.checked3 })}
            />


<CheckBox
              center
              title='Cartão de Crédito'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checkedColor='green'
              checked={this.state.checked4}
              onPress={() => this.setState({ checked4: !this.state.checked4 })}
            />


<CheckBox
              center
              title='Paypal'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checkedColor='green'
              checked={this.state.checked5}
              onPress={() => this.setState({ checked5: !this.state.checked5 })}
            />

<CheckBox
              center
              title='Outras Formas de Pagamento'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checkedColor='green'
              checked={this.state.checked6}
              onPress={() => this.setState({ checked6: !this.state.checked6 })}
            />

<Separator/>


<SubmitButton >Atualizar Formas de Pagamento</SubmitButton>
          </Form>

        </Container>

      </Background>
    );
  }
}

Payment.navigationOptions = {
  tabBarLabel: 'Informações de Pagamento',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
