import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 60px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 46px;
  background: #f4f4f4;
  border-radius: 4px;
  /* margin: 0 30px;*/
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #15162c;
  margin-left: 15px;
`;

export const Picker = styled.View`
  background: #15162c;
  padding: 15px 30px;
  margin-top: 30px;
`;
