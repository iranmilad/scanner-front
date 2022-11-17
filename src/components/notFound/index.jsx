import SVG from '../../assets/images/404.svg';
import { Center, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
export default () => (
  <Center sx={{ height: '100vh' }}>
    <div className="flex flex-row items-start">
      <div className="text-blue-500 font-extrabold text-6xl border-l-2 pl-4 ml-4">
        404
      </div>
      <div className="flex flex-col items-end space-y-4">
        <h1 className="text-gray-600 text-3xl font-extrabold font-persian ">
          درخواست شما نامعتبر است
        </h1>
        <div className="ml-auto">
          <Link to="/">
            <Button size='sm'>صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    </div>
  </Center>
);
