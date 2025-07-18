import React,{ useState, useEffect } from 'react'

import './App.css'
import {io} from 'socket.io-client';


function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);

    socketInstance.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);

    });
  },[])
 




  const handleSubmit = (e) => {
    e.preventDefault()

    socket.emit('chat message', input)
    setInput('')
  }



  return (
    <>
      <div>
        <ul id="messages">{messages.map((message) => <li>{message}</li>)}</ul>
    <div id="form">
      <input id="input" autocomplete="off" value={input} onChange={(e) => setInput(e.target.value)}/><button onClick={handleSubmit}>Send</button>
 </div>
      </div>
    </>
  )
}

export default App
