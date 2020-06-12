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
  areaAtuacaoItem: {
    flex: 1,
    paddingVertical: 8,
  },
  flatlist: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  areaAtuacaoButton: {
    marginTop: 16,
  },
});

const DATA = [
  { id: 9, label: 'Assistência Técnica' },
  { id: 10, label: 'Mão de Obra' },
  { id: 11, label: 'Serviços Domésticos' },
  { id: 12, label: 'Saúde e Bem estar' },
  { id: 13, label: 'Tecnologia' },
  { id: 14, label: 'Mobilidade' },
  { id: 15, label: 'Eventos' },
  { id: 16, label: 'Outros' },
];

const AreaAtuacao = ({ onSelect, selectedAreaAtuacao }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [areaAtuacaoQuery, setAreaAtuacaoQuery] = useState('');
  const [filteredAreaAtuacao, setFilteredAreaAtuacao] = useState([]);

  const inputRef = useRef(null);

  const toggleModalVisible = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [setModalVisible, modalVisible]);

  const onDismiss = () => {
    Keyboard.dismiss();
    setFilteredAreaAtuacao(DATA);
    setModalVisible(false);
  };

  const renderAreaAtuacao = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.areaAtuacaoItem}
        onPress={() => {
          if (onSelect) onSelect(item);
          onDismiss();
        }}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderDivider = () => {
    return <View style={styles.divider} />;
  };

  useEffect(() => {
    if (areaAtuacaoQuery.length >= 2) {
      const dataFiltered = DATA.filter(area =>
        area.label.toUpperCase().includes(areaAtuacaoQuery.toUpperCase())
      );
      setFilteredAreaAtuacao(dataFiltered);
    } else {
      setFilteredAreaAtuacao(DATA);
    }
  }, [areaAtuacaoQuery]);

  return (
    <View>
      {selectedAreaAtuacao.length < 3 ? (
        <Button
          style={styles.areaAtuacaoButton}
          title="Selecionar atuação"
          onPress={toggleModalVisible}
        />
      ) : (
        <Text>Você só pode selecionar até 3 areas de atuação</Text>
      )}
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
          <Text style={styles.contentTitle}>Buscar área de atuação</Text>
          <FormInput
            inputStyle={{ color: '#000' }}
            iconColor="#000"
            icon="search"
            onChangeText={setAreaAtuacaoQuery}
            placeholder="Comece a digitar para buscar..."
            ref={inputRef}
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            autoFocus
          />
          <FlatList
            style={styles.flatlist}
            data={filteredAreaAtuacao}
            renderItem={renderAreaAtuacao}
            ItemSeparatorComponent={renderDivider}
            keyExtractor={item => String(item.id)}
            keyboardShouldPersistTaps="handled"
          />

          <Button style={styles.button} title="Fechar" onPress={onDismiss} />
        </View>
      </Modal>
    </View>
  );
};

export default AreaAtuacao;
