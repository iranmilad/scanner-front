import {
  Card,
  SimpleGrid,
  Badge,
  Button,
  Group,
  Text,
  Paper,
  Grid,
  Center,
  Loader,
} from '@mantine/core';
import { ShowErrors } from '../../helper';
import React, { useEffect, useState } from 'react';
import { getEveryFeeder } from '../../apis/main';
import colors from 'tailwindcss/colors';
import { useSelector } from 'react-redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { useConfig, useData } from '../../helper';

const NewsTable = (props) => {
  let news = useConfig(props.chartAndtables, 'getNews');
  let news_query = useData(news);
  return (
    <Paper p="xl" radius="md" shadow="xs" mt="xl">
      <Group position="apart">
        <Text mb={'lg'}>خبرنامه</Text>
      </Group>
      {news_query.isLoading ? (
        <Center>
          <Loader variant="dots" />
        </Center>
      ) : news_query.isError ? (
        <Center>
          <ShowErrors status={news_query.error} />
        </Center>
      ) : (
        <Grid align="stretch">
          {news_query.data.data.map((item, index) => {
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
                  <Group
                    position={
                      item.category !== '' &&
                      item.category &&
                      item.date !== '' &&
                      item.date
                        ? 'apart'
                        : 'right'
                    }
                    my="md"
                  >
                    {item.category && item.category !== '' && (
                      <Badge color="pink" variant="light">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.category }}
                        />
                      </Badge>
                    )}
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
      )}
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(NewsTable);
