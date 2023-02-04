import React, { useState, useEffect } from "react";
import allCards from "../../allCards";
import Cards from "../Cards/Cards";
import styles from "./DeckHelper.module.css";

import imgDrag from "../../images/drag.svg";
import imgHelper from "../../images/icon-helper.png";

const DeckHelper = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // Setting position to 0,0
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Updating position based on mouse movement
  useEffect(() => {
    const updatePosition = (event) => {
      if (isDragging) {
        setPosition({
          x: position.x + event.movementX,
          y: position.y + event.movementY,
        });
      }
    };

    // Dropping/Releasing the element
    document.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging, position]);

  const startDragging = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  // Discarding card from the helper
  const throwCard = (id) => {
    const cardCanvas = document.querySelector(`#Cardhelper${id}`);
    if (cardCanvas) {
      cardCanvas.classList.toggle(styles.checked);
    }
  };
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Resetting all discarded cards
  const resetHelper = () => {
    const getCardCanvas = document.querySelectorAll("canvas[id^=Cardhelper]");
    getCardCanvas.forEach((cardCanvas) => {
      cardCanvas.classList.remove(styles.checked);
    });
  };

  return (
    <>
      <nav className={styles.menu}>
        <input
          type="checkbox"
          href="#"
          checked={isChecked}
          className={styles["menu-open"]}
          onClick={() => setIsChecked(!isChecked)}
          id="menu-open2"
        />
        <label
          // Setting position to initial (if user lost element off-screen)
          onClick={resetPosition}
          className={styles["menu-open-button"]}
          htmlFor="menu-open2"
        >
          <img className={styles.imghelper} src={imgHelper} />
        </label>
        <a className={styles["menu-item"]}>
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            className={styles["all-cards"]}
          >
            {allCards.map((card) => {
              return (
                <Cards
                  onClick={() => throwCard(card.id)}
                  key={card.id}
                  cardId={`helper${card.id}`}
                  cardColor={card.color}
                  cardNr={card.number}
                  cardWidth={card.width}
                  cardHeight={card.height}
                />
              );
            })}
            <button onClick={resetHelper} className={styles["btn-reset-deck"]}>
              Reset Deck
            </button>
            <button className={styles.dragbtn} onMouseDown={startDragging}>
              <img src={imgDrag} alt="drag-icon" />
            </button>
          </div>
        </a>
      </nav>
    </>
  );
};

export default DeckHelper;
