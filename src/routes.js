/* eslint-disable */

import React from 'react';

import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import Address from './pages/Address';
import AdditionalInfo from './pages/AdditionalInfo';
import Statistics from './pages/Statistics';
import Payment from './pages/Payment';
import Qualification from './pages/Qualification';
import Service from './pages/Service';

import SocialMedia from './pages/SocialMedia';

import ContentMenu from '~/components/ContentMenu';
import { Touchable } from './components/Touchable';
import { colors } from './values/colors';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        NewApp: createStackNavigator(
          {
            App: createDrawerNavigator(
              {
                Painel: createBottomTabNavigator({
                  Agendamentos: {
                    screen: Dashboard,
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
                  Address,

                  AdditionalInfo,
                }),
                Serviços: createBottomTabNavigator({
                  Service,
                  Payment: {
                    screen: Payment,
                  },
                  Qualification: {
                    screen: Qualification,
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
                  <Touchable
                    onPress={() => navigation.toggleDrawer()}
                  >
                    <Icon
                      style={{ marginHorizontal: 10, marginVertical: 6, color: colors.secondary }}
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
        initialRouteName: isSigned ? 'NewApp' : 'Sign',
      }
    )
  );
