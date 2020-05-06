import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, TextInput, Switch } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import DateInput from '~/components/DateInput';

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

export default function AdditionalInfo({ isNewProvider, onSubmitNewProvider }) {
  const fantasyRef = useRef();
  const briefref = useRef();
  const generalref = useRef();
  const fullnameref = useRef();

  const [isEnabled, setIsEnabled] = useState(false);
  const [type, setType] = useState('cpf');
  const [cpf, setCpf] = useState('');
  const [genre, setGenre] = useState('Selecione');
  const [companyname, setCompanyname] = useState('');
  const [rg, setRg] = useState('');
  const [fantasyname, setFantasyname] = useState('');
  const [fullname, setFullname] = useState('');
  const [briefdesc, setBriefdesc] = useState('');

  const [placeholder, setPlaceholder] = useState('CPF');
  const [birthday, setBirthday] = useState(new Date());
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled === true) {
      setType('cnpj');
      setPlaceholder('CNPJ');
    } else {
      setType('cpf');
      setPlaceholder('CPF');
    }
  };

  const handleSubmitNewProvider = useCallback(() => {
    onSubmitNewProvider({});
  }, [onSubmitNewProvider]);

  return (
    <Background>
      <ContainerFull>
        <Title> Informações Adicionais </Title>

        <Form>
          <Container>
            <TitleInto> Pessoa Jurídica </TitleInto>

            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
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
          {isEnabled === true ? (
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

          {isNewProvider ? (
            <SubmitButton onPress={handleSubmitNewProvider}>
              Próximo
            </SubmitButton>
          ) : (
            <SubmitButton>Atualizar Informações Adicionais</SubmitButton>
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
