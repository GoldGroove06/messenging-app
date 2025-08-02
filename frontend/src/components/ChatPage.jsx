import React from 'react'
import Heading from '@radui/ui/Heading'
import Avatar from '@radui/ui/Avatar'
import Separator from '@radui/ui/Separator'
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
    }

]

export default function ChatPage() {
    return (
        <div className='w-full'>
            <div className='w-full bg-gray-200 p-2 pl-6 flex flex-row gap-4'>
                <Avatar.Root>
                    <Avatar.Image src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                </Avatar.Root>
                <Heading as="h3">
                    John Doe
                </Heading>
            </div>
            <Separator />
            <div className='w-full '>
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
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='w-96 bg-gray-200 p-2 pl-6 flex flex-row gap-4 items-center bottom-0 fixed'>
                <input type="text" placeholder='type here' className='flex flex-1 items-center px-2 rounded-md border border-gray-400 text-gray-700' />
                <button>Send</button>
            </div>
        </div>
    )
}