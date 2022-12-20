import React, { useState, useEffect } from "react";
import Board from './components/Board/Board';
import Cards from './components/Cards/Cards'
import AddCard from "./components/Cards/AddCard";
import allCards from './allCards.js';

import styles from './../src/App.module.css';

const App = () => {

  const [selectedCards, setSelectedCards] = useState([])
  const [runSelectRandomCards, setRunSelectRandomCards] = useState(false)

  // select 5 random cards from the board

  const selectRandomCards = () => {
    const cards = [...allCards];
    const selected = [];
    while (selected.length < 5) {
      const index = Math.floor(Math.random() * cards.length);
      selected.push(cards[index]);
      cards.splice(index, 1);
    }
    setSelectedCards(selected);
  };

  // run after click addCard button

  useEffect(() => {
    if (runSelectRandomCards) {
      selectRandomCards()
    }
  }, [runSelectRandomCards])


  // Add 5 cards to the game table

  const addCard = () => {
    setRunSelectRandomCards(true)


  };

  return (
    <>
      <section className={styles.section} onContextMenu={(e) => e.preventDefault()}>
        <h1>Okey Card Game</h1>
        <Board />
        <AddCard addCard={addCard} />
        <div className={styles.cards}>
          {selectedCards.map((card) => {
            return (
              <Cards
                key={card.id}
                onContextClick={() => console.log("PPM")}
                onClick={() => console.log("LPM")}
                cardId={card.id}
                cardColor={card.color}
                cardNr={card.number}
                cardWidth={card.width}
                cardHeight={card.height}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default App;
