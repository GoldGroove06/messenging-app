import React, { useState } from 'react'
import Tabs from '@radui/ui/Tabs'
import Heading from '@radui/ui/Heading'
import DarkVeilBg from './components/DarkVeilBg'
import Stepper, { Step } from './components/Stepper'
import Button from '@radui/ui/Button'
import Text from '@radui/ui/Text'
import { motion, AnimatePresence } from "framer-motion";


const CheckIcon = () => (<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>)

function App() {
  const [tab, setTab] = useState('signin')
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')

  async function signIn() {
    const response = await fetch('http://localhost:3000/auth/signin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    console.log(data)
    if (data.message == "Logged in") {
      window.location.href = '/chat';
    };
  }

  const handleSubmit = () => {
    if (email && password && passwordConfirm && name && username) {
      if (password !== passwordConfirm) {
        setMessage('Passwords do not match');
        return
      }
      else {
        fetch('http://localhost:3000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, confirmPassword: passwordConfirm, username }),
        })
          .then((response) => {
            if (response.status == 200) {
              setTab('signin')
              setMessage('')
            }
            else {
              setMessage('Email already exists')
            }
          })

      }
    }
  }

  const handleEmailSignup = () => {
    if (email && password && passwordConfirm) {
      if (password !== passwordConfirm) {
        setMessage('Passwords do not match');
        return
      }
      else {
        fetch('http://localhost:3000/auth/check/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
          .then((response) => {
            if (response.status === 200) {
              setMessage('')
              setStep(2)
            }
            else {
              setMessage('Email already exists')
            }
          })

          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  }

  const handleUsernameSignup = () => {
    if (username && name) {


      fetch('http://localhost:3000/auth/check/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })
        .then((response) => {
          if (response.status === 200) {
            setMessage('')
            handleSubmit()
          }
          else {
            setMessage('Username already exists')
          }
        })

        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }


  return (
    <div className="h-screen w-screen relative flex items-center justify-center ">
      <div className="absolute inset-0 -z-10 ">
        <DarkVeilBg />
      </div>
      <div className='flex lg:flex-row flex-col  backdrop-blur bg-black/70 gap-8  text-gray-900 p-16 rounded-3xl'>
        <div>
          <Heading as="h2" className="text-gray-1000 max-w-md">Where Conversations Happen</Heading>
          <p className="text-gray-950 mt-1 font-semibold  tracking-wider">Hang Out. Chat. Repeat.</p>
        </div>
        <Tabs.Root
          defaultValue="signin"
          value={tab}
          onValueChange={
            () => {
              setName('')
              setEmail('')
              setPassword('')
              setPasswordConfirm('')
              setUsername('')
              setMessage('')
              setStep(1)
              setTab()
            }
          }
          className='w-80'
        >
          <Tabs.List className="">
            <Tabs.Trigger value="signin"><Heading as="h3">Sign In</Heading></Tabs.Trigger>
            <Tabs.Trigger value="signup"> <Heading as="h3">Sign Up</Heading></Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="signin">


            <motion.div
              style={{
                position: "relative",
                overflow: "hidden",
                transformOrigin: "top", // ✅ anchor to top
                // ✅ keeps container height fixed
              }}
              animate={{ scaleY: 1 }} // ✅ smooth grow/shrink
              initial={{ scaleY: 0 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="flex flex-col"
            >
              <Text className="font-semibold">Email : </Text><input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-400 text-gray-1000 placeholder:text-gray-900 placeholder:text-sm items-center rounded pl-1 mb-2" />

              <Text className="font-semibold">Password : </Text> <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-400 text-gray-1000 placeholder:text-gray-900 placeholder:text-sm placeholder:items-center rounded pl-1" />
              <Button className="w-full mt-4" onClick={signIn}>Sign In</Button>
            </motion.div>


          </Tabs.Content>
          <Tabs.Content value="signup" className="">

            <div className="flex flex-col gap-2 ">
              <Stepper

                currentStep={step}
                onStepChange={(step) => {
                  if (step == 2) {
                    handleEmailSignup()
                  }
                  else if (step == 3) {
                    handleUsernameSignup()
                  } else {
                    setStep(step)
                  }

                }}
                onFinalStepCompleted={() => setTab('signin')}
                backButtonText="Previous"
                nextButtonText="Next"
                className=''
              >
                <Step>
                  <p className="font-semibold">What is your Email?</p>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-400 text-gray-1000 placeholder:text-gray-900 placeholder:text-sm items-center rounded pl-1 mb-2" />
                  <p className="font-semibold">Password</p>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-400 text-gray-1000 placeholder:text-gray-900 placeholder:text-sm items-center rounded pl-1 mb-2" />
                  <p className="font-semibold">Confirm Password</p>
                  <input type="password" placeholder="Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="bg-gray-400 text-gray-1000 placeholder:text-gray-900 placeholder:text-sm items-center rounded pl-1 mb-2" />
                  {message && <p className="text-red-600 bg-red-100 p-2 rounded-2xl mt-2">{message}</p>}
                </Step>
                <Step>

                  <p className="font-semibold">What is your Name?</p>
                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-400 text-gray-1000 placeholder:text-gray-900 placeholder:text-sm items-center rounded pl-1 mb-2" />
                  <p className="font-semibold">Username</p>
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-400 text-gray-1000 placeholder:text-gray-900 placeholder:text-sm items-center rounded pl-1 mb-2" />
                  {message && <p className="text-red-600 bg-red-100 p-2 rounded-2xl mt-2">{message}</p>}
                </Step>
                <Step>
                  <CheckIcon />
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
