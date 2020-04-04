import React from 'react';

import { AirbnbRating } from 'react-native-elements';

import { DrawerItems } from 'react-navigation';

import { Container, Left, Avatar, Info, Name } from './styles';
import { colors } from '~/values/colors';

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
            reviews={['Péssimo', 'Ruim', 'Regular', 'Bom', 'Ótimo']}
            defaultRating={5}
            size={15}
            showRating={false}
          />
        </Info>
      </Left>

      <DrawerItems
        activeBackgroundColor="rgba(0,0,0,0.05)"
        activeTintColor={colors.primary}
        {...props}
      />
    </Container>
  );
}
