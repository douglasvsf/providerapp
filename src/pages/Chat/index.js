/* eslint-disable eqeqeq */
import database from '@react-native-firebase/database';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Background from '~/components/Background';
import api from '../../services/api';
import { Separator, Title } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginRight: 10,
    marginLeft: 10,
  },
  rightButton: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    padding: 0,
  },
  topGroup: {
    flexDirection: 'row',
    margin: 10,
  },
  myFriends: {
    flex: 1,
    color: 'red',
    fontSize: 16,
    padding: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
    marginBottom: 8,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 6,
  },
  profileName: {
    marginLeft: 6,
    fontSize: 16,
  },
  lastmessage: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  scheduleformated: {
    fontSize: 13,
  },
  groupLastUpdated: {
    flex: 1,
    color: '#8c8c8c',
    fontSize: 11,
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginRight: 0,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
  },
  groupTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  groupText: {
    color: '#8c8c8c',
  },
  groupImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  groupTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  lastMessageContainer: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  groupUsername: {
    paddingRight: 4,
  },
});

const initialLayout = { width: Dimensions.get('window').width };

export default function enterRoom({ navigation }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Abertas' },
    { key: 'second', title: 'Finalizadas' },
  ]);

  const profile = useSelector(state => state.user.profile);
  const [Availableroom, setAvailableRooms] = useState([]);
  const [Finishedroom, setFinishedRooms] = useState([]);

  function updateAvailableRoomAtIndex(availableRoom, idx) {
    setAvailableRooms(previousState => [
      ...previousState.slice(0, idx),
      availableRoom,
      ...previousState.slice(idx + 1),
    ]);
  }

  useEffect(() => {
    async function listenToChatDetailsFromFirebase(availableRoom, idx) {
      try {
        const firebaseChatRef = database().ref(
          `/chat/${availableRoom.chat_id}`
        );

        firebaseChatRef.on('value', snapshot => {
          if (!snapshot || !snapshot.val() || !snapshot.val().messages) return;

          const messages = Object.values(snapshot.val().messages);
          if (!messages || !messages.length) {
            updateAvailableRoomAtIndex(availableRoom, idx);
          } else {
            const lastMessage = messages[messages.length - 1];

            const lastMessageText = lastMessage.text;
            const lastMessageFrom = lastMessage.from;
            const { isFinished } = snapshot.val();

            const hasCreatedAtAttribute = lastMessage.createdAt !== undefined;

            if (hasCreatedAtAttribute) {
              const lastMessageHour = formatRelative(
                parseISO(lastMessage.createdAt),
                new Date(),
                {
                  locale: pt,
                  addSuffix: true,
                }
              );

              if (!isFinished) {
                updateAvailableRoomAtIndex(
                  {
                    ...availableRoom,
                    lastMessageText,
                    lastMessageHour,
                    lastMessageFrom,
                  },
                  idx
                );
              }
            }
          }
        });
      } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível carregar as informações do chat');
      }
    }
    async function requestAvailableRooms() {
      try {
        const { data: availableRooms } = await api.get('appointment_chat');

        availableRooms.forEach((availableRoom, idx) =>
          listenToChatDetailsFromFirebase(availableRoom, idx)
        );
      } catch (error) {
        Alert.alert('Erro ao carregar mensagens');
      }
    }
    requestAvailableRooms();
  }, []);

  const FirstRoute = () => (
    <View style={styles.container}>
      <View style={styles.topGroup} />
      <FlatList
        data={Availableroom}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              const user = {
                _id: `${profile.id}`,
                name: `${profile.name}`,
                firstName: profile.name,
                lastName: profile.name,
                roomName: item.chat_id,
                avatar: item.provider_avatar,
              };

              const customer = {
                name: item.customer_name,
                avatar: item.customer_avatar,
              };

              navigation.navigate('Chat', {
                user,
                customer,
              });
            }}
          >
            {/* {alert('aaaaaa')} */}

            <View style={styles.groupContainer}>
              <Image
                style={styles.groupImage}
                source={{
                  uri: `https://api.adorable.io/avatar/50/${item.chat_id}.png`,
                }}
              />
              <View style={styles.groupTextContainer}>
                <View style={styles.groupTitleContainer}>
                  <Text style={styles.groupName}>{item.customer_name}</Text>
                  <Text style={styles.groupLastUpdated}>
                    {item.lastMessageHour}
                  </Text>
                </View>
                <View style={styles.lastMessageContainer}>
                  <Text style={styles.groupText} numberOfLines={1}>
                    {profile.id == item.lastMessageFrom
                      ? 'Você: '
                      : `${item.customer_name}: `}
                    {item.lastMessageText}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.container}>
      <View style={styles.topGroup} />
      <FlatList
        data={Finishedroom}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              const user = {
                _id: `${profile.id}`,
                name: `${profile.name}`,
                firstName: profile.name,
                lastName: profile.name,
                roomName: item.key,
                avatar: `https://api.adorable.io/avatar/50/${item.key}.png`,
              };

              navigation.navigate('Chat', {
                user,
              });
            }}
          >
            {/* {alert('aaaaaa')} */}
            <View style={styles.groupContainer}>
              <Image
                style={styles.groupImage}
                source={{
                  uri: `https://api.adorable.io/avatar/50/${item.key}.png`,
                }}
              />
              <View style={styles.groupTextContainer}>
                <View style={styles.groupTitleContainer}>
                  <Text style={styles.groupName}> {item.key}</Text>
                  <Text style={styles.groupLastUpdated}>
                    {item.hourLastMessage}
                    {/* {alert(item.hourLastMessage)} */}
                  </Text>
                </View>

                <Text style={styles.groupUsername}>
                  {profile.id == item.idUserLastmessage
                    ? 'Você:'
                    : `${item.NameUserLastmessage}:`}
                </Text>
                <Text style={styles.groupText} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              {/* <NewNegotiation // onPress={handleSubmit}
              >
                Nova
              </NewNegotiation> */}
              <Icon name="angle-right" size={24} color="#8c8c8c" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#4ead93' }}
    />
  );

  return (
    <Background>
      <Title>Solicitações</Title>

      <Separator />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Background>
  );
}
