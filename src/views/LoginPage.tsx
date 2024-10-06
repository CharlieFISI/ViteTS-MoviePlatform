import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Film } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-black px-4'>
      <Card className='w-full max-w-md border-gray-800 bg-gray-900 text-white'>
        <CardHeader className='space-y-1'>
          <div className='mb-4 flex items-center justify-center'>
            <Film
              size={40}
              className='text-[#dc2626]'
            />
          </div>
          <CardTitle className='text-center text-2xl font-bold'>
            Welcome Back
          </CardTitle>
          <CardDescription className='text-center text-gray-400'>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-gray-200'
              >
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='your@email.com'
                {...register('email')}
                className='border-gray-700 bg-gray-800 text-white placeholder-gray-500'
              />
              {errors.email && (
                <p className='text-sm text-[#dc2626]'>{errors.email.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-gray-200'
              >
                Password
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                {...register('password')}
                className='border-gray-700 bg-gray-800 text-white placeholder-gray-500'
              />
              {errors.password && (
                <p className='text-sm text-[#dc2626]'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type='submit'
              className='w-full bg-[#dc2626] text-white hover:bg-[#b91c1c]'
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col items-center'>
          <Link
            to='/register'
            className='mt-2 text-gray-400 hover:text-white'
          >
            Don't have an account? Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
