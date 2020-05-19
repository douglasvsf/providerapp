import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';

import { Bancos } from '../../jsons/banco_codigo.json';

import { FormInput } from './styles';

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  areaAtuacao: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
  },
  suggestions: {
    maxHeight: 200,
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 22,
    paddingBottom: 22,
    flex: 1,
    maxHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  inputAtuacao: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    height: 60,
    width: '100%',
    paddingHorizontal: 16,
  },
  divider: {
    marginVertical: 4,
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTick: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 32,
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  bancoItem: {
    flex: 1,
    paddingVertical: 8,
  },
  flatlist: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  bancoButton: {
    marginTop: 16,
  },
});

const DATA = Object.keys(Bancos).map(key => ({
  key,
  ...Bancos[key],
}));

const Banco = ({ onSelect, selectedBanco }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bancoQuery, setBancoQuery] = useState('');
  const [filteredBanco, setFilteredBanco] = useState([]);

  const inputRef = useRef(null);

  const toggleModalVisible = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [setModalVisible, modalVisible]);

  const onDismiss = () => {
    Keyboard.dismiss();
    setFilteredBanco(DATA);
    setModalVisible(false);
  };

  const renderBanco = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.bancoItem}
        onPress={() => {
          if (onSelect) onSelect(item);
          onDismiss();
        }}
      >
        <Text>
          {item.value} - {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDivider = () => {
    return <View style={styles.divider} />;
  };

  useEffect(() => {
    if (bancoQuery.length >= 2) {
      const dataFiltered = DATA.filter(
        banco =>
          banco.label.toUpperCase().includes(bancoQuery.toUpperCase()) ||
          banco.value.toUpperCase().includes(bancoQuery.toUpperCase())
      );
      setFilteredBanco(dataFiltered);
    } else {
      setFilteredBanco(DATA);
    }
  }, [bancoQuery]);

  return (
    <View>
      <Button
        style={styles.bancoButton}
        title="Selecionar Banco"
        onPress={toggleModalVisible}
      />

      <Modal
        isVisible={modalVisible}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        onSwipeComplete={toggleModalVisible}
        swipeDirection={['down']}
      >
        <View style={styles.content}>
          <View style={styles.modalTick} />
          <Text style={styles.contentTitle}>Buscar banco(código/nome)</Text>
          <FormInput
            inputStyle={{ color: '#000' }}
            iconColor="#000"
            icon="search"
            onChangeText={setBancoQuery}
            placeholder="Comece a digitar para buscar..."
            ref={inputRef}
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            autoFocus
          />
          <FlatList
            style={styles.flatlist}
            data={filteredBanco}
            renderItem={renderBanco}
            ItemSeparatorComponent={renderDivider}
            keyExtractor={item => String(item.value)}
            keyboardShouldPersistTaps="handled"
          />

          <Button style={styles.button} title="Fechar" onPress={onDismiss} />
        </View>
      </Modal>
    </View>
  );
};

export default Banco;
