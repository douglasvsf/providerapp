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

import SocialMedia from './pages/SocialMedia';

import MenuHeader from '~/components/HeaderMenu';

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
            Perfil: createBottomTabNavigator({
              Profile: {
                screen: Profile,
                navigationOptions: () => ({
                  drawerIcon: <Icon name="lock" size={20} color="#7159c1" />,
                }),
              },
              SocialMedia: {
                screen: SocialMedia,
                navigationOptions: () => ({
                  drawerIcon: <Icon name="lock" size={20} color="#7159c1" />,
                }),
              },
            }),

            Dashboard: {
              screen: Dashboard,
              navigationOptions: () => ({
                drawerIcon: <Icon name="rocket" size={20} color="#7159c1" />,
              }),
            },
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
