import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  margin-left: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;

export const PaymentStatusContainer = styled.View`
  margin-top: 4px;
  padding: 0px 4px 2px 4px;
  border-radius: 4px;
  background-color: #80deea;
`;

export const PaymentStatusContainerR = styled.View`
  margin-top: 4px;
  padding: 0px 4px 2px 4px;
  border-radius: 4px;
  background-color: #ff0000;
`;

export const PaymentStatusContainerA = styled.View`
  margin-top: 4px;
  padding: 0px 4px 2px 4px;
  border-radius: 4px;
  background-color: #ffff00 ;
`;

export const InfoView = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
`;
