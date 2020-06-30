import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Title = styled.Text`
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  font-weight: bold;
`;

export const WalletList = styled(FlatList)`
  padding-left: 12px;
  padding-right: 12px;
`;

export const WalletItem = styled.View`
  padding: 8px;
  padding-bottom: 16px;
  flex: 1;
  flex-direction: column;
  background-color: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const WalletItemHeader = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 8px;
`;

export const WalletItemBody = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const WalletItemFooter = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const WalletItemSolicitationText = styled.Text`
  flex: 1;
  font-weight: bold;
`;

export const WalletItemDateText = styled.Text``;

export const WalletItemValueText = styled.Text`
  margin-right: 16px;
  flex: 1;
`;

export const WalletItemTaxValueText = styled.Text``;

export const WalletItemPaymentMethodContainer = styled.View`
  padding: 4px;
  border-radius: 4px;
`;

export const WalletItemPaymentMethodText = styled.Text``;
