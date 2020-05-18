import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const BackButton = styled.TouchableOpacity``;

export const Panel = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 40px 0;
`;


export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Balance = styled.View``;

export const Money = styled.View`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  margin: 20px 0 30px;
`;

// export const Title = styled.Text`
//   font-size: 18px;
//   color: #999999;
// `;

export const Value = styled.Text`
  margin-top: 10px;
  font-size: 25px;
`;

export const Info = styled.Text`
  margin-top: 10px;
  font-size: 15px;
`;

export const QrCode = styled.View`
  align-items: center;
`;

export const Options = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
})`
  background: #eee;
  padding: 20px 5px;
`;

export const Option = styled.TouchableOpacity`
  background: #fff;
  margin: 5px;
  width: 120px;
  height: 110px;
  padding: 5px;
  border-radius: 4px;

  justify-content: space-around;
`;

export const Message = styled.Text`
  margin: 5px 0;
  font-size: 18px;
  color: #999;
`;
