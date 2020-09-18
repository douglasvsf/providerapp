import styled from 'styled-components/native';
import { SvgUri } from 'react-native-svg';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 10 },
})`
  align-self: stretch;
  flex: 1;
  width: 100%;
`;

export const BrandsModalContent = styled.View`
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
`;

export const BrandsModalHeader = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const BrandsModalTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #15162c;
`;

export const BrandsModalList = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})`
  flex-direction: column;
  width: 100%;
`;

export const BrandRow = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const BrandLabel = styled.Text`
  margin-left: 8px;
  color: black;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const VerticalSeparator = styled.View`
  height: 120px;
  borderrightwidth: 3;
  borderrightcolor: rgba(255, 255, 255, 0.2);
  borderradius: 4;
`;

export const SeparatorModal = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 5px 0 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #15162c;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const ContainerNormal = styled.View`
  margin-top: 4px;
  margin-bottom: 4px;
  background: #ffffff;
  border-radius: 4px;
  align-items: center;
`;

export const ContainerCards = styled.View`
  margin-top: 4px;
  margin-bottom: 4px;
  background: #ffffff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const EditButton = styled(Button)`
  position: relative;
  flex: 0.8;
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;

export const Header = styled.View`
  margin-left: 5px;
  margin-top: 15px;
`;

export const TitleMethods = styled.Text`
  font-size: 23px;
  font-weight: bold;
  color: #15162c;
`;

export const CategoriesList = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 10px;
  padding-left: 20px;
  height: 20px;
`;

export const Item = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  height: 100px;
  border-radius: 4px;
`;

// export const ItemImage = styled.Image`
//   width: 200px;
//   height: 120px;
//   border-radius: 10px;
// `;
export const ItemImage = styled(SvgUri)`
  width: 130px;
  height: 60px;
  border-radius: 10px;
`;

export const ItemTitle = styled.Text`
  font-size: 16px;
  margin-top: 10px;
  color: #111;
  font-weight: bold;
  margin-left: 2.5px;
  margin-right: 10px;
`;
