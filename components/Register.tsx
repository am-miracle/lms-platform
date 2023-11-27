"use client"
import { useSignUp} from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, MouseEventHandler, useState } from 'react'
import CustomInput from './CustomInput';
import { Button } from './ui/button';


const Register = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const router = useRouter();

    // Form Submit
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!isLoaded){
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });
            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

  // Verify User Email Code
  const onPressVerify = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
        return;
    }

    try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
        });
        if (completeSignUp.status !== 'complete') {
            await setActive({ session: completeSignUp.createdSessionId });
            router.push('/sign-in');
        } else{
            /*  investigate the response, to see if there was an error
                or if the user needs to complete more steps.*/
            console.log(JSON.stringify(completeSignUp, null, 2));
        }

    } catch (err) {
        console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
        <div className="relative flex flex-col rounded-xl bg-transparent
            bg-clip-border text-gray-700 shadow-none">
            <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Sign Up
            </h4>
            <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Enter your details to register.
            </p>
            {!pendingVerification && (
                <>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                        <div className="mb-4 flex flex-col gap-6">
                            <CustomInput
                                type='text'
                                id='firstName'
                                name='firstName'
                                label='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <CustomInput
                                type='text'
                                id='lastName'
                                name='lastName'
                                label='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
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
                                Sign Up
                            </Button>
                    </form>
                    <Link href={"/login"}>Login</Link>
                </>
            )}
            {pendingVerification && (
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onPressVerify}>
                    <div className="mb-4 flex flex-col gap-6">
                        <CustomInput
                            type='text'
                            id='code'
                            name='code'
                            label='Code'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Verify Email
                    </Button>
            </form>
            )}
        </div>
    </div>
  )
}

export default Register