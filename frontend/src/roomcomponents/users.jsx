import React from 'react'
import {BsChatDots,BsPeople } from 'react-icons/bs';

const users = ({chatroomname}) => {
    return (
        <div className='usercontainer'>

            <div className='chatroom'>
             <span><BsChatDots size={20} className='m-4 text-red-600'/></span><h1 className='-mt-8 ml-12 text-red-600 font-semibold'>Chat Room</h1>
             <p className='ml-12 mt-4'>{chatroomname}</p>   
             
            </div>

            <div className='chatusers'>

            <span><BsPeople size={20} className='m-4 text-red-600'/></span><h1 className='-mt-8 ml-12 text-red-600 font-semibold'>Users</h1>
                <p className='ml-12 mt-4'>user 1</p>
                <p className='ml-12 mt-4'>user 2</p>
                <p className='ml-12 mt-4'>user 3</p>
                <p className='ml-12 mt-4'>user 4</p>


            </div>

        </div>
    )
}

export default users