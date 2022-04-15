import { Grid, Paper, SimpleGrid, Text } from '@mantine/core';
import { Component } from 'react';
import Logo from '../../assets/images/logo.png';
import IChart from '../../components/IChart';
import ChartData from '../IChart/chartData';
import Lock from '../LockBox';
import { getLocalStorage } from '../../helper/localStorage';

class LoopChart extends Component {
  constructor() {
    super();
    let storage = getLocalStorage('userToken');
    if (!storage) {
      this.state = {
        auth: false,
      };
    } else {
      this.state = {
        auth: true,
      };
    }
  }
  render() {
    return (
      <Grid grow my="lg" columns={12} align="stretch">
        {this.props.charts.length > 0 &&
          this.props.charts.map((chart, index) =>
            ChartData[chart.special].auth ? (
              <Grid.Col lg={6} md={12}>
                <Paper key={index} shadow="xs" padding="lg" radius="md">
                  <Text order={4} mb="lg">
                    {ChartData[chart.special].title}
                  </Text>
                  {this.state.auth ? (
                    <IChart special={chart.special} series={chart} />
                  ) : (
                    <Lock key={index} image={Logo} />
                  )}
                </Paper>
              </Grid.Col>
            ) : (
              <Grid.Col lg={6} md={12}>
                <Paper key={index} shadow="xs" padding="lg" radius="md">
                  <Text order={4} mb="lg">
                    {ChartData[chart.special].title}
                  </Text>
                  <IChart special={chart.special} series={chart} />
                </Paper>
              </Grid.Col>
            )
          )}
      </Grid>
    );
  }
}

export default LoopChart;
