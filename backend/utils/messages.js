import Message from "../models/message.js"
import roomuser from "../models/roomusers.js"

export const savemsg =async(chatmessage,chatroomid,userid)=>{

    if(chatmessage){

        const chatmsg  =  new Message({room:chatroomid,user:userid,message:chatmessage})

        const savemsg = await chatmsg.save()

        return chatmsg
    
    
    }

}


export const getmsg = async(chatroomid,socketid)=>{


    try{


        const user = await roomuser.findOne({socketid}) 

        const time =user.createdAt

        const getchatdata  = await Message.find({room:chatroomid,timestamp:{$gte:time}}).populate('user') 


        return getchatdata

    }catch(error){


        console.log(error)
    }

 


}