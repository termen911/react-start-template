/* eslint-disable react/prop-types */
import Input from 'antd/lib/input';
import { FormikHandlers } from 'formik';
import React, { memo } from 'react';
import { FormItem } from 'src/shared/ui/FormItem/FormItem';
import { getValidates } from 'src/utils/validation';
import { ProfileFormProps } from '../../model/types';

export type AboutFieldProps = Pick<ProfileFormProps, 'className' | 'disabled'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

export const AboutField = memo<AboutFieldProps>(
  ({ className, onChange, onBlur, touched, value, errors, disabled, submitCount }) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={className} title={'О себе'} validateStatus={validateStatus} help={help}>
        <Input.TextArea
          disabled={disabled}
          name="about"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Напишите что-нибудь о себе'}
        />
      </FormItem>
    );
  }
);

AboutField.displayName = 'AboutField';
