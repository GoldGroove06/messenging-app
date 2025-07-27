import React, { useState } from 'react'
import Tabs from '@radui/ui/Tabs'
import Heading from '@radui/ui/Heading'
import Button from '@radui/ui/Button'

function App() {

  return (

    <div className='flex items-center justify-end pr-32 h-screen bg-gray-100 text-gray-900'>
      <Tabs.Root
          defaultValue="signin"
          className="w-full max-w-md h-96"
      >
        <Tabs.List>
          <Tabs.Trigger value="signin"><Heading as="h3">Sign In</Heading></Tabs.Trigger>
          <Tabs.Trigger value="signup"> <Heading as="h3">Sign Up</Heading></Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="signin">
             <div className="flex flex-col gap-2">
         Email : <input type="text" placeholder="email" />
         Password : <input type="password" placeholder="password" />
         <Button className="w-full">Sign In</Button>
         </div>
        </Tabs.Content>
        <Tabs.Content value="signup">
        
    <div className="flex flex-col gap-2">
         Name : <input type="text" placeholder="name" />
         Email : <input type="text" placeholder="email" />
         Password : <input type="password" placeholder="password" />
         <Button className="w-full ">Sign Up</Button>
         </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>

  )
}

export default App
