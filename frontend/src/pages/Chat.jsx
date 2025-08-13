import React, { useState } from 'react'
import ChatsPanel from '../components/ChatsPanel'
import Tabs from '@radui/ui/Tabs'
import ChatPage from '../components/ChatPage'
import HomeComp from '../components/HomeComp';

const Chat = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [id, setId] = useState(null);

    const handleTabChange = (tab) => {

        if (tab === 'home') {
            setId(null);
            setActiveTab('home');
        }

        else {
            setId(tab);
            setActiveTab(id);
        }
    };
    console.log(activeTab)

    return (
        <div className='flex h-screen text-gray-900 w-screen bg-[linear-gradient(225deg,#050512_0%,#0a0c25_25%,#121433_50%,#1a1945_75%,#241d55_100%)]'>
            <Tabs.Root customRootClass='tabs' value={activeTab} onValueChange={handleTabChange} className='flex flex-row w-full'>
                <ChatsPanel activeTab={activeTab} />

                <Tabs.Content value="home" className='text-gray-900 w-full'>
                    <HomeComp />
                </Tabs.Content>

                <Tabs.Content value={id} className='text-gray-900 w-full'>
                    <ChatPage chatId={id} />
                </Tabs.Content>


            </Tabs.Root>



        </div>
    )
}

export default Chat