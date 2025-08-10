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
        <div className='flex h-screen bg-gray-100 text-gray-900 w-screen'>
            <Tabs.Root customRootClass='tabs' value={activeTab} onValueChange={handleTabChange} className='flex flex-row w-full'>
                <ChatsPanel />

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