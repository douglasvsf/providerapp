import React, { Component } from 'react';
import {
  Picker,
  View,
  TextInput,
  Text,
  Button,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import { Autocomplete } from 'react-native-dropdown-autocomplete';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { estados } from '../../jsons/estados-cidades.json';
import SelectEstados from '../../components/Estados';
import SelectCidades from '../../components/Cidades';
import Background from '../../components/Background';

import {
  Container,
  Form,
  List,
  City,
  Name,
  FormInput,
  Submit,
  Separator,
  SubmitButton,
  Title,
} from './styles';

export default class Service extends Component {
  state = {
    uf: null,
    selectedValueEstado: null,
    selectedValueCidade: null,
    newCity: ' ',
    cities: [],
    newActuation: ' ',
    actuations: [],
  };

  async componentDidMount() {
    const cities = await AsyncStorage.getItem('cities');

    if (cities) {
      this.setState({ cities: JSON.parse(cities) });
    }

    const actuations = await AsyncStorage.getItem('actuations');

    if (actuations) {
      this.setState({ actuations: JSON.parse(actuations) });
    }

    this.setState({
      uf: estados,
      selectedValueEstado: '',
      selectedValueCidade: '',
    });
  }

  renderValueChangeEstado = value => {
    console.warn(value.sigla);
    this.setState({
      selectedValueEstado: value,
    });
  };

  renderValueChangeCidade = value => {
    console.warn(value);
    this.setState({
      selectedValueCidade: value,
    });

    const {
      cities,
      newCity,
      selectedValueCidade,
      selectedValueEstado,
    } = this.state;

    //const response = await api.get(`/users/${newUser}`);

    const data = {
      city: selectedValueCidade,
      uf: selectedValueEstado,
    };

    this.setState({
      cities: [...cities, data],
      newCity: ' ',
    });

    Keyboard.dismiss();
  };

  componentDidUpdate(_, prevState) {
    const { cities, actuations } = this.state;

    if (prevState.cities !== cities) {
      AsyncStorage.setItem('cities', JSON.stringify(cities));
    }

    if (prevState.actuations !== actuations) {
      AsyncStorage.setItem('actuations', JSON.stringify(actuations));
    }
  }

  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    const { actuations, newActuation } = this.state;

    //const response = await api.get(`/users/${newUser}`);

    const data = {
      item: item,
      index: index,
    };

    this.setState({
      actuations: [...actuations, data],
      newActuation: ' ',
    });

    Keyboard.dismiss();
    console.log(item);
  }

  render() {
    const { selectedValueCidade, selectedValueEstado, uf } = this.state;

    const data = [
      'Mototaxistas',
      'Frete Mudança',
      'Diaristas',
      'Babá',
      'Pedreiro',
      'Pintor',
      'Azulejista',
    ];

    return (
      <Background>
        <Container>
          <Title> Ocupação </Title>
          <Form>
            <SelectEstados
              selectedValue={selectedValueEstado}
              data={uf}
              onValueChange={this.renderValueChangeEstado}
            />

            <SelectCidades
              selectedValue={selectedValueCidade}
              data={selectedValueEstado}
              onValueChange={this.renderValueChangeCidade}
            />
          </Form>

          <List
            data={cities}
            keyExtractor={item => item.city}
            renderItem={({ item }) => (
              <City>
                <Name>{item.city}</Name>
              </City>
            )}
          />

          <Separator />

          <Form>
            <Autocomplete
              data={data}
              valueExtractor={item => item}
              handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              /*onDropdownClose={() => onDropdownClose()}
            onDropdownShow={() => onDropdownShow()}*/
            />
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
