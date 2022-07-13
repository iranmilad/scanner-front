import { Component } from 'react';
import { Badge ,Button,Stack, Text} from '@mantine/core';
import { Link } from 'react-router-dom';

class Subscription extends Component{
  render(){
    return (
      <Stack>
        <Text size='lg' weight="bold">تهیه اشتراک</Text>
        {this.props.subscription.map((item,id)=>(
          <Badge key={id} radius="xs" color="cyan" p="md" size='lg' sx={{width: "100%",display:"flex",alignItems:"center"}} >{item}</Badge>
        ))}
        <Link to="/subscription" style={{width: "100%"}}>
          <Button sx={{width: "100%"}}>تهیه اشتراک</Button>
        </Link>
      </Stack>
    )
  }
}

export default Subscription;