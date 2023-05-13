import { FormElement } from '@nextui-org/react';
import { ChangeEvent, useState } from 'react';

export function useForm<T> (initialValues:T) {

  const [values, setValues] = useState(initialValues);

  const onChange = ({ target }: ChangeEvent<FormElement>) => {
    setValues(state => ({
      ...state,
      [target.name]: target.value.trim()
    }));
  };

  return { onChange, ...values};
};