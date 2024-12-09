import { io } from "socket.io-client"


const SOCKET_URL = process.env.REACT_APP_URL 


const socket = io(SOCKET_URL,{
    transports: ["websocket"],
    autoConnect: false
})

export default socket