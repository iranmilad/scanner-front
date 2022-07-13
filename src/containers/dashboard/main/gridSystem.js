import { Stack, Text , RadioGroup,Radio, Button } from '@mantine/core';
import { Component } from 'react';

class GridSystem extends Component {
  render() {
    return (
      <Stack>
      <Text size="lg" weight="bold">
        تنظیمات لایه بندی
      </Text>
      <RadioGroup orientation='vertical' defaultValue='2 ستونه'>
        <Radio value='2 ستونه' label='2 ستونه' />
        <Radio value='3 ستونه' label='3 ستونه' />
      </RadioGroup>
      <Button fullWidth mt="md">ذخیره</Button>
    </Stack>
    )
  }
}

export default GridSystem;
