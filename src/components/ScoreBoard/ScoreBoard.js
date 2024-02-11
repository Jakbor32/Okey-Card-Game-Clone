import React, { useState, useEffect } from "react";
import styles from "./ScoreBoard.module.css";
import supabase from "../../utils/supabase";

const ScoreBoard = ({ yourScore, endGame, name, password }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scores, setScores] = useState([]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchScores() {
      try {
        const { data: scoresData, error } = await supabase
          .from("Scores")
          .select("Score, Name")
          .order("Score", { ascending: false })
          .limit(15);

        if (error) {
          console.error("Error fetching scores:", error.message);
        } else {
          setScores(scoresData);
        }
      } catch (error) {
        console.error("Error fetching scores:", error.message);
      }
    }

    if (isExpanded) {
      fetchScores();
    }
  }, [isExpanded]);

  useEffect(() => {
    async function updateScoreboard() {
      if (endGame == endGame && yourScore !== 0 && name !== "") {
        try {
          const { data: existingScores, error } = await supabase
            .from("Scores")
            .select("*")
            .eq("Name", name);

          if (error) {
            console.error("Error checking existing scores:", error.message);
          } else {
            if (existingScores.length === 0) {
              const { data: newScore, error: insertError } = await supabase
                .from("Scores")
                .insert([{ Name: name, Score: yourScore, Pass: password }]);

              if (insertError) {
                console.error(
                  "Error inserting new score:",
                  insertError.message
                );
              } else {
                console.log("New score added:", newScore);
              }
            } else {
              // Retrieve the current score from the supabase
              const { data: currentScore, error: currentError } = await supabase
                .from("Scores")
                .select("Score")
                .eq("Name", name)
                .single();

              if (currentScore && yourScore > currentScore.Score) {
                const { data: updatedScore, error: updateError } =
                  await supabase
                    .from("Scores")
                    .update({ Score: yourScore })
                    .eq("Name", name);

                if (updateError) {
                  console.error(
                    "Error updating the score:",
                    updateError.message
                  );
                } else {
                  return;
                }
              } else {
               return;
              }
            }
          }
        } catch (error) {
          console.error("Error updating scoreboard:", error.message);
        }
      }
    }

    updateScoreboard();
  }, [endGame, yourScore, name]);

  return (
    <>
      {isExpanded ? <div className={styles.backdrop}></div> : ""}
      <div
        className={isExpanded ? styles.scoreBoardExpanded : styles.scoreBoard}
      >
        <button
          className={
            isExpanded ? styles.toggleButtonExpanded : styles.toggleButton
          }
          onClick={toggleExpanded}
        >
          {isExpanded ? "Close" : "Scoreboard"}
        </button>
        {isExpanded && (
          <div className={styles.scoreList}>
            <p>Top 15 Players</p>
            <ol>
              {scores.map((score, index) => (
                <li key={index + 1} className={index === 0 ? styles.top1: null || index === 1 ? styles.top2 : null || index === 2 ? styles.top3 : null}>
                  {index + 1}. {score.Name} - {score.Score} pt
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

export default ScoreBoard;
