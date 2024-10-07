import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt', { email, password, confirmPassword });
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
          >
            Sign Up
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
