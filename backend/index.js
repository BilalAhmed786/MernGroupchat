import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
dotenv.config();
import con from './database/db.js';
import { saveuser, finduser, collectuser, removeuser,getcurrentuser } from './utils/user.js';
import { savemsg,getmsg } from './utils/messages.js';
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

  console.log(socket.id)
  socket.on('joinRoom', async (msg) => {

    try {


      const { chatroomid, userid } = msg


      const usersaved = await saveuser(chatroomid,userid,socket.id)

      const findusers = await finduser(chatroomid)
      

      socket.join(chatroomid)

      socket.emit('message', `welcome ${findusers[0].user.username} to saifchat`)
      socket.broadcast
        .to(chatroomid)
        .emit(
          'message',
          `${findusers[0].user.username} join the chatroom`)

       //collect chatroom users in array

      const chatuser = collectuser(findusers)


      // Send users and room info
      io.to(chatroomid).emit('roomUsers', {

        room: findusers[0].room.name,
        users: chatuser,
      });

      //on login all previous messages will display
      const messages = await getmsg(chatroomid,socket.id);
      
      messages.forEach(message => {
        socket.emit('roommessage', {
          userid:message.user,
          name: message.user.username,
          message: message.message,
          formattedTimestamp: message.formattedTimestamp
        });
      });

} catch (error) {


      console.log(error)
    }


  });


// Listen for chatMessage
socket.on('chatmessage', async(msg) => {
  
    const { chatmessage,chatroomid,userid } = msg
  
try{
    const savechat = await savemsg(chatmessage,chatroomid,userid)

    const user = await getcurrentuser(socket.id)

      io.to(chatroomid).emit('roommessage',{ 
      userid:savechat.user,  
      name:user.user.username,
      message: savechat.message,
      formattedTimestamp: savechat.formattedTimestamp
    });


}catch(error){
  
  console.log(error)
}

});


  // Handle disconnection
  socket.on('disconnect', async () => {
    console.log(`disconnect ${socket.id}`)
    try {

      const disconetuser = await removeuser(socket.id)

         if (disconetuser) {

        io.to(disconetuser.room._id.toString()).emit(
          'message',
          `${disconetuser.user.username} has left the chat`)

        const findusers = await finduser(disconetuser.room._id)

            if (findusers.length > 0) {

          const chatuser = collectuser(findusers)

          // Send users and room info
          io.to(disconetuser.room._id.toString()).emit('roomUsers', {
           room: findusers[0].room.name,
            users: chatuser,
          });

        }


      }

    } catch (error) {

      console.log(error)
    }


  });


})