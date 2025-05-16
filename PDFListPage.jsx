import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, FileText, ChevronRight, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { PDF_DOCUMENTS } from '@/lib/pdfDocuments';

const PDFListPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('pdfAccessToken');
    localStorage.removeItem('selectedPdfId');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleSelectPdf = (pdfId) => {
    localStorage.setItem('selectedPdfId', pdfId);
    navigate(`/view/${pdfId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <List className="h-7 w-7 text-primary mr-3" />
            <h1 className="text-2xl font-bold text-foreground">Available Documents</h1>
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
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {Object.values(PDF_DOCUMENTS).map((pdf) => (
            <motion.div key={pdf.id} variants={itemVariants}>
              <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden group bg-card border-border">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-primary/10 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{pdf.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{pdf.description}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleSelectPdf(pdf.id)}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                      aria-label={`View ${pdf.title}`}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Select a document to view. All documents are confidential.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PDFListPage;