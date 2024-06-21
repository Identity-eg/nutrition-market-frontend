'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// UI
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
// Utils
import { useAuthStore } from '@/store/auth';
import { useRegister } from '@/apis/auth';

const registerSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Please enter a valid email address'),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  rememberMe: z.boolean(),
});

export default function SignupPage() {
  const router = useRouter();
  const authenticateUser = useAuthStore((state) => state.authenticateUser);
  const from = '/';
  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  function onSubmit(values: z.infer<typeof registerSchema>) {
    registerMutation.mutate(values, {
      onSuccess: (data) => {
        authenticateUser(data);
        router.replace(from);
      },
    });
  }
  return (
    <section className='min-h-[70vh] flex items-center justify-center'>
      <Card className='w-[500px] p-8'>
        <CardTitle className='typography-EB24'>create an account</CardTitle>
        <CardDescription className='mt-1'>
          Enter your information to create an account
        </CardDescription>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
          <Form {...form}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      required
                      placeholder='m@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      href='#'
                      className='ml-auto inline-block text-sm underline'
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          <Button
            type='submit'
            disabled={registerMutation.isPending}
            className='w-full'
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              'Register'
            )}
          </Button>
          <p className='text-gray-6 typography-R14'>
            Already have an account?{' '}
            <Link href='/login' className='text-black-3 typography-M14'>
              Log in
            </Link>
          </p>
        </form>
      </Card>
    </section>
  );
}
