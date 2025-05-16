import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/LoginPage';
import PDFListPage from '@/pages/PDFListPage';
import PDFViewerPage from '@/pages/PDFViewerPage';
import ProtectedRoute from '@/components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/list" 
          element={
            <ProtectedRoute>
              <PDFListPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/view/:pdfId" 
          element={
            <ProtectedRoute>
              <PDFViewerPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;