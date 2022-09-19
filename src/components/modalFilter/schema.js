import * as Yup from 'yup';
import lodash from 'lodash';

Yup.addMethod(Yup.array, 'uniqueProperty', function (propertyPath, message) {
  return this.test('unique', '', function (list) {
    const errors = [];

    list.forEach((item, index) => {
      const propertyValue = lodash.get(item, propertyPath);

      if (
        propertyValue &&
        lodash.filter(list, [propertyPath, propertyValue]).length > 1
      ) {
        errors.push(
          this.createError({
            path: `${this.path}[${index}].${propertyPath}`,
            message,
          })
        );
      }
    });

    if (!lodash.isEmpty(errors)) {
      throw new Yup.ValidationError(errors);
    }

    return true;
  });
});

const FilterSchema = Yup.object().shape({
  filters: Yup.array()
    .of(
      Yup.object().shape(
        {
          name: Yup.string().required('ستون اجباری است'),
          min: Yup.number().when('max', {
            is: (max) => !max || max.length === 0,
            then: Yup.number()
              .required('حداقل عدد را وارد کنید')
              .typeError('لطفا فقط عدد وارد کنید'),
            otherwise: Yup.number()
              .typeError('لطفا فقط عدد وارد کنید')
              .test('testMax', 'حداقل عدد اشتباه وارد شده است', function (f) {
                const ref = Yup.ref('max');
                if (!f || f.length === 0) return true;
                return f < this.resolve(ref);
              }),
          }),
          max: Yup.number().when('min', {
            is: (min) => !min || min.length === 0,
            then: Yup.number()
              .required('حداکثر عدد را وارد کنید')
              .typeError('لطفا فقط عدد وارد کنید'),
            otherwise: Yup.number()
              .typeError('لطفا فقط عدد وارد کنید')
              .test('testMin', 'حداکثر عدد اشتباه وارد شده است', function (f) {
                const ref = Yup.ref('min');
                if (!f || f.length === 0) return true;
                return f > this.resolve(ref);
              }),
          }),
        },
        ['min', 'max']
      )
    )
    .uniqueProperty('name', 'ستون ها تکراری میباشند'),
});

export default FilterSchema;
