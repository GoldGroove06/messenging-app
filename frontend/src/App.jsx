import React, { useState } from 'react'
import Tabs from '@radui/ui/Tabs'
import Heading from '@radui/ui/Heading'
import DarkVeilBg from './components/DarkVeilBg'
import Stepper, { Step } from './components/Stepper'
import Button from '@radui/ui/Button'

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
        if(data.message=="Logged in"){
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
          body:JSON.stringify({  name, email, password, confirmPassword: passwordConfirm, username }),
        })
          .then((response) =>{
            if (response.status == 200 ){
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

  const handleEmailSignup= () => {
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
            .then((response) =>{
              if (response.status === 200 ){
                setMessage('')
                setStep(3)
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
            .then((response) =>{
              if (response.status === 200 ){
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
    <div className="h-screen w-screen relative">
      <div className="absolute inset-0 -z-10 ">
        <DarkVeilBg />
      </div>
      <div className='flex items-center justify-end pr-32 h-screen  text-gray-900'>
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
              setTab(tab)
            }
          }
          className="w-full max-w-md h-96 "
        >
          <Tabs.List>
            <Tabs.Trigger value="signin"><Heading as="h3">Sign In</Heading></Tabs.Trigger>
            <Tabs.Trigger value="signup"> <Heading as="h3">Sign Up</Heading></Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="signin">
            <div className="flex flex-col gap-2">
              Email : <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              Password : <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button className="w-full" onClick={signIn}>Sign In</Button>
            </div>
          </Tabs.Content>
          <Tabs.Content value="signup">

            <div className="flex flex-col gap-2 py-16">
              <Stepper
                initialStep={1}
                currentStep={step}
                onStepChange={(step) => {
                  if (step == 3){
                    handleEmailSignup()
                  }
                  else if (step == 4) {
                    handleUsernameSignup()
                  }
                  else {
                    setStep(step)
                  }
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
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <p>Password</p>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <p>Confirm Password</p>
                  <input type="password" placeholder="Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                  {message && <p className="text-red-500">{message}</p>}
                </Step>
                <Step>
                  <Heading as="h2">Step 2</Heading>
                  <p>What is your Name?</p>
                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                  <p>Username</p>
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  {message && <p className="text-red-500">{message}</p>}
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
