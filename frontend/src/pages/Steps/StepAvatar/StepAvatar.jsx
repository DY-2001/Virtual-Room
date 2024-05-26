import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import { activate } from "../../../http";

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [image, setImage] = useState(avatar);

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const submit = async () => {
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch(setAuth(data));
      }
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card title={`Okay, ${name}`} icon="monkey-emoji">
        <p className={styles.subHeading}> How's this photo</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a different photo
          </label>
        </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
