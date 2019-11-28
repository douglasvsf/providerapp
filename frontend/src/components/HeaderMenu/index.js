import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { DrawerItems } from 'react-navigation';


import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function MenuHeader({ ...props }) {

  return (
    <Background>
      <Container>
        <ProvidersList>

          <Provider >
            <Avatar
              source={{ uri: 'https://api.adorable.io/avatar/50/teste.png' }}
            />
            <Name>teste</Name>
          </Provider>
          <DrawerItems {...props} />
        </ProvidersList>
      </Container>

    </Background>
  );
}
