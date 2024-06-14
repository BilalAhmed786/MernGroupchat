import express from 'express';

import { roomcreate,getroomcreate } from '../controller/admincontroller.js';


const adminrouter = express.Router();

adminrouter.post('/createroom',roomcreate);
adminrouter.get('/createroom',getroomcreate);



export default adminrouter;