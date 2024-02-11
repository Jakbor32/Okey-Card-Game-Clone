import React, { useState, useEffect } from "react";
import supabase from "../../utils/supabase";

import styles from "./YourGames.module.css";
import bronze from "../../images/bronze_chest.png";
import silver from "../../images/silver_chest.png";
import gold from "../../images/gold_chest.png";

const YourGames = ({ updateChest, endGame, name }) => {
  let score = updateChest;

  const [field1, setField1] = useState(0);
  const [field2, setField2] = useState(0);
  const [field3, setField3] = useState(0);

  // save number in database
  const [games, setGames] = useState(0);

  // add 1 depending on the points earned
  useEffect(() => {
    async function updateScoreboard() {
      const score = updateChest;
      // Retrieve the current account data
      const { data: yourAccount, error } = await supabase
        .from("Scores")
        .select("*")
        .eq("Name", name);

      if (score >= 300 && score <= 399) {
        // Update silver count
        await supabase
          .from("Scores")
          .update({ silver: yourAccount[0].silver + 1 })
          .eq("Name", name);
      } else if (score > 400) {
        // Update gold count
        await supabase
          .from("Scores")
          .update({ gold: yourAccount[0].gold + 1 })
          .eq("Name", name);
      } else {
        // Update bronze count
        await supabase
          .from("Scores")
          .update({ bronze: yourAccount[0].bronze + 1 })
          .eq("Name", name);
      }
         // Update games count
      await supabase
        .from("Scores")
        .update({ games: yourAccount[0].games + 1 })
        .eq("Name", name);
    }
    updateScoreboard();
  }, [endGame]);

  useEffect(() => {
    const checkExistingName = async () => {
      const { data: yourAccount, error } = await supabase
        .from("Scores")
        .select("*")
        .eq("Name", name);
  
      if (error) {
        console.error("Error checking existing name:", error.message);
      } else {
        if (yourAccount.length > 0) {
          console.log(yourAccount);
          setField1(yourAccount[0].bronze);
          setField2(yourAccount[0].silver);
          setField3(yourAccount[0].gold);
          setGames(yourAccount[0].games);
        } else {
            return;
        }
      }
    };
  
    if (name) {
      checkExistingName();
    }

    const timeout = setTimeout(checkExistingName, 1000);
  
    return () => clearTimeout(timeout); 
  
  }, [name, endGame]);



  return (
    <>
      <div className={styles.reward}>
        <table>
          <tbody>
            <tr>
              <td>
                <img src={bronze} /> {field1}
              </td>
              <td>
                <img src={silver} />
                {field2}
              </td>
              <td>
                <img src={gold} />
                {field3}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles["all-games"]}>total games: {games}</div>
    </>
  );
};

export default YourGames;
