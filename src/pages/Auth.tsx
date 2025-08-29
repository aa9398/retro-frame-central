import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast.error(error.message);
      } else {
        if (isLogin) {
          toast.success('Welcome back!');
          navigate('/');
        } else {
          toast.success('Account created successfully! Please check your email.');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-pixel-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-pixel text-sm">C</span>
            </div>
            <span className="font-pixel text-lg text-primary tracking-wider">
              CINEHUB
            </span>
          </div>
          <CardTitle className="font-pixel text-xl text-primary tracking-wider">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Welcome back to CineHub' : 'Join CineHub today'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-2 border-pixel-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border-2 border-pixel-border"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              variant="pixel"
              disabled={loading}
            >
              {loading ? 'LOADING...' : (isLogin ? 'LOGIN' : 'SIGN UP')}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80"
            >
              {isLogin ? 'Sign up here' : 'Login here'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;