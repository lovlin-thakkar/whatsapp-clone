import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

export function SidebarChat({ id, name, addNewChat }) {
  const [lastMessage, setLastMessage] = useState("");
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("Messages")
        .orderBy("timestamp", "desc")
        .limit(1)
        .onSnapshot((snapshot) =>
          setLastMessage(snapshot.docs[0]?.data().message)
        );
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{lastMessage}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add new chat</h3>
    </div>
  );
}
