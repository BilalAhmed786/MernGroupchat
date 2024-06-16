import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const ChatroomList = () => {
  
  const [chatroomdata, stateRoomdata] = useState('')
  const [userdata, setuserdata] = useState('')

   useEffect(() => {
   
//get chatroom id
    axios.get('/api/admin/createroom')

      .then((response) => {

        stateRoomdata(response.data)

      })
      .catch((error) => {

        console.log(error)
      })


//get login user id
      axios.get('/api/auth/authorize')

      .then((response) => {

        setuserdata(response.data)

      })
      .catch((error) => {

        console.log(error)
      })



  }, [])



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6 text-black">Chatrooms</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ul>
          {chatroomdata && chatroomdata.map((room) => (
            <li key={room._id} className="flex justify-between text-black items-center py-2 border-b">
              <span className="text-lg">{room.name}</span>
              <Link to={`/saifchat/${room._id}/${userdata._id}`}> <button className="bg-red-600 text-xl text-white px-4 py-2 rounded hover:bg-blue-600">
                Join
              </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatroomList;
