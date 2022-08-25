import {
  Card,
  SimpleGrid,
  Badge,
  Button,
  Group,
  Text,
  Paper,
  Grid,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getEveryFeeder } from '../../apis/main';
import colors from 'tailwindcss/colors';
import { useSelector } from 'react-redux';
import { Component } from 'react';
import { connect } from 'react-redux';

class NewsTable extends Component {
  state = {
    news: [],
    interval: true,
  };
  getNews() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'getNews');
    getEveryFeeder(thatItem.feeder_url)
      .then((res) => this.setState({ news: res.data.data }))
      .catch((err) => console.log(err));

    setInterval(() => {
      if (this.state.interval) {
        getEveryFeeder(thatItem.feeder_url)
          .then((res) => this.setState({ news: res.data.data }))
          .catch((err) => console.log(err));
      }
    }, thatItem.refresh_time * 1000);
  }

  componentDidMount() {
    this.getNews();
  }

  componentWillUnmount() {
    this.setState({ interval: false });
  }

  render() {
    return (
      <Paper p="xl" radius="md" shadow="xs" mt="xl">
        <Group position="apart">
          <Text mb={'lg'}>خبرنامه</Text>
        </Group>
        <Grid align="stretch">
          {this.state.news.map((item, index) => {
            return (
              <Grid.Col sx={{ height: 'auto' }} key={index} sm={12} md={6}>
                <Card
                  radius="lg"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: colors.slate[50],
                  }}
                >
                  <Group position="apart" my="md">
                    <Text weight={500}>
                      <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </Text>
                  </Group>
                  <Text size="sm" color="dark" style={{ lineHeight: 1.5 }}>
                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                  </Text>
                  <Group position="apart" my="md">
                    <Badge color="pink" variant="light">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.category }}
                      />
                    </Badge>
                    <Badge color="indigo" variant="light">
                      <div dangerouslySetInnerHTML={{ __html: item.date }} />
                    </Badge>
                  </Group>

                  <a href={item.link} target="_blank">
                    <Button
                      size="xs"
                      variant="filled"
                      color="blue"
                      fullWidth
                      style={{ marginTop: 14 }}
                    >
                      ادامه مطلب
                    </Button>
                  </a>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(NewsTable);
