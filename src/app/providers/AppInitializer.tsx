import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSessionIsInitialized, selectSessionToken, selectSessionUser } from 'src/entities/session';
import { setInitialized } from 'src/entities/session/model/slice';
import { useAppDispatch } from '../store';

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectSessionUser);
  const token = useSelector(selectSessionToken);
  const isInitialized = useSelector(selectSessionIsInitialized);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(setInitialized());
    }
  }, [dispatch, isInitialized]);

  return <>{children}</>;
};
