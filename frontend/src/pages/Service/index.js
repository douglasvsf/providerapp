import React, { Component } from "react";
import { Picker, View, TextInput, Text, Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { estados } from '../../jsons/estados-cidades.json'
import SelectEstados from '../../components/Estados'
import SelectCidades from '../../components/Cidades'
import Background from "../../components/Background";
import { Container, Form, FormInput, Submit,Separator,SubmitButton,Title } from "./styles";

export default class Service extends Component {

  state = { uf: null, selectedValueEstado: null, selectedValueCidade: null }

  componentDidMount() {
    this.setState({
      uf: estados,
      selectedValueEstado: '',
      selectedValueCidade: ''
    })
  }

  renderValueChangeEstado = (value) => {
    console.warn(value.sigla)
    this.setState({
      selectedValueEstado: value
    })
  }


  renderValueChangeCidade = (value) => {
    console.warn(value)
    this.setState({
      selectedValueCidade: value
    })
  }

  render() {
    const { selectedValueCidade, selectedValueEstado, uf } = this.state;
    return (
      <Background>
        <Container>
          <Title> Ocupação </Title>
      <Form>

        <View >
          <SelectEstados
            selectedValue={selectedValueEstado}
            data={uf}
            onValueChange={this.renderValueChangeEstado} />
        </View>

        <View>
          <SelectCidades selectedValue={selectedValueCidade}
            data={selectedValueEstado}
            onValueChange={this.renderValueChangeCidade} />
        </View>

      </Form>
      
      </Container>
      </Background>
    );
  }
}



Service.navigationOptions = {
  tabBarLabel: 'Ocupação',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
