import React, { useRef, useState } from 'react';
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

export default function SocialMedia() {
  const instaRef = useRef();
  const linkedinRef = useRef();
  const whatsRef = useRef();

  const [phonenumber, setPhonenumber] = useState('');

  /* const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  } */

  return (
    <Background>
      <Container>
        <Title>Redes Sociais</Title>

        <Form>
          {/* <FixedPlaceholder>www.facebook.com/</FixedPlaceholder> */}
          <FormInput
            fixedplaceholder="www.facebook.com/"
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Usuário Facebook"
            onSubmitEditing={() => instaRef.current.focus()}
            // value={name}
            // onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            autoCorrect={false}
            autoCapitalize="none"
            fixedplaceholder="@"
            placeholder="instagram"
            ref={instaRef}
            returnKeyType="next"
            onSubmitEditing={() => linkedinRef.current.focus()}
            // value={email}
            //    onChangeText={setEmail}
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

              // value={password}
              // onChangeText={setPassword}
            />
          </ContainerTelephone>

          <SubmitButton // onPress={handleSubmit}
          >
            Atualizar Redes Sociais
          </SubmitButton>
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
