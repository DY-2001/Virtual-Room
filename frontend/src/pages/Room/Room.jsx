import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Room.module.css";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoom } from '../../http';

const Room = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { clients, provideRef } = useWebRTC(roomId, user);
  const [room, setRoom] = useState(null);

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom(data);
    };
    fetchRoom();
  }, [roomId]);

  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src="/images/arrow-left.png" alt="arrow-left" />
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="palm-icon" />
            </button>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients &&
            clients.map((client) => {
              return (
                <div key={client.id} className={styles.client}>
                  <div className={styles.userHead}>
                    <audio
                      ref={(instance) => provideRef(instance, client.id)}
                      autoPlay
                    ></audio>
                    <img
                      className={styles.userAvatar}
                      src={client.avatar}
                      alt="avatar"
                    />
                    <button className={styles.micBtn}>
                      {/* <img src="/images/mic.png" alt="mic-icon" /> */}
                      <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                    </button>
                  </div>
                  <h4>{client.name}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Room;
