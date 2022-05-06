import { Card, SimpleGrid, Badge, Button, Group, Text,Paper } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getNews } from '../../apis/charts';
import { Link } from 'react-router-dom';

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
  return (
    <Paper padding="xl" radius="md" shadow="xs" mt="xl">
      <Group position="apart">
          <Text mb={'lg'}>خبرنامه</Text>
        </Group>
      <SimpleGrid cols={2}>
        {news.map((item, index) => {
          return (
            <Card withBorder key={index}>
              <Group position="apart" my="md">
                <Text weight={500}>{item.title}</Text>
              </Group>
              <Text size="sm" color="dark" style={{ lineHeight: 1.5 }}>
                {item.body}
              </Text>
              <Group position="apart" my="md">
                <Badge color="pink" variant="light">
                  {item.category}
                </Badge>
                <Text size="sm">{item.date}</Text>
              </Group>

              <Link to={item.link}>
                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  style={{ marginTop: 14 }}
                >ادامه مطلب</Button>
              </Link>
            </Card>
          );
        })}
      </SimpleGrid>
    </Paper>
  );
}

export default NewsTable;
