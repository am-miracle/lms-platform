"use client"
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import CustomInput from './CustomInput';
import { Button } from './ui/button';
import toast from 'react-hot-toast';


const Login = () => {
    const { isLoaded, signIn } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!isLoaded){
            return
        }
        try {
            console.log(signIn)
            const completeSignIn = await signIn.create({
                identifier: email,
                password
            });
            router.push("/")
            if (completeSignIn.status === 'complete') {
                toast.success("Successfully login")
                router.push("/")
            }else{
                console.log(JSON.stringify(completeSignIn, null, 2));
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
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
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <CustomInput
                        type='email'
                        id='email_address'
                        name='email_address'
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CustomInput
                        type='password'
                        id='password'
                        name='password'
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    type='submit'
                    className='w-full'
                >
                        Login
                </Button>
            </form>
            <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <Link href="/sign-up" className="font-medium hover:underline">Sign up</Link>
            </p>
        </div>
    </React.Fragment>
  )
}

export default Login