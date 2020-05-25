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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-community/async-storage';
import { estados } from '../../jsons/estados-cidades.json';
import SelectEstados from '../../components/Estados';
import SelectCidades from '../../components/Cidades';
import Background from '../../components/Background';
import api from '../../services/api';
import {
  Container,
  Form,
  Separator,
  Title,
  TitleInto,
  SubmitButton,
} from './styles';
import { colors } from '~/values/colors';
import AreaAtuacao from '~/components/AreaAtuacao';

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

class Service extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uf: null,
      selectedValueEstado: null,
      selectedValueCidade: null,
      cities: [],
      actuations: [],
      selectedCities: [],
      selectedCitiesGet: [],
      selectedAreaAtuacao: [],
      occupationCities: [],
      occupationAreas: [],
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

    const { token, profileid } = this.props;
    const { isNewProvider } = this.props;

    if (!isNewProvider) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api
        .get(`providers/${profileid}/occupation_areas`)
        .then(response => {
          console.log('aa', response);
          this.setState({
            selectedAreaAtuacao: response.data.userOccupationArea,
            selectedCitiesGet: response.data.userOccupationCity,
          });
        })
        .catch(err => {
          console.log('erro', err);
        });
    }
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

  handleSubmitNewProvider = () => {
    const { onSubmitNewProvider } = this.props;
    const { selectedCities, selectedAreaAtuacao } = this.state;

    onSubmitNewProvider({ selectedCities, selectedAreaAtuacao });
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

    if (!selectedValueCidade || !selectedValueEstado) return;

    if (selectedCities.length >= WORK_CITY_LIMIT) {
      Alert.alert(
        'Limite atingido',
        `Você pode atender até ${WORK_CITY_LIMIT} cidades`,
        [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'OK', onPress: () => null },
        ]
      );
    } else if (
      selectedCities.some(
        city => city.uf === newCity.uf && city.city === newCity.city
      )
    ) {
      Alert.alert(
        'Você já atua nesta cidade',
        'Você já esta atuando na que esta tentando adicionar',
        [{ text: 'OK', onPress: () => null }]
      );
    } else {
      this.setState({
        selectedCities: [...selectedCities, newCity],
      });
    }
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

  removeCity = city => {
    const { selectedCities } = this.state;

    const cityIndex = selectedCities.findIndex(
      c => c.city === city.city && c.uf.sigla === city.uf.sigla
    );

    const newSelectedCities = [...selectedCities];

    newSelectedCities.splice(cityIndex, 1);

    this.setState({ selectedCities: newSelectedCities });
  };

  renderItem = ({ item, isNewProvider }) => {
    return (
      <View style={styles.cityItem}>
        {isNewProvider ? (
          <>
            <Text>
              {item.city} - {item.uf.sigla}
            </Text>
          </>
        ) : (
          <>
            <Text>
              {item.city} - {item.state}
            </Text>
          </>
        )}

        <TouchableNativeFeedback
          onPress={() =>
            Alert.alert(
              'Remover cidade',
              'Você tem certeza que deseja remover esta cidade?',
              [
                {
                  text: 'Não',
                },
                {
                  text: 'Sim',
                  onPress: () => this.removeCity(item),
                },
              ]
            )
          }
        >
          <Icon name="delete-outline" size={28} color="red" />
        </TouchableNativeFeedback>
      </View>
    );
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  onSelectAreaAtuacao = areaAtuacao => {
    const { selectedAreaAtuacao } = this.state;

    // Request pro back aqui
    this.setState({
      selectedAreaAtuacao: [...selectedAreaAtuacao, areaAtuacao],
    });
  };

  emptyContainer = () => {
    return (
      <View>
        <Text style={styles.emptyText}>
          Selecione até {WORK_CITY_LIMIT} cidades onde deseja atuar
        </Text>
      </View>
    );
  };

  removeAreaAtuacao = index => {
    const { selectedAreaAtuacao } = this.state;
    const newSelectedAreasAtuacao = [...selectedAreaAtuacao];
    newSelectedAreasAtuacao.splice(index, 1);
    this.setState({ selectedAreaAtuacao: newSelectedAreasAtuacao });
  };

  // async updateActuation() {

  //   const { token, profileid } = this.props;

  //   const occupationCitiesArray = Array.from(this.state.occupationCities);
  //   const occupationAreasArray = Array.from(this.state.occupationAreas);

  //   this.state.selectedCities.map(function(selectedCities) {
  //     occupationCitiesArray.push({
  //       city: selectedCities.city,
  //       state: selectedCities.uf.nome,
  //     });
  //   });
  //   // console.log('aaa', occupationCities);
  //   this.state.selectedAreaAtuacao.map(function(selectedAreaAtuacao) {
  //     // console.log(selectedCities.city);
  //     // console.log(selectedCities.uf.nome);

  //     occupationAreasArray.push({
  //       occupation_area_id: selectedAreaAtuacao.id,
  //     });
  //   });

  //   try {
  //     api.defaults.headers.Authorization = `Bearer ${token}`;
  //     const response = await api.post(`users/${profileId}/occupation_area`, {
  //       occupationAreas: occupationAreasArray,
  //       occupationCities: occupationCitiesArray,
  //     });
  //     console.log(response);
  //   } catch (ex) {
  //     console.warn(ex);
  //   }
  // }

  renderAreaAtuacao = (areaAtuacao, index) => {
    return (
      <View key={areaAtuacao.id} style={styles.areaAtuacaoItem}>
        <Text style={styles.areaAtuacaoTitle}>{areaAtuacao.label}</Text>
        <TouchableNativeFeedback
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
        </TouchableNativeFeedback>
      </View>
    );
  };

  render() {
    const {
      selectedValueCidade,
      selectedValueEstado,
      uf,
      selectedCities,
      selectedAreaAtuacao,
      selectedCitiesGet,
    } = this.state;

    const { isNewProvider } = this.props;

    return (
      <Background>
        <Container>
          <Title> Área de Atuação </Title>
          <Form keyboardShouldPersistTaps="handled">
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
            <Separator />
            <Button
              style={styles.addCityButton}
              title="Adicionar"
              onPress={this.onAddCity}
            />

            {isNewProvider ? (
              <FlatList
                style={styles.flatList}
                data={selectedCities}
                renderItem={this.renderItem}
                keyExtractor={KEY_EXTRACTOR}
                ItemSeparatorComponent={this.renderSeparator}
                ListEmptyComponent={this.emptyContainer}
              />
            ) : (
              <FlatList
                style={styles.flatList}
                data={selectedCitiesGet}
                renderItem={this.renderItem}
                keyExtractor={KEY_EXTRACTOR}
                ItemSeparatorComponent={this.renderSeparator}
                ListEmptyComponent={this.emptyContainer}
              />
            )}

            <Separator />

            <TitleInto> Area de Atuação </TitleInto>

            <Separator />

            <AreaAtuacao
              selectedAreaAtuacao={selectedAreaAtuacao}
              onSelect={this.onSelectAreaAtuacao}
            />

            {selectedAreaAtuacao.map(this.renderAreaAtuacao)}

            {isNewProvider ? (
              <>
                <Separator />

                <SubmitButton onPress={() => this.handleSubmitNewProvider()}>
                  Próximo
                </SubmitButton>

                {/* <Button
                  style={styles.submitNewProviderButton}
                  title="Próximo"
                  onPress={this.handleSubmitNewProvider()}
                /> */}
              </>
            ) : null}
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
