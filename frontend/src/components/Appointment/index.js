import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



import { DrawerItems } from 'react-navigation';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ ...props }) {

  return (
    <Container>
      <Left>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatar/50/teste.png`,
          }}
        />

        <Info>
          <Name>teste</Name>
        </Info>
      </Left>

        <DrawerItems {...props} />
   
    </Container>









  );
}
