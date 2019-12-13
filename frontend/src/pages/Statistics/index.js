import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Background from '~/components/Background';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
// import { Container } from './styles';

import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
  ContainerGraph,
} from './styles';

export default function Statistics() {

  const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};
  const lineData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };

  const barData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        data: [23, 34, 15, 48, 44, 57],
      },
    ],
  };

  const pieData = [
    {
      name: 'Area 1',
      population: 150,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Area 2',
      population: 175,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Area 3',
      population: 87,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <Background>
      <Container>
        <Title>Estatísticas</Title>

        <ContainerGraph>
          <Text>Faturado Por Mês</Text>

          <LineChart
            data={lineData}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig="{chartConfig}"
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </ContainerGraph>

        <ContainerGraph>
          <Text>Atendimentos Por Mês</Text>
          <BarChart
            // style={graphStyle}
            data={barData}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig="{chartConfig}"
          />
        </ContainerGraph>

        <ContainerGraph>
          <PieChart
            data={pieData}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            chartConfig="{chartConfig}"
            accessor="Areas"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </ContainerGraph>
      </Container>
    </Background>
  );
}

Statistics.navigationOptions = {
  tabBarLabel: 'Estatísticas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="tachometer" size={20} color={tintColor} />
  ),
};
