import {
  Button,
  Center,
  Grid,
  Group,
  Modal,
  ScrollArea,
} from '@mantine/core';
import { Form, Formik, FieldArray, Field,ErrorMessage } from 'formik';
import { Component } from 'react';
import FilterSchema from './schema';

class ModalFilter extends Component {
  addField(values, setValues) {
    const filters = [...values.filters];
    filters.push({ name: '', min: '', max: '' });
    setValues({ ...values, filters });
  }


  render() {
    return (
      <Modal
        zIndex={9999999999}
        sx={() => ({ '.mantine-Modal-body': { position: 'relative' } })}
        title="فیلتر"
        size="lg"
        onClose={() => this.props.ModalAction()}
        opened={this.props.opened}
      >
        <Formik
          initialValues={{filters:this.props.filters}}
          onSubmit={(values,{resetForm }) => this.props.onSubmit(values,resetForm)}
          validationSchema={FilterSchema}
          enableReinitialize={true}
        >
          {({ errors, values, touched, setValues}) => (
            <Form>
              <ScrollArea style={{ height: 400 }} dir="rtl">
                <FieldArray name="filters" >
                  {({remove}) =>
                    values.filters.map((item, i) => {
                      return (
                        <Grid key={i} className="w-full p-1">
                          <Grid.Col span={4}>
                            <Field as="select" placeholder='نام ستون' name={`filters.${i}.name`} className="w-full px-3 py-1.5 pl-3 outline-none rounded-md ring-1 ring-slate-200 bg-transparent text-gray-500 focus:ring-blue-500 sm:text-sm">
                              <option></option>
                              {this.props.headers.map((x,y) => (
                                <option value={x.value} key={y}>{x.label}</option>
                              ))}
                            </Field>
                            <ErrorMessage name={`filters.${i}.name`} component="div" className="text-red-500 text-xs" />
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <Field type="text" name={`filters.${i}.min`} placeholder='حداقل' className='w-full mx-2 px-3 py-2 outline-none rounded-md ring-1 ring-slate-200 bg-transparent text-gray-500 focus:ring-blue-500 sm:text-sm' />
                            <ErrorMessage name={`filters.${i}.min`} component="div" className="text-red-500 text-xs" />
                          </Grid.Col>
                          <Grid.Col span={3}>
                          <Field type="text" name={`filters.${i}.max`} placeholder='حداکثر' className='px-3 py-2 w-full outline-none rounded-md ring-1 ring-slate-200 bg-transparent text-gray-500 focus:ring-blue-500 sm:text-sm' />
                            <ErrorMessage name={`filters.${i}.max`} component="div" className="text-red-500 text-xs" />
                          </Grid.Col>
                          <Grid.Col span={1}>
                            <button type='button' className='p-2 bg-red-500 rounded' onClick={() => remove(i)}>
                            <svg className='w-4 h-4 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/></svg>
                            </button>
                          </Grid.Col>
                        </Grid>
                      );
                    })
                  }
                </FieldArray>
              </ScrollArea>
              <Center>
                <Button
                  mt="md"
                  size="sm"
                  color="blue"
                  variant="filled"
                  onClick={() => this.addField(values, setValues)}
                >
                  افزودن
                </Button>
              </Center>
              <Group position="apart">
                <Button type="submit" size="sm" color="green">
                  ثبت
                </Button>
              </Group>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }
}

export default ModalFilter;
