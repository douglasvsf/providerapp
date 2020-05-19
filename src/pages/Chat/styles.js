import styled from 'styled-components/native';
import Button from '~/components/Button';
import { colors } from '~/utils/colors';

export const Submit = styled(Button)`
  background: #6bd4c1;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background-color: ${colors.primary};
`;

export const NewNegotiation = styled(Button)`
  height: 21px;
  background-color: #4ead93;
  align-items: center;
  justify-content: flex-end;
  border-radius: 4px;
  padding: 0 0 0 0;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  margin: 20px 0 30px;
`;
