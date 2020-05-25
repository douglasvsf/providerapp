import propTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, PermissionsAndroid, Platform, Text, View } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { RNS3 } from 'react-native-aws3';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
//const ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-picker';
import NavigationBar from 'react-native-navbar';
import Sound from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '~/utils/colors';
import { awsConfig } from './config/AwsConfig';
import { firebaseDB } from './config/FirebaseConfig';
import { Submit, SubmitButton } from './styles';

export default class Chat extends Component {
  static propTypes = {
    user: propTypes.object,
  };

  state = {
    messages: [],
    startAudio: false,
    hasPermission: false,
    audioPath: `${
      AudioUtils.DocumentDirectoryPath
      }/${this.messageIdGenerator()}test.aac`,
    playAudio: false,
    fetchChats: false,
    audioSettings: {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      MeteringEnabled: true,
      IncludeBase64: true,
      AudioEncodingBitRate: 32000,
    },
  };

  componentWillMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const provider = navigation.getParam('provider')

    //console.log(awsConfig, 'awsConfig');
    //console.log(this.props, 'chat props');
    this.chatsFromFB = firebaseDB.ref(`/chat/${user.roomName}`);
    //console.log(this.chatsFromFB, 'chats from fb');

    this.checkPermissionCamera();

    this.chatsFromFB.on('value', snapshot => {
      // console.log(snapshot.val(), 'snap shot');
      if (!snapshot.val()) {
        this.setState({
          fetchChats: true,
        });
        return;
      }
      let { messages } = snapshot.val();
      messages = messages.map(node => {
        //console.log(node, 'node');
        const message = {};
        message._id = node._id;
        message.text = node.messageType === 'message' ? node.text : '';
        message.createdAt = node.createdAt;
        message.user = {
          _id: node.from,
          name: node.from === user._id ? user.name : provider.name,
          avatar: node.from === user._id ? user.avatar : provider.avatar,
        };
        message.from = node.from,
          message.image = node.messageType === 'image' ? node.image : '';
        message.audio = node.messageType === 'audio' ? node.audio : '';
        message.messageType = node.messageType;
        return message;
      });

      this.setState({
        messages: [...messages],
      });
    });
  }
  componentDidMount() {
    this.checkPermission().then(async hasPermission => {
      this.setState({ hasPermission });
      if (!hasPermission) return;
      await AudioRecorder.prepareRecordingAtPath(
        this.state.audioPath,
        this.state.audioSettings
      );
      AudioRecorder.onProgress = data => {
        //console.log(data, 'onProgress data');
      };
      AudioRecorder.onFinished = data => {
        //console.log(data, 'on finish');
      };
    });
  }
  componentWillUnmount() {
    this.setState({
      messages: [],
    });
  }

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    const rationale = {
      title: 'Permissão Microfone',
      message: 'Acesso ao Microfone.',
    };
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale
    ).then(result => {
      //console.log('Permission result:', result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  checkPermissionCamera() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    const rationale = {
      title: 'Permissão Camêra',
      message: 'CAMERA.',
    };
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      rationale
    ).then(result => {
      //console.log('Permission result:', result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  onSend(messages = []) {
    const { navigation } = this.props
    const user = navigation.getParam('user')

    messages[0].messageType = 'message';
    messages[0].from = user._id;

    const updatedMessages = [messages[0], ...this.state.messages]
      .map(({ user, ...message }) => message)

    this.chatsFromFB.update({
      messages: updatedMessages,
    });
  }
  renderName = props => {

    const { user: currentMessageUser } = props.currentMessage
    const { user: previousMessageUser } = props.previousMessage

    const shouldRenderName = !previousMessageUser || currentMessageUser._id !== previousMessageUser._id

    const { name } = currentMessageUser
    const firstName = name.split(' ')[0]

    return shouldRenderName ? (
      <View>
        <Text style={{ color: 'grey', padding: 2, alignSelf: 'center' }}>
          {`${firstName}.`}
        </Text>
      </View>
    ) : (
        <View />
      );
  };
  renderAudio = props => {
    return !props.currentMessage.audio ? (
      <View />
    ) : (
        <Ionicons
          name="ios-play"
          size={35}
          color={this.state.playAudio ? 'red' : 'blue'}
          style={{
            left: 90,
            position: 'relative',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            backgroundColor: 'transparent',
          }}
          onPress={() => {
            this.setState({
              playAudio: true,
            });
            const sound = new Sound(props.currentMessage.audio, '', error => {
              if (error) {
                //console.log('failed to load the sound', error);
              }
              this.setState({ playAudio: false });
              sound.play(success => {
                //console.log(success, 'success play');
                if (!success) {
                  Alert.alert('Erro ao Reproduzir Audio');
                }
              });
            });
          }}
        />
      );
  };
  renderBubble = props => {
    return (
      <View>
        {this.renderName(props)}
        {this.renderAudio(props)}
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: colors.primary,
            },
          }}
        />
      </View>
    );
  };

  renderSend = ({ onSend, ...props }) => {
    return (
      <Send {...props} onSend={onSend} label="Enviar" textStyle={{ color: colors.primary }} />
    );
  };

  handleAvatarPress = props => {
    // add navigation to user's profile
  };
  handleAudio = async () => {
    //console.log(this.state.startAudio, 'stado do audio');

    // const { user } = this.props;
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    if (this.state.startAudio == false) {
      // se clica e start audio for falso, ja bota true e starta
      this.setState({
        startAudio: true,
      });

      AudioRecorder.prepareRecordingAtPath(
        this.state.audioPath,
        this.state.audioSettings
      );
      await AudioRecorder.startRecording();
    } else {
      //se clica e start audio for true ja seta false e para

      this.setState({ startAudio: false });
      await AudioRecorder.stopRecording();
      const { audioPath } = this.state;
      const fileName = `${this.messageIdGenerator()}.aac`;
      const file = {
        uri: Platform.OS === 'ios' ? audioPath : `file://${audioPath}`,
        name: fileName,
        type: `audio/aac`,
      };
      const options = {
        keyPrefix: awsConfig.keyPrefix,
        bucket: awsConfig.bucket,
        region: awsConfig.region,
        accessKey: awsConfig.accessKey,
        secretKey: awsConfig.secretKey,
      };
      RNS3.put(file, options)
        .progress(event => {
          // console.log(`percent: ${event.percent}`);
        })
        .then(response => {
          // console.log(response, 'response from rns3 audio');
          if (response.status !== 201) {
            alert('Something went wrong, and the audio was not uploaded.');
            //console.error(response.body);
            return;
          }
          const message = {};
          message._id = this.messageIdGenerator();
          message.createdAt = new Date().toISOString();
          message.from = user._id;
          message.text = '';
          message.audio = response.headers.Location;
          message.messageType = 'audio';

          this.chatsFromFB.update({
            messages: [message, ...this.state.messages]
              .map(({ user, ...message }) => message),
          });
        })
        .catch(err => {
          //console.log(err, 'err from audio upload');
        });
    }
  };
  messageIdGenerator() {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  sendChatToDB(data) {
    // send your chat to your db
  }
  handleAddPicture = () => {
    //  const { user } = this.props; // wherever you user data is stored;
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const options = {
      title: 'Select Profile Pic',
      mediaType: 'photo',
      takePhotoButtonTitle: 'Take a Photo',
      maxWidth: 256,
      maxHeight: 256,
      allowsEditing: true,
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // do nothing
      } else if (response.error) {
        // alert error
      } else {
        const { uri } = response;
        const extensionIndex = uri.lastIndexOf('.');
        const extension = uri.slice(extensionIndex + 1);
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const correspondingMime = ['image/jpeg', 'image/jpeg', 'image/png'];
        const options = {
          keyPrefix: awsConfig.keyPrefix,
          bucket: awsConfig.bucket,
          region: awsConfig.region,
          accessKey: awsConfig.accessKey,
          secretKey: awsConfig.secretKey,
        };
        const file = {
          uri,
          name: `${this.messageIdGenerator()}.${extension}`,
          type: correspondingMime[allowedExtensions.indexOf(extension)],
        };
        RNS3.put(file, options)
          .progress(event => {
            // console.log(`percent: ${event.percent}`);
          })
          .then(response => {
            // console.log(response, 'response from rns3');
            if (response.status !== 201) {
              alert(
                'Something went wrong, and the profile pic was not uploaded.'
              );
              //console.error(response.body);
              return;
            }
            const message = {};
            message._id = this.messageIdGenerator();
            message.createdAt = new Date().toISOString();
            message.from = user._id;
            message.image = response.headers.Location;
            message.messageType = 'image';

            this.chatsFromFB.update({
              messages: [message, ...this.state.messages]
                .map(({ user, ...message }) => message),
            });
          });
        if (!allowedExtensions.includes(extension)) {
          return alert('That file type is not allowed.');
        }
      }
    });
  };
  renderAndroidMicrophone() {
    if (Platform.OS === 'android') {
      return (
        <Ionicons
          name="ios-mic"
          size={35}
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
          color={this.state.startAudio ? 'red' : 'black'}
          style={{
            bottom: 50,
            right: Dimensions.get('window').width / 2,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            zIndex: 2,
            backgroundColor: 'transparent',
          }}
          onPress={this.handleAudio}
        />
      );
    }
  }
  renderLoading() {
    if (!this.state.messages.length && !this.state.fetchChats) {
      return (
        <View style={{ marginTop: 100 }}>
          <ActivityIndicator color="black" animating size="large" />
        </View>
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const rightButtonConfig = {
      title: '+Imagem',
      tintColor: colors.primary,
      handler: this.handleAddPicture,
    };

    const leftButtonConfig = {
      title: 'Voltar',
      tintColor: colors.primary,
      handler: () => navigation.navigate('enterRoom'),
    };
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title={{ title: 'Solicitação' }}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
        />
        {this.renderLoading()}

        <SubmitButton>Contratar Serviço</SubmitButton>

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          alwaysShowSend
          showUserAvatar
          optionTintColor={colors.primary}
          isAnimated
          showAvatarForEveryMessage
          renderBubble={this.renderBubble}
          messageIdGenerator={this.messageIdGenerator}
          onPressAvatar={this.handleAvatarPress}
          renderSend={this.renderSend}
          renderActions={() => {
            if (Platform.OS === 'android') {
              return (
                <Submit onPress={this.handleAudio}>
                  <Ionicons
                    name="ios-mic"
                    size={35}
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                    color={this.state.startAudio ? 'red' : 'black'}
                    style={{
                      bottom: 50,
                      right: Dimensions.get('window').width / 2,
                      position: 'absolute',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.5,
                      zIndex: 2,
                      backgroundColor: 'transparent',
                    }}
                  />
                </Submit>
              );
            }
          }}
          user={{
            _id: user._id,
            name: `${user.firstName}`,
            avatar: user.avatar,
          }}
        />
        <KeyboardAvoidingView />
      </View>
    );
  }
}
