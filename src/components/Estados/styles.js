import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: #f4f4f4;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.Picker.attrs({
  placeholderTextColor: '#15162c',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #15162c;
`;
