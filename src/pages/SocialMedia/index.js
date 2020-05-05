import React, { useRef, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  TelephoneInput,
  ContainerTelephone,
} from './styles';
import { colors } from '~/values/colors';

export default function SocialMedia({ onSubmitNewProvider, isNewProvider }) {
  const instaRef = useRef();
  const whatsRef = useRef();

  const handleSubmitNewProvider = useCallback(() => {
    onSubmitNewProvider({});
  }, [onSubmitNewProvider]);

  const [phonenumber, setPhonenumber] = useState('');
  const [facebookurl, setFacebookurl] = useState('');
  const [instaid, setInstaid] = useState('');
  return (
    <Background>
      <Container>
        <Title>Redes Sociais</Title>

        <Form>
          <FormInput
            fixedplaceholder="www.facebook.com/"
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Usuário Facebook"
            onSubmitEditing={() => instaRef.current.focus()}
            value={facebookurl}
            onChangeText={setFacebookurl}
          />

          <FormInput
            icon="mail-outline"
            autoCorrect={false}
            autoCapitalize="none"
            fixedplaceholder="@"
            placeholder="instagram"
            ref={instaRef}
            returnKeyType="next"
            onSubmitEditing={() => whatsRef.current.focus()}
            value={instaid}
            onChangeText={setInstaid}
          />

          <Separator />

          <ContainerTelephone>
            <Icon
              name="smartphone"
              size={20}
              color="rgba(255, 255, 255, 0.6)"
            />

            <TelephoneInput
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              placeholder="() 9 9999-9999"
              ref={whatsRef}
              returnKeyType="next"
              value={phonenumber}
              onChangeText={setPhonenumber}
            />
          </ContainerTelephone>

          {isNewProvider ? (
            <SubmitButton onPress={handleSubmitNewProvider}>
              Próximo
            </SubmitButton>
          ) : (
            <SubmitButton // onPress={handleSubmit}
            >
              Atualizar Redes Sociais
            </SubmitButton>
          )}
        </Form>
      </Container>
    </Background>
  );
}

SocialMedia.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Redes Sociais',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="share" size={20} color={tintColor} />
  ),
};
