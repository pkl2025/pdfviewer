import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, FileText, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const VALID_ACCESS_TOKENS = ['123456', 'secure-pdf', 'demo-token'];

const LoginPage = () => {
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    localStorage.removeItem('pdfAccessToken');
    localStorage.removeItem('selectedPdfId');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (VALID_ACCESS_TOKENS.includes(accessToken)) {
        localStorage.setItem('pdfAccessToken', accessToken);
        toast({
          title: "Access Granted",
          description: "You can now select a PDF to view.",
        });
        navigate('/list');
      } else {
        toast({
          title: "Invalid Access Code",
          description: "The access code you entered is not valid.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2 
                }}
                className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center"
              >
                <FileText className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl text-center font-bold text-foreground">Secure PDF Viewer</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your access code to view the list of protected documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="access-token" className="text-foreground/80">Access Code</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="access-token"
                      placeholder="Enter your access code"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      className="pl-10 bg-background/70 border-border focus:bg-background"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Lock className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Lock className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "Verifying..." : "Access Document List"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-center text-muted-foreground mt-4">
              Access to the document list is protected.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;