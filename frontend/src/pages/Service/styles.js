import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Estados from '~/components/Estados';

import { Autocomplete } from 'react-native-dropdown-autocomplete';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const ContainerText = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TitleInto = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: flex-start;
`;

export const City = styled.View`
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  flex: 1;
  margin-bottom: 10px;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
  height: 60%;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const ActuationArea = styled(Autocomplete)`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 10px 0 10px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const PickerEstado = styled(Estados)`
  margin-bottom: 10px;
`;

export const Submit = styled(Button)`
  background: #6bd4c1;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 5 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
