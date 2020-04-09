import React, { PureComponent } from 'react';
import {
  Keyboard,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native';

import { Autocomplete } from 'react-native-dropdown-autocomplete';
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
  SubmitButton,
  Title,
  TitleInto,
  ContainerText,
} from './styles';
import { colors } from '~/values/colors';
import Button from '~/components/Button';

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
    marginTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
  },
});

class Service extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uf: null,
      selectedValueEstado: null,
      selectedValueCidade: null,
      cities: [],
      newActuation: ' ',
      actuations: [],
      selectedCities: [],
    };
  }

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

  async componentDidUpdate(_, prevState) {
    const { cities, actuations } = this.state;

    if (prevState.cities !== cities) {
      AsyncStorage.setItem('cities', JSON.stringify(cities));
    }

    if (prevState.actuations !== actuations) {
      AsyncStorage.setItem('actuations', JSON.stringify(actuations));
    }
  }

  onChangeState = value => {
    this.setState({
      selectedValueEstado: value,
    });
  };

  onChangeCity = value => {
    this.setState({
      selectedValueCidade: value,
    });
  };

  onAddCity = () => {
    const {
      selectedValueCidade,
      selectedValueEstado,
      selectedCities,
    } = this.state;

    const newCity = {
      city: selectedValueCidade,
      uf: selectedValueEstado,
    };

    if (
      selectedValueCidade &&
      selectedValueEstado &&
      selectedCities.length < 3 &&
      !selectedCities.some(
        city => city.uf === newCity.uf && city.city === newCity.city
      )
    ) {
      this.setState({
        selectedCities: [...selectedCities, newCity],
      });
    }
  };

  handleSelectItem = (item, index) => {
    const { actuations, newActuation } = this.state;

    // const response = await api.get(`/users/${newUser}`);

    const data = {
      item,
      index,
    };

    this.setState({
      actuations: [...actuations, data],
      newActuation: ' ',
    });

    Keyboard.dismiss();
  };

  removeCity = city => {
    const { selectedCities } = this.state;

    const newSelectedCities = selectedCities.filter(
      c => c.city !== city.city && c.uf.sigla !== city.uf.sigla
    );

    this.setState({ selectedCities: newSelectedCities });
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.cityItem}>
        <Text>
          {item.city} - {item.uf.sigla}
        </Text>
        <TouchableNativeFeedback onPress={() => this.removeCity(item)}>
          <Icon name="delete-outline" size={28} color="red" />
        </TouchableNativeFeedback>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  emptyContainer = () => {
    return (
      <View>
        <Text style={styles.emptyText}>
          Selecione até 3 cidades onde deseja atuar
        </Text>
      </View>
    );
  };

  render() {
    const {
      selectedValueCidade,
      selectedValueEstado,
      uf,
      selectedCities,
    } = this.state;

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
              onValueChange={this.onChangeState}
            />
            <Separator />

            <TitleInto> Cidade </TitleInto>
            <SelectCidades
              selectedValue={selectedValueCidade}
              data={selectedValueEstado}
              onValueChange={this.onChangeCity}
            />

            <Button style={styles.addCityButton} onPress={this.onAddCity}>
              Adicionar
            </Button>

            <FlatList
              style={styles.flatList}
              data={selectedCities}
              renderItem={this.renderItem}
              keyExtractor={KEY_EXTRACTOR}
              ItemSeparatorComponent={this.renderSeparator}
              ListEmptyComponent={this.emptyContainer}
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

Service.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Area de Atuação',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="worker" size={20} color={tintColor} />
  ),
};

export default Service;
