import React from "react";
import styles from "./styles.module.css";
import RoomCard from "../../components/RoomCard/RoomCard";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import { getAllRooms } from "../../http";

// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {
  const [rooms, setRooms] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img
                style={{ width: "18px", height: "18px", marginLeft: "4px" }}
                src="/images/search-icon.png"
                alt="search"
              />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button
              onClick={() => setShowModal(true)}
              className={styles.startRoomButton}
            >
              <img
                style={{ width: "18px", height: "18px", marginRight: "12.5px" }}
                src="/images/people.png"
                alt="connect"
              />
              Start a room
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal setShowModal={setShowModal} />}
    </>
  );
};

export default Rooms;
