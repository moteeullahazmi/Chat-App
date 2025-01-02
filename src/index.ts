import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let countUser = 0;
let allSocket: WebSocket[] = [];


wss.on("connection", (socket) => {
    countUser = countUser + 1;
    allSocket.push(socket);

    console.log(countUser)
    socket.on('message', (message) => {

        for (let i = 0; i < allSocket.length; i++) {
            let s = allSocket[i]
            s.send(message.toString() +  "sent from server")

        }
    })
})