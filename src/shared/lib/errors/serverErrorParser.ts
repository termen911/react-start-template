import { ClientError, ErrorCode, ServerErrors } from 'src/shared/api/types/error';

export function parseServerError(serverErrors: ServerErrors): ClientError {
  const firstError = serverErrors.errors[0];

  if (!firstError) {
    return {
      code: ErrorCode.ERR_INTERNAL_SERVER,
      message: 'Произошла неизвестная ошибка. Попробуйте позже.',
    };
  }

  const { extensions, message, fieldName } = firstError;
  const code = extensions.code;

  let userMessage = '';

  switch (code) {
    case ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD:
      userMessage = 'Неверный email или пароль.';
      break;

    case ErrorCode.ERR_ACCOUNT_ALREADY_EXIST:
      userMessage = 'Пользователь с такими данными уже существует.';
      break;

    case ErrorCode.ERR_FIELD_REQUIRED:
      userMessage = fieldName
        ? `Поле "${fieldName}" обязательно для заполнения.`
        : 'Одно из полей обязательно для заполнения.';
      break;

    case ErrorCode.ERR_INCORRECT_PASSWORD:
      userMessage = 'Текущий пароль введен неверно.';
      break;

    case ErrorCode.ERR_INVALID_PASSWORD:
      userMessage = 'Пароль должен быть не менее 8 символов и содержать буквы, цифры и специальные символы.';
      break;

    case ErrorCode.ERR_NOT_VALID:
      userMessage = 'Указан некорректный идентификатор.';
      break;

    case ErrorCode.ERR_AUTH:
      userMessage = 'Требуется авторизация. Пожалуйста, войдите в систему.';
      break;

    case ErrorCode.ERR_NO_FILES:
      userMessage = 'Не удалось загрузить файлы. Проверьте формат и размер.';
      break;

    case ErrorCode.ERR_NOT_ALLOWED:
      userMessage = 'У вас нет прав для выполнения этого действия.';
      break;

    case ErrorCode.ERR_NOT_FOUND:
      userMessage = 'Запрашиваемая сущность не найдена.';
      break;

    case ErrorCode.ERR_VALIDATION_ERROR:
      userMessage = message || 'Данные не прошли валидацию.';
      break;

    case ErrorCode.ERR_INVALID_QUERY_PARAMS:
      userMessage = 'Некорректные параметры запроса.';
      break;

    case ErrorCode.ERR_INTERNAL_SERVER:
    default:
      userMessage = 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.';
      break;
  }

  return {
    code,
    message: userMessage,
    fieldName,
  };
}
