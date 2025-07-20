import { CalendarOutlined, DollarOutlined, FileTextOutlined, TagOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppTranslation } from 'src/app/providers/i18n';
import { TransactionType } from 'src/shared/api/mock';

import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSFER_CATEGORIES } from '../model/constants';
import { CategoryOption, TransactionFormData, TransactionFormProps } from '../model/types';
import { createTransactionValidationRules } from '../model/validation';

const { TextArea } = Input;
const { Text } = Typography;

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, defaultValues = {}, loading = false }) => {
  const { t } = useAppTranslation();
  const [selectedType, setSelectedType] = useState<TransactionType>(defaultValues.type || TransactionType.EXPENSE);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [tagInput, setTagInput] = useState<string>('');

  const validationRules = createTransactionValidationRules(t);

  useEffect(() => {
    console.log(3334, defaultValues);
  }, [defaultValues]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<TransactionFormData>({
    defaultValues: {
      type: TransactionType.EXPENSE,
      amount: 0,
      title: '',
      description: '',
      categoryName: '',
      categoryIcon: '',
      categoryColor: '',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      ...defaultValues,
    },
    mode: 'onChange',
  });

  const watchedType = watch('type');
  const watchedTags = watch('tags') || [];

  // Обновляем selectedType при изменении типа в форме
  useEffect(() => {
    setSelectedType(watchedType);
  }, [watchedType]);

  // Получаем категории в зависимости от типа операции
  const getCategories = (type: TransactionType): CategoryOption[] => {
    switch (type) {
      case TransactionType.INCOME:
        return INCOME_CATEGORIES;
      case TransactionType.EXPENSE:
        return EXPENSE_CATEGORIES;
      case TransactionType.TRANSFER:
        return TRANSFER_CATEGORIES;
      default:
        return EXPENSE_CATEGORIES;
    }
  };

  const categories = getCategories(selectedType);

  // Обработчик выбора категории
  const handleCategorySelect = (category: CategoryOption, checked: boolean) => {
    setSelectedCategory(checked ? category : null);
    setValue('categoryName', t(category.name, { locale: 'ru' }));
    setValue('categoryIcon', category.icon);
    setValue('categoryColor', category.color);
  };

  // Обработчик добавления тега
  const handleAddTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      const newTags = [...watchedTags, tagInput.trim()];
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  // Обработчик удаления тега
  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = watchedTags.filter((tag) => tag !== tagToRemove);
    setValue('tags', newTags);
  };

  const onFormSubmit = (data: TransactionFormData) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error('Ошибка при сохранении транзакции:', error);
    }
  };

  const onReset = () => {
    reset({
      type: defaultValues.type || TransactionType.EXPENSE,
      amount: defaultValues.amount || 0,
      title: defaultValues.title || '',
      description: defaultValues.description || '',
      categoryName: defaultValues.categoryName || '',
      categoryIcon: defaultValues.categoryIcon || '',
      categoryColor: defaultValues.categoryColor || '',
      date: defaultValues.date || new Date().toISOString().split('T')[0],
      tags: defaultValues.tags || [],
    });
    setSelectedCategory(null);
    setTagInput('');
  };

  return (
    <Card style={{ width: '100%' }}>
      <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
        {/* Тип операции */}
        <Form.Item
          label={t('transaction.form.type.label')}
          validateStatus={errors.type ? 'error' : ''}
          help={errors.type?.message}
          required
        >
          <Controller
            name="type"
            control={control as any}
            rules={validationRules.type}
            render={({ field }) => (
              <Radio.Group {...field} size="large">
                <Radio.Button value={TransactionType.INCOME}>💰 {t('transaction.form.type.income')}</Radio.Button>
                <Radio.Button value={TransactionType.EXPENSE}>💸 {t('transaction.form.type.expense')}</Radio.Button>
                <Radio.Button value={TransactionType.TRANSFER}>🔄 {t('transaction.form.type.transfer')}</Radio.Button>
              </Radio.Group>
            )}
          />
        </Form.Item>

        {/* Сумма и название в одном ряду */}
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label={t('transaction.form.amount.label')}
              validateStatus={errors.amount ? 'error' : ''}
              help={errors.amount?.message}
              required
            >
              <Controller
                name="amount"
                control={control as any}
                rules={validationRules.amount}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    placeholder={t('transaction.form.amount.placeholder')}
                    prefix={<DollarOutlined />}
                    size="large"
                    style={{ width: '100%' }}
                    min={0.01}
                    step={0.01}
                    precision={2}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item
              label={t('transaction.form.title.label')}
              validateStatus={errors.title ? 'error' : ''}
              help={errors.title?.message}
              required
            >
              <Controller
                name="title"
                control={control as any}
                rules={validationRules.title}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t('transaction.form.title.placeholder')}
                    prefix={<FileTextOutlined />}
                    size="large"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Категория */}
        <Form.Item
          label={t('transaction.form.category.label')}
          validateStatus={errors.categoryName ? 'error' : ''}
          help={errors.categoryName?.message}
          required
        >
          <div style={{ marginBottom: '8px' }}>
            <Text type="secondary">{t('transaction.form.category.help')}</Text>
          </div>
          <Space wrap>
            {categories.map((category) => (
              <Tag.CheckableTag
                key={category.name}
                checked={
                  selectedCategory?.name === category.name ||
                  defaultValues.categoryName === t(category.name, { locale: 'ru' })
                }
                onChange={(checked) => handleCategorySelect(category, checked)}
              >
                {category.icon} {t(category.name)}
              </Tag.CheckableTag>
            ))}
          </Space>
        </Form.Item>

        {/* Дата */}
        <Form.Item
          label={t('transaction.form.date.label')}
          validateStatus={errors.date ? 'error' : ''}
          help={errors.date?.message}
          required
        >
          <Controller
            name="date"
            control={control as any}
            rules={validationRules.date}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date?.format('YYYY-MM-DD'))}
                placeholder={t('transaction.form.date.placeholder')}
                prefix={<CalendarOutlined />}
                size="large"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current > dayjs().endOf('day')}
              />
            )}
          />
        </Form.Item>

        {/* Описание */}
        <Form.Item
          label={t('transaction.form.description.label')}
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control as any}
            rules={validationRules.description}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder={t('transaction.form.description.placeholder')}
                rows={3}
                maxLength={500}
                showCount
                size="large"
              />
            )}
          />
        </Form.Item>

        {/* Теги */}
        <Form.Item
          label={t('transaction.form.tags.label')}
          validateStatus={errors.tags ? 'error' : ''}
          help={errors.tags?.message}
        >
          <div style={{ marginBottom: '8px' }}>
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder={t('transaction.form.tags.placeholder')}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onPressEnter={handleAddTag}
                prefix={<TagOutlined />}
                size="large"
              />
              <Button type="primary" onClick={handleAddTag} size="large">
                {t('transaction.form.tags.add')}
              </Button>
            </Space.Compact>
          </div>
          {watchedTags.length > 0 && (
            <Space wrap>
              {watchedTags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ fontSize: '12px', padding: '2px 8px' }}
                >
                  {tag}
                </Tag>
              ))}
            </Space>
          )}
        </Form.Item>

        {/* Кнопки */}
        <Form.Item>
          <Flex justify="end" gap={16}>
            <Button type="text" onClick={onReset} disabled={loading || isSubmitting} size="large">
              {t('transaction.form.buttons.reset')}
            </Button>
            <Button type="primary" htmlType="submit" loading={loading || isSubmitting} size="large">
              {t('transaction.form.buttons.save')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Card>
  );
};
