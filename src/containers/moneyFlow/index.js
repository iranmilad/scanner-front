import {
  Button,
  Checkbox,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useConfig } from '../../helper';
import { XChart } from '../home';

const MoneyFlow = (props) => {
  const [modal, setModal] = useState(false);

  const prevList = useConfig(null, null, (checker) => {
    let items = [];
    // find items with regex from MF1 to MF18 and push to items and check 1 and 7 and 13
    for (let i = 1; i <= 18; i++) {
      let item = props.chartAndtables.find((item) => item.key === `MF${i}`);
      if (item) {
        let completeItem = checker(item);
        items.push({ ...completeItem, checked: i === 1 || i === 7 || i === 13 });
      }
    }
    return items;
  });

  const [list, setList] = useState([...prevList]);

  return (
    <>
      <Helmet>
        <title>نمودار های جریانات نقدینگی لحظه ای</title>
      </Helmet>
      <Group position="apart">
        <Text size="sm">نمودار های جریانات نقدینگی لحظه ای</Text>
        <Button size="sm" onClick={setModal}>
          تنظیمات نمایش چارت ها
        </Button>
      </Group>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div className='min-h-[300px]'>
          {list.slice(0, 6).map((item, id) => (
            <div className="my-2" key={id}>
              {item.checked === true && <XChart className="min-h-[300px]" item={item} />}
            </div>
          ))}
        </div>
        <div className='min-h-[300px]'>
          {list.slice(6, 12).map((item, id) => (
            <div className="my-2" key={id}>
              {item.checked === true && <XChart item={item} />}
            </div>
          ))}
        </div>
        <div className='min-h-[300px]'>
          {list.slice(12, 18).map((item, id) => (
            <div className="my-2" key={id}>
              {item.checked === true && <XChart item={item} />}
            </div>
          ))}
        </div>
      </div>
      <Modal
        opened={modal}
        onClose={setModal}
        title="نمایش چارت ها"
        zIndex={99999999999999}
        dir="rtl"
      >
        <ScrollArea sx={{ height: 300 }} dir="rtl" type="always">
          <Stack>
            {list.map((item, index) => (
              <Checkbox
                key={index}
                onChange={(e) =>
                  setList((item) => {
                    let newList = [...item];
                    newList[index].checked = e.target.checked;
                    return [...newList];
                  })
                }
                label={item.title}
                {...item}
              />
            ))}
          </Stack>
        </ScrollArea>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(MoneyFlow);
