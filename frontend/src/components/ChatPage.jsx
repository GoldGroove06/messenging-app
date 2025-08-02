import React from 'react'
import Heading from '@radui/ui/Heading'
import Avatar from '@radui/ui/Avatar'
import Separator from '@radui/ui/Separator'
import ScrollArea from '@radui/ui/ScrollArea'

const chat = [
    {
        id: 1,
        chatContent: {
            sender: "John Doe",
            message: "Hello! How can I help you?",
            time: "12:00"
        }
    },
    {
        id: 2,
        chatContent: {
            sender: "you",
            message: "Hello! How can I help you?",
            time: "12:01"
        }
    },
    {
        id: 3,
        chatContent: {
            sender: "John Doe",
            message: "Hello! How can I help you?",
            time: "12:03"
        }
    },
    {
        id: 4,
        chatContent: {
            sender: "you",
            message: "Hello! How can I help you?",
            time: "12:04"
        }
    },
    {
        id: 5,
        chatContent: {
            sender: "John Doe",
            message: "Hello! How can I help you?",
            time: "12:05"
        }
    },
    {
        id: 6,
        chatContent: {
            sender: "you",
            message: "Hello! How can I help you?",
            time: "12:06"
        }
    },
    {
        id: 7,
        chatContent: {
            sender: "John Doe",
            message: "Hello! How can I help you?",
            time: "12:07"
        },

    },
    {
        id: 8,
        chatContent: {
            sender: "you",
            message: "Hello! How can I help you?",
            time: "12:08"
        }
    },
    {
        id: 9,
        chatContent: {
            sender: "John Doe",
            message: "Hello! How can I help you?",
            time: "12:09"
        }
    },
    {
        id: 10,
        chatContent: {
            sender: "you",
            message: "Hello! How can I help you?",
            time: "12:10"
        }
    },

]

export default function ChatPage() {
    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messagesEndRef]);
    return (
        <div className='w-full h-screen max-h-screen flex flex-col h-full'>
            <div className='w-full bg-gray-200 p-2 pl-6 flex flex-row gap-4 h-14'>
                <Avatar.Root>
                    <Avatar.Image src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                </Avatar.Root>
                <Heading as="h3">
                    John Doe
                </Heading>
            </div>
            <Separator />
            <div className='overflow-hidden h-full'>
                <ScrollArea.Root>
                    <ScrollArea.Viewport>
                        <div className='w-full'>
                            {chat.map((item) => {
                                return (
                                    <div key={item.id} className='w-full bg-gray-200 p-2 pl-6 flex flex-row gap-4 items-center'>
                                        <Avatar.Root>
                                            <Avatar.Image src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                                        </Avatar.Root>
                                        <div>
                                            <div className='flex flex-row gap-2 items-center'>

                                                <div className='font-semibold text-gray-1000'>{item.chatContent.sender}</div>
                                                <div className='text-sm'>{item.chatContent.time}</div>

                                            </div>
                                            <div className='text-gray-950'>{item.chatContent.message}</div>
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
                <input type="text" placeholder='type here' className='flex flex-1 items-center px-2 rounded-md border border-gray-400 text-gray-700' />
                <button>Send</button>
            </div>
        </div>
    )
}