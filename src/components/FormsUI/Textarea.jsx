import { Textarea as TextAreaField ,Text} from "@mantine/core";
import { useField } from 'formik';

const Textarea = ({ name, type, ...otherProps }) => {
  let [field, mata] = useField(name);

  let config = {
    ...field,
    ...otherProps,
    radius: 'md',
    size: 'md',
    autoComplete: 'off',
  };

    /**
   * Handle Errors
   */
     if (mata && mata.touched && mata.error) {
      config.error = <Text size="xs">{mata.error}</Text>;
    }

  return <TextAreaField {...config} />
}

export default Textarea;