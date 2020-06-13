/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import solicitationIcon from '~/assets/solicitation.png';
import ContentMenu from '~/components/ContentMenu';
import { Touchable } from './components/Touchable';
import AdditionalInfo from './pages/AdditionalInfo';
import Address from './pages/Address';
import enterRoom from './pages/Chat';
import Chat from './pages/Chat/chat';
import Dashboard from './pages/Dashboard';
import ActuationAreaScreen from './pages/NewProvider/ActuationAreaScreen';
import AddressScreen from './pages/NewProvider/AddressScreen';
import AditionalInfoScreen from './pages/NewProvider/AditionalInfoScreen';
import PaymentMethodsScreen from './pages/NewProvider/PaymentMethodsScreen';
import SocialMediaScreen from './pages/NewProvider/SocialMediaScreen';
import QualificationScreen from './pages/NewProvider/QualificationScreen';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Qualification from './pages/Qualification';
import Service from './pages/Service';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SocialMedia from './pages/SocialMedia';
import Statistics from './pages/Statistics';
import Wallet from './pages/Wallet';
import { colors } from './values/colors';

export default (isSigned = false,token,profileid,active) =>

  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        NewProvider: {
          screen: createStackNavigator(
            {
              AddressScreen,
              ActuationAreaScreen,
              PaymentMethodsScreen,
              AditionalInfoScreen,
              SocialMediaScreen,
              QualificationScreen,

            },
            {
              defaultNavigationOptions: {
                headerTransparent: true,
                headerTintColor: '#FFF',
                headerLeftContainerStyle: {
                  marginLeft: 20,
                },
              },
            }
          ),
          navigationOptions: {
            tabBarVisible: false,
            tabBarLabel: 'Agendar',
            tabBarIcon: (
              <Icon
                name="add-circle-outline"
                size={20}
                color="rgba(255, 255, 255, 0.6)"
              />
            ),
          },
        },
        NewApp: createStackNavigator(
          {
            App: createDrawerNavigator(
              {
                Painel: createBottomTabNavigator({
                  Agendamentos: {
                    screen: Dashboard,
                  },
                  Solicitations: {
                    screen: createSwitchNavigator({
                      enterRoom,
                      Chat,
                    }),
                    navigationOptions: {
                      tabBarLabel: 'Chats',
                      tabBarOptions: {
                        activeTintColor: '#4BB196',
                      },

                      tabBarIcon: ({ focused }) => {

                        if (focused) {
                          return (
                            <Image
                              source={solicitationIcon}
                              style={{
                                width: 24,
                                height: 24,
                                tintColor: '#4BB196',
                              }}
                            />
                          );
                        } else {
                          return (
                            <Image
                              source={solicitationIcon}
                              style={{
                                width: 24,
                                height: 24,
                                tintColor: '#808080',
                              }}
                            />
                          );
                        }
                      },

     
                    },

                    },
                

                  Estatisticas: {
                    screen: Statistics,
                  },
                }),
                Perfil: createBottomTabNavigator({
                  Profile: {
                    screen: Profile,
                  },
                  SocialMedia: {
                    screen: SocialMedia,
                  },
                  Address: {

                    screen:  props => <Address {...props} token={token} profileid={profileid.id} />, 
                    navigationOptions : {

                      tabBarOptions: {
                        activeTintColor: colors.primary,
                      },
                      tabBarLabel: 'Endereço',
                      tabBarIcon: ({ tintColor }) => (
                        <Icon name="home" size={20} color={tintColor} />
                      ),
                    }
                  },
                  AdditionalInfo: {
                    screen: AdditionalInfo,
                  },
                }),
                Serviços: createBottomTabNavigator({

                  Service :  {
                    screen:  props => <Service {...props} token={token} profileid={profileid.id} />, 
                    navigationOptions : {

                      tabBarOptions: {
                        activeTintColor: colors.primary,
                      },
                      tabBarLabel: 'Area de Atuação',
                      tabBarIcon: ({ tintColor }) => (
                        <Icon name="briefcase" size={20} color={tintColor} />
                      ),
                    }
                  },
                  Payment: {

                    screen:  props => <Payment {...props} token={token} profileid={profileid.id} />, 
                    navigationOptions : {

                      tabBarOptions: {
                        activeTintColor: colors.primary,
                      },
                      tabBarLabel: 'Informações de Pagamento',
                      tabBarIcon: ({ tintColor }) => (
                        <Icon name="credit-card" size={20} color={tintColor} />
                      ),
                    }
                  },
                  Qualification: {
                    screen: Qualification,
                  },
                  Wallet: {
                    screen: Wallet,

                  },


                  }),

              },
              {
                contentComponent: ContentMenu,
              }
            ),
          },
          {
            defaultNavigationOptions: ({ navigation }) => {
              const pathAndParams =
                navigation.router.getPathAndParamsForState(navigation.state) ||
                {};
              const activePath = pathAndParams.path;
              const NameRoute = activePath.split('/');
              const FinalRoute = NameRoute[0];

              return {
                headerTitle: FinalRoute,
                headerStyle: {
                  backgroundColor: '#4ead93', // don't want to hardcode a value
                },
                headerTitleStyle: {
                  width: '90%',
                  textAlign: 'center',
                  color: 'colors.secondary',
                },
                headerLeft: (
                  <Touchable onPress={() => navigation.toggleDrawer()}>
                    <Icon
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 6,
                        color: colors.secondary,
                      }}
                      name="bars"
                      size={28}
                    />
                  </Touchable>
                ),
                headerRight: (
                  <Icon
                    style={{ paddingRight: 10, color: colors.secondary }}
                    name="bell"
                    size={25}
                  />
                ),
              };
            },
          }
        ),
      },
      {
        initialRouteName: (isSigned && active) ? 'NewApp' : ((isSigned && !active) ? 'NewProvider' : 'Sign'),
      }
    )
  );