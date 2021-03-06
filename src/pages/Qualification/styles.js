import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Estados from '~/components/Estados';

export const Background = styled(LinearGradient).attrs({
  colors: ['#E5E5E5', '#E5E5E5'],
})`
  flex: 1;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #15162c;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
  height: 60%;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const PickerEstado = styled(Estados)`
  margin-bottom: 10px;
`;

export const Submit = styled(Button)`
  background: #15162c;
  margin-left: 10px;
  justify-content: center;
  border-radius: 20px;
  padding: 0 14px;
`;

export const SubmitFinish = styled(Button)`
  background: #7cb496;
  margin-left: 10px;
  justify-content: center;
  border-radius: 20px;
  padding: 0 14px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: black;
`;
