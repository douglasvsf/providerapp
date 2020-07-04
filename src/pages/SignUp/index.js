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

<svg width="117" height="67" viewBox="0 0 117 67" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        text: 'Senhas não conferem',
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
    alert('Termos e Condições Aceitados');
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
            <Text style={styles.title}>Termos e Condições</Text>
            <ScrollView style={styles.tcContainer} onScroll={onScroll}>
              <Text style={styles.tcP}>
                OS TERMOS DE USO (“TERMOS”) REGULAM O ACESSO OU UTILIZAÇÃO PELO
                USUÁRIO, EM QUALQUER LUGAR DO BRASIL, DO TECNE (APLICAÇÕES, WEB
                SITES, CONTEÚDO, PRODUTOS E SERVIÇOS) DISPONIBILIZADOS PELA
                TECNE TECNOLOGIA LTDA, INSCRITA NO CNPJ N. -----------------
                QUE, PARA EFEITOS DESTE CONTRATO DENOMINADAS “TECNE”, “SERVIÇOS”
                OU “APLICATIVO”.
              </Text>
              <Text style={styles.tcP}>
                CAPÍTULO PRIMEIRO: SOBRE O USO DA PLATAFORMA MÓVEL
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} 1.1 DA FINALIDADE OS SERVIÇOS SÃO DISPONIBILIZADOS
                POR MEIO DE UMA PLATAFORMA TECNOLÓGICA (SHOPPING VIRTUAL) QUE
                PERMITE AOS CONSUMIDORES DAS APLICAÇÕES MÓVEIS OU WEB SITES DO
                TECNE, CONCRETIZAREM OS SEGUINTES SERVIÇOS: (I) PERMITIR AOS
                CONSUMIDORES DIVULGAR SUAS NECESSIDADES DE SERVIÇOS E ATRAIR,
                PRESTADORES DE SERVIÇOS “HELPERS” QUALIFICADOS; (II) PERMITIR
                QUE PRESTADORES DE SERVIÇO ”HELPERS” PUBLIQUEM NO TECNE SUAS
                HABILIDADES DE FORMA A POSSIBILITAR ENCONTRAR CONSUMIDORES
                INTERESSADOS NESSAS HABILIDADES; (III) VIABILIZAR O ENCONTRO
                ENTRE CONSUMIDORES E PRESTADORES DE SERVIÇOS ATRAVÉS DO CHAT DO
                APLICATIVO; (IV) RECEBIMENTO DOS VALORES COBRADOS PELOS SERVIÇOS
                ATRAVÉS DE MEIOS DE PAGAMENTOS DIVERSOS; (V) GERAÇÃO DE
                AUTOMÁTICA DE RECIBOS DOS SERVIÇOS PRESTADOS.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} 1.2 DA LICENÇA DE USO NA QUALIDADE DE FORNECEDORA DA
                PLATAFORMA, TECNE FORNECE UMA LICENÇA GRATUITA E NÃO EXCLUSIVA
                DO APLICATIVO E REVOGÁVEL PARA: (I) ACESSAR E UTILIZAR AS
                APLICAÇÕES NO SEU EQUIPAMENTO PESSOAL, UNICAMENTE PARA EFEITOS
                DA RESPECTIVA UTILIZAÇÃO DOS SERVIÇOS; E (II) ACESSAR E UTILIZAR
                QUALQUER CONTEÚDO, INFORMAÇÃO E MATERIAIS RELACIONADOS QUE
                VENHAM A SER DISPONIBILIZADOS ATRAVÉS DOS SERVIÇOS. QUAISQUER
                DIREITOS NÃO EXPRESSAMENTE GARANTIDOS NOS PRESENTES TERMOS SÃO
                RESERVADOS PARA TECNE E RESPETIVOS LICENCIANTES.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} 1.3 TECNOLOGIAS OU FERRAMENTAS DE TERCEIROS FAZEM
                PARTE DA INFRAESTRUTURA TECNOLÓGICA DO TECNE FERRAMENTAS OU
                SERVIÇOS DE TERCEIROS INCLUINDO, SERVIÇOS FINANCEIROS, SERVIÇOS
                DE MENSAGENS, SERVIÇOS DE LOCALIZAÇÃO, ETC. O USUÁRIO RECONHECE
                QUE A UTILIZAÇÃO DE SERVIÇOS E CONTEÚDO DE TERCEIROS PODERÁ
                ESTAR SUJEITA A TERMOS DE UTILIZAÇÃO E POLÍTICAS DE PRIVACIDADE
                DIFERENTES. CASO O USUÁRIO ACESSE AOS SERVIÇOS ATRAVÉS DE
                APLICAÇÕES DESENVOLVIDAS, RESPECTIVAMENTE, PARA EQUIPAMENTOS
                MÓVEIS COM OS SISTEMAS APPLE IOS, ANDROID OU MICROSOFT WINDOWS.
                A APPLE INC., GOOGLE, INC. OU MICROSOFT CORPORATION SÃO AS
                BENEFICIÁRIAS TERCEIRAS DO PRESENTE CONTRATO. O TECNE NÃO
                OFERECE QUALQUER GARANTIA RELATIVAMENTE A PRODUTOS, SERVIÇOS E
                CONTEÚDO DE TERCEIROS.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.4 DAS CONTAS DE USUÁRIO PARA PODER USUFRUIR DA MAIOR PARTE DAS
                FUNCIONALIDADES DOS SERVIÇOS, O USUÁRIO TERÁ DE REGISTRAR E
                MANTER UMA CONTA PESSOAL DE USUÁRIO DE SERVIÇOS ATIVA (“CONTA”).
                O USUÁRIO DEVERÁ TER PELO MENOS 18 ANOS DE IDADE, OU A IDADE
                CORRESPONDENTE À MAIORIDADE LEGAL NA RESPECTIVA JURISDIÇÃO
                (QUANDO DIFERENTE DE 18), PARA PODER OBTER UMA CONTA. O REGISTRO
                DE UMA CONTA OBRIGA QUE O USUÁRIO SUBMETA CERTAS INFORMAÇÕES
                PESSOAIS, TAIS COMO FOTO PESSOAL, FOTO DE UM DOCUMENTO, O SEU
                NOME, ENDEREÇO, NÚMERO DE TELEFONE CELULAR, CPF OU CNPJ. O
                USUÁRIO É RESPONSÁVEL POR TODA A ATIVIDADE NA SUA CONTA E ACEITA
                MANTER SEMPRE A SEGURANÇA E A CONFIDENCIALIDADE DO NOME DE
                USUÁRIO E SUA SENHA. O USUÁRIO AUTORIZA QUE O TECNE FAÇA A
                VERIFICAÇÃO PERIÓDICA DE IDONEIDADE JUNTO A SERVIÇOS
                ESPECIALIZADOS. O TECNE POSSUI TOTAL AUTONOMIA DE NÃO ACEITAR OU
                MESMO CANCELAR CONTAS DE USUÁRIOS COM ANTECEDENTES QUE CAUSEM
                ALGUM CONSTRANGIMENTO AOS CLIENTES.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.5 DEVERES DE CONDUTA O USUÁRIO ACEITA CUMPRIR TODAS AS LEIS
                APLICÁVEIS NA UTILIZAÇÃO DOS SERVIÇOS E APENAS PODERÁ UTILIZAR
                OS MESMOS PARA FINS LÍCITOS. AO UTILIZAR OS SERVIÇOS, O
                PRESTADOR DE SERVIÇO NÃO PROVOCARÁ ABORRECIMENTOS, EMBARAÇOS,
                DISTÚRBIOS OU DANOS EM PROPRIEDADE, QUER AO PRESTADOR DE
                SERVIÇOS TERCEIRO OU A QUALQUER OUTRA PARTE. O CONSUMIDOR ACEITA
                NÃO SUBMETER CONTEÚDO DE CARÁTER DIFAMATÓRIO, CALUNIOSO,
                VIOLENTO, OBSCENO, PORNOGRÁFICO, ILEGAL OU DE OUTRA FORMA
                OFENSIVO. O PROFISSIONAL ACEITA CONDUZIR AS NEGOCIAÇÕES COM
                ÉTICA, CORDIALIDADE E OBSERVANDO OS PROCESSOS OFERECIDOS PELO
                APLICATIVO. TECNE PODE, MAS NÃO É OBRIGADO, CONTROLAR OU
                ELIMINAR CONTEÚDO DE USUÁRIO, AO SEU EXCLUSIVO CRITÉRIO E EM
                QUALQUER MOMENTO E POR QUALQUER MOTIVO, SEM PRÉ-AVISO AO
                USUÁRIO. TECNE POSSUI TOTAL AUTORIDADE DE CANCELAR AS CONTAS DE
                USUÁRIOS IDENTIFICADOS COM CONDUTAS SUSPEITAS, ILEGAIS OU
                IMPRÓPRIAS.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.6 INFORMAÇÕES CONFIDENCIAIS A COLETA E UTILIZAÇÃO DE
                INFORMAÇÕES PESSOAIS COMO RG, CPF, É EFETUADA NOS TERMOS DA LEI
                NO 12.965, DE 23 DE ABRIL DE 2014 QUE ESTABELECE PRINCÍPIOS,
                GARANTIAS, DIREITOS E DEVERES PARA O USO DA INTERNET NO BRASIL.
                INFORMAÇÕES SENSÍVEIS DE CARTÕES DE CRÉDITO OU CONTAS BANCÁRIAS
                NÃO SÃO MANTIDAS NOS BANCOS DE DADOS TECNE. NO MOMENTO DA
                TRANSAÇÃO FINANCEIRA, SÃO CRIPTOGRAFADAS COM TOTAL SEGURANÇA E
                PROTEGIDAS DE ACORDO COM AS NORMAS DO PCI DSS – PAYMENT CARD
                INDUSTRY DATA SECURITY STANDARD CUJAS NORMAS AS EMPRESAS
                PARCEIRAS SÃO SIGNATÁRIAS.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.7 INFORMAÇÕES NÃO CONFIDENCIAIS TODO O CONTEÚDO NÃO
                CONFIDENCIAL FORNECIDO PELO USUÁRIO MANTÉM-SE PROPRIEDADE DO
                MESMO. CONTUDO, AO FORNECER CONTEÚDO DE USUÁRIO PARA TECNE, O
                USUÁRIO CONCEDE PARA TECNE UMA LICENÇA MUNDIAL, PERPÉTUA,
                IRREVOGÁVEL, TRANSFERÍVEL, ISENTA DE ROYALTIES, PARA UTILIZAR,
                COPIAR, MODIFICAR, CRIAR OBRAS DERIVADAS, DISTRIBUIR, APRESENTAR
                E EXECUTAR PUBLICAMENTE, E DE OUTRA FORMA EXPLORAR, SOB QUALQUER
                MODO, TAL CONTEÚDO DE USUÁRIO, EM TODOS OS FORMATOS E CANAIS DE
                DISTRIBUIÇÃO CONHECIDOS OU FUTURAMENTE CONCEBIDOS (INCLUINDO EM
                RELAÇÃO AOS SERVIÇOS E À ATIVIDADE DO TECNE E EM SITES E
                SERVIÇOS DE TERCEIROS), SEM AVISO OU CONSENTIMENTO PRÉVIO DO
                USUÁRIO, E SEM A NECESSIDADE DE QUALQUER PAGAMENTO AO MESMO OU A
                QUALQUER OUTRA PESSOA OU ENTIDADE.
              </Text>
              <Text style={styles.tcL}>
                1.8 DO ACESSO À REDE OU EQUIPAMENTOS O USUÁRIO É RESPONSÁVEL POR
                OBTER O ACESSO NECESSÁRIO À REDE DE DADOS COM VISTA À UTILIZAÇÃO
                DOS SERVIÇOS. TAMBÉM É RESPONSÁVEL PELA AQUISIÇÃO E ATUALIZAÇÃO
                DO APARELHO OU DOS DISPOSITIVOS NECESSÁRIOS PARA ACESSAR E
                UTILIZAR OS SERVIÇOS. TECNE NÃO GARANTE QUE OS SERVIÇOS OU
                QUALQUER PARTE DOS MESMOS IRÃO FUNCIONAR NUM DETERMINADO
                EQUIPAMENTO OU DISPOSITIVO. ALÉM DISSO, OS SERVIÇOS PODERÃO
                ESTAR SUJEITOS A FALHAS E ATRASOS INERENTES AO USO DA INTERNET E
                COMUNICAÇÕES ELETRÔNICAS.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.9 DOS CÓDIGOS PROMOCIONAIS O TECNE PODE, AO SEU EXCLUSIVO
                CRITÉRIO, CRIAR CÓDIGOS PROMOCIONAIS PASSÍVEIS DE SEREM
                UTILIZADOS COMO DESCONTO PARA CONSUMIDORES EM COMPRAS DE
                SERVIÇOS. TODO CÓDIGO PROMOCIONAL POSSUI VALOR, PRAZO DE
                VALIDADE, FINALIDADE E CONVÊNIO COM PRESTADORES DE SERVIÇO OU
                PATROCINADORES. PODENDO SER CANCELADOS PELO TECNE EM QUALQUER
                MOMENTO E POR QUALQUER MOTIVO SEM AVISO PRÉVIO;
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.10 DAS GARANTIAS TECNE É FORNECIDO “DE ACORDO COM QUE ESTÁ
                DISPONÍVEL”. EMBORA O TECNE EMPENHARÁ TODO ESFORÇO PARA QUE OS
                SERVIÇOS SEJAM OFERECIDOS COM A MELHOR CONFIABILIDADE,
                QUALIDADE, ADEQUAÇÃO E DISPONIBILIDADE DO APLICATIVO, NÃO PODERÁ
                GARANTIR QUE NÃO EXISTAM FALHAS. O USUÁRIO É RESPONSÁVEL PELA
                VERIFICAÇÃO DA QUALIDADE DAS INFORMAÇÕES RELATIVAS ÀS SUAS
                TRANSAÇÕES NO TECNE.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                1.11 O USUÁRIO RECONHECE QUE O TECNE NÃO FORNECE SERVIÇOS E NEM
                FUNCIONA COMO UMA EMPRESA DE SERVIÇOS E QUE TODOS OS SERVIÇOS
                SÃO PRESTADOS POR TERCEIROS QUE NÃO SÃO CONTRATADOS PELO TECNE
                OU POR QUALQUER UMA DAS SUAS AFILIADAS, E QUE PORTANTO, NÃO HÁ
                NENHUMA RELAÇÃO DE SUBORDINAÇÃO ENTRE O TECNE E OS PRESTADORES
                DE SERVIÇO, SENDO ASSIM, O TECNE NÃO GARANTE A QUALIDADE OU
                ENTREGA DOS SERVIÇOS AVENÇADOS ENTRE OS USUÁRIOS.
              </Text>
              <Text style={styles.tcP}>
                CAPÍTULO SEGUNDO: SOBRE AS RELAÇÕES ENTRE AS PARTES
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.1 DA RELAÇÃO DIRETA NA RELAÇÃO ENTRE O CONSUMIDOR E O
                PRESTADOR DE SERVIÇOS, NÃO HÁ NENHUMA INTERFERÊNCIA DO TECNE NO
                QUE DIZ RESPEITO A PRAZOS, QUALIDADE, RESPONSABILIDADES CIVIS,
                FISCAIS E TRABALHISTAS. O TECNE APENAS VIABILIZA UMA RELAÇÃO
                DIRETA ENTRE CONSUMIDORES E FORNECEDORES, ATRAVÉS DO
                LICENCIAMENTO DA PLATAFORMA TECNE.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.2 DA AUSÊNCIA DE VINCULOS A RESPONSABILIDADE SOBRE A
                QUALIDADE, ADEQUAÇÃO, SEGURANÇA, ACIDENTES OU COMPETÊNCIA DE
                CADA SERVIÇO PRESTADO É DE INTEIRA RESPONSABILIDADE DO
                PROFISSIONAL. A UTILIZAÇÃO DO TECNE NÃO IMPLICA EM VINCULO
                EMPREGATÍCIO ENTRE PRESTADORES DE SERVIÇOS, CONSUMIDORES OU
                TECNE. A RELAÇÃO COM TECNE É DE CLIENTE, USUÁRIO DO APLICATIVO.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.3 DAS RESPONSABILIDADES FISCAIS OS VALORES PAGOS PELOS
                CLIENTES SÃO TRANSFERIDOS PELO APLICATIVO DIRETAMENTE PARA A
                CONTA DO CARTÃO DE CRÉDITO TECNE FORNECIDO POR TECNE. PERTENCEM
                AO PROFISSIONAL AS RESPONSABILIDADES FISCAIS, ESCRITURAÇÃO E
                RECOLHIMENTO DE IMPOSTOS CONFORME EXIGIDO PELAS LEIS
                BRASILEIRAS. TECNE POSSUI RESPONSABILIDADE SOBRE OS VALORES
                AUFERIDOS COMO TAXA DE INTERMEDIAÇÃO COBRADA DO PRESTADOR DE
                SERVIÇO.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.4 FATURAMENTO DOS SERVIÇOS TECNE CONTEMPLA AS FUNÇÕES DE
                FATURAMENTO E COBRANÇA DOS SERVIÇOS NEGOCIADOS COM O CLIENTE
                FINAL. ASSIM QUE O CLIENTE AUTORIZAR O PAGAMENTO, O VALOR, NAS
                CONDIÇÕES NEGOCIADAS, SERÁ TRANSFERIDO PARA A CONTA DIGITAL
                TECNE DE ONDE O PRESTADOR DE SERVIÇOS FARÁ SUAS MOVIMENTAÇÕES,
                INCLUINDO SAQUES, DÉBITOS NO CARTÃO OU TRANSFERÊNCIAS PARA
                OUTRAS CONTAS. AO ACEITAR OS PRESENTES TERMOS O USUÁRIO CONCORDA
                QUE ESSA CONTA DIGITAL SEJA ABERTA. MAIORES INFORMAÇÕES EM
                HTTPS://WWW.TECNE.COM.BR/CARTOES/. SERÁ DESCONTADO A TAXA DE USO
                DA PLATAFORMA TECNE, DE ACORDO COM O “PLANO DE RECEBIMENTO”
                ESCOLHIDO NO PERFIL DO APLICATIVO. QUALQUER COBRANÇA POR FORA DO
                APLICATIVO NÃO É UMA CONDUTA ESPERADA PARA UM PROFISSIONAL
                USUÁRIO DO TECNE.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                2.5 DA PRIORIDADE NAS BUSCAS QUANDO UM CONSUMIDOR BUSCA
                PROFISSIONAIS PARA ATENDER ALGUMA NECESSIDADE, TERÃO PRIORIDADE
                OS PROFISSIONAIS ENQUADRADOS NOS SEGUINTES CRITÉRIOS: (I)
                QUANTIDADE DE ESTRELAS DAS AVALIAÇÕES FEITAS CLIENTES; (II)
                QUANTIDADE DE NEGÓCIOS FECHADOS COM O APLICATIVO; (III) RAPIDEZ
                NAS RESPOSTAS DE OPORTUNIDADES E CONVERSAS NOS CHATS DE
                NEGOCIAÇÕES; (IV) PROXIMIDADE DO LOCAL DO SERVIÇO; (V)
                QUANTIDADE DE CERTIFICADOS TECNE CONQUISTADOS E (VI) PATROCÍNIOS
                DIVERSOS. AS PONTUAÇÕES ORIUNDAS DAS AVALIAÇÕES DE SERVIÇOS
                PRESTADOS ACONTECEM QUANDO UM PEDIDO DE SERVIÇOS É ENCERRADO NO
                APLICATIVO E O PAGAMENTO LIBERADO PELO CLIENTE.
              </Text>
              <Text style={styles.tcP}>
                CAPÍTULO TERCEIRO: SOBRE AS CONDIÇÕES GERAIS
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} 3.1 DO USUÁRIO CORPORATIVO USUÁRIOS CORPORATIVOS QUE
                NECESSITAM PUBLICAR OFERTAS EM MAIOR ESCALA PARA DIFERENTES
                PROFISSIONAIS PODEM OPTAR POR UTILIZAR A PLATAFORMA MEDIANTE O
                CADASTRAMENTO DE UM MEIO DE PAGAMENTO UNIFICADO PARA TODAS AS
                DEMANDAS APURADAS AO FINAL DE UM PERÍODO DE 30 (TRINTA) DIAS COM
                PAGAMENTO EM ATÉ 05 (CINCO) DIAS ÚTEIS APÓS O FECHAMENTO DA
                APURAÇÃO DO NÚMERO DE SOLICITAÇÕES RECEBIDAS NESTE PERÍODO.
                ESSES USUÁRIOS AUTORIZAM QUE O TECNE FAÇA A ANÁLISE DE CRÉDITO
                JUNTO A SERVIÇOS ESPECIALIZADOS PARA A SUA APROVAÇÃO E
                MANUTENÇÃO. O TECNE POSSUI TOTAL AUTONOMIA DE NÃO ACEITAR OU
                MESMO CANCELAR CONTAS DE USUÁRIOS CORPORATIVOS.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                3.1.1 DA INADIMPLÊNCIA O NÃO PAGAMENTO DO VALOR FATURADO
                ACARRETARÁ NA COBRANÇA DE JUROS DE MORA À RAZÃO DE 1% (UM POR
                CENTO AO MÊS) E CORREÇÃO MONETÁRIA COM BASE NA VARIAÇÃO POSITIVA
                DO IGPM /FGV; DEVIDOS DA DATA DO VENCIMENTO ATÉ O EFETIVO
                PAGAMENTO, MULTA DE 10% (DEZ POR CENTO) SOBRE O VALOR TOTAL EM
                ATRASO, ARCANDO AINDA O USUÁRIO EM CASO DE COBRANÇA JUDICIAL
                HONORÁRIOS ADVOCATÍCIOS DE 20% (VINTE POR CENTO). NA HIPÓTESE DE
                ATRASO NO PAGAMENTO, PODERÁ O TECNE REALIZAR APONTAMENTOS DOS
                USUÁRIOS NOS ORGÃOS DE PROTEÇÃO AO CRÉDITO, PODENDO AINDA BUSCAR
                OS MEIOS JURÍDICOS NECESSÁRIOS PARA O RECEBIMENTO DO CRÉDITO,
                VEZ QUE, APÓS APROVADA AS SOLICITAÇÕES DE SERVIÇOS O VALOR
                DEVIDO É RECONHECIDO COMO CRÉDITO LÍQUIDO, CERTO E EXIGÍVEL.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                3.2 DA COMUNICAÇÃO O TECNE PODERÁ PROCEDER A NOTIFICAÇÕES
                ATRAVÉS DE UM AVISO GERAL PUBLICADO NO SITE WWW.TECNE.COM.BR ,
                OU POR E-MAIL PARA O ENDEREÇO DE CORREIO ELETRÔNICO INDICADO NA
                CONTA DO USUÁRIO, OU POR MENSAGENS NO CELULAR DO USUÁRIO, OU
                AINDA POR COMUNICAÇÃO ESCRITA ENVIADA PARA O ENDEREÇO INDICADO
                NA MESMA. O USUÁRIO PODERÁ NOTIFICAR O TECNE POR MENSAGEM NA
                PAGINA DE SUPORTE AOS USUÁRIOS AJUDA.TECNE.COM.BR.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}3.3 DA ALTERAÇÃO DOS TERMOS DO SERVIÇO. O TECNE
                PODERÁ, OCASIONALMENTE, ALTERAR OS TERMOS RELACIONADOS COM OS
                SERVIÇOS. AS ALTERAÇÕES PRODUZEM EFEITOS APÓS A PUBLICAÇÃO, PELO
                TECNE, DOS TERMOS, POLÍTICAS OU TERMOS SUPLEMENTARES ALTERADOS
                NO ESPAÇO DEDICADO AO SERVIÇO APLICÁVEL. A CONTINUAÇÃO DO ACESSO
                OU DA UTILIZAÇÃO DOS SERVIÇOS APÓS A REFERIDA PUBLICAÇÃO
                CONSTITUI A ACEITAÇÃO, DO USUÁRIO, EM FICAR VINCULADO PELOS
                PRESENTES TERMOS NA SUA VERSÃO ALTERADA.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                3.4 DA ILEGALIDADE DE CLÁUSULAS SE QUALQUER CLÁUSULA DOS
                PRESENTES TERMOS FOR CONSIDERADA ILEGAL, INVÁLIDA OU
                INAPLICÁVEL, NO SEU TODO OU EM PARTE, AO ABRIGO DE QUALQUER LEI,
                ESSA CLÁUSULA OU PARTE DA MESMA SERÃO NESSA MEDIDA ENTENDIDAS
                COMO NÃO FAZENDO PARTE DOS PRESENTES TERMOS, SENDO QUE A
                LEGALIDADE, VALIDADE E APLICABILIDADE DAS RESTANTES CLÁUSULAS
                DOS PRESENTES TERMOS NÃO SERÃO AFETADAS. NESSE CASO, AS PARTES
                DEVEM SUBSTITUIR A PARTE DA DISPOSIÇÃO ILEGAL, INVÁLIDA OU
                INAPLICÁVEL COM UMA (PARTE DE UMA) DISPOSIÇÃO QUE SEJA LEGAL,
                VÁLIDA E APLICÁVEL E QUE TENHA, NA MAIOR MEDIDA POSSÍVEL, UM
                EFEITO SEMELHANTE À DISPOSIÇÃO OU À SUA PARTE ILEGAL, INVÁLIDA
                OU INAPLICÁVEL, TENDO EM CONTA O CONTEÚDO E A FINALIDADE DO
                PRESENTE CONTRATO.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'}
                3.5 DO ACORDO INTEGRAL ESTES TERMOS CONSTITUEM O ACORDO E
                ENTENDIMENTO INTEGRAL DAS PARTES NO QUE RESPEITA AO SEU ASSUNTO
                E SUBSTITUEM E SOBREPÕEM-SE A TODOS OS ACORDOS E COMPROMISSOS
                ANTERIORES E ATUAIS EM RELAÇÃO A ESSE ASSUNTO.
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

        <Separator />

        <Meio xml={xml} />

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
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </BackgroundInitial>
  );
}
