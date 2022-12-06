import { Badge, Button, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const Subscription = (props) => {
  return (
    <Stack className='h-full'>
      <Text size="lg" weight="bold">
        تهیه اشتراک
      </Text>
      <div className="flex flex-col justify-between h-full">
      {props.subscription.map((item, id) => (
            <Badge
              key={id}
              radius="xs"
              color="cyan"
              p="md"
              size="lg"
              sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
            >
              {item}
            </Badge>
          ))}
        <Link to="/subscription" style={{ width: '100%' }}>
          <Button disabled sx={{ width: '100%' }}>
            تهیه اشتراک
          </Button>
        </Link>
      </div>
    </Stack>
  );
};

export default Subscription;
