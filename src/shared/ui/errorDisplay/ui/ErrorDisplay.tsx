import { Alert, Space } from 'antd';
import { AlertProps } from 'antd/lib';
import React from 'react';
import { ServerErrors } from 'src/shared/api/types/error';

interface ErrorDisplayProps extends AlertProps {
  error: ServerErrors | string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, ...props }) => {
  const getMessageLocalization = (message: string) => {
    //TODO: add localization
    return message;
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {typeof error === 'string' ? (
        <Alert message={getMessageLocalization(error)} {...props} />
      ) : (
        error.errors.map((message, index) => (
          <Alert key={index} message={getMessageLocalization(message.message)} {...props} />
        ))
      )}
    </Space>
  );
};
