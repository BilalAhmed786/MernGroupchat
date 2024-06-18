import express from 'express';

import { roomcreate,getroomcreate,roomusers } from '../controller/admincontroller.js';


const adminrouter = express.Router();

adminrouter.post('/createroom',roomcreate);
adminrouter.get('/createroom',getroomcreate);
adminrouter.get('/roomuser',roomusers)



export default adminrouter;