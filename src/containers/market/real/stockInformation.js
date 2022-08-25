import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Modal,Loader,} from '@mantine/core';
import { connect } from 'react-redux';
import {getEveryFeeder} from "../../../apis/main"
import { Stack } from '@mantine/core';
import { Center } from '@mantine/core';
import lodash from 'lodash'

/**
 * @description This component need a refresh time but it is a modal and
 * when it renders then it doesnt need refresh tiem
 * it means when a new open it will send a request to server
 */
const StockInformation = ({props,stockId,fullData = [],opended,onClose})=>{
  const [loading,setLoading] = useState(false);
  const [data , setData] = useState(fullData);
  
  
  return (
    <Modal zIndex={99999999999999} title="اطلاعات نماد" dir="rtl" opened={opended} onClose={onClose}>
      {! lodash.isEmpty(fullData) ? (
        <ul className='list-none'>
          <Stack>
            <li>نام شرکت : {fullData.name}</li>
            <li>نماد : {fullData.symbol}</li>
            <li>بازار : {fullData.market}</li>
            <li>گروه : {fullData.group}</li>
            <li>تعداد سهم : {fullData.number}</li>
            <li>ارزش بازار : {fullData.value}</li>
            <li>TSE : <a className='text-blue-500' href={fullData.tsetmc} target={`_blank`}>لینک</a></li>
            <li>لینک کدال : <a className='text-blue-500' href={fullData.codal} target={`_blank`}>لینک</a></li>
            <li>گزارش های ماهانه : <a className='text-blue-500' href={fullData.report} target={`_blank`}>لینک</a></li>
            <li>گزارش میاندوره ای : <a className='text-blue-500' href={fullData.mid_report} target={`_blank`}>لینک</a></li>
            <li>وبسایت: <a className='text-blue-500' href={fullData.website} target={`_blank`}>لینک</a></li>
          </Stack>
        </ul>
      ) : (
        <Center>
          <Loader color="blue" variant="dots" />
        </Center>
      )}
    </Modal>
  )
}

export default StockInformation;