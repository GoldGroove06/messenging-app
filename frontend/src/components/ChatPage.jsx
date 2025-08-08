import React from 'react'
import Heading from '@radui/ui/Heading'
import Avatar from '@radui/ui/Avatar'
import Separator from '@radui/ui/Separator'
import ScrollArea from '@radui/ui/ScrollArea'
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useState } from 'react';

export default function ChatPage({ chatId }) {
    const messagesEndRef = React.useRef(null);
    const [chat, setChat] = React.useState([]);
    const [senderName, setSenderName] = React.useState('');

    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {

    
        const socketInstance = io('http://localhost:3000');

        setSocket(socketInstance);
        socketInstance.emit('joinroom', chatId);
        socketInstance.on('chat message', (msg) => {
            console.log(msg)
            setChat((prevMessages) => [...prevMessages, msg]);

        });
    }, [chatId])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/chat/messages/${chatId}/10`, {
                    method: "GET",
                    credentials: 'include'
                });
                const data = await response.json();
                setChat(data.chat);
                setSenderName(data.senderName);

                console.log(data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        socket.emit('chat message', input)
        setInput('')
    }

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messagesEndRef]);
    return (
        <div className='w-full h-screen max-h-screen flex flex-col h-full'>
            <div className='w-full bg-gray-200 p-2 pl-6 flex flex-row gap-4 h-12 items-center'>
                <Avatar.Root>
                    <Avatar.Image src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                </Avatar.Root>
                <Heading as="h5">
                    {senderName}
                </Heading>
            </div>
            <Separator />
            <div className='overflow-hidden h-full'>
                <ScrollArea.Root>
                    <ScrollArea.Viewport>
                        <div className='w-full flex flex-col justify-end'>
                            {chat.map((item) => {
                                return (
                                    <div key={item.id} className='w-full bg-gray-200 p-2 pl-6 flex flex-row gap-4 items-center'>
                                        <Avatar.Root>
                                            <Avatar.Image src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                                        </Avatar.Root>
                                        <div>
                                            <div className='flex flex-row gap-2 items-center'>

                                                <div className='font-semibold text-gray-1000'>{item.senderName}</div>
                                                <div className='text-sm'>{item.timestamp}</div>

                                            </div>
                                            <div className='text-gray-950'>{item.text}</div>
                                            <div ref={messagesEndRef} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </ScrollArea.Viewport>

                    <ScrollArea.Scrollbar orientation='vertical'>
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
            <div className='w-full bg-gray-200 p-2 pl-6 flex flex-row gap-4 items-center h-10'>
                <input type="text" placeholder='type here' className='flex flex-1 items-center px-2 rounded-md border border-gray-400 text-gray-700' value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    )
}