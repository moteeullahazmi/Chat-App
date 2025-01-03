import { useEffect, useRef, useState } from "react";

const App = () => {

  const [messages, setMessages] = useState(["Moteeullah", "hello "]);
  const wsRef  = useRef();

  useEffect(()=>{
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
  },[])

  return (
    <div className="h-screen bg-black">
      <br /><br /><br />
      <div className="h-[95vh]">
        {messages.map((message,index) => <div key={index} className="bg-white text-black rounded p-4 m-8" >{message}</div>)}
      </div>
      <div className="w-full bg-white flex">
        <input id="message" className="flex-1 p-4" type="text" />
        <button onClick={() => {
          //@ts-ignore
          const message = document.getElementById("message")?.value;
          //@ts-ignore
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: message
            }
          }))
        }} className="bg-purple-600 text-white p-4">Send message</button>
      </div>
    </div>
  );
};

export default App;
