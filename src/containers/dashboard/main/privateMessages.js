import { Component, useState } from 'react';
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
  LoadingOverlay,
} from '@mantine/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import {getEveryUser} from "../../../apis/main"

class PrivateMessages extends Component {
  constructor(props){
    super(props);
    this.state = {
      newMessage: false
    }
  }
  async seeMessage(id) {
    try {
      let response = await axios.put(
        `https://user.tseshow.com/api/notifications/seen/${id}`,
        {},
        {

        }
      );
      let count = 0;
      response.data.data.map(item => ! 'seen_at' in item ? count++ : null)
      this.setState({newMessage: count === 0 ? false : true});
      this.props.setAllMessagesToState();
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    let count = 0;
    this.props.messages.map(item => ! 'seen_at' in item ? count++ : null)
    this.setState({newMessage: count === 0 ? false : true});
  }
  render() {
    return (
      <Stack>
        <Text size="lg" weight="bold">
          پیام های خصوصی
          <span className={`w-5 h-5 rounded-full ${this.state.newMessage ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
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
                    <SingleItem item={item} key={index} />
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

const SingleItem = ({item}) => {
  let [loading,setLoading] = useState(false);
  let [seen,setSeen] = useState(item.seen_at === null ? false : true);
  
  async function see(id){
    setLoading(true);
    try {
      await getEveryUser(`/notifications/seen/${id}`,{
        method: "put",
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      setLoading(false)
      setSeen(true);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }
  return (
    <Card
    sx={{backgroundColor: seen ? '#f5f5f5' : ''}}
    dir="rtl"
    radius="sm"
    shadow="none"
    withBorder
    p="sm"
    className='relative'
  >
    <LoadingOverlay visible={loading} loader={<Loader variant='dots' />} />
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
      {seen ? <Badge variant='filled'>خوانده شده</Badge> : (
        <ActionIcon title='خواندن' variant="filled" color="blue" onClick={()=>see(item.id)}>
        <svg className='w-3 h-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
      </ActionIcon>
      )}
      </Group>
    </Stack>
  </Card>
  )
}

export default PrivateMessages;
