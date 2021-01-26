/* eslint-disable no-nested-ternary */
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
import Snackbar from 'react-native-snackbar';
import { withNavigation } from 'react-navigation';
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
    backgroundColor: '#F4F4F4',
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
    height: 46,
    backgroundColor: '#15162c',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#F4F4F4',
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
      occupationAreasUnique: [],
      isBack: false,
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

    const { token, profileid, isNewProvider } = this.props;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api.get(`providers/${profileid}/occupation_areas`).then(response => {

      const occupationAreasArray = Array.from(this.state.occupationAreas);

      if (response.data !== null) {
        response.data.userOccupationArea.map((details) => {
          occupationAreasArray.push({
            id: details.occupation_area_id,
            idTable: details.id,
            title: details.occupationArea.title,
          });
        });

        this.setState({
          selectedAreaAtuacao: occupationAreasArray,
          selectedCities: response.data.userOccupationCity,
        });
      }

      const verifyIsBack = !!(
        isNewProvider &&
        response.data.userOccupationArea.length > 0 &&
        response.data.userOccupationCity.length > 0
      );
      this.setState({ isBack: verifyIsBack });
    })
    .catch(err => {
      Snackbar.show({
        text: 'Certifique-se que possui conexão com internet',
        duration: Snackbar.LENGTH_LONG,
      });
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

  handleSubmitNewProvider = async () => {
    const { onSubmitNewProvider } = this.props;
    const { selectedCities, selectedAreaAtuacao } = this.state;

    // onSubmitNewProvider({ selectedCities, selectedAreaAtuacao });
    // this.setState({ isBack: true });

    const responseSubmitNew = await onSubmitNewProvider({
      selectedCities,
      selectedAreaAtuacao,
    });
    if (responseSubmitNew === 0) {
      Snackbar.show({
        text: 'Certifique-se que possui pelo menos um cidade e Area de atuação',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      this.setState({ isBack: true });
    }
  };

  onAddCity = async () => {
    const { token, profileid, isNewProvider } = this.props;

    const {
      selectedValueCidade,
      selectedValueEstado,
      selectedCities,
      occupationCities,
      isBack,
    } = this.state;

    const occupationCitiesArray = Array.from(occupationCities);
    const newCity = {
      city: selectedValueCidade,
      state: selectedValueEstado.nome,
    };

    occupationCitiesArray.push({
      city: newCity.city,
      state: newCity.state,
    });

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
        city => city.state === newCity.state && city.city === newCity.city
      )
    ) {
      Alert.alert(
        'Você já atua nesta cidade',
        'Você já esta atuando na que esta tentando adicionar',
        [{ text: 'OK', onPress: () => null }]
      );
    } else if (isNewProvider && !isBack) {
      // fluxo sem voltar
      this.setState({
        selectedCities: [...selectedCities, newCity],
      });
    } else {
      await api.post(`providers/${profileid}/only_occupation_city`, {
          occupationCities: occupationCitiesArray,
        })
        .then(response => {
          const result = response.data.userOccupationCity.find(obj => {
            return obj;
          });

          const newCityResponse = {
            city: result.city,
            state: result.state,
            id: result.id,
          };
          this.setState({
            selectedCities: [...selectedCities, newCityResponse],
          });
        })
        .catch(err => {
          Snackbar.show({
            text: 'Ocorreu um erro, tente novamente',
            duration: Snackbar.LENGTH_LONG,
          });
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

  removeCity = async city => {
    const { profileid, isNewProvider } = this.props;

    const { selectedCities, isBack } = this.state;

    const cityIndex = selectedCities.findIndex(
      c => c.city === city.city && c.state === city.state
    );

    const newSelectedCities = [...selectedCities];

    newSelectedCities.splice(cityIndex, 1);

    if (isNewProvider && !isBack) {
      // fluxo sem voltar
      this.setState({ selectedCities: newSelectedCities });
    } else {
      await api
        .delete(`providers/${profileid}/occupationCity/${city.id}`)
        .then(response => {
          this.setState({ selectedCities: newSelectedCities });
        })
        .catch(err => {
          Snackbar.show({
            text: 'Ocorreu um erro, tente novamente',
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
  };

  renderItem = ({ item }) => {
    const { isNewProvider } = this.props;

    return (
      <View style={styles.cityItem}>
        <>
          <Text>
            {item.city} - {item.state}
          </Text>
        </>
        {/* {isNewProvider ? (
          <>
            <Text>
              {item.city} - {item.uf.nome}
            </Text>
          </>
        ) : (
          <>
            <Text>
              {item.city} - {item.state || item.uf.nome}
            </Text>
          </>
        )} */}

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

  onSelectAreaAtuacao = async areaAtuacao => {
    const { selectedAreaAtuacao, occupationAreasUnique, isBack } = this.state;
    const { token, profileid, isNewProvider } = this.props;
    // Request pro back aqui
    if (isNewProvider && !isBack) {
      // fluxo sem voltar

      this.setState({
        selectedAreaAtuacao: [...selectedAreaAtuacao, areaAtuacao],
      });
    } else {
      const occupationAreasArrayUnique = Array.from(occupationAreasUnique);

      occupationAreasArrayUnique.push({
        occupationAreaId: areaAtuacao.id,
      });

      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api
        .post(`providers/${profileid}/only_occupation_area`, {
          occupationAreas: occupationAreasArrayUnique,
        })
        .then(async response => {
          const result = response.data.userOccupationArea.find(obj => {
            return obj;
          });

          api.defaults.headers.Authorization = `Bearer ${token}`;
          await api
            .get(`providers/${profileid}/occupation_areas`)
            .then(responseGet => {
              const occupationAreasArray = Array.from(
                this.state.occupationAreas
              );

              const list = responseGet.data.userOccupationArea.map(
                (details, i) => {
                  occupationAreasArray.push({
                    id: details.occupation_area_id,
                    idTable: details.id,
                    title: details.occupationArea.title,
                  });
                }
              );

              this.setState({
                selectedAreaAtuacao: occupationAreasArray,
              });
            })
            .catch(err => {
              Snackbar.show({
                text: 'Certifique-se que possui conexão com a internet',
                duration: Snackbar.LENGTH_LONG,
              });
            });
        })
        .catch(err => {
          Snackbar.show({
            text: 'Ocorreu um erro, tente novamente',
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
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

  async removeAreaAtuacao({ index, areaAtuacao }) {
    const { profileid, isNewProvider } = this.props;
    const { selectedAreaAtuacao, isBack } = this.state;
    const newSelectedAreasAtuacao = [...selectedAreaAtuacao];
    newSelectedAreasAtuacao.splice(index, 1);
    if (isNewProvider && !isBack) {
      // fluxo sem voltar
      this.setState({ selectedAreaAtuacao: newSelectedAreasAtuacao });
    } else {
      this.setState(
        () => ({
          selectedAreaAtuacao: newSelectedAreasAtuacao,
        }),
        () => {
          api.delete(
            `providers/${profileid}/occupationArea/${areaAtuacao.idTable}`
          );
        }
      );
    }
  };

  renderAreaAtuacao = (areaAtuacao, index) => {
    return (
      <View key={areaAtuacao.id} style={styles.areaAtuacaoItem}>
        <Text style={styles.areaAtuacaoTitle}>{areaAtuacao.title}</Text>
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
                  onPress: () => this.removeAreaAtuacao({ index, areaAtuacao }),
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
      isBack,
    } = this.state;

    const { isNewProvider, navigation } = this.props;

    return (
      <Background>
        <Container>
          <Form keyboardShouldPersistTaps="handled">
            <Title>Cidades que atende </Title>
            <Separator />
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

            {/* <View style={styles.addCityButton}>
              <Button title="Adicionar" onPress={this.onAddCity} />
            </View> */}
            <FlatList
              style={styles.flatList}
              data={selectedCities}
              renderItem={this.renderItem}
              keyExtractor={KEY_EXTRACTOR}
              ItemSeparatorComponent={this.renderSeparator}
              ListEmptyComponent={this.emptyContainer}
            />

            <SubmitButton style={styles.addCityButton} onPress={this.onAddCity}>
              Adicionar
            </SubmitButton>

            <Separator />

            <Title> Serviços que presta </Title>

            <Separator />

            <AreaAtuacao
              selectedAreaAtuacao={selectedAreaAtuacao}
              onSelect={this.onSelectAreaAtuacao}
            />

            {selectedAreaAtuacao.map(this.renderAreaAtuacao)}

            {isNewProvider && !isBack ? ( // fluxo sem voltar
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
            ) : isNewProvider ? ( // somente no fluxo
              <SubmitButton
                onPress={() => navigation.navigate('PaymentMethodsScreen')}
              >
                Atualizar Áreas de Atuação
              </SubmitButton>
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
  tabBarLabel: 'Informações Serviço',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="worker" size={20} color={tintColor} />
  ),
};

export default withNavigation(Service);
