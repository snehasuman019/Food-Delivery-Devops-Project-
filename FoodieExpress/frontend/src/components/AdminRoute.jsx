import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user || !isAdmin) {
    // Redirect non-admins to homepage
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
