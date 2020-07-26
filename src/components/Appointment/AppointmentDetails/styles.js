import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { colors } from '~/values/colors';

export const SolicitationModal = styled(Modal)`
  flex: 1;
  background-color: white;
  margin: 0;
`;

export const PaymentStatusContainerR = styled.View`
padding: 0px 4px 2px 4px;
border-radius: 4px;
  background-color: #ff0000;
`;

export const PaymentStatusContainerA = styled.View`
padding: 0px 4px 2px 4px;
border-radius: 4px;
  background-color: #ffff00 ;
`;


export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
})`
  flex: 1;
`;

export const CenterContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`;

export const DetailsContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ContentTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const SolicitationIdText = styled.Text`
  font-size: 18px;
  margin-right: 8px;
`;

export const Title = styled.Text`
  font-size: 15px;
  margin-bottom: 4px;
  font-weight: bold;
`;

export const DetailsText = styled.Text`
  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const NoteInput = styled.TextInput`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  max-height: 100px;
  margin-bottom: 24px;
`;

export const RefuseButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background-color: #f0f0f0;
  width: 100%;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  height: 50px;
  margin-top: 24px;
  margin-right: 12px;
`;

export const RefuseButtonText = styled.Text``;

export const AcceptButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background-color: ${colors.primary};
  width: 100%;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  height: 50px;
  margin-top: 24px;
  margin-left: 12px;
`;

export const AcceptButtonText = styled.Text`
  color: #fff;
`;

export const PaymentStatusContainer = styled.View`
  padding: 0px 4px 2px 4px;
  border-radius: 4px;
  background-color: #80deea;
`;
