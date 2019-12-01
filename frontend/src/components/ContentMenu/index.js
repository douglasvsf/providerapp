import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Rating,AirbnbRating  } from 'react-native-elements';

import { DrawerItems } from 'react-navigation';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function ContentMenu({ ...props }) {

  return (
    <Container>
      <Left>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatar/50/teste.png`,
          }}
        />

        <Info>
          <Name>Usuario Final teste</Name>
          <AirbnbRating
  count={5}
  reviews={["Péssimo", "Ruim", "Regular", "Bom", "Ótimo"]}
  defaultRating={5}
  size={15}
  showRating={false}
/>
        </Info>
       
  
      </Left>

      <DrawerItems {...props} />

    </Container>

  );
}
