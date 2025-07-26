import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {Server} from "socket.io";;
import cors from 'cors';
import bodyParser from 'body-parser'


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST"]
  }
});
app.use(bodyParser.urlencoded())


app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));


const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});



  io.on('connection', (socket) => {
   socket.on('joinroom', (room) => {
    socket.join(room)
     io.sockets.in(room).emit('chat message', 'your are in room '+ room )
    console.log('a user connected')
    socket.on('chat message', (msg) => {
        io.sockets.in(room).emit('chat message', msg)
    })
    socket.on('disconnect', ()=> {
        console.log('user disconnected')
    })

   })
   
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});