import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authServices';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.signIn(email, password);
      toast({
        title: 'Login Successful',
        description: 'You have been successfully logged in.'
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black bg-opacity-75 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-blend-overlay">
      <div className='w-full max-w-md rounded-lg bg-black bg-opacity-75 p-8'>
        <h1 className='mb-6 text-3xl font-bold text-white'>Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <Input
            type='email'
            placeholder='Email or phone number'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-none bg-gray-700 text-white'
            required
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-none bg-gray-700 text-white'
            required
          />
          <Button
            type='submit'
            className='w-full bg-red-600 text-white hover:bg-red-700'
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className='flex items-center justify-between text-sm text-gray-400'>
            <div className='flex items-center'>
              <Checkbox
                id='remember'
                className='mr-2'
              />
              <label htmlFor='remember'>Remember me</label>
            </div>
            <Link
              to='/forgot-password'
              className='hover:underline'
            >
              Need help?
            </Link>
          </div>
        </form>
        <p className='mt-4 text-gray-400'>
          New to MovieStream?{' '}
          <Link
            to='/register'
            className='text-white hover:underline'
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};
