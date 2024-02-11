import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import styles from "./InsertYourName.module.css";

const InsertYourName = ({ onSave, closeBox }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState(null);
  const [correctPassword, setCorrectPassword] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [exist, setExist] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSaveName = () => (name ? setConfirm(true) : null);

  useEffect(() => {
    const checkExistingName = async () => {
      const { data: existingNames, error } = await supabase
        .from("Scores")
        .select("Name, Pass")
        .eq("Name", name);

      if (error) {
        console.error("Error checking existing name:", error.message);
        setExist(false);
        setPassword("");
      } else {
        setExist(existingNames.length > 0);
        if (existingNames.length > 0) {
          setCorrectPassword(existingNames[0].Pass);
        } else {
          setCorrectPassword("");
        }
      }
    };

    if (name) {
      checkExistingName();
    }
  }, [name]);

  const handleSaveClick = () => {
    if (correctPassword === password || correctPassword === null) {
      onSave(name);
    } else {
      setPassword("");
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 3000);
    }
  };
  const handleSavePassword = () => {
    onSave(name, password);
  };

  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.container}>
        {!confirm && (
          <div className={styles.box}>
            <p>Enter your name</p>
            <input
              className={styles.inputField}
              type="text"
              value={name}
              onChange={handleInputChange}
            />
            <button className={styles.saveButton} onClick={handleSaveName}>
              Save
            </button>
          </div>
        )}
        {confirm &&
          (!exist ? (
            <div className={styles.box}>
              <p>Require password for this nickname?</p>
              <input
                className={styles.inputField}
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div>
                <button
                  className={styles.saveButton}
                  onClick={handleSavePassword}
                >
                  Yes
                </button>
                <button className={styles.saveButton} onClick={handleSaveClick}>
                  No
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.box}>
              {correctPassword !== null ? (
                <div className={styles.box}>
                  <p>Nickname in use. Enter password:</p>
                  <input
                    className={styles.inputField}
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              ) : (
                <p>User without password.</p>
              )}

              <div>
                <button className={styles.saveButton} onClick={handleSaveClick}>
                  Login
                </button>
              </div>
              {displayError && (
                <p className={styles.badpassword}>Wrong password. Try again</p>
              )}
            </div>
          ))}
        {openInfo && (
          <div>
            <p className={styles.infoText}>
              After adding a nickname and completing the game with a score
              greater than 0, the score will be saved in the player scoreboard.
              Selecting X will not save the game. If you are here for the second
              time, you can enter the same nickname, and then the game will ask
              you for your password and the points will update to your nickname
            </p>
            <span className={styles.date} >Added 11 Feb 2024</span>
            <button
              className={styles.exitinfo}
              onClick={() => setOpenInfo(false)}
            >
              X
            </button>
          </div>
        )}
        <button className={styles.exitbutton} onClick={() => closeBox()}>
          X
        </button>
        <button className={styles.infobutton} onClick={() => setOpenInfo(true)}>
          ?
        </button>
      </div>
    </>
  );
};

export default InsertYourName;
