import {
  ActionIcon,
  Grid,
  Group,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Text,
  Chip,
  Chips,
  Button,
  Tabs,
  MediaQuery,
} from '@mantine/core';
import { Component } from 'react';
import Logo from '../../assets/images/logo.png';
import IChart from '../../components/IChart';
import ChartData from '../IChart/chartData';
import Lock from '../LockBox';
import { getLocalStorage } from '../../helper/localStorage';
import { BsFillGridFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { gridColumn } from '../../helper';
import ls from 'localstorage-slim';
import { charts } from 'highcharts';

class LoopChart extends Component {
  constructor() {
    super();
    let storage = getLocalStorage('userToken');
    let gridSystem = ls.get('grids');
    if (!storage) {
      this.state = {
        auth: false,
        gridSystem: gridSystem ? gridSystem : 0,
      };
    } else {
      this.state = {
        auth: true,
        gridSystem: gridSystem ? gridSystem : 0,
      };
    }
  }

  /**
   * Set grid columns
   * @returns
   */

  onChangeTab(tabIndex) {
    this.setState((prev) => ({
      ...prev,
      gridSystem: tabIndex,
    }));
    gridColumn(tabIndex);
    console.log(this.state);
  }

  render() {
    return (
      <>
        {/* <MediaQuery smallerThan="lg">
          <Group position="right">
            <Tabs
              active={this.state.gridSystem}
              mt="lg"
              variant="unstyled"
              onTabChange={(tabIndex) => this.onChangeTab(this, tabIndex)}
              styles={(theme) => ({
                tabControl: {
                  borderRadius: theme.radius.sm,
                },
                tabActive: {
                  backgroundColor: theme.colors.blue[7],
                  borderColor: theme.colors.blue[7],
                  color: theme.white,
                },
              })}
            >
              <Tabs.Tab key="2" icon={<BsFillGridFill size={18} />}></Tabs.Tab>
              <Tabs.Tab
                key="3"
                icon={<BsFillGrid3X3GapFill size={18} />}
              ></Tabs.Tab>
            </Tabs>
          </Group>
        </MediaQuery> */}

        <Grid grow mt="lg">
          {this.props.charts.length > 0 &&
            this.props.charts.map((chart, index) =>
              chart.active === false ? (
                <Grid.Col sm={12} md={6} lg={4}>
                  <Paper
                    key={index}
                    shadow="xs"
                    padding="lg"
                    radius="md"
                    sx={{ height: '100%' }}
                  >
                    <Text order={4} mb="lg">
                      {chart.title}
                    </Text>
                    {this.state.auth ? (
                      <IChart
                        refreshTime={chart.refresh_time}
                        feeder_url={chart.feeder_url}
                      />
                    ) : (
                      <Lock key={index} image={Logo} />
                    )}
                  </Paper>
                </Grid.Col>
              ) : (
                <Grid.Col sm={12} md={6} lg={4}>
                  <Paper
                    shadow="xs"
                    padding="lg"
                    radius="md"
                    sx={{ height: '100%' }}
                  >
                    <Text order={4} mb="lg">
                      {chart.title}
                    </Text>
                    <IChart
                      refreshTime={chart.refresh_time}
                      feeder_url={chart.feeder_url}
                    />
                  </Paper>
                </Grid.Col>
              )
            )}
        </Grid>
      </>
    );
  }
}

export default LoopChart;
