import { ErrorCode } from 'src/shared/api/types/error';

export const COMMAND_ID = 'sergn-react-start-template-test1';

export const UNKNOWN_ERROR_MESSAGE = {
  name: 'Unknown error',
  stack: 'Unknown error',
  message: 'Unknown error',
  extensions: {
    code: ErrorCode.UNKNOWN_ERROR,
  },
};
