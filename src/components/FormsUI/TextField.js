import { TextInput ,PasswordInput , Text} from "@mantine/core"
import { useField } from "formik"

const TextField = ({name,type,...otherProps})=>{
  let [field,mata] = useField(name);

  let configFields = {
    ...field,
    ...otherProps,
    variant: 'filled',
    color: 'indigo',
    radius: 'md',
    size: 'md',
    // autoComplete: 'off'
  }
  if(mata && mata.touched && mata.error){
    configFields.error = <Text size="xs">{mata.error}</Text>;
  }

  if(type === 'password'){
    return <PasswordInput {...configFields} />
  }

  return <TextInput {...configFields} />
}

export default TextField;