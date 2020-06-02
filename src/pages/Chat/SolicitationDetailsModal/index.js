import React from 'react';
import { Text, View } from 'react-native';
import { SolicitationModal } from './styles';

const SolicitationDetailsModal = ({ isVisible, onDismiss }) => {
  return (
    <SolicitationModal
      isVisible={isVisible}
      onDismiss={onDismiss}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      onSwipeComplete={onDismiss}
      swipeDirection={['down']}
      useNativeDriver
    >
      <View>
        <Text>hahaha</Text>
      </View>
    </SolicitationModal>
  );
};

export default SolicitationDetailsModal;
