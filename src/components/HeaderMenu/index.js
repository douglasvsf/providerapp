import React from 'react';

import { Container, SignLink, SignLinkText } from './styles';

export default function HeaderMenu({ ...props }) {
  return (
    <Container>
      <SignLink
        onPress={() => {
          props.navigation.openDrawer();
        }}
      >
        <SignLinkText>Criar conta</SignLinkText>
      </SignLink>
    </Container>
  );
}
