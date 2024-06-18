import ChatRoom from "../models/chatroom.js"
import roomuser from "../models/roomusers.js"



export const roomcreate = async (req, res) => {
    const { roomName, description } = req.body

    if (!roomName) {

        return res.status(400).json('Room name required')
    }


    try {

        const findroom = await ChatRoom.findOne({ name: roomName })

        if (findroom) {


            return res.status(400).json('Room already exist')


        }

        const roomcreate = ChatRoom({ name: roomName, description })

        const roomcreated = await roomcreate.save()


        if (roomcreated) {



            return res.json('room creates successfully')

        }



    } catch (error) {

        console.log(error)
    }

}
export const getroomcreate = async (req, res) => {
            
        const {search} = req.query

     try {

       const query = {name:{$regex:new RegExp(search,'i')}}
        
       const rooms = await ChatRoom.find(query)


        return res.json(rooms)

    } catch (error) {

        console.log(error)
    }


} 

export const roomusers =async(req,res)=>{

    try{


        const roomusers = await roomuser.find().populate('room')
        
        if(roomusers.length > 0){

            res.json(roomusers)

        }
        

    }catch(error){

        console.log(error)
    }

}