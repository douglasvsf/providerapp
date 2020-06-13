import React, { useState, useRef, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import Background from '~/components/Background';
import api from '../../services/api';

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

export default function SocialMedia({
  onSubmitNewProvider,
  isNewProvider,
  navigation,
}) {
  const instaRef = useRef();
  const whatsRef = useRef();

  const [phonenumber, setPhonenumber] = useState('');
  const [facebookurl, setFacebookurl] = useState('');
  const [instaid, setInstaid] = useState('');
  const [socialMedia, setSocialMedia] = useState([]);
  const socialMediasArray = Array.from(socialMedia);
  const [isBack, setIsBack] = useState(false);

  socialMediasArray.push({
    facebookUrl: facebookurl,
    instagramId: instaid,
    telephoneNumber: phonenumber,
  });

  const profileId = useSelector(state => state.user.profile.id);
  const token = useSelector(state => state.auth.token);
  useEffect(() => {
    async function loadAdditionalInfo() {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api
        .get(`users/${profileId}/social_media`)
        .then(response => {
          // se for cpf
          if (response.data !== null) {
            setPhonenumber(response.data.telephone_number);
            setFacebookurl(response.data.facebook_url);
            setInstaid(response.data.instagram_id);
          }

          const verifyIsBack = !!(isNewProvider && response.data !== null);
          setIsBack(verifyIsBack);
        })
        .catch(err => {
          Snackbar.show({
            text: 'Certifique-se que possui conexão com a internet',
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
    loadAdditionalInfo();
  }, [isNewProvider, profileId, token]);

  async function UpdateSocialMedia() {
    const result = socialMediasArray.find(obj => {
      return obj;
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api
      .put(`users/${profileId}/social_media`, result)
      .then(response => {
        // se for cpf

        if (response.data !== null) {
          setPhonenumber(response.data.telephone_number);
          setFacebookurl(response.data.facebook_url);
          setInstaid(response.data.instagram_id);
        }

        const verifyIsBack = !!(isNewProvider && response.data !== null);
        if (verifyIsBack) {
          navigation.navigate('QualificationScreen');
        }
      })
      .catch(err => {
        Snackbar.show({
          text: 'Certifique-se que todos campos estão preenchidos',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  const handleSubmitNewProvider = useCallback(async () => {
    const responseSubmitNew = await onSubmitNewProvider(socialMediasArray);

    if (responseSubmitNew === 0) {
      Snackbar.show({
        text: 'Certifique-se que todos campos estão preenchidos',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      setIsBack(true);
    }
  }, [onSubmitNewProvider, socialMediasArray]);
  return (
    <Background>
      <Container>
        <Title>Contatos</Title>

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

          {isNewProvider && !isBack ? (
            <SubmitButton onPress={handleSubmitNewProvider}>
              Próximo
            </SubmitButton>
          ) : (
            <SubmitButton onPress={UpdateSocialMedia}>
              Atualizar Contatos
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
  tabBarLabel: 'Contato',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="share" size={20} color={tintColor} />
  ),
};
