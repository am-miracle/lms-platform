"use client"
import React from 'react'
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

const schema = z.object({
    email: z.string().min(1, {
        message: "Invalid email",
    }),
    password: z.string().min(1, {
        message: "Invalid password",
    }),
});

const Login = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        },
      })
      const { isSubmitting } = form.formState;

      const onSubmit = async (values: z.infer<typeof schema>) => {
        if (!isLoaded) {
            return;
        }
        try {
            console.log(signIn)
            const completeSignIn = await signIn.create({
              identifier: values.email,
              password: values.password,
            });
            if (completeSignIn.status === 'complete') {
                setActive({session: completeSignIn.createdSessionId })
                toast.success('Successfully logged in');
                if (pathname?.startsWith("/sign-in")) {
                    router.push('/');
                }
            }
          } catch (error) {
            const errorMessage = JSON.stringify(error, null, 2)
            const parseMessage = JSON.parse(errorMessage)
            toast.error(parseMessage.errors[0].message);
          }
      }

  return (
    <React.Fragment>
        <div className="relative flex flex-col rounded-xl bg-transparent
            bg-clip-border text-gray-700 shadow-none">
            <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Sign In
            </h4>
            <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Enter your details to Sign in.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Please enter you email"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Please enter you password"
                                        type='password'
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                </form>
            </Form>
            <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <Link href="/sign-up" className="font-medium hover:underline">Sign up</Link>
            </p>
        </div>
    </React.Fragment>
  )
}

export default Login