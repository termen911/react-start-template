import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'src/app/store';
import { selectSessionIsAuthenticated } from 'src/entities/session';
import { setLastRedirect } from 'src/entities/session/model/slice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectSessionIsAuthenticated);
  const location = useLocation();
  const dispatch = useAppDispatch();
  if (!isAuthenticated) {
    dispatch(setLastRedirect(location.pathname));
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
