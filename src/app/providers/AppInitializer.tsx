import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchProfileThunk } from 'src/entities/profile';
import { selectProfileUser } from 'src/entities/profile/model/selectors';
import { selectSessionIsInitialized, selectSessionToken } from 'src/entities/session';
import { setInitialized } from 'src/entities/session/model/slice';
import { useAppDispatch } from '../store';

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectProfileUser);
  const token = useSelector(selectSessionToken);
  const isInitialized = useSelector(selectSessionIsInitialized);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(setInitialized());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchProfileThunk());
    }
  }, [dispatch, token, user]);

  if (token && !user) {
    return <Spin fullscreen />;
  }

  return <>{children}</>;
};
