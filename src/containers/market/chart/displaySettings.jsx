import { Component } from 'react';
import { MultiSelect } from '@mantine/core';

class DisplaySettings extends Component {
  chartDisplaySettings(values,...others) {

  }
  render() {
    return (
      <MultiSelect
        clearable
        placeholder="انتخاب کنید"
        // onChange={(e) => this.chartDisplaySettings(e)}
        label="تنظیمات نمایشی"
        data={[
          { value: '0', label: 'مخفی کردن نمودار قیمت' },
          { value: '1', label: 'لگاریتمی' },
          { value: '2', label: 'شاخص هم وزن' },
          { value: '3', label: 'پارابولیک SAR' },
          { value: '4', label: 'روزانه' },
        ]}
      />
    );
  }
}

export default DisplaySettings