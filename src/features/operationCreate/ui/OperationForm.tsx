import {
  Divider as AntDivider,
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Select,
  Space,
  Spin,
  type InputRef,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { useCategories } from 'src/entities/category/model/api/useCategories';
import { useCreateCategory } from 'src/entities/category/model/api/useCreateCategory';
import { Operation } from 'src/entities/operation';
import { useCreateOperation } from 'src/entities/operation/model/api/useCreateOperation';
import { useUpdateOperation } from 'src/entities/operation/model/api/useUpdateOperation';
import { ServerErrors } from 'src/shared/api/types/error';

type FormValues = {
  name: string;
  desc?: string;
  amount: number;
  date: string;
  type: 'Profit' | 'Cost';
  categoryId: string;
};

type OperationFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  operation?: Pick<Operation, 'id' | 'name' | 'desc' | 'amount' | 'type' | 'category' | 'date'>;
};

export const OperationForm: React.FC<OperationFormProps> = ({ onSuccess, onCancel, operation }) => {
  const [form] = Form.useForm<FormValues>();

  const isEditing = !!operation;

  const { data } = useCategories({
    sorting: { field: 'name', type: 'ASC' },
  });

  const allCategories = data?.pages.flatMap((page) => page.data) || [];

  // Мутации
  const { mutate: createOperation, isPending: isCreating, error: createError } = useCreateOperation();
  const { mutate: updateOperation, isPending: isUpdating, error: updateError } = useUpdateOperation();
  const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();

  const inputRef = useRef<InputRef>(null);

  const localOnSuccess = () => {
    form.resetFields();
    onSuccess?.();
  };

  useEffect(() => {
    if (createError || updateError) {
      const error = (createError || updateError) as ServerErrors;
      if (error.errors[0].message) {
        message.error(error.errors[0].message);
      } else {
        message.error('Ошибка при сохранении');
      }
    }
  }, [createError, updateError]);

  const handleCreateCategory = (name: string) => {
    if (!name.trim()) return;
    createCategory(
      { name },
      {
        onSuccess: (newCategory) => {
          form.setFieldValue('categoryId', newCategory.id);
        },
      }
    );
  };

  // Фокус на инпут при открытии dropdown
  const onDropdownVisibleChange = (visible: boolean) => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.input?.focus();
      }, 100);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (isEditing) {
      updateOperation({ id: operation.id, dto: data }, { onSuccess: localOnSuccess });
    } else {
      createOperation(data, { onSuccess: localOnSuccess });
    }
  };

  return (
    <Spin spinning={isCreating || isUpdating} tip="Сохранение...">
      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        initialValues={{
          ...operation,
          categoryId: operation?.category.id,
          date: operation?.date ? dayjs(operation.date) : undefined,
        }}
      >
        <Form.Item name="name" label="Название" required rules={[{ required: true, message: 'Обязательно' }]}>
          <Input placeholder="Например: Зарплата" />
        </Form.Item>

        <Form.Item name="desc" label="Описание">
          <Input.TextArea placeholder="Дополнительные детали" />
        </Form.Item>

        <Form.Item name="amount" label="Сумма" required rules={[{ required: true, message: 'Обязательно' }]}>
          <Input type="number" step="0.01" placeholder="0.00" />
        </Form.Item>

        <Form.Item name="date" label="Дата" required rules={[{ required: true, message: 'Обязательно' }]}>
          <DatePicker showTime style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="type" label="Тип" required rules={[{ required: true, message: 'Обязательно' }]}>
          <Select
            options={[
              { label: 'Доход', value: 'Profit' },
              { label: 'Расход', value: 'Cost' },
            ]}
          />
        </Form.Item>

        <Form.Item name="categoryId" label="Категория" required rules={[{ required: true, message: 'Обязательно' }]}>
          <Select
            showSearch
            placeholder="Выберите или создайте категорию"
            onOpenChange={onDropdownVisibleChange}
            filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
            options={allCategories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
            loading={isCreatingCategory}
            disabled={isCreatingCategory}
            popupRender={(menu) => (
              <>
                {menu}
                <AntDivider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 8px' }}>
                  <Input
                    placeholder="Новая категория"
                    ref={inputRef}
                    onPressEnter={(e) => {
                      handleCreateCategory((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }}
                    disabled={isCreatingCategory}
                  />
                  <Button
                    type="text"
                    onClick={() => {
                      const value = inputRef.current?.input?.value;
                      if (value) {
                        handleCreateCategory(value);
                      }
                    }}
                    loading={isCreatingCategory}
                    disabled={isCreatingCategory}
                  >
                    Добавить
                  </Button>
                </Space>
              </>
            )}
          />
        </Form.Item>

        <Divider />

        <Flex justify="end" gap={8}>
          <Button onClick={onCancel} disabled={isCreating || isUpdating}>
            Отмена
          </Button>
          <Button type="primary" htmlType="submit" loading={isCreating || isUpdating}>
            {isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </Flex>
      </Form>
    </Spin>
  );
};
