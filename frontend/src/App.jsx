import React, { useState, useEffect } from 'react'

import './App.css'
import { io } from 'socket.io-client';


function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState('');
  const [join, setJoin] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(!join) return;
    console.log('join', join)
    const socketInstance = io('http://localhost:3000');
    
    setSocket(socketInstance);
    socketInstance.emit('joinroom', roomId);
    socketInstance.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);

    });
  }, [join])




  const handleSubmit = (e) => {
    e.preventDefault()

    socket.emit('chat message', input)
    setInput('')
  }



  return (
    <>
     <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
     <button onClick={() => setJoin(true)}>Join</button>
      <div>
        <ul id="messages">{messages.map((message) => <li>{message}</li>)}</ul>
        <div id="form">
          <input id="input" autocomplete="off" value={input} onChange={(e) => setInput(e.target.value)} /><button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </>
  )
}

export default App
