import { Component } from 'react';
import {
  Button,
  Badge,
  Card,
  Stack,
  Text,
  ScrollArea,
  Center,
  Loader,
  ActionIcon,
  Group,
} from '@mantine/core';
import axios from 'axios';
import Cookies from 'js-cookie';

class PrivateMessages extends Component {
  async seeMessage(id) {
    try {
      let response = await axios.put(
        `https://user.tseshow.com/api/notifications/seen/${id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      this.props.setAllMessagesToState();
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <Stack>
        <Text size="lg" weight="bold">
          پیام های خصوصی
        </Text>
        {this.props.loading ? (
          <Center>
            <Loader variant="dots" color="blue" />
          </Center>
        ) : (
          <>
            {this.props.messages.length > 0 ? (
              <ScrollArea type="always" style={{ height: 300 }}>
                <Stack>
                  {this.props.messages.map((item, index) => (
                    <Card
                      sx={{backgroundColor: item.seen_at === null ? '' : '#f5f5f5'}}
                      dir="rtl"
                      radius="sm"
                      shadow="none"
                      withBorder
                      p="sm"
                      key={index}
                    >
                      <Stack>
                        <Text size="md" color="#1e293b" weight="bolder">
                          {item.title}
                        </Text>
                        <Text size="sm" weight="normal">
                          {item.text}
                        </Text>
                        <Group position='apart'>
                        <Text size='xs' color="gray">
                          ایجاد شده در : 
                          {item.created_at}
                        </Text>
                        {item.seen_at === null ? (
                          <ActionIcon title='خواندن' variant="filled" color="blue" onClick={()=>this.seeMessage(item.id)}>
                            <svg className='w-3 h-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
                          </ActionIcon>
                        ) : <Badge variant='filled'>خوانده شده</Badge>}
                        </Group>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </ScrollArea>
            ) : (
              <Badge
                radius="xs"
                color="orange"
                p="md"
                size="lg"
                sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
              >
                شما پیام جدید ندارید
              </Badge>
            )}
          </>
        )}
      </Stack>
    );
  }
}

export default PrivateMessages;
