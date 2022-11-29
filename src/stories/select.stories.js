import { Select } from "@mantine/core";
import {useUncontrolled} from "@mantine/hooks"

export default {
  title: "Select",
  component: Select,
}

const Template = (args) => {
  const [value, setValue] = useUncontrolled({
    value: args.value,
    defaultValue: [0],
    onChange: args.onChange,
  });
  return (
    <Select
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Select",
  placeholder: "Select",
  data: [
    { label: "Option 1", value: "option-1" },
    { label: "Option 2", value: "option-2" },
    { label: "Option 3", value: "option-3" },
  ],
  clearable: true
};
