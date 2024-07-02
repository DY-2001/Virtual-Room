import { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ setShowModal }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      if (!topic) return alert("Please enter a topic");
      const { data } = await create({ topic, roomType });
       navigate(`/room/${data.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button
          onClick={() => setShowModal(false)}
          className={styles.closeButton}
        >
          <img src="images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput
            fullWidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : styles.inactive
              }`}
            >
              <img
                className={styles.typeImg}
                src="/images/globe.png"
                alt="globe"
              />
              <span>Open</span>
            </div>
            {/* <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : styles.inactive
              }`}
            >
              <img
                className={styles.typeImg}
                src="/images/social.png"
                alt="social"
              />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : styles.inactive
              }`}
            >
              <img
                className={styles.typeImg}
                src="/images/lock.png"
                alt="lock"
              />
              <span>Private</span>
            </div> */}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration" />
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
