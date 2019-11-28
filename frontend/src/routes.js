import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';


import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import AdditionalInfo from './pages/AdditionalInfo';

import Payment from './pages/Payment';
import Qualification from './pages/Qualification';
import Service from './pages/Service';


import SocialMedia from './pages/SocialMedia';

import MenuHeader from '~/components/Appointment';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createDrawerNavigator(
          {

            Dashboard: {
              screen: Dashboard,
              navigationOptions: () => ({
                drawerIcon: <Icon name="dashboard" size={20} color="#7159c1" />,
              }),
            },
            Perfil: createBottomTabNavigator({
              Profile: {
                screen: Profile,
              },
              SocialMedia: {
                screen: SocialMedia,
              },
              AdditionalInfo: {
                screen: AdditionalInfo,
              },


            }),
            Serviços: createBottomTabNavigator({

              Service: {
                screen: Service,
              },
              Payment: {
                screen: Payment,
              },
              Qualification: {
                screen: Qualification,
              },


            }),

          },
          {

            contentComponent: MenuHeader,
          }


        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );

