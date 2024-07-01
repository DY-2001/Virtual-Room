import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>Codershouse</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3 style={{ letterSpacing: "0.5px" }}>{user?.name}</h3>
          <img
            className={styles.avatar}
            src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
            style={{
              width: "40px",
              height: "40px",
              maxWidth: "40px",
              maxHeight: "40px",
            }}
            alt="avatar"
          />
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img
              className={styles.logoutImg}
              src="/images/log-out.png"
              alt="Logout"
            />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
