import React from 'react'
import Tabs from '@radui/ui/Tabs'
import Heading from '@radui/ui/Heading'

const demoData = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
]

const ChatsPanel = () => {
    return (

             <Tabs.List className='flex flex-col h-screen bg-gray-500 text-gray-900  w-96 h-full overflow-y-scroll gap-2'>
                <Tabs.Trigger value='home'><Heading as="h5" className='w-max'>Home</Heading></Tabs.Trigger>
                {demoData.map((item) => (
                    <Tabs.Trigger value={item.id} key={item.id}><Heading as="h5" className='w-max bg-gray-600 '>{item.name}</Heading></Tabs.Trigger>
                ))}
                      
            </Tabs.List>

    )
}

export default ChatsPanel