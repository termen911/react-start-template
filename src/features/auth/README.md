# Формы аутентификации

Данный модуль содержит формы для аутентификации пользователей с использованием `react-hook-form` и валидацией через `yup`.

## Структура

```
src/features/auth/
├── login/
│   ├── ui/
│   │   ├── LoginForm.tsx
│   │   ├── LoginForm.module.css
│   │   └── LoginForm.stories.tsx
│   ├── model/
│   │   └── types.ts
│   └── index.ts
├── register/
│   ├── ui/
│   │   ├── RegisterForm.tsx
│   │   ├── RegisterForm.module.css
│   │   └── RegisterForm.stories.tsx
│   ├── model/
│   │   └── types.ts
│   └── index.ts
└── README.md
```

## Использование

### LoginForm

```tsx
import { LoginForm } from 'features/auth/login';

const handleLogin = (data: LoginFormData) => {
  console.log('Login data:', data);
  // Отправка данных на сервер
};

<LoginForm onSubmit={handleLogin} loading={false} error={undefined} />;
```

### RegisterForm

```tsx
import { RegisterForm } from 'features/auth/register';

const handleRegister = (data: RegisterFormData) => {
  console.log('Register data:', data);
  // Отправка данных на сервер
};

<RegisterForm onSubmit={handleRegister} loading={false} error={undefined} />;
```

## Валидация

Формы используют схемы валидации из `shared/lib/validation/auth.ts`:

- **LoginForm**: email и пароль (минимум 6 символов)
- **RegisterForm**: имя, фамилия, email, пароль (с требованиями к сложности) и подтверждение пароля

## Storybook

Для просмотра компонентов в Storybook:

```bash
npm run storybook
```

### Доступные истории:

- `Features/Auth/LoginForm` - все состояния формы входа
- `Features/Auth/RegisterForm` - все состояния формы регистрации

## Общие компоненты

Используются переиспользуемые компоненты из `shared/ui/forms/`:

- `FormField` - универсальное поле формы
- `FormButton` - кнопка с различными вариантами стилизации

## Особенности

- ✅ Валидация в реальном времени
- ✅ Обработка состояний загрузки
- ✅ Отображение ошибок
- ✅ Адаптивная верстка
- ✅ Типизация TypeScript
- ✅ Storybook документация
