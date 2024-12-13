'use client'

import LoadingState from '@/components/Loading'
import { api } from '@/convex/_generated/api'
import { useAuth } from '@clerk/nextjs'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface ChatLayoutProps {
    children: React.ReactNode,
    preloadedUserInfo: Preloaded<typeof api.users.readUser>
    preloadedConversations: Preloaded<typeof api.chats.getConversation>;
}

const ChatLayoutWrapper = ({
    children,
    preloadedUserInfo,
    preloadedConversations
} : ChatLayoutProps) => {
    const { isLoaded, isSignedIn } = useAuth();
    const [ isShowingLoading, setIsShowingLoading ] = useState(true);

    const userInfo = usePreloadedQuery(preloadedUserInfo);
    const conversations = usePreloadedQuery(preloadedConversations);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShowingLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const isLoading = !isLoaded || userInfo === undefined || conversations === undefined || isShowingLoading;

    if(isLoading) {
        return <LoadingState />
    };

    if(!isSignedIn) {
        return null;
    }
    
  return (
    <div className='flex h-screen bg-background dark:bg-[#111B21] overflow-hidden'>
        <Sidebar preloadedConversations={preloadedConversations} preloadedUserInfo={preloadedUserInfo} />
        <Header>
            {children}
        </Header>
    </div>
  )
}

export default ChatLayoutWrapper