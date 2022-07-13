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
import { BsCheckAll } from 'react-icons/bs';
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
                            <BsCheckAll />
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
