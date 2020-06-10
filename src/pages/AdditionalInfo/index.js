import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Switch,
  CheckBox,
  Text,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import DateInput from '~/components/DateInput';

import api from '../../services/api';

import {
  Container,
  ContainerFull,
  TInput,
  Separator,
  Title,
  Form,
  FormInput,
  TitleInto,
  SubmitButton,
  NewPicker,
} from './styles';
import { colors } from '~/values/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    paddingHorizontal: 5,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 0,
    paddingRight: 15,
  },
  textarea: {
    width: '100%',
    color: 'white',
    textAlignVertical: 'top',
  },
  icon: {
    paddingTop: 10,
    paddingLeft: 5,
    textAlignVertical: 'top',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default function AdditionalInfo({
  isNewProvider,
  onSubmitNewProvider,
  navigation,
}) {
  const fantasyRef = useRef();
  const briefref = useRef();
  const generalref = useRef();
  const fullnameref = useRef();
  const profileName = useSelector(state => state.user.profile.name);
  const [isCpfEnabled, setIsCpfEnabled] = useState(true);
  const [isCnpjEnabled, setIsCnpjEnabled] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [type, setType] = useState('cpf');
  const [cpf, setCpf] = useState('');
  const [genre, setGenre] = useState('Selecione');
  const [companyname, setCompanyname] = useState('');
  const [rg, setRg] = useState('');
  const [fantasyname, setFantasyname] = useState(profileName);
  const [fullname, setFullname] = useState(profileName);
  const [briefdesc, setBriefdesc] = useState('');
  const [placeholder, setPlaceholder] = useState('CPF');
  const [birthday, setBirthday] = useState(new Date());

  const [additionalCpf, setAdditionalCpf] = useState([]);
  const [additionalCnpj, setAdditionalCnpj] = useState([]);
  const [AdditionalInfos, setAdditionalInfos] = useState([]);
  const additionalCpfArray = Array.from(additionalCpf);
  const additionalCnpjArray = Array.from(additionalCnpj);
  let newcpf = cpf.replace('.', '');
  newcpf = newcpf.replace('-', '');
  newcpf = newcpf.replace('/', '');
  newcpf = newcpf.replace('.', '');

  additionalCpfArray.push({
    cpf: newcpf,
    rg,
    fullName: fullname,
    genre,
    birthday,
    briefDescription: briefdesc,
  });

  additionalCnpjArray.push({
    cnpj: newcpf,
    companyName: companyname,
    fantasyName: fantasyname,
    briefDescription: briefdesc,
  });
  const togglePessoa = () => {
    setIsCpfEnabled(previousState => !previousState);
    setIsCnpjEnabled(previousState => !previousState);
    if (isCnpjEnabled === true) {
      setType('cnpj');
      setPlaceholder('CNPJ');
    } else {
      setType('cpf');
      setPlaceholder('CPF');
    }
  };
  const token = useSelector(state => state.auth.token);
  const profileId = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function loadAdditionalInfo() {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await api
        .get(`users/${profileId}/additional_info`)
        .then(response => {
          if (response.data != null) {
            if (response.data.cpf != undefined) {
              // se for cpf
              setIsCpfEnabled(true);
              setIsCnpjEnabled(false);
              // setIsEnabled(false);
              setType('cpf');
              setCpf(response.data.cpf);
              setGenre(response.data.genre);
              setRg(response.data.rg);
              setFullname(response.data.full_name);
              setBriefdesc(response.data.brief_description);
              setPlaceholder('CPF');
              // console.log(new Date(newData.birthday));
              setBirthday(new Date(response.data.birthday));

              const verifyIsBack = !!isNewProvider;
              setIsBack(verifyIsBack);
            } else if (response.data.cnpj != undefined) {
              setIsCpfEnabled(false);
              setIsCnpjEnabled(true);
              // setIsEnabled(true);
              setType('cnpj');
              setCpf(response.data.cnpj);
              setCompanyname(response.data.company_name);
              setFantasyname(response.data.fantasy_name);
              setBriefdesc(response.data.brief_description);
              setPlaceholder('CNPJ');
              const verifyIsBack = !!isNewProvider;
              setIsBack(verifyIsBack);
            }
          }
        })
        .catch(err => {
          Snackbar.show({
            text: 'Certifique-se que possui conexão com internet',
            duration: Snackbar.LENGTH_LONG,
          });
        });
    }
    loadAdditionalInfo();
  }, [isNewProvider, profileId, token]);

  async function UpdateAdditionalInfo() {
    const newAdditionalInfo =
      type === 'cpf' ? additionalCpfArray : additionalCnpjArray;

    const resultNewAdditionalInfo = newAdditionalInfo.find(obj => {
      return obj;
    });
    api.defaults.headers.Authorization = `Bearer ${token}`;
    await api
      .put(`users/${profileId}/additional_info`, resultNewAdditionalInfo)
      .then(response => {
        // console.log('bb', response);
        // const newData =
        //   response.data.additionalInfoCpf == null
        //     ? response.data.additionalInfoCnpj
        //     : response.data.additionalInfoCpf;
        // setAdditionalInfos(newData);

        if (type === 'cpf') {
          // se for cpf
          // setIsEnabled(false);
          setIsCpfEnabled(true);
          setIsCnpjEnabled(false);
          setType('cpf');
          setCpf(response.data.cpf);
          setGenre(response.data.genre);
          setRg(response.data.rg);
          setFullname(response.data.full_name);
          setBriefdesc(response.data.brief_description);
          setPlaceholder('CPF');
          // console.log(new Date(newData.birthday));
          setBirthday(new Date(response.data.birthday));

          const verifyIsBack = !!isNewProvider;

          if (verifyIsBack) {
            navigation.navigate('SocialMediaScreen');
          }
        } else if (type === 'cnpj') {
          //setIsEnabled(true);
          setIsCpfEnabled(false);
          setIsCnpjEnabled(true);
          setType('cnpj');
          setCpf(response.data.cnpj);
          setCompanyname(response.data.company_name);
          setFantasyname(response.data.fantasy_name);
          setBriefdesc(response.data.brief_description);
          setPlaceholder('CNPJ');

          const verifyIsBack = !!isNewProvider;

          if (verifyIsBack) {
            navigation.navigate('SocialMediaScreen');
          }
        }
      })
      .catch(err => {
        Snackbar.show({
          text: 'Certifique-se que todos campos estão preenchidos',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  const handleSubmitNewProvider = useCallback(async () => {
    const arrayGeneral =
      type === 'cpf' ? additionalCpfArray : additionalCnpjArray;
    const responseSubmitNew = await onSubmitNewProvider(arrayGeneral);

    if (responseSubmitNew === 0) {
      Snackbar.show({
        text: 'Certifique-se que todos campos estão preenchidos',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      setIsBack(true);
    }
  }, [additionalCnpjArray, additionalCpfArray, onSubmitNewProvider, type]);

  return (
    <Background>
      <ContainerFull>
        <Title> Informações Adicionais </Title>

        <Form>
          <Container>
            {/* <TitleInto> Pessoa Jurídica </TitleInto>

            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            /> */}

            <View style={styles.container}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isCnpjEnabled}
                  onValueChange={togglePessoa}
                  style={styles.checkbox}
                />
                <Text style={styles.label}> Pessoa Jurídica</Text>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isCpfEnabled}
                  onValueChange={togglePessoa}
                  style={styles.checkbox}
                />
                <Text style={styles.label}> Pessoa Fisica</Text>
              </View>
            </View>
          </Container>

          <Separator />

          <Container>
            <Icon
              name="lock-outline"
              size={20}
              color="rgba(255, 255, 255, 0.6)"
            />

            <TInput
              type={type}
              autoCorrect={false}
              value={cpf}
              autoCapitalize="none"
              placeholder={placeholder}
              onSubmitEditing={() => generalref.current.focus()}
              onChangeText={setCpf}
            />
          </Container>
          <Separator />
          {isCnpjEnabled === true ? (
            <>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Razão Social"
                returnKeyType="next"
                onSubmitEditing={() => fantasyRef.current.focus()}
                value={companyname}
                ref={generalref}
                onChangeText={setCompanyname}
              />
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Nome Fantasia"
                returnKeyType="next"
                ref={fantasyRef}
                onSubmitEditing={() => briefref.current.focus()}
                value={fantasyname}
                onChangeText={setFantasyname}
              />

              <Separator />
            </>
          ) : (
            <>
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="RG(somente números)"
                returnKeyType="next"
                onSubmitEditing={() => fullnameref.current.focus()}
                value={rg}
                ref={generalref}
                keyboardType="numeric"
                onChangeText={setRg}
              />
              <FormInput
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Nome Completo"
                returnKeyType="next"
                ref={fullnameref}
                value={fullname}
                onChangeText={setFullname}
              />

              <TitleInto> Data de nascimento</TitleInto>
              <DateInput date={birthday} onChange={setBirthday} />
              <Separator />

              <Container>
                <Icon name="wc" size={20} color="rgba(255, 255, 255, 0.8)" />
                <TitleInto> Gênero: </TitleInto>
                <NewPicker
                  selectedValue={genre}
                  style={{
                    height: 50,
                    width: 100,
                  }}
                  onValueChange={itemValue => {
                    setGenre(itemValue);
                    briefref.current.focus();
                  }}
                >
                  <NewPicker.Item label="Selecione" value="" />
                  <NewPicker.Item label="Masculino" value="M" />
                  <NewPicker.Item label="Feminino" value="F" />
                  <NewPicker.Item label="Outros" value="O" />
                </NewPicker>
              </Container>

              <Separator />
            </>
          )}

          <View style={styles.textareaContainer}>
            <Icon
              name="subject"
              size={20}
              style={styles.icon}
              color="rgba(255, 255, 255, 0.8)"
            />
            <TextInput
              multiline
              maxLength={120}
              numberOfLines={6}
              ref={briefref}
              style={styles.textarea}
              value={briefdesc}
              onChangeText={setBriefdesc}
              placeholder="Breve Descrição de Seus Serviços"
              placeholderTextColor="rgba(255, 255, 255, 0.8)"
            />
          </View>

          {isNewProvider && !isBack ? (
            <SubmitButton onPress={handleSubmitNewProvider}>
              Próximo
            </SubmitButton>
          ) : (
            <SubmitButton onPress={UpdateAdditionalInfo}>
              Atualizar Informações Adicionais
            </SubmitButton>
          )}
        </Form>
      </ContainerFull>
    </Background>
  );
}

AdditionalInfo.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Informações Adicionais',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="info" size={20} color={tintColor} />
  ),
};
