import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const SeparatorModal = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 5px 0 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const ContainerNormal = styled.View`
  margin-top: 4px;
  margin-bottom: 4px;
  background: #ffffff;
  border-radius: 4px;
  align-items: center;
`;

export const ContainerCards = styled.View`
  margin-top: 4px;
  margin-bottom: 4px;
  background: #ffffff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const EditButton = styled(Button)`
  position: relative;
  flex: 0.8;
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;
