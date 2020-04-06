/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// import { useSelector } from 'react-redux';
// import { useField } from '@rocketseat/unform';
import { RNS3 } from 'react-native-aws3';
import ImagePicker from 'react-native-image-picker';
// import awsConfig from './config/AwsConfig';
import api from '~/services/api';

export default function AvatarInput() {
  const styles = StyleSheet.create({
    profileContainer: {
      alignItems: 'center',
      marginTop: 3,
      marginLeft: 6,
      marginBottom: 0,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginLeft: 6,
    },
  });
  // const user = useSelector(state => state.user.profile);

  // const { defaultValue, registerField } = useField('avatar');

  // const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState('');
  // const [nameAvatar, setNameAvatar] = useState('');
  const [urlAvatar, setUrlAvatar] = useState('');

  // const ref = useRef();

  // useEffect(() => {
  //   if (ref.current) {
  //     registerField({
  //       name: 'avatar_id',
  //       ref: ref.current,
  //       path: 'dataset.file',
  //     });
  //   }

  //   console.log(awsConfig, 'awsConfig');
  // }, [ref]);

  function messageIdGenerator() {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function checkPermissionCamera() {
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
      console.log('Permission result:', result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  async function handleImage() {
    checkPermissionCamera();
    const options = {
      title: 'Selecione uma Foto de Perfil',
      mediaType: 'Foto',
      takePhotoButtonTitle: 'Tire Uma Foto',
      chooseFromLibraryButtonTitle: 'Escolha da Galeria',
      maxWidth: 256,
      maxHeight: 256,
      allowsEditing: true,
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
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
        const nameAvatar = `${messageIdGenerator()}.${extension}`;
        //  setNameAvatar(nameAvatar);
        const options = {
          //  keyPrefix: awsConfig.keyPrefixAvatar,
          // bucket: awsConfig.bucket,
          // region: awsConfig.region,
          // accessKey: awsConfig.accessKey,
          // secretKey: awsConfig.secretKey,

          keyPrefix: 'avatars/',
          bucket: 'chattecne-app',
          region: 'sa-east-1',
          accessKey: 'AKIAIXKCGSVIFDLOF7AA',
          secretKey: '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',
        };
        const file = {
          uri,
          name: `${messageIdGenerator()}.${extension}`,
          type: correspondingMime[allowedExtensions.indexOf(extension)],
        };
        RNS3.put(file, options)
          .progress(event => {
            console.log(`percent: ${event.percent}`);
          })
          .then(response => {
            console.log(response, 'response from rns3');
            if (response.status !== 201) {
              alert(
                'Something went wrong, and the profile pic was not uploaded.'
              );
              console.error(response.body);
              return;
            }
            const urlImage = response.headers.Location;
            setUrlAvatar(urlImage);

            console.log(nameAvatar, 'nameAvatar');
            console.log(urlAvatar, 'urlAvatar');
            handleChange(nameAvatar, urlImage);
          });
        if (!allowedExtensions.includes(extension)) {
          return alert('That file type is not allowed.');
        }
      }
    });
  }

  async function handleChange(nameAvatar, urlAvatar) {
    const response = await api.post('files', {
      nameAvatar,
      urlAvatar,
    });

    console.log(response, 'RESPONSE CARAUI');

    const { url } = response.data;

    // setFile(id);
    setPreview(url);
  }

  return (
    <TouchableOpacity onPress={handleImage}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri:
              preview ||
              'https://api.adorable.io/avatars/120/abott@adorable.png',
          }}
          style={styles.profileImage}
        />
      </View>
    </TouchableOpacity>
  );
}
