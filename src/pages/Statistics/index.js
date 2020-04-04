import React from 'react';
import { Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { LineChart, Grid, BarChart, PieChart } from 'react-native-svg-charts';
import Background from '~/components/Background';

import { Container, Title } from './styles';
import { colors } from '~/values/colors';

export default function Statistics() {
  const dataLine = [
    50,
    10,
    40,
    95,
    -4,
    -24,
    85,
    91,
    35,
    53,
    -53,
    24,
    50,
    -20,
    -80,
  ];

  const dataPie = [
    50,
    10,
    40,
    95,
    -4,
    -24,
    85,
    91,
    35,
    53,
    -53,
    24,
    50,
    -20,
    -80,
  ];

  const randomColor = () =>
    // eslint-disable-next-line no-bitwise
    `#${((Math.random() * 0xffffff) << 0).toString(16)}000000`.slice(0, 7);

  const pieData = dataPie
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        // eslint-disable-next-line no-console
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

  const fillBar = 'rgb(134, 65, 244)';
  const dataBar = [
    50,
    10,
    40,
    95,
    -4,
    -24,
    null,
    85,
    undefined,
    0,
    35,
    53,
    -53,
    24,
    50,
    -20,
    -80,
  ];

  return (
    <Background>
      <Container>
        <Title>Estatísticas</Title>

        <Text>Faturado Por Mês</Text>

        <LineChart
          style={{ height: 200 }}
          data={dataLine}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>

        <Text>Atendimentos Por Mês</Text>
        <BarChart
          style={{ height: 200 }}
          data={dataBar}
          svg={{ fillBar }}
          contentInset={{ top: 30, bottom: 30 }}
        >
          <Grid />
        </BarChart>

        <Text>Areas de Atuação</Text>

        <PieChart style={{ height: 200 }} data={pieData} />
      </Container>
    </Background>
  );
}

Statistics.navigationOptions = {
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
  tabBarLabel: 'Estatísticas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tachometer" size={20} color={tintColor} />
  ),
};
