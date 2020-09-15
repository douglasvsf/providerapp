import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Container = styled.View`
  background: #201d2e;
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  margin: ${props => (props.header ? '35px 20px 10px 20px ' : '10px 20px 20px 20px')};
  padding-left: 10px;
  border-radius: 50px;
`;


export const TextInput = styled(Input)`
flex: 1;
color: #ffffff;
padding: 10px 20px;
`;

