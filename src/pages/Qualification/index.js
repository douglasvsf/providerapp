import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { colors } from '~/values/colors';
import { Background, Title, FormInput, Label } from './styles';

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
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 22,
    paddingBottom: 22,
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
  form: {
    textAlign: 'left',
    width: '100%',
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: '#888',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  spacer: {
    width: 8,
  },
  buttonContainer: { flex: 1, marginLeft: 0 },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 4,
    padding: 10,
  },
  listDivider: { height: 8 },
  flatList: { marginHorizontal: 24 },
  flatListHeader: { marginBottom: 8 },
  removeButton: { borderRadius: 20 },
  saveButtonContainer: {
    padding: 26,
  },
});

const ListDivider = () => <View style={styles.listDivider} />;

const Spacer = () => <View style={styles.spacer} />;

const QualificationModal = ({ visible, onDismiss, onAdd, isNewProvider }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newQualification, setNewQualification] = useState([]);
  const newArrayQualification = Array.from(newQualification);
  const profileId = useSelector(state => state.user.profile.id);
  const token = useSelector(state => state.auth.token);

  const onDismissModal = () => {
    setTitle('');
    setDescription('');
    onDismiss();
  };

  // const onAddQualificacoes = qualificacao => {
  //   setQualificacoes([...qualificacoes, qualificacao]);
  // };

  const onAddQualification = async () => {
    onAdd({ title, description });

    // eslint-disable-next-line no-empty
    if (!isNewProvider) {
      try {
        newArrayQualification.push({
          title,
          description,
        });

        // const resultNewArrayQualification = newArrayQualification.find(obj => {
        //   return obj;
        // });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await api.post(
          `providers/${profileId}/qualifications`,
          {
            qualifications: newArrayQualification,
          }
        );
      } catch (ex) {
        Snackbar.show({
          text: 'Ocorreu um Erro. Tente Novamente',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }

    setTitle('');
    setDescription('');
    onDismiss();
  };

  return (
    <Modal
      isVisible={visible}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      onSwipeComplete={onDismissModal}
      swipeDirection={['down']}
      onBackdropPress={onDismissModal}
      onDismiss={onDismissModal}
      useNativeDriver
    >
      <View style={styles.content}>
        <View style={styles.modalTick} />
        <Text style={styles.contentTitle}>
          Adicionar qualificação profissional
        </Text>

        <View style={styles.form}>
          <Label>Título</Label>
          <FormInput
            inputStyle={{ color: '#000' }}
            iconColor="#000"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Eletricista Predial"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            autoFocus
          />
          <Label>Descrição</Label>
          <FormInput
            inputStyle={{ color: '#000' }}
            iconColor="#000"
            value={description}
            onChangeText={setDescription}
            placeholder="Ex: Senai"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
          />
          <View style={styles.buttonsContainer}>
            <Button
              onPress={onDismissModal}
              buttonStyle={styles.cancelButton}
              containerStyle={styles.buttonContainer}
              title="Cancelar"
            />
            <Spacer />
            <Button
              disabled={!title || !description}
              onPress={onAddQualification}
              buttonStyle={styles.addButton}
              containerStyle={styles.buttonContainer}
              title="Adicionar"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RemoveButton = ({ onRemove, index, id }) => {
  const handleRemove = useCallback(() => {
    Alert.alert(
      'Remover qualificação',
      'Você tem certeza que deseja remover esta qualificação?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => onRemove({ index, id }),
        },
      ]
    );
  }, [onRemove, index, id]);

  return (
    <TouchableNativeFeedback onPress={handleRemove}>
      <Icon name="delete-outline" size={28} color="red" />
    </TouchableNativeFeedback>
  );
};

export default function Qualification({ onSubmitNewProvider, isNewProvider }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [qualificacoes, setQualificacoes] = useState([]);
  const profileId = useSelector(state => state.user.profile.id);
  const token = useSelector(state => state.auth.token);
  useEffect(() => {
    async function loadQualification() {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api
        .get(`providers/${profileId}/qualifications`)
        .then(response => {
          setQualificacoes(response.data);
        })
        .catch(err => {
          Snackbar.show({
            text: 'Certifique-se que possui conexão com internet',
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
    loadQualification();
  }, [profileId, token]);

  const handleSubmitNewProvider = useCallback(async () => {
    // onSubmitNewProvider(qualificacoes);

    const responseSubmitNew = await onSubmitNewProvider(qualificacoes);

    if (responseSubmitNew === 0) {
      Snackbar.show({
        text: 'Certifique-se que possui pelo menos uma qualificação',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }, [onSubmitNewProvider, qualificacoes]);

  const showModal = () => {
    setModalVisible(true);
  };

  const onDismissModal = () => {
    setModalVisible(false);
  };

  const onAddQualificacoes = qualificacao => {
    setQualificacoes([...qualificacoes, qualificacao]);
  };

  const removeQualificacao = async ({ index, id }) => {
    const newQualificacoes = [...qualificacoes];

    newQualificacoes.splice(index, 1);
    setQualificacoes(newQualificacoes);

    if (!isNewProvider) {
      const response = await api.delete(
        `providers/${profileId}/qualifications/${id}`
      );
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <RemoveButton
          index={index}
          id={item.id}
          onRemove={removeQualificacao}
        />
      </View>
    );
  };

  const renderListHeader = useCallback(() => {
    const disabled = qualificacoes.length >= 3;
    return (
      <View>
        <Title>Qualificações</Title>
        <Button disabled={disabled} onPress={showModal} title="Adicionar" />
      </View>
    );
  }, [qualificacoes]);

  return (
    <Background>
      <FlatList
        style={styles.flatList}
        ListHeaderComponentStyle={styles.flatListHeader}
        data={qualificacoes}
        renderItem={renderItem}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={ListDivider}
      />
      <View style={styles.saveButtonContainer}>
        {isNewProvider ? (
          <Button onPress={handleSubmitNewProvider} title="Finalizar" />
        ) : null}
      </View>
      <QualificationModal
        visible={modalVisible}
        onDismiss={onDismissModal}
        onAdd={onAddQualificacoes}
        isNewProvider={isNewProvider}
      />
    </Background>
  );
}

Qualification.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Qualificações',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="school" size={20} color={tintColor} />
  ),
};
