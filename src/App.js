import React, { useState, useEffect } from "react";
import Board from './components/Board/Board';
import Cards from './components/Cards/Cards'
import AddCard from "./components/Cards/AddCard";
import allCards from './allCards.js';

import styles from './../src/App.module.css';

const App = () => {

  const [selectedCards, setSelectedCards] = useState([]);
  const [runSelectRandomCards, setRunSelectRandomCards] = useState(false);
  const [remainingCards, setRemainingCards] = useState([]);
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
    setRemainingCards(cards);
  };

  // run after click addCard button

  useEffect(() => {
    if (runSelectRandomCards) {
      selectRandomCards()
    }
  }, [runSelectRandomCards])


  // Add 5 cards to the game table

  const addCard = () => {
    setRunSelectRandomCards(true);

    const randomCards = [];

    let emptySpaces = selectedCards.filter(
      (card) => card.id === undefined).length;

    for (let i = 0; i < emptySpaces; i++) {
      if (remainingCards.length === 0) break;
      const index = Math.floor(Math.random() * remainingCards.length);
      randomCards.push(remainingCards[index]);
      remainingCards.splice(index, 1);
    }

    const newSelectedCards = [...selectedCards];
    for (let i = 0; i < newSelectedCards.length; i++) {
      if (newSelectedCards[i].id === undefined && randomCards.length > 0) {
        newSelectedCards[i] = randomCards.shift();
      }
    }

    setSelectedCards(newSelectedCards);
    for (let i = 0; i < remainingCards.length; i++) {
      if (selectedCards.includes(remainingCards[i])) {
        remainingCards.splice(i, 1);
        i--;
      }
    }
    setRemainingCards(remainingCards);

  };

  // Delete the card by right clicking with the mouse

  const RemoveHandler = (id) => {
    if (id) {
      const cardIndex = selectedCards.findIndex((c) => c.id === id);
      if (cardIndex !== -1) {
        const newSelectedCards = [...selectedCards];
        newSelectedCards.splice(cardIndex, 1, {});
        setSelectedCards(newSelectedCards);
      }
    }
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
                onContextClick={RemoveHandler}
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
