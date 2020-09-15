import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: #F4F4F4;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#15162C',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #F4F4F4;
`;

export const FInput = styled.TextInput.attrs({
  placeholderTextColor: '#15162C',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #F4F4F4;
  padding: 0 0 0 0;
  margin: 0;
`;


export const FixedPlaceholder = styled.Text`
  color: #fff;
  align-self: center;
  margin-left: 13px;
  margin-right: 0px;
  padding: 0 0 0 0;

`;
