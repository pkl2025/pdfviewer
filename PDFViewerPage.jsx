import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, FileText, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PDF_DOCUMENTS } from '@/lib/pdfDocuments';

const PDFViewerPage = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState('Document');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const navigate = useNavigate();
  const { pdfId } = useParams();
  const { toast } = useToast();
  
  useEffect(() => {
    const token = localStorage.getItem('pdfAccessToken');
    const storedPdfId = localStorage.getItem('selectedPdfId');

    if (!token) {
      navigate('/');
      return;
    }

    if (pdfId !== storedPdfId) {
      toast({
        title: "Access Mismatch",
        description: "The selected document does not match your current session. Please select from the list.",
        variant: "destructive",
      });
      navigate('/list');
      return;
    }
    
    const document = PDF_DOCUMENTS[pdfId];
    
    if (document && document.url) {
      setPdfUrl(document.url);
      setPdfTitle(document.title);
      setIsLoading(false);
    } else {
      setLoadError(true);
      setIsLoading(false);
      toast({
        title: "Error Loading Document",
        description: "Could not find the selected document or its URL.",
        variant: "destructive",
      });
    }
  }, [navigate, toast, pdfId]);
  
  const handleLogout = () => {
    localStorage.removeItem('pdfAccessToken');
    localStorage.removeItem('selectedPdfId');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };
  
  const handleRetry = () => {
    setIsLoading(true);
    setLoadError(false);
    
    setTimeout(() => {
      const document = PDF_DOCUMENTS[pdfId];
      if (document && document.url) {
        setPdfUrl(document.url);
        setPdfTitle(document.title);
        setIsLoading(false);
      } else {
        setLoadError(true);
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <Link to="/list" aria-label="Back to list">
                <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </Button>
            <FileText className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-semibold text-foreground truncate" title={pdfTitle}>{pdfTitle}</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pdf-container" 
        >
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <RefreshCw className="h-12 w-12 text-primary/70" />
              </motion.div>
              <p className="text-lg text-muted-foreground">Loading document...</p>
            </div>
          ) : loadError ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center max-w-md mx-auto p-4">
                <h2 className="text-2xl font-bold text-foreground mb-4">Failed to load document</h2>
                <p className="text-muted-foreground mb-6">
                  There was an error loading the document. Please try again or contact support if the issue persists.
                </p>
                <Button onClick={handleRetry}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <iframe 
              src={pdfUrl} 
              className="pdf-embed"
              title={pdfTitle}
              allowFullScreen
            />
          )}
        </motion.div>
      </main>
      
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            This document is protected and should not be shared with unauthorized users.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PDFViewerPage;