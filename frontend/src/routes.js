import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createDrawerNavigator({
          Profile: {
            screen: Profile,
            navigationOptions: () => ({
              drawerIcon: <Icon name="lock" size={20} color="#7159c1" />,
            }),
          },
          Dashboard: {
            screen: Dashboard,
            navigationOptions: () => ({
              drawerIcon: <Icon name="rocket" size={20} color="#7159c1" />,
            }),
          },
        }),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
