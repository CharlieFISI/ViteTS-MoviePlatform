import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authServices';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'The passwords you entered do not match.',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      await authService.signUp(email, password);
      toast({
        title: 'Registration Successful',
        description:
          'Your account has been created successfully. Please check your email for verification.'
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registration Failed',
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
        <h1 className='mb-6 text-3xl font-bold text-white'>Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <Input
            type='email'
            placeholder='Email'
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
          <Input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border-none bg-gray-700 text-white'
            required
          />
          <Button
            type='submit'
            className='w-full bg-red-600 text-white hover:bg-red-700'
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <p className='mt-4 text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-white hover:underline'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
