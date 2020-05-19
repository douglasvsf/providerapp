/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { firebaseDB } from './config/FirebaseConfig';
import Background from '~/components/Background';
import { Title, Separator, NewNegotiation } from './styles';
import { colors } from '~/values/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
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
    marginLeft: 6,
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
    borderRadius: 5,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  groupTextContainer: {
    flex: 1,
    flexDirection: 'column',
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
  },
  groupUsername: {
    paddingVertical: 4,
  },
});

const initialLayout = { width: Dimensions.get('window').width };

export default function enterRoom({ navigation }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Abertas' },
    { key: 'second', title: 'Finalizadas' },
  ]);

  // this.state = {
  //   firstName: '',
  //   lastName: '',
  //   roomName: '',
  //   enterRoom: false,
  //   dataSource: [],
  // };

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [roomName, setrRoomName] = useState('');
  // const [enterRoom, setEnterRoom] = useState(false);
  const profile = useSelector(state => state.user.profile);
  const [Availableroom, setAvailableRooms] = useState([]);
  const [Finishedroom, setFinishedRooms] = useState([]);

  useEffect(() => {
    // Create reference
    const ref = firebaseDB.ref().child('chat');
    // ref.once('value', onSnapshot);

    const listener = ref.on('value', snapshot => {
      const listFinished = [];
      const listAvailable = [];
      // Create our own array of games in order
      snapshot.forEach(child => {
        const detailsFromChat = firebaseDB.ref(`/chat/${child.key}`);

        detailsFromChat.on('value', newsnapshot => {
          const lastmessage = newsnapshot.val().messages[0].text;
          const VerifyFinished = newsnapshot.val().isFinished;
          const idUserLastmessage = newsnapshot.val().messages[0].user._id;
          const NameUserLastmessage = newsnapshot.val().messages[0].user.name;

          // console.log(newsnapshot.val().messages[0], 'detalchat');
          // console.log(
          //   parseISO(newsnapshot.val().messages[0].createdAt),
          //   'timevalue'
          // );

          if (newsnapshot.val().messages[0].createdAt) {
            const scheduleFormated = formatRelative(
              parseISO(newsnapshot.val().messages[0].createdAt),
              new Date(),
              {
                locale: pt,
                addSuffix: true,
              }
            );

            // console.log(scheduleFormated, 'detailchat');
            if (VerifyFinished == true) {
              listFinished.push({
                key: child.key,
                lastMessage: lastmessage,
                hourLastMessage: scheduleFormated,
                idUserLastmessage,
                NameUserLastmessage,
              });
            } else {
              listAvailable.push({
                key: child.key,
                lastMessage: lastmessage,
                hourLastMessage: scheduleFormated,
                idUserLastmessage,
                NameUserLastmessage,
              });
            }

            // alert(child.key);
            // alert(lastmessage);
            // alert(scheduleFormated);
            // alert(idUserLastmessage);
            // alert(NameUserLastmessage);
          }
        });
      });

      // this.setState({
      //   room: list,
      // });

      setFinishedRooms(listFinished);

      setAvailableRooms(listAvailable);
    });
    return () => ref.off('value', listener);

    // function onSnapshot(snapshot) {
    //   const list = [];

    //   // Create our own array of games in order
    //   snapshot.forEach(child => {
    //     const detailsFromChat = firebaseDB.ref(`/chat/${child.key}`);

    //     detailsFromChat.on('value', newsnapshot => {
    //       const lastmessage = newsnapshot.val().messages[0].text;
    //       const idUserLastmessage = newsnapshot.val().messages[0].user._id;
    //       const NameUserLastmessage = newsnapshot.val().messages[0].user.name;

    //       // console.log(newsnapshot.val().messages[0], 'detalchat');
    //       // console.log(
    //       //   parseISO(newsnapshot.val().messages[0].createdAt),
    //       //   'timevalue'
    //       // );

    //       if (newsnapshot.val().messages[0].createdAt) {
    //         const scheduleFormated = formatRelative(
    //           parseISO(newsnapshot.val().messages[0].createdAt),
    //           new Date(),
    //           {
    //             locale: pt,
    //             addSuffix: true,
    //           }
    //         );

    //         // console.log(scheduleFormated, 'detailchat');

    //         list.push({
    //           key: child.key,
    //           lastMessage: lastmessage,
    //           hourLastMessage: scheduleFormated,
    //           idUserLastmessage,
    //           NameUserLastmessage,
    //         });

    //         // alert(child.key);
    //         // alert(lastmessage);
    //         // alert(scheduleFormated);
    //         // alert(idUserLastmessage);
    //         // alert(NameUserLastmessage);
    //       }
    //     });
    //   });

    //   // this.setState({
    //   //   room: list,
    //   // });
    //   setRooms(list);
    //   // alert(room[0].key)
    //   // console.log(list[0], 'roomwtf');
    // }
  }, []);
  // const [dataSource, setDataSource] = useState([]);

  // Handle snapshot response

  // function listenForItems(roomRef) {
  //   firebaseDB
  //     .ref()
  //     .child('chat')
  //     .on('value', snap => {
  //       // get children as an array
  //       const items = [];
  //       snap.forEach(child => {
  //         items.push({
  //           name: child.key,
  //         });
  //       });

  //       this.setState({
  //         dataSource: items,
  //       });
  //     });
  // }

  // function onSubmitEdit() {
  //   const { firstName, lastName } = this.state;
  //   if (firstName && lastName) {
  //     this.setState({ enterRoom });
  //   } else {
  //     alert('please enter your name');
  //   }
  // }

  // function enterRoom() {
  //   // console.log(this.state, 'state');
  //  // const { firstName, lastName, roomName } = this.state;
  //   const user = {
  //     _id: `${firstName}${lastName}`,
  //     name: `${firstName}${lastName}`,
  //     firstName,
  //     lastName,
  //     roomName,
  //     avatar: `https://api.adorable.io/avatar/50/teste.png`,
  //   };

  //   navigation.navigate('Chat', { user });
  // }
  // renderRow = rowData => {
  //   const user = {
  //     _id: `${profile.id}${profile.id}`,
  //     name: `${profile.name}${profile.name}`,
  //     firstName: profile.name,
  //     lastName: profile.name,
  //     roomName: 'teste',
  //     avatar: `https://api.adorable.io/avatar/50/teste.png`,
  //   };

  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         navigation.navigate('Chat', {
  //           user,
  //         });
  //       }}
  //     >
  //       <View style={styles.profileContainer}>
  //         <Image
  //           source={{
  //             uri: 'https://api.adorable.io/avatar/50/teste.png',
  //           }}
  //           style={styles.profileImage}
  //         />
  //         <Text style={styles.profileName}>{rowData.name}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

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
              <Icon name="angle-right" size={24} color="#8c8c8c" />
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

