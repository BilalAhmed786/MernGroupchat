import React, { useEffect, useRef, useState } from 'react'

const messages = ({ sock, chatroomid, userid }) => {

  const lastMessageRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    

    const socket = sock.connect()
    // Join chatroom
    socket.emit('joinRoom', { chatroomid, userid });

    // Handle join/leave messages
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'joinleave', message: msg },
      ]);
    });

    // Handle chat messages
    socket.on('roommessage', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'chat', ...msg },
      ]);
    });


   
  }, [sock, chatroomid, userid])


  //on new message scroll to bottom
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  return (
    <div className='messages-container overflow-auto h-[90vh]'>
      {messages.map((msg, index) => (
        <div key={index}  ref={index === messages.length - 1 ? lastMessageRef : null}>
          {msg.type === 'chat' ? (
            msg.userid && msg.userid._id === userid || msg.userid === userid  ? (
              <div className='text-left bg-blue-100 m-4 mr-5 p-6 rounded-lg ml-auto w-1/3'>
                <strong>You:</strong><p className='leading-tight'>{msg.message}</p> <br />
                <small className='text-xxxs text-red-300'>{msg.formattedTimestamp}</small>
              </div>
            ) : (
              <div key={index}  className='bg-gray-100 m-4 p-6 rounded-lg ml-4 mr-auto w-1/3'>
                <strong>{msg.name}:</strong> <p className='leading-tight'>{msg.message}</p> <br />
                <small className='text-xxxs text-red-500 font-bold' >{msg.formattedTimestamp}</small>
              </div>
            )
          ) : (
            <div className='bg-slate-100 m-4 p-3.5 w-1/3'><em>{msg.message}</em></div>
          )}
        </div>
      ))}
    </div>


  )
}

export default messages