import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #7CB496;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #FFFFFF;
  font-weight: bold;
  font-size: 16px;
`;
