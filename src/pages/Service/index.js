import React, { Component } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

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
  TitleInto,
  ContainerText,
  ActuationArea,
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
    const actuations = await AsyncStorage.getItem('actuations');

    if (actuations) {
      this.setState({ actuations: JSON.parse(actuations) });
    }

    const cities = await AsyncStorage.getItem('cities');

    if (cities) {
      this.setState({
        cities: JSON.parse(cities),
      });
    }

    this.setState({
      uf: estados,
      selectedValueEstado: '',
      selectedValueCidade: '',
    });
  }

  renderValueChangeEstado = value => {
    this.setState({
      selectedValueEstado: value,
    });
  };

  renderValueChangeCidade = value => {
    this.setState({
      selectedValueCidade: value,
    });

    const {
      cities,
      newCity,
      selectedValueCidade,
      selectedValueEstado,
    } = this.state;

    console.warn(selectedValueCidade);
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

  async componentDidUpdate(_, prevState) {
    const { cities, actuations } = this.state;

    if (prevState.cities !== cities) {
      AsyncStorage.setItem('cities', JSON.stringify(cities));
    }

    if (prevState.actuations !== actuations) {
      AsyncStorage.setItem('actuations', JSON.stringify(actuations));
    }
  }

  handleSelectItem(item, index) {
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
    const {
      selectedValueCidade,
      selectedValueEstado,
      uf,
      cities,
      actuations,
    } = this.state;

    const newcities = [(city = ['Campo Mourão', 'Maringa', 'Peabiru'])];
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
          <Title> Area de Atuação </Title>
          <Form>
            <TitleInto> Estado </TitleInto>

            <SelectEstados
              selectedValue={selectedValueEstado}
              data={uf}
              onValueChange={this.renderValueChangeEstado}
            />
            <Separator />

            <TitleInto> Cidade </TitleInto>
            <SelectCidades
              selectedValue={selectedValueCidade}
              data={selectedValueEstado}
              onValueChange={this.renderValueChangeCidade}
            />

            <List
              data={newcities}
              keyExtractor={item => item.city}
              renderItem={({ item }) => (
                <City>
                  <Name>{item.city}</Name>
                </City>
              )}
            />
            <Separator />
            <TitleInto> Area de Atuação </TitleInto>

            <ContainerText>
              <Autocomplete
                data={data}
                valueExtractor={item => item}
                inputContainerStyle={styles.inputContainer}
                handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              />
            </ContainerText>

            <SubmitButton>Atualizar Atuação</SubmitButton>
          </Form>
        </Container>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 8,
  },
  input: { maxHeight: 40 },
  inputContainer: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#c7c6c1',
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: '5%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  plus: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
});

Service.navigationOptions = {
  tabBarLabel: 'Area de Atuação',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
