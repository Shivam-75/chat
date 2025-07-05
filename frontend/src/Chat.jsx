import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("notification", (msg) => {
      setMessages((prev) => [...prev, { username: "System", message: msg }]);
    });
    return () => {
      socket.off("chatMessage");
      socket.off("notification");
    };
  }, []);
 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      socket.emit("joinRoom", { username, room });
      setJoined(true);
      setMessages([]);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chatMessage", { room, message });
      setMessage("");
    }
  };

  if (!joined) {
    return (
      <div className="chat">
        <div className="chat-content">
          <h2>Join Chat Room</h2>
          <form onSubmit={handleJoin}>
            <input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
            <input
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="sole">
      <h2>Room: {room}</h2>
      <div className="sole-msg">
        {messages.map((msg, idx) => {
          if (msg.username === "System") {
            return (
              <div
                key={idx}
                className="sole-msgs
               ">
                {msg.message}
              </div>
            );
          }

          const isOwnMessage = msg.username === username;

          return (
            <div
              className="msgd"
              key={idx}
              style={{
                alignSelf: isOwnMessage ? "flex-end" : "flex-start",
                backgroundColor: isOwnMessage ? "#9fe7a4" : "#daf1da",
              }}>
              <div className="sj">Name : {msg.username}</div>
              <div>{msg.message}</div>
              {msg.time && (
                <div
                  style={{
                    fontSize: "0.7em",
                    textAlign: "right",
                    marginTop: 4,
                    color: "#444",
                    userSelect: "none",
                  }}>
                  {msg.time}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="form-msg"
        onSubmit={sendMessage}
        style={{ display: "flex", gap: 10, maxWidth: 600 }}>
        <input
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
