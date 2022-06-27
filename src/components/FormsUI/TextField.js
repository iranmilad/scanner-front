import { TextInput, PasswordInput, Text } from '@mantine/core';
import { useField } from 'formik';

/**
 * TextField field component is a text field with authentication
 * @component
 * @example
 * return (
 *   <TextField />
 * )
 */

const TextField = ({ name, type, ...otherProps }) => {
  let [field, mata] = useField(name);

  let configFields = {
    ...field,
    ...otherProps,
    variant: 'filled',
    color: 'blue',
    radius: 'md',
    size: 'md',
    autoComplete: 'off',
  };

  /**
   * Handle Errors
   */
  if (mata && mata.touched && mata.error) {
    configFields.error = <Text size="xs">{mata.error}</Text>;
  }

  if (type === 'password') {
    return <PasswordInput {...configFields} />;
  }

  return <TextInput {...configFields} />;
};

export default TextField;
