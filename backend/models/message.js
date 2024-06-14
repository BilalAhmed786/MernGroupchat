import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'chatroom', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const  Message = mongoose.model('message', MessageSchema);

export default Message