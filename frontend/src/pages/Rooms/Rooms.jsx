import React from "react";
import styles from "./styles.module.css";
import RoomCard from "../../components/RoomCard/RoomCard";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import { getAllRooms } from "../../http";

const Rooms = () => {
  const [rooms, setRooms] = React.useState([]);
  const [filteredRooms, setFilteredRooms] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await getAllRooms();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRooms();
  }, []);

  React.useEffect(() => {
    const filtered = rooms.filter((room) => room.topic.includes(search));
    setFilteredRooms(filtered);
  }, [search]);

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
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className={styles.searchInput}
              />
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
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal setShowModal={setShowModal} />}
    </>
  );
};

export default Rooms;
