import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

export function Chat() {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("Rooms")
        .doc(roomId)
        .collection("Messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input?.trim() !== "") {
      db.collection("Rooms").doc(roomId).collection("Messages").add({
        message: input,
        name: user.displayName,
        uid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            {messages.length > 0
              ? "Last Seen at " +
                new Date(messages[0].timestamp?.toDate()).toUTCString()
              : ""}
          </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message, i) => (
          <p
            key={i}
            className={`chat_message ${
              message.uid === user.uid && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form onSubmit={sendMessage}>
          <input
            value={input}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
