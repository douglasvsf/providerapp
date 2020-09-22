/* eslint-disable */

import React from 'react';
import { useSelector } from 'react-redux';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Notific from './assets/notific-branco.svg';
import { DrawerActions } from 'react-navigation-drawer';

import {
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import Logo from '~/assets/dashboard-06.svg';
import MiddleButton from '~/assets/middlebutton.svg';

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
import WalletDetailsScreen from './pages/Wallet/Details';
import { colors } from './values/colors';

export default (isSigned = false, token, profileid, active) =>
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
                headerTintColor: '#15162c',
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
            NewAppBottom: createBottomTabNavigator(
              {
                Agendamentos: {
                  screen: Dashboard,
                  navigationOptions: {
                    tabBarOptions: {
                      activeTintColor: colors.primary,
                      style: {
                        backgroundColor: '#201D2E',
                      },
                    },
                  },
                },
                Solicitations: {
                  // navigationOptions: {
                  //   tabBarOptions: {
                  //     labelStyle: {
                  //       fontSize: 10,
                  //     },
                  //     activeTintColor: '#FFFFFF',
                  //     inactiveTintColor: '#15162c',
                  //     indicatorStyle: {
                  //       height: '100%',
                  //       backgroundColor: '#15162c',
                  //     },
                  //     style: {
                  //       backgroundColor: '#E5E5E5',
                  //     },
                  //   },
                  // },
                  screen: createSwitchNavigator({
                    enterRoom,
                    Chat,
                  }),
                  navigationOptions: {
                    tabBarLabel: 'Chats',
                    // tabBarOptions: {
                    //   activeTintColor: '#4BB196',
                    // },

                    tabBarOptions: {
                      activeTintColor: colors.primary,
                      style: {
                        backgroundColor: '#201D2E',
                      },
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
                Dashboard: {
                  screen: Dashboard,
                  navigationOptions: {
                    tabBarOptions: {
                      activeTintColor: colors.primary,
                      style: {
                        backgroundColor: '#201D2E',
                      },
                    },
                    tabBarLabel: ' ',
                    tabBarIcon: ({ tintColor }) => (
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 3, // space from bottombar
                          height: 39,
                          width: 39,
                          borderRadius: 39,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <MiddleButton
                          style={{
                            width: 39,
                            height: 39,
                            tintColor,
                            alignContent: 'center',
                          }}
                        />
                      </View>
                    ),
                  },
                },
                Estatisticas: {
                  screen: Statistics,
                  navigationOptions: {
                    tabBarOptions: {
                      activeTintColor: colors.primary,
                      style: {
                        backgroundColor: '#201D2E',
                      },
                    },
                  },
                },
                Profile: {
                  navigationOptions: {
                    tabBarOptions: {
                      activeTintColor: colors.primary,
                      style: {
                        backgroundColor: '#201D2E',
                      },
                    },
                  },
                  screen: Profile,
                },
              },
              {
                initialRouteName: 'Dashboard',
              }
            ),
            App: createDrawerNavigator(
              {
                Painel: createMaterialTopTabNavigator({
                  Agendamentos: {
                    screen: Dashboard,
                  },
                  Solicitations: {
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                    },
                    screen: createSwitchNavigator({
                      enterRoom,
                      Chat,
                    }),
                    navigationOptions: {
                      tabBarLabel: 'Chats',
                      // tabBarOptions: {
                      //   activeTintColor: '#4BB196',
                      // },

                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
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
                Perfil: createMaterialTopTabNavigator({
                  Profile: {
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                    },
                    screen: Profile,
                  },
                  SocialMedia: {
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                    },
                    screen: SocialMedia,
                  },
                  Address: {
                    screen: props => (
                      <Address
                        {...props}
                        token={token}
                        profileid={profileid.id}
                      />
                    ),
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                      tabBarLabel: 'Endereço',
                      tabBarIcon: ({ tintColor }) => (
                        <Icon name="home" size={20} color={tintColor} />
                      ),
                    },
                  },
                  AdditionalInfo: {
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                    },
                    screen: AdditionalInfo,
                  },
                }),
                Serviços: createMaterialTopTabNavigator({
                  Service: {
                    screen: props => (
                      <Service
                        {...props}
                        token={token}
                        profileid={profileid.id}
                      />
                    ),
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                      tabBarLabel: 'Area de Atuação',
                      tabBarIcon: ({ tintColor }) => (
                        <Icon name="briefcase" size={20} color={tintColor} />
                      ),
                    },
                  },
                  Payment: {
                    screen: props => (
                      <Payment
                        {...props}
                        token={token}
                        profileid={profileid.id}
                      />
                    ),
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                      tabBarLabel: 'Informações de Pagamento',
                      tabBarIcon: ({ tintColor }) => (
                        <Icon name="credit-card" size={20} color={tintColor} />
                      ),
                    },
                  },
                  Qualification: {
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                    },
                    screen: Qualification,
                  },
                  Wallet: {
                    screen: createStackNavigator(
                      { Wallet, WalletDetails: WalletDetailsScreen },
                      { headerMode: 'none' }
                    ),
                    navigationOptions: {
                      tabBarOptions: {
                        labelStyle: {
                          fontSize: 10,
                        },
                        activeTintColor: '#FFFFFF',
                        inactiveTintColor: '#15162c',
                        indicatorStyle: {
                          height: '100%',
                          backgroundColor: '#15162c',
                        },
                        style: {
                          backgroundColor: '#E5E5E5',
                        },
                      },
                      tabBarLabel: 'Carteira',
                      tabBarIcon: ({ tintColor }) => (
                        <MIcon
                          name="account-balance-wallet"
                          size={20}
                          color={tintColor}
                        />
                      ),
                    },
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
                  color: '#FFFFFF',
                },
                headerLeft: (
                  <Touchable
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                  >
                    <Icon
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 6,
                        color: '#FFFFFF',
                      }}
                      name="bars"
                      size={28}
                    />
                  </Touchable>
                ),
                headerRight: (
                  <View style={{ paddingRight: 10 }}>
                    <Notific />
                    {/* <Icon
                     style={{ paddingRight: 10, color: colors.secondary }}
                     name="bell"
                     size={25}
                   /> */}
                  </View>
                ),
              };
            },
          }
        ),
      },
      {
        initialRouteName:
          isSigned && active
            ? 'NewApp'
            : isSigned && !active
            ? 'NewProvider'
            : 'Sign',
      }
    )
  );
