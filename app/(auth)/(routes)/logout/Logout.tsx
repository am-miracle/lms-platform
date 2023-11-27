"use client"
import React from 'react'
import { SignOutButton, useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const Logout = () => {
    const { signOut } = useClerk();

  return (
    <SignOutButton signOutCallback={signOut}>
        <Button variant={'secondary'}>Sign out</Button>
    </SignOutButton>
  )
}

export default Logout