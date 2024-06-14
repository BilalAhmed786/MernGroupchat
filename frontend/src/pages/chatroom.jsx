import React, { useEffect } from 'react'
import Sidebar from '../roomcomponents/sidebar'
import Chat from '../roomcomponents/chat'
import Topbar from '../roomcomponents/topbar'
import Input from '../roomcomponents/input'
import {useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
const sock = io('http://localhost:4000',{autoConnect:false});
const chatroomlist = () => {

  const {chatroomid,userid} = useParams();

  useEffect(() => {
  
  const socket = sock.connect();

  // Join chatroom
      socket.emit('joinRoom', {chatroomid,userid});
  
      socket.on('message', (msg) => {
          
         console.log(msg)
        });
        socket.on('roomUsers', ({room,users}) => {
          
          console.log(room,users)
         });
  
return ()=>{
 
  socket.disconnect();
}

      
  }, []);
  return (
    <div className='wrapperchat'>
    <div className='topbarcontainer'>
      <Topbar/>
    </div>
    <div className='home'>

    <div className='chatcontainer'>
    <Sidebar chatroomname ={name}/>
    <Chat />      
    </div>
  </div>
  <div className='inputcontainer'>
  <Input/>
  </div>
  </div>
  )
}

export default chatroomlist