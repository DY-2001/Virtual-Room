import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Room.module.css";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useSelector } from "react-redux";

const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { clients, provideRef } = useWebRTC(roomId, user);
  return (
    <div>
      <h1>All connected clients</h1>
      {clients &&
        clients.map((client) => {
          return (
            <div key={client.id}>
              <audio
                ref={(instance) => provideRef(instance, client.id)}
                controls
                autoPlay
              ></audio>
              <h4>{client.name}</h4>
            </div>
          );
        })}
    </div>
  );
};

export default Room;
