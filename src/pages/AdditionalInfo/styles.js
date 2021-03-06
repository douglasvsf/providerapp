import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: #f4f4f4;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ContainerText = styled.View`
  padding: 5px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 1px;
`;

export const TitleInto = styled.Text`
  font-size: 15px;
  color: #15162c;
  font-weight: bold;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const TInput = styled(TextInputMask)`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #15162c;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const ContainerFull = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #15162c;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 7px 0 30px;
`;

export const NewPicker = styled.Picker.attrs({
  placeholderTextColor: '#15162c',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 1px;
  color: #15162c;
`;

export const Submit = styled(Button)`
  background: #6bd4c1;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
