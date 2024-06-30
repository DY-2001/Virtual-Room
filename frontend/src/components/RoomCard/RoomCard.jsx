import styles from "./RoomCard.module.css";
const RoomCard = ({ room }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={styles.speakers}>
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => (
            <img key={speaker.id} src={speaker.avatar} alt="speaker" />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div className={styles.nameWrapper} key={speaker.id}>
              <span>{speaker.name}</span>
              <img style={{width: '18px', height: "18px", marginLeft: "2px"}} src="/images/chat-bubble.png" alt="chat-bubble" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeole}</span>
        <img style={{width: '22px', height: "20px"}} src="/images/user-icon.png" alt="user icon" />
      </div>
    </div>
  );
};

export default RoomCard;
