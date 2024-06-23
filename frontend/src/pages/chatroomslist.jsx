import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsPeople } from 'react-icons/bs';
import Headers from './headers';
import Footer from './footer';

const ChatroomList = () => {
  const navigate = useNavigate()
  const [chatroomdata, setRoomdata] = useState([]);
  const [userdata, setUserdata] = useState(null);
  const [searchroom, setSearchRoom] = useState('');
  const [roomusers, setRoomUsers] = useState([]);


console.log(userdata)

  
    useEffect(() => { 


    axios.get(`/api/admin/createroom?search=${searchroom}`)
      .then((response) => {

        setRoomdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get user data  
    axios.get('/api/auth/authorize')
      .then((response) => {
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get room users data

  }, [searchroom]);


  useEffect(() => {

    axios.get('/api/admin/roomuser')
      .then((response) => {
        
        setRoomUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });


  }, [])

  return (
    <>
    <Headers/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6 text-black">Chatrooms</h1><Link to="/admindashboard">{userdata && userdata.role === 'admin' ? <span className='text-sm text-blue-500 float-right mr-6'>Admin Dashboard</span>:""}</Link>
   
      <input
        className='block h-12 text-center text-sm w-1/2 m-auto outline-0 border'
        type='text'
        onChange={e => setSearchRoom(e.target.value)}
        placeholder='Search room'
      />
      <div className="bg-white shadow-md rounded-lg p-6">
        <ul>
          {chatroomdata && chatroomdata.map((room) => {


            const usersInRoom = roomusers && roomusers.filter(user => user.room.name === room.name);


            return (
              <li key={room._id} className="flex justify-between text-black items-center py-2 border-b">
                <span className="text-lg">{room.name}</span>
                {userdata && (
                  <Link to={`/saifchat/${room._id}/${userdata._id}`}>
                    <div className='flex'><span className='text-sm mt-1'>{usersInRoom ? usersInRoom.length : ''}</span><BsPeople className="mt-1 p-1 text-2xl text-black" /></div>
                    <button className="bg-red-600 text-xl text-white px-4 py-2 rounded hover:bg-blue-600">
                      Join
                    </button>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ChatroomList;
