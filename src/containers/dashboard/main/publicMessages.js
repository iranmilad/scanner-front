import { Component } from 'react';
import {Button,Badge, Card, Stack, Text, ScrollArea } from '@mantine/core';

class PublicMessages extends Component {
  render() {
    return (
      <Stack>
        <Text size="lg" weight="bold">
          پیام های عمومی
        </Text>
        {this.props.messages.length > 0 ? (
        <ScrollArea type="always" style={{ height: 300 }}>
        <Stack>
          {this.props.messages.map((item, index) => (
            <Card dir='rtl' radius="sm" shadow="none" withBorder p="sm" key={index}>
              <Stack>
                <Text size="md" color="#1e293b" weight="bolder">
                  {item.title}
                </Text>
                <Text size="sm" weight="normal">
                  {item.body}
                </Text>
                <a href={item.link} target={'_blank'}>
                  <Button variant="light" color="blue" fullWidth>
                    بخوانید
                  </Button>
                </a>
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

      </Stack>
    );
  }
}

export default PublicMessages;
