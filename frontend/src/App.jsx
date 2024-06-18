import './App.css'
//auth pages
import Registeration from './pages/register'
import Login from './pages/login'
import Forgetpassword from './pages/forgetpass'
import ResetPassword from './pages/resetpass'
//chat room pages
import Chatroom from './pages/chatroom'
import Chatroomlist from './pages/chatroomslist'
import Chatroomprotect from './protected/chatroomprotect'
// admin pages
import Admindashboard from './admin/admindashboard'
import AddRoomForm from './admin/roomcreate'
import Pagenotfound from './pages/pagenotfound'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <div className="text-8xl text-orange-500">

        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Registeration />} />
            <Route path='/' element={<Login />} />
            <Route path='/forgetpassword' element={<Forgetpassword />} />
            <Route path='/resetpassword/:token' element={<ResetPassword />} />
            {/* chatroom routes */}
              <Route path='/chatroomlist' element={<Chatroomprotect Component={Chatroomlist} />} />
              <Route path='/saifchat/:chatroomid/:userid' element = {<Chatroom />}/>
            {/* admin routes */}
            <Route path='/admindashboard' element = {<Admindashboard />} />
            <Route path='/createchatroom' element = {<AddRoomForm />} />
            <Route path='/*' element = {<Pagenotfound />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App