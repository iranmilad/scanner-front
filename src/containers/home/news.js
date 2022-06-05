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
import { getNews } from '../../apis/charts';
import { Link } from 'react-router-dom';
import colors from 'tailwindcss/colors';

function NewsTable() {
  let [news, setNews] = useState([]);
  useEffect(() => {
    getNews('getNews')
      .then((res) => {
        setNews(res.data.data);
      })
      .catch((err) => {
        setNews([]);
      });
  }, []);

  function createMarkup({text}){
    return {__html: text}
  }

  return (
    <Paper p="xl" radius="md" shadow="xs" mt="xl">
      <Group position="apart">
        <Text mb={'lg'}>خبرنامه</Text>
      </Group>
      <Grid align="stretch">
        {news.map((item, index) => {
          return (
            <Grid.Col sx={{height:"auto"}} key={index} sm={12} md={6}>
              <Card radius="lg" sx={{display:"flex",flexDirection:"column",justifyContent:"space-between", background: colors.slate[50] }}>
                <Group position="apart" my="md">
                  <Text weight={500}><div dangerouslySetInnerHTML={{__html:item.title}} /></Text>
                </Group>
                <Text size="sm" color="dark" style={{ lineHeight: 1.5 }}>
                  <div dangerouslySetInnerHTML={{__html:item.body}} />
                </Text>
                <Group position="apart" my="md">
                  <Badge color="pink" variant="light">
                    <div dangerouslySetInnerHTML={{__html: item.category}} />
                  </Badge>
                  <Badge color="indigo" variant="light">
                    <div dangerouslySetInnerHTML={{__html: item.date}} />
                  </Badge>
                </Group>

                <a href={item.link} target="_blank">
                  <Button
                  size='xs'
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



export default NewsTable;
