import React from 'react';


const SidebarnavMenu = () => {
  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col">
     
      <nav className="flex-1 font-thin p-4 text-sm border-r">
        <ul>
          <li className="p-4 hover:bg-gray-100 border-b">
            <a className='text-black font-normal' href="/createchatroom">Create Room</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
            <a className='text-black font-normal' href="/allchatrooms">Rooms</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
            <a className='text-black font-normal' href="/allusers">Users</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
            <a className='text-black font-normal' href="allmessages">Chat Messages</a>
          </li>
          <li className="p-4 hover:bg-gray-100 border-b">
            <a className='text-black font-normal' href="chatroomlist">Chat Rooms</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarnavMenu;
