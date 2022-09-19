import { Select,Text } from "@mantine/core"
import { useField,useFormikContext } from "formik"


const SelectWrapper = ({name,...otherProps}) =>{
  const {setFieldValue,setTouched} = useFormikContext()
  const [field,meta,helpers] = useField(name);

  const handleChange = value => {
    setFieldValue(name,value)
  }

  const configSelect = {
    ...field,
    ...otherProps,
    radius: 'md',
    size: 'md',
    onChange: handleChange
  }

  if(meta && meta.touched && meta.error){
    configSelect.error = <Text size="xs">{meta.error}</Text>
  }
  return <Select {...configSelect}  />
}

export default SelectWrapper