import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';
import React from 'react'
import ChatList from '../_components/ChatList';
import FormChat from '../_components/FormChat';

const Conversations = async({ params }: { params: Promise<{ id: string }>}) => {

    const conversationId = (await params).id;
    const { userId } = await auth();

    const preloadedMessages = await preloadQuery(api.chats.getMessages, {
        conversationId: conversationId as Id<'conversations'>,
    });

  return (
    <div className='h-screen flex flex-col w-full'>
        <div className='flex-1 flex flex-col overflow-hidden'>
            <ChatList userId={userId!} preloadedMessages={preloadedMessages} />
            <FormChat userId={userId!} conversationId={conversationId} />
        </div>
    </div>
  )
}

export default Conversations