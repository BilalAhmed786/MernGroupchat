import React, { useEffect, useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs';

const input = ({sock,chatroomid,userid}) => {


const chatform = useRef()
const[chatmessage,stateChatmessage]=useState('')

const handleinputchange =(e)=>{

  stateChatmessage(e.target.value);

}

const messagehandle = (e)=>{
   e.preventDefault()
  
   sock.emit('chatmessage',{chatmessage,chatroomid,userid})
   stateChatmessage(''); 
   chatform.current.value = '';
  }

  return (
    <form  onSubmit={messagehandle}>
        <div className='input'>
        <input ref={chatform} className='w-3/4 text-lg' type='text' placeholder='type messsage....'  onChange={handleinputchange} />
        <button type='submit'><BsFillSendFill className='block mt-2 mr-6 text-red-600' size={24} /></button>
    </div>
      </form>

  )
}

export default input