import styles from "./RoomCard.module.css";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/room/${room.id}`)} className={styles.card}>
      <h3
        style={{
          color: `${
            Math.floor(Math.random() * 2) === 0 ? "darkgray" : "lightblue"
          }`,
        }}
        className={styles.topic}
      >
        {room.topic}
      </h3>
      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => (
            <img
              style={{
                width: "40px",
                height: "40px",
                maxWidth: "40px",
                maxHeight: "40px",
              }}
              key={speaker.id}
              src={
                speaker.avatar ? speaker.avatar : "./images/monkey-avatar.png"
              }
              alt="speaker"
            />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div className={styles.nameWrapper} key={speaker.id}>
              <span>{speaker.name}</span>
              <img
                style={{ width: "18px", height: "18px", marginLeft: "2px" }}
                src="/images/chat-bubble.png"
                alt="chat-bubble"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeole}</span>
        <img
          style={{ width: "22px", height: "20px" }}
          src="/images/user-icon.png"
          alt="user icon"
        />
      </div>
    </div>
  );
};

export default RoomCard;
