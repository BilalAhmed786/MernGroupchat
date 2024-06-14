import React from 'react'
import {BsFillSendFill } from 'react-icons/bs';

const input = () => {
  return (
    <div className='input'>

  <input className='w-3/4 text-lg' type='text' placeholder='type messsage....'/>
  <button type='submit'><BsFillSendFill className='block mt-2 mr-6 text-red-600' size={24} /></button>


    </div>
  )
}

export default input