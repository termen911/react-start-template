import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import cn from 'clsx';
import { FormikHandlers } from 'formik/dist/types';
import React, { memo } from 'react';
import { FormItem } from 'src/shared/ui/FormItem';
import { getValidates } from 'src/utils/validation';
import { ProfileFormProps } from '../../model/types';

export type NameFieldProps = Pick<ProfileFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

const prefix = <UserOutlined />;

export const NameField = memo(
  ({
    className,
    onChange,
    onBlur,
    autoFocusElement,
    touched,
    value,
    errors,
    disabled,
    submitCount,
  }: NameFieldProps) => {
    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem className={cn(className)} title={'Псевдоним'} required validateStatus={validateStatus} help={help}>
        <Input
          prefix={prefix}
          disabled={disabled}
          ref={autoFocusElement}
          data-cy="input"
          autoFocus
          name="name"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={'Придумайте себе псевдоним'}
        />
      </FormItem>
    );
  }
);

NameField.displayName = 'NameField';
