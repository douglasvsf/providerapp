import React, { useRef, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-native-modal';
import BackgroundInitial from '~/components/BackgroundInitial';
import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
  Cima,
  Meio,
  Separator,
} from './styles';

const xml = `
<svg width="195" height="112" viewBox="0 0 195 112" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M56.4 83.88H28.62V111.66H0.839996V83.88H28.62C28.62 83.88 28.74 44.93 28.74 43.55C28.7 22.08 39.46 -0.860005 76.23 0.119995L138.49 0.100006V27.87L76.23 27.89C62.61 27.89 56.54 31.89 56.54 44.44L56.4 83.88Z" fill="url(#paint0_linear)"/>
<path d="M194.21 27.87H166.43L166.32 55.65C166.39 57.31 166.31 66.83 166.32 68.2C166.36 89.67 155.6 112.61 118.83 111.63L56.57 111.65V83.89L118.83 83.87C132.44 83.87 138.52 79.87 138.52 67.32C138.52 65.84 138.66 55.54 138.66 55.54V27.88H166.44V0.100006H194.22V27.87H194.21Z" fill="url(#paint1_linear)"/>
<defs>
<linearGradient id="paint0_linear" x1="0.843396" y1="55.8759" x2="138.482" y2="55.8759" gradientUnits="userSpaceOnUse">
<stop stop-color="#4EAD93"/>
<stop offset="0.2255" stop-color="#5DB394"/>
<stop offset="1" stop-color="#87C598"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="56.5667" y1="55.876" x2="194.206" y2="55.876" gradientUnits="userSpaceOnUse">
<stop stop-color="#4EAD93"/>
<stop offset="0.2255" stop-color="#5DB394"/>
<stop offset="1" stop-color="#87C598"/>
</linearGradient>
</defs>
</svg>

`;

const xmlCima = `

<svg width="137" height="87" viewBox="0 0 117 67" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M57.57 27.57C57.55 27.57 57.54 27.59 57.55 27.61C57.89 28.39 58.38 29.08 59.03 29.68C59.53 30.18 60.07 30.58 60.64 30.91V27.57H57.57Z" fill="white"/>
<path d="M32.01 54.47H18.52C18.86 55.26 19.36 55.96 20.01 56.58C20.73 57.3 21.54 57.84 22.43 58.2C23.32 58.56 24.27 58.74 25.26 58.74C26.67 58.74 27.92 58.41 29.02 57.76L35.46 60.33C34.22 61.77 32.73 62.9 30.98 63.7C29.23 64.51 27.32 64.91 25.26 64.91C23.37 64.91 21.6 64.56 19.96 63.85C18.31 63.15 16.87 62.18 15.64 60.94C14.4 59.7 13.43 58.26 12.73 56.62C12.03 54.97 11.67 53.22 11.67 51.37C11.67 49.48 12.02 47.71 12.73 46.07C13.43 44.42 14.4 42.98 15.64 41.75C16.88 40.51 18.32 39.54 19.96 38.84C21.61 38.14 23.38 37.78 25.26 37.78C27.15 37.78 28.92 38.13 30.56 38.84C32.21 39.54 33.65 40.51 34.88 41.75C36.12 42.99 37.09 44.43 37.79 46.07C38.49 47.72 38.85 49.49 38.85 51.37C38.85 52.47 38.73 53.5 38.49 54.46H32.01V54.47ZM25.26 43.97C23.27 43.97 21.52 44.69 20.01 46.13C19.36 46.78 18.86 47.5 18.52 48.29H32.01C31.67 47.5 31.17 46.78 30.52 46.13C29.07 44.69 27.32 43.97 25.26 43.97Z" fill="white"/>
<path d="M110.02 54.47H96.53C96.87 55.26 97.37 55.96 98.02 56.58C98.74 57.3 99.55 57.84 100.44 58.2C101.33 58.56 102.28 58.74 103.27 58.74C104.68 58.74 105.93 58.41 107.03 57.76L113.47 60.33C112.23 61.77 110.74 62.9 108.99 63.7C107.24 64.51 105.33 64.91 103.27 64.91C101.38 64.91 99.61 64.56 97.97 63.85C96.32 63.15 94.88 62.18 93.65 60.94C92.41 59.7 91.44 58.26 90.74 56.62C90.04 54.97 89.68 53.22 89.68 51.37C89.68 49.48 90.03 47.71 90.74 46.07C91.44 44.42 92.41 42.98 93.65 41.75C94.89 40.51 96.33 39.54 97.97 38.84C99.62 38.14 101.39 37.78 103.27 37.78C105.16 37.78 106.93 38.13 108.57 38.84C110.22 39.54 111.66 40.51 112.89 41.75C114.13 42.99 115.1 44.43 115.8 46.07C116.5 47.72 116.86 49.49 116.86 51.37C116.86 52.47 116.74 53.5 116.5 54.46H110.02V54.47ZM103.27 43.97C101.28 43.97 99.53 44.69 98.02 46.13C97.37 46.78 96.87 47.5 96.53 48.29H110.02C109.68 47.5 109.18 46.78 108.53 46.13C107.08 44.69 105.33 43.97 103.27 43.97Z" fill="white"/>
<path d="M12.82 60.34C12.54 60.38 10.5 60.34 10.17 60.34C7.33999 60.34 6.43999 58.97 6.43999 55.91V41.89H0.189993V55.91C-0.0300073 64.19 5.14 66.61 9.97 66.6C10.29 66.6 12.52 66.62 12.82 66.6V60.34V60.34Z" fill="white"/>
<path d="M6.43999 29.33H0.179993V35.59H6.43999V29.33Z" fill="white"/>
<path d="M62.83 60.94C61.59 62.18 60.14 63.16 58.48 63.86C56.82 64.57 55.05 64.92 53.15 64.92C51.25 64.92 49.48 64.57 47.82 63.86C46.16 63.15 44.71 62.18 43.47 60.94C42.23 59.7 41.25 58.25 40.55 56.59C39.84 54.93 39.49 53.17 39.49 51.31C39.49 49.41 39.84 47.64 40.55 45.98C41.26 44.32 42.23 42.87 43.47 41.63C44.71 40.39 46.16 39.41 47.82 38.71C49.48 38 51.25 37.65 53.15 37.65C55.05 37.65 56.82 38 58.48 38.71C60.14 39.42 61.59 40.39 62.83 41.63L58.43 46.03C56.98 44.58 55.22 43.86 53.15 43.86C51.15 43.86 49.39 44.58 47.87 46.03C46.42 47.48 45.7 49.24 45.7 51.31C45.7 53.35 46.42 55.09 47.87 56.54C48.59 57.26 49.41 57.81 50.3 58.17C51.2 58.53 52.15 58.71 53.15 58.71C55.25 58.71 57.01 57.99 58.43 56.54L62.83 60.94Z" fill="white"/>
<path d="M76.13 38.35C70.94 38.47 67.41 40.53 65.12 43.7C64.06 45.47 63.47 47.64 63.47 50.12V64.93H69.79V50.3C69.79 46.53 72.16 43.92 75.99 43.92C76.04 43.92 76.09 43.93 76.14 43.93C76.19 43.93 76.24 43.92 76.29 43.92C80.12 43.92 82.49 46.53 82.49 50.3V64.93H88.81V50.12C88.81 47.64 88.22 45.47 87.16 43.7C84.85 40.53 81.32 38.46 76.13 38.35Z" fill="white"/>
<path d="M12.7 35.59H6.43999V41.85H12.7V35.59Z" fill="url(#paint0_linear)"/>
<path d="M47.49 23.45H40.04V30.9H32.59V23.45H40.04C40.04 23.45 40.07 13 40.07 12.63C40.06 6.87 42.94 0.719998 52.81 0.979998H69.51V8.43H52.81C49.16 8.43 47.53 9.5 47.53 12.87L47.49 23.45Z" fill="url(#paint1_linear)"/>
<path d="M84.46 8.43H77.01L76.98 15.88C77 16.33 76.98 18.88 76.98 19.25C76.99 25.01 74.11 31.16 64.24 30.9H47.54V23.45H64.24C67.89 23.45 69.52 22.38 69.52 19.01C69.52 18.61 69.56 15.85 69.56 15.85V8.43H77.01V0.98H84.46V8.43Z" fill="url(#paint2_linear)"/>
<defs>
<linearGradient id="paint0_linear" x1="6.43939" y1="38.7155" x2="12.6954" y2="38.7155" gradientUnits="userSpaceOnUse">
<stop stop-color="#4EAD93"/>
<stop offset="0.2255" stop-color="#5DB394"/>
<stop offset="1" stop-color="#87C598"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="32.5898" y1="15.938" x2="69.5115" y2="15.938" gradientUnits="userSpaceOnUse">
<stop stop-color="#4EAD93"/>
<stop offset="0.2255" stop-color="#5DB394"/>
<stop offset="1" stop-color="#87C598"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="47.5376" y1="15.9381" x2="84.4594" y2="15.9381" gradientUnits="userSpaceOnUse">
<stop stop-color="#4EAD93"/>
<stop offset="0.2255" stop-color="#5DB394"/>
<stop offset="1" stop-color="#87C598"/>
</linearGradient>
</defs>
</svg>

`;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
  },
  containerC: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: '70%',
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonAgree: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },

  buttonC: {
    backgroundColor: '#4EAD93',
    borderRadius: 5,
    padding: 10,
  },
  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  label: {
    margin: 8,
  },
});

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [isModalVisible, setisModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    if (password === passwordCheck) {
      setisModalVisible(!isModalVisible);
    } else {
      Snackbar.show({
        text: 'Senhas n??o conferem',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  const toggleAccepted = () => {
    setAccepted(previousState => !previousState);
    setConfirmed(previousState => !previousState);
  };

  function handleLogin() {
    setisModalVisible(!isModalVisible);
    dispatch(signUpRequest(name, email, password, navigation));
  }

  function handleConfirm() {
    alert('Termos e Condi????es Aceitados');
    setConfirmed(true);
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent)) {
      setAccepted(true);
      setConfirmed(true);
    }
  };
  return (
    <BackgroundInitial>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setisModalVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Termos e Condi????es de Uso</Text>
            <ScrollView style={styles.tcContainer} onScroll={onScroll}>
              <Text style={styles.tcP}>
              O seguinte Termo de Uso regulamenta a rela????o, o acesso, os direitos, os deveres e os
consentimentos em qualquer ponto do Territ??rio Nacional, da plataforma TECNE
(aplicativo para dispositivos m??veis, p??ginas na Web, perfis em redes
sociais, conte??dos, produtos ou servi??os), que s??o disponibilizados por DAYANE C.
HOMAN LTDA, pessoa jur??dica inscrita no CNPJ sob o n??mero 37.332.157/0001-24,
aqui nesse contrato chamada de TECNE, aplicativo ou plataforma.
              </Text>
              <Text style={styles.tcP}>
              1 - Concernente ao uso da plataforma
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} 1.1 do objetivo
Os servi??os s??o disponibilizados por interm??dio de uma plataforma de tecnologia que
permite aos usu??rios, chamados de clientes procurarem por fornecedores de servi??os,
chamados de prestadores. A plataforma viabiliza a procura, a comunica????o entre as
partes, a negocia????o, a contrata????o, o pagamento e a avalia????o de servi??os executados
pelos prestadores aos clientes.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}1.2 da permiss??o do uso
Na condi????o de propriet??ria e fornecedora da plataforma, a TECNE oferece uma licen??a
n??o exclusiva de uso do aplicativo, para acessar e utilizar os recursos dispon??veis a
partir dos equipamentos pessoais dos usu??rios. Para tanto estes dever??o cadastrar uma
conta na plataforma, que lhe permitir?? o acesso aos conte??dos, ??s informa????es e aos
materiais relacionados ao acesso e ?? utiliza????o da plataforma.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}1.3 das tecnologias e ferramentas de terceiros
Para o pleno funcionamento da plataforma, ferramentas e servi??os de terceiros, tais
como sistemas operacionais, navegadores, acesso ?? internet, servi??os de e-mail e de
localiza????o geogr??fica, opera????o de pagamentos eletr??nicos, etc, ser??o utilizados. O
usu??rio reconhece que a utiliza????o desses recursos poder?? estar sujeita a termos de
uso dos provedores dos tais servi??os e que a TECNE n??o ?? respons??vel pela garantia
de tais servi??os ou produtos, fornecidos por terceiros.
              </Text>

              <Text style={styles.tcP}>
              1.4 das contas de usu??rio              </Text>

              <Text style={styles.tcL}>
                {'\u2022'}
  
1.4.1 Para se beneficiar dos recursos oferecidos pela plataforma, o usu??rio dever?? criar
e manter uma conta ativa na mesma. O cadastro ser?? condicionado ao fornecimento de
informa????es completas, exatas, verdadeiras e atualizadas.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.4.2 A atividade conduzida sobre a plataforma, na conta do usu??rio ?? de total
responsabilidade deste, que se compromete a manter a confidencialidade e a seguran??a
do seu nome de usu??rio e senha.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.4.3 A seu exclusivo crit??rio, a TECNE se reserva o direito de negar ou cancelar contas
de usu??rios, a qualquer tempo, sem qualquer obrigatoriedade de avisos pr??vios,
justificativas, indeniza????es ou compensa????es.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.4.4 O usu??rio autoriza expressamente a TECNE a estabelecer contato atrav??s de
qualquer meio dispon??vel, como telefone, e-mail, messengers, chats, redes sociais,
SMS, correspond??ncias f??sicas ou outra ferramenta que venha ser concebida, seja para
as comunica????es relativas ??s suas opera????es na plataforma, para preven????o de fraudes
ou para o envio de convites ou ofertas de promo????es, servi??os ou produtos, desta ou de
terceiros.
              </Text>

              
              <Text style={styles.tcP}>
              1.5 da conduta dos usu??rios
              </Text>
              <Text style={styles.tcL}>
              {'\u2022'}
1.5.1 Os usu??rios se comprometem a conduzir suas negocia????es respeitando os
princ??pios de cordialidade, ??tica, respeito e honestidade, dentro das regras dos
processos oferecidos pela plataforma.
              </Text>

              <Text style={styles.tcL}>
              {'\u2022'}
              1.5.2 A TECNE pode, a seu exclusivo crit??rio, controlar, negar ou eliminar conte??do de
usu??rio, sem qualquer obrigatoriedade de avisos pr??vios, justificativas, indeniza????es ou
compensa????es.
              </Text>
              
              <Text style={styles.tcP}>
              1.6 da confidencialidade dos usu??rios
              </Text>
              <Text style={styles.tcL}>
              {'\u2022'}
1.6.1 A obten????o, manuten????o e utiliza????o de dados dos usu??rios, tais como RG, CPF,
endere??o, respeitar?? os termos da lei n?? 13.709, de 14 de agosto de 2018 ??? Lei Geral
de Prote????o aos Dados (LGPD), em vigor desde 27 de agosto de 2020.
              </Text>

              <Text style={styles.tcL}>
              {'\u2022'}
              1.6.2 Demais informa????es relacionadas ??s opera????es do usu??rio, como or??amentos,
conversas no chat, valores, servi??os contratados, formas de pagamento, ser??o de
propriedade deste, que concede aqui, nos termos da Lei 13709 (LGPD) ?? TECNE,
licen??a mundial, perp??tua, irrevog??vel, transfer??vel, isenta de royalties, para, em
utiliza????o de forma an??nima, copiar, alterar, ou criar obras derivadas, distribuir,
apresentar e executar publicamente, e de outra forma explorar, sob qualquer modo, tal
conte??do an??nimo de usu??rio, em todos os formatos e canais de distribui????o conhecidos
ou futuramente concebidos (incluindo em rela????o aos servi??os e ?? atividade da TECNE
e em sites e servi??os de terceiros), sem aviso ou consentimento pr??vio do usu??rio, e
sem a necessidade de qualquer pagamento ao mesmo ou a qualquer outra pessoa ou
entidade.
              </Text>

              <Text style={styles.tcL}>
              {'\u2022'}
              1.6.3 Sob ausp??cios da Lei 13.709 (LGPD), a qualquer tempo, o usu??rio poder?? pedir a
elimina????o de seus dados. Tal solicita????o dever?? ser feita atrav??s de e-mail
encaminhado ao endere??o eletr??nico contato@tecneapp.com
              </Text>

              <Text style={styles.tcL}>
              {'\u2022'}
              1.7 do acesso ?? plataforma
Para a utiliza????o dos servi??os oferecidos pela plataforma, a obten????o de recursos
tecnol??gicos, como dispositivos m??veis, acesso ?? internet, por exemplo, ?? de inteira
responsabilidade do usu??rio. Tamb??m ?? de responsabilidade deste, a manuten????o da
seguran??a e da atualiza????o de tais dispositivos e servi??os, pelos quais a TECNE n??o
oferece garantia de compatibilidade e disponibilidade, que estar??o sujeitas ??s condi????es
oferecidas pelos seus respectivos fornecedores.
              </Text>

              <Text style={styles.tcL}>
              {'\u2022'}
              1.8 das promo????es
A seu exclusivo crit??rio, a TECNE pode criar, lan??ar e disponibilizar promo????es que
poder??o oferecer vantagens aos usu??rios, como descontos, brindes ou outros
benef??cios. Tais promo????es ser??o regradas com valores, propor????es, prazos de
validade e ser??o conveniadas com prestadores ou patrocinadores, podendo ser
desativadas a qualquer momento, por quaisquer motivos, sem qualquer obrigatoriedade
de avisos pr??vios, justificativas, indeniza????es ou compensa????es.
              </Text>

              <Text style={styles.tcL}>
              {'\u2022'}
              1.9 das falhas na plataforma
A TECNE envidar?? todos os esfor??os para garantir a confiabilidade, a disponibilidade, a
acessibilidade, a qualidade e a precis??o das informa????es mantidas na plataforma,
por??m n??o pode garantir a n??o ocorr??ncia de eventuais falhas. O usu??rio se
compromete ?? verifica????o e valida????o das informa????es relativas ??s suas transa????es.
              </Text>
   
              <Text style={styles.tcP}>
              2 - Concernente ??s rela????es entre as partes
              </Text>
                            
              <Text style={styles.tcP}>
              2.1 da rela????o direta entre prestadores e clientes
              </Text>

              <Text style={styles.tcL}>
                {'\u2022'}
2.1.1 Clientes e prestadores reconhecem aqui que a TECNE n??o ?? uma prestadora de
servi??os ou mesmo uma intermediadora de servi??os terceirizados e que a plataforma se
prop??e a estabelecer a comunica????o entre as partes e ancorar as rotinas de procura,
comunica????o entre as partes, negocia????o, contrata????o, pagamento e avalia????o de
servi??os executados pelos prestadores aos clientes, conforme item 1.1 deste termo.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.1.2 Tamb??m fica reconhecido que n??o h?? rela????es trabalhistas ou de subordina????o
entre a TECNE e qualquer das partes envolvidas nas rela????es de contrata????o de
servi??os ancoradas pela plataforma.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.1.3 Na condi????o de uma plataforma que viabiliza a comunica????o entre as partes
(prestador e cliente), a TECNE n??o interfere ou assume responsabilidades sobre a
pontualidade, qualidade, prazo, garantia, pagamento, eventuais indeniza????es ou
compensa????es, ou ainda responsabilidades civis, fiscais, trabalhistas ou criminais,
decorrentes das rela????es entre as partes.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.1.4 Os prestadores dos servi??os concordam em pagar ?? TECNE a comiss??o de 10%
sobre os servi??os que virem a prestar, que tenham sido veiculados sobre a plataforma.
              </Text>

              <Text style={styles.tcP}>
              2.2 da privacidade das rela????es
              </Text>


              <Text style={styles.tcL}>
                {'\u2022'}
2.2.1 S??o privativas das partes, as responsabilidades sobre o escopo, o prazo, o pre??o,
a qualidade, as condi????es de pagamento, a seguran??a, a garantia, o cumprimento de
regras inerentes ao servi??o executado pelo prestador ao cliente.
              </Text>

              <Text style={styles.tcL}>
                {'\u2022'}

                2.2.2 A TECNE n??o se compromete a ancorar ou fornecer informa????es relativas a
negocia????es entre prestadores e clientes que tenham sido conduzidas entre as partes,
fora da plataforma.
              </Text>

              <Text style={styles.tcP}>
              3 - Concernente ??s disposi????es gerais              </Text>
              
              <Text style={styles.tcL}>
                {'\u2022'} 3.1 das comunica????es
A TECNE poder?? enviar notifica????es atrav??s de avisos gerais, publicados no site da
plataforma, nas suas redes sociais, atrav??s de e-mail, por SMS ou por correspond??ncia
ao endere??o oferecido pelo usu??rio, em sua conta. O usu??rio poder?? se comunicar com
a plataforma atrav??s do endere??o eletr??nico contato@tecneapp.com
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                3.2 das altera????es dos termos
Fica reservado o direito de a TECNE alterar os termos de aceite de uso do aplicativo.
Tais altera????es ser??o informadas aos usu??rios atrav??s de qualquer dos meios citados
no item 3.1 e, n??o havendo manifesta????o por parte destes, estar?? pressuposto o aceite
das condi????es manifestadas no termo atualizado, uma vez que estes continuem a
operar sobre a plataforma.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                3.3 da legalidade de cl??usulas
Por ocasi??o de eventual ilegalidade de qualquer das cl??usulas deste termo, no seu todo
ou em partes, a mesma ser?? desconsiderada, sem preju??zo ?? integridade das demais,
que comp??em esse documento. Tal cl??usula dever?? ser substitu??da por uma que esteja
protegida pelas disposi????es legais em vigor, respeitando da maneira mais fiel poss??vel
a inten????o do seu conte??do, de maneira a preservar o intuito original do documento.
      
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}3.4 do acordo integral
Esse acordo caracteriza um entendimento integral entre as partes no que diz respeito
ao seu conte??do, e se sobrep??e a quaisquer outros acordos ou compromissos
anteriores ou atuais, no que tange a seu objeto.
              </Text>

            </ScrollView>

            <TouchableOpacity disabled style={styles.buttonAgree}>
              <View style={styles.checkboxContainer}>
                <CheckBox value={accepted} onValueChange={toggleAccepted} />
                <Text style={styles.buttonLabel}>
                  Eu li e concordo com os termos de uso
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!confirmed}
              onPress={handleLogin}
              style={confirmed ? styles.buttonC : styles.buttonDisabled}
            >
              <Text style={styles.buttonLabel}>Finalizar Cadastro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Container>
        <Cima xml={xmlCima} />

        {/* <Separator /> */}

        {/* <Meio xml={xml} /> */}

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            passwordField
            placeholder="Sua senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordCheckRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            passwordField
            placeholder="Confirme sua senha"
            ref={passwordCheckRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={passwordCheck}
            onChangeText={setPasswordCheck}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>J?? tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </BackgroundInitial>
  );
}