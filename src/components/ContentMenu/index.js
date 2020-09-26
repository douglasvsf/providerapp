import React from 'react';
import { useSelector } from 'react-redux';
import { AirbnbRating } from 'react-native-elements';

import { DrawerItems } from 'react-navigation';

import { Container, Left, Avatar, Info, Name } from './styles';
import { colors } from '~/values/colors';

export default function ContentMenu({ ...props }) {

  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Left>
        <Avatar
          source={{
            uri: `https://www.iconfinder.com/data/icons/user-pictures/100/unknown-512.png`,
          }}
        />

        <Info>
          <Name>{profile.name}</Name>
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
