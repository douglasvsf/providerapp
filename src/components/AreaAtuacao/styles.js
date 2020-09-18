import styled from 'styled-components/native';
import Input from '../Input';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const FormInput = styled(Input)`
  font-size: 15px;
  color: #000;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const ContainerText = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;
