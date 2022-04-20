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
      <Grid grow my="lg" columns={12} align="stretch" justify="center">
        {this.props.charts.length > 0 &&
          this.props.charts.map((chart, index) =>
            chart.active === false ? (
              <Grid.Col lg={6} md={12} key={index}>
                <Paper key={index} shadow="xs" padding="lg" radius="md" sx={{height:"100%"}}>
                  <Text order={4} mb="lg">
                    {chart.title}
                  </Text>
                  {this.state.auth ? (
                    <IChart refreshTime={chart.refresh_time} feeder_url={chart.feeder_url} />
                  ) : (
                    <Lock key={index} image={Logo} />
                  )}
                </Paper>
              </Grid.Col>
            ) : (
              <Grid.Col lg={6} md={12} key="index">
                <Paper key={index} shadow="xs" padding="lg" radius="md" sx={{height:"100%"}}>
                  <Text order={4} mb="lg">
                    {chart.title}
                  </Text>
                  <IChart refreshTime={chart.refresh_time} feeder_url={chart.feeder_url} />
                </Paper>
              </Grid.Col>
            )
          )}
      </Grid>
    );
  }
}

export default LoopChart;
