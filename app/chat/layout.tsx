import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';
import React from 'react'
import ChatLayoutWrapper from './_components/ChatLayoutWrapper';

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = await auth();

    const preloadedUserInfo = await preloadQuery(api.users.readUser, {
        userId: userId!
    });

    const preloadedConversations = await preloadQuery(api.chats.getConversation, {
        userId: userId!
    });


  return (
    <ChatLayoutWrapper
        preloadedUserInfo={preloadedUserInfo}
        preloadedConversations={preloadedConversations}
    >
        {children}
    </ChatLayoutWrapper>
  )
}

export default ChatLayout