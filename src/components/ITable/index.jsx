import {
  Box,
  Button,
  Center, Group,
  Loader,
  Paper, Text
} from '@mantine/core';
import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { ShowErrors } from '../../helper';
import { TableDesign } from '../../helper/theme';

/**
 * ITable for handle the every table
 * @component
 * @example
 * return (
 * <ITable
 *  data={data}
 *  columns={columns}
 * />
 */

const ITable = ({
  title,
  isLoading,
  isFetching,
  error,
  allow,
  column,
  data,
  className,
  children,
  customStyles,
  ...other
}) => {
  let paginationComponentOptions = {
    rowsPerPageText: 'تعداد نمایش',
    rangeSeparatorText: 'از',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'همه',
  };
  function Worker() {
    if (isLoading === null || isLoading === undefined) return <></>;
    if (isLoading && isFetching)
      return (
        <Center>
          <Loader variant="dots" />
        </Center>
      );
    if (isLoading && isFetching === false) {
      if (allow === 'login')
        return (
          <Center className='w-full'>
            <Box sx={(theme) => ({background: theme.colors.blue[6],borderRadius:theme.radius.md})} className='w-full py-4 text-center flex flex-col'>
            <Text size='sm' sx={{color:"white"}}>برای مشاهده جدول به حساب کاربری خود وارد شوید</Text>
            <Center>
            <Link to="/login" className='w-fit'>
              <Button mt="sm" sx={(theme) => ({background: "white",color:theme.colors.blue[6],":hover": {background:"white"}})}  size='xs' ml="xs">ورود</Button>
            </Link>
            </Center>
            </Box>
          </Center>
        );
      else
        return (
          <Center>
            <Box sx={(theme) => ({background: theme.colors.blue[6],borderRadius:theme.radius.md})} className='w-full py-4 text-center flex flex-col'>
            <Text size='sm' sx={{color:"white"}} >برای مشاهده این جدول باید اشتراک مناسب را تهیه کنید</Text>
              <Center>
              <Link to="/subscription" className='w-fit'>
                <Button  mt="sm" sx={(theme) => ({background: "white",color:theme.colors.blue[6],":hover": {background:"white"}})}  size='xs' ml="xs">خرید</Button>
              </Link>
              </Center>
            </Box>
          </Center>
        );
    }
    if(error) return <Center><ShowErrors status={error} /></Center>
    return (
      <>
            <DataTable
        columns={column}
        data={data}
        noDataComponent="داده ای برای نمایش وجود ندارد"
        customStyles={customStyles ? customStyles : TableDesign}
        paginationComponentOptions={paginationComponentOptions}
        {...other}
      />
      {children}</>
    )
  }
  return (
    <div className={className}>
    <Paper p="xl" radius="md" shadow="xs" mt="xl">
      <Group position="apart">
        <Text size="sm" mb={'lg'}>
          {title}
        </Text>
      </Group>
      <Worker />
    </Paper>
    </div>
  );
};

export default ITable;
