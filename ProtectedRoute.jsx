
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute = ({ children }) => {
  const { toast } = useToast();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('pdfAccessToken');

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Access Denied",
        description: "You need to enter a valid access code first.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, toast]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
