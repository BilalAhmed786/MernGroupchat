import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
dotenv.config();
import con from './database/db.js';
import roomuser from './models/roomusers.js';
import messages from './models/message.js';
import cors from 'cors'
import session from 'express-session';
import passport from './passportconfig/config.js';
import flash from 'connect-flash';
import router from './routes/routes.js';
import adminrouter from './routes/adminroute.js';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow only specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    credentials: true, // Enable credentials (cookies, authorization headers)
  }
});
app.use(session({ secret: 'wahwah123', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', router);
app.use('/admin', adminrouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});


// Set up Socket.IO connection handling
io.on('connection', (socket) => {


  socket.on('joinRoom', async (msg) => {

    
    const { chatroomid, userid } = msg

    try {

      const user = roomuser({ room: chatroomid, user: userid, socketid: socket.id })



      const userroom = await user.save()


      const findusers = await roomuser.find({ room: chatroomid }).sort({ createdAt: -1 }).populate('user').populate('room')


      socket.join(chatroomid)

      socket.emit('message', `welcome ${findusers[0].user.username} to saifchat`)
      socket.broadcast
        .to(chatroomid)
        .emit(
          'message',
          `${findusers[0].user.username} join the chatroom`)

             
          
          //collect chatroom users in array
            const chatuser = findusers.map(users=>{
               
              return users.user.username

            })


    // Send users and room info
          io.to(chatroomid).emit('roomUsers', {
        
          room: findusers[0].room.name,
          users: chatuser,
});



     

    } catch (error) {

      console.log(error)
    }





  });




  // Handle disconnection
  socket.on('disconnect', async () => {
    console.log(`disconnect ${socket.id}`)
    try {
      const disconetuser = await roomuser.findOneAndDelete({ socketid: socket.id }).populate('user').populate('room')

      if (disconetuser) {
console.log(disconetuser.room)
        io.to(disconetuser.room._id.toString()).emit(
          'message',  
          `${disconetuser.user.username} has left the chat`)

      }

    } catch (error) {


      if (error) {

        console.log('user not exist')
      }

    }


  });
});