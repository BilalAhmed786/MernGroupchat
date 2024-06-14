import React from 'react'
import Users from './users'

const sidebar = ({chatroomname}) => {
  return (
    <div className='sidebar'>

      <Users chatroomname ={chatroomname} />

    </div>
  )
}

export default sidebar