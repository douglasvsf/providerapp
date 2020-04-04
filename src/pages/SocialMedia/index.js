import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Background from '~/components/Background';

import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
} from './styles';
import { colors } from '~/values/colors';

export default function SocialMedia() {
  const instaRef = useRef();
  const linkedinRef = useRef();
  const whatsRef = useRef();

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
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="www.facebook.com/"
            returnKeyType="next"
            onSubmitEditing={() => instaRef.current.focus()}
            // value={name}
            // onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="www.instagram.com/"
            ref={instaRef}
            returnKeyType="next"
            onSubmitEditing={() => linkedinRef.current.focus()}
            // value={email}
            //    onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="www.linkedin.com/"
            ref={linkedinRef}
            returnKeyType="next"
            onSubmitEditing={() => whatsRef.current.focus()}
            // value={oldPassword}
            // onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="() 9 9999-9999"
            ref={whatsRef}
            returnKeyType="next"

            // value={password}
            // onChangeText={setPassword}
          />

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
    <Icon name="share-alt" size={20} color={tintColor} />
  ),
};
