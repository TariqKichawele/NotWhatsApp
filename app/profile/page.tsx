import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';
import React from 'react'
import ProfileComponent from './_components/Profile';

const Profile = async () => {
    const { userId } = await auth();
 
    const preloadedUserInfo = await preloadQuery(api.users.readUser, {
        userId: userId!
    });

  return (
    <div className='flex flex-col h-screen bg-[#111B21] text-[#E9EDEF]'>
        <ProfileComponent preloadedUserInfo={preloadedUserInfo} />
    </div>
  )
}

export default Profile