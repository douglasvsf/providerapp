import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Cima = styled(SvgXml)`
  padding: 0px 0px 100px 0px;
`;
export const Meio = styled(SvgXml)`
  padding: 0px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 35px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  background: #fff;
  margin: 10px 0 30px;
`;
