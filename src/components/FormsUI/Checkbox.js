import { Checkbox } from "@mantine/core"
import { useField,useFormikContext } from "formik";

const CheckboxField = ({name,...otherProps})=>{
  let {setFieldValue} = useFormikContext();

  let [field,meta] = useField(name);

  let onChange = (e)=>{
    const {checked} = e.target;
    setFieldValue(name,checked);
  }

  let configCheckbox = {
    ...field,
    ...otherProps,
    onChange
  }

  if(meta && meta.touched && meta.error){
    configCheckbox.sx = (theme)=>({"& .mantine-Checkbox-label":{color:"#f03e3e"}})
  }

  return (
    <Checkbox {...configCheckbox} />
  )
}

export default CheckboxField;