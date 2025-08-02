import React, { useState } from 'react'
import ChatsPanel from '../components/ChatsPanel'
import Tabs from '@radui/ui/Tabs'
import ChatPage from '../components/ChatPage'
import HomeComp from '../components/HomeComp';

const Chat = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleTabChange = (tab) => {

        if (tab === 'home') {
            setId(null);
            setName('');
            setMessage('');
            setActiveTab(tab);
        }

        else {
            setId(tab);
            setName('gold ' + tab);
            setMessage('Hello! How can I help you?');
            setActiveTab(tab);
        }
    };
    return (
        <div className='flex h-screen bg-gray-100 text-gray-900 w-screen'>
            <Tabs.Root customRootClass='tabs' value={activeTab} onValueChange={handleTabChange} className='flex flex-row w-full'>
                <ChatsPanel />

                <Tabs.Content value="home" className='text-gray-900 w-full'>
                    <HomeComp />
                </Tabs.Content>

                <Tabs.Content value={id} className='text-gray-900 w-full'>
                    <ChatPage />
                </Tabs.Content>


            </Tabs.Root>



        </div>
    )
}

export default Chat