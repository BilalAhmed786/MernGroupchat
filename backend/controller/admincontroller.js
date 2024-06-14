import ChatRoom from "../models/chatroom.js"



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

    try {

        const rooms = await ChatRoom.find()


        return res.json(rooms)

    } catch (error) {

        console.log(error)
    }


} 