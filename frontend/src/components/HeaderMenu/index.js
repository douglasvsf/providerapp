import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



import { Container, SignLink, SignLinkText } from './styles';

export default function HeaderMenu({ ...props }) {

  return (
    <Container>
      <SignLink onPress={() => { props.navigation.openDrawer() }}>
        <SignLinkText>Criar conta</SignLinkText>
      </SignLink>

    </Container>

  );
}
