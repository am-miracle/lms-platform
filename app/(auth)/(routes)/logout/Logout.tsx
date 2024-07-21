"use client"
import React from 'react'
import { SignOutButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const Logout = () => {

  return (
    <SignOutButton redirectUrl='/sign-in'>
        <Button variant={'secondary'}>Sign out</Button>
    </SignOutButton>
  )
}

export default Logout