import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {Server} from "socket.io";;
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import authRoute from "./routes/authRoute.js";
import chatRoute from "./routes/chatRoute.js";
import friendsRoute from "./routes/friendsRoute.js";


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

app.use(cookieParser());

app.use("/auth", authRoute)


const secret = 'a santa at nasa';

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = verify(token, secret);
    req.user = decoded; 
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}
app.use("/friends",authenticateToken, friendsRoute)
app.use("/chat", authenticateToken, chatRoute);
app.use("/auth-check", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});


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