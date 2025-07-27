import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/store';
import { selectSessionError, signupThunk } from 'src/entities';
import { SignupFormData } from 'src/shared';
import { signup } from 'src/shared/api/services/auth.api';
import { ServerErrors } from 'src/shared/api/types/error';
import { UNKNOWN_ERROR_MESSAGE } from 'src/shared/lib/consts/api.consts';
import { storage, storageKeys } from 'src/shared/lib/storage';

export const useSignupPage = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<ServerErrors | string | null>(null);
  const [serverError, setServerError] = useState<ServerErrors | null>(null);
  const sessionError = useSelector(selectSessionError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (sessionError) {
      setError(sessionError);
    }
  }, [sessionError]);

  const onSubmit = async (credentials: SignupFormData, mode: 'thunk' | 'func' = 'func') => {
    switch (mode) {
      case 'thunk':
        return onSubmitThunk(credentials);
      default:
        return onSubmitFunc(credentials);
    }
  };

  const onSubmitFunc = async (credentials: SignupFormData) => {
    try {
      setIsLoading(true);
      const response = await signup(credentials);
      if (response.ok) {
        const data = await response.json();
        storage.set(storageKeys.AUTH_TOKEN, data.token);
        navigate('/');
      } else {
        const error = await response.json();
        setError(error);
        setServerError(error);
      }
    } catch (error) {
      if (error.toString().includes('Unknown error')) {
        setError({ errors: [UNKNOWN_ERROR_MESSAGE] });
        setServerError({ errors: [UNKNOWN_ERROR_MESSAGE] });
      } else {
        setError(error as ServerErrors);
        setServerError(error as ServerErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitThunk = async (credentials: SignupFormData) => {
    dispatch(signupThunk(credentials));
  };

  return {
    error,
    serverError,
    isLoading,
    onSubmit,
  };
};
