import React, { useState } from "react";
import Board from './components/Board/Board';
import Cards from './components/Cards/Cards'
import allCards from './allCards.js';

import styles from './../src/App.module.css'

const App = () => {

  const [selectedCards, setSelectedCards] = useState([...allCards])
  return (
    <>
      <section className={styles.section} onContextMenu={(e) => e.preventDefault()}>
        <h1>Okey Card Game</h1>
        <Board />
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
