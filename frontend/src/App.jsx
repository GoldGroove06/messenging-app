import React, { useState } from 'react'
import Tabs from '@radui/ui/Tabs'
import Heading from '@radui/ui/Heading'
import DarkVeilBg from './components/DarkVeilBg'
import Stepper, { Step } from './components/Stepper'
import Button from '@radui/ui/Button'

function App() {

  return (
    <div className="h-screen w-screen relative">
      <div className="absolute inset-0 -z-10 ">
        <DarkVeilBg />
      </div>
      <div className='flex items-center justify-end pr-32 h-screen  text-gray-900'>
        <Tabs.Root
          defaultValue="signin"
          className="w-full max-w-md h-96 "
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

            <div className="flex flex-col gap-2 py-16">
              <Stepper
                initialStep={1}
                onStepChange={(step) => {
                  console.log(step);
                }}
                onFinalStepCompleted={() => console.log("All steps completed!")}
                backButtonText="Previous"
                nextButtonText="Next"
              >
                <Step>
                  <h2>Welcome to the Messsaging App</h2>
                  <p>Click Next to Sign Up</p>
                </Step>
                <Step>
                  <h2>Step 1</h2>
                  <p>What is your Email?</p>
                  <input type="email" placeholder="Email" />
                  <p>Password</p>
                  <input type="password" placeholder="Password" />
                  <p>Confirm Password</p>
                  <input type="password" placeholder="Password" />
                  <p>Click Next to Sign Up</p>
                </Step>
                <Step>
                  <Heading as="h2">Step 2</Heading>
                  <p>What is your Name?</p>
                  <input type="text" placeholder="Name" />
                  <p>Username</p>
                  <input type="text" placeholder="Username" />
                  <p>Click Next to Sign Up</p>
                </Step>
                <Step>
                  <h2>Final Step</h2>
                  <p>You made it!</p>
                </Step>

              </Stepper>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default App
