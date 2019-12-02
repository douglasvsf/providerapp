import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';


//import Icon from 'react-native-vector-icons/MaterialIcons';

import Icon from 'react-native-vector-icons/FontAwesome';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

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
//import HeaderMenu from '~/components/HeaderMenu';




export default (isSigned = false) =>



  createAppContainer(


    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        NewApp: createStackNavigator({
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
                Address: Address,

                AdditionalInfo: AdditionalInfo,

              }),
              Serviços: createBottomTabNavigator({

                Service: Service,
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
        }, {
            defaultNavigationOptions: ({ navigation }) => {

              const pathAndParams = navigation.router.getPathAndParamsForState(navigation.state) || {}
              const activePath = pathAndParams.path
              const NameRoute = activePath.split('/')
              const FinalRoute = NameRoute[0]

              return {
                headerTitle: FinalRoute,
                headerTitleStyle: {
                  width: '90%',
                  textAlign: 'center',
                },
                headerLeft: (<Icon
                  style={{ paddingLeft: 10, color: 'black' }}
                  onPress={() => navigation.toggleDrawer()}
                  name="bars"
                  size={25} />
                ),
                headerRight: (<Icon
                  style={{ paddingRight: 10, color: 'black' }}
                  name="bell"
                  size={25} />),

              }
            }

          }
        )
      },
      {
        initialRouteName: isSigned ? 'NewApp' : 'Sign',
      }
    )
  );

