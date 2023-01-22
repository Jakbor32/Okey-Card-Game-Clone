import React, { useState, useEffect } from "react";
import Board from './components/Board/Board';
import Cards from './components/Cards/Cards'
import AddCard from './components/Cards/AddCard';
import allCards from './allCards.js';
import Score from './components/Board/Score';
import AmountOfCards from './components/Board/AmountOfCards';
import Points from './components/Board/Points'
import Success from './components/Board/Success';
import Modal from './components/Modal/Modal';
import EndGame from './components/Board/EndGame';
import StartGame from './components/GameplayMenu/StartGame';
import Rules from './components/GameplayMenu/Rules';
import SecureMode from './components/GameplayMenu/SecureMode';
import YourGames from "./components/YourGames/YourGames";
import SoundPlayer from "./components/SoundPlayer/SoundPlayer";

import styles from './../src/App.module.css';

const App = () => {

  const [selectedCards, setSelectedCards] = useState([]);
  const [runSelectRandomCards, setRunSelectRandomCards] = useState(false);
  const [remainingCards, setRemainingCards] = useState([]);

  const [amountOfCards, setAmountOfCards] = useState(24);
  const [points, setPoints] = useState();
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Modal text
  const [modalText, setModalText] = useState("");

  //Check security mode - currently true
  const [showModal, setShowModal] = useState(false);
  const [securityMode, setSecurityMode] = useState(false);
  const [id, setId] = useState(false);

  const [inGameCards, setInGameCards] = useState([]);
  // select 5 random cards from the board

  // set end game
  const [endGame, setEndGame] = useState(false);

  // set game status
  const [game, setGame] = useState(false);

  // set your chest count to 0
  const [updateChest, setUpdateChest] = useState(0);

  // Set new Modal
  const modal = (id) => {
    setShowModal(true);
    setId(id);
  };


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

    emptySpaces +=
      inGameCards.length === 1
        ? -1
        : inGameCards.length === 2
          ? -2
          : inGameCards.length === 3
            ? -3
            : 0;

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

    // Update the number of remaining cards
    if (amountOfCards === 24) {
      setAmountOfCards(19);
    } else {
      setAmountOfCards(remainingCards.length);
    }
  };

  // Delete the card by right clicking with the mouse

  const RemoveHandler = (id) => {
    const cardFound = inGameCards.some((card) => card.id === id);
    // If security mode === true - show Modal (currently yes)
    if (securityMode === true && !cardFound) {
      setModalText("Do you really want to discard this card?");
      modal(id);
      return;
    }
    handleYesButtonClick(id);
  };

  // new function to remove card
  const handleYesButtonClick = (id) => {
    if (id) {
      const cardIndex = selectedCards.findIndex((c) => c.id === id);
      if (cardIndex !== -1) {
        const newSelectedCards = [...selectedCards];
        newSelectedCards.splice(cardIndex, 1, {});
        setSelectedCards(newSelectedCards);
      }
    }
    setShowModal(false);
  };

  const handleNoButtonClick = () => {
    setShowModal(false);
  };

  // After clicking add a card to the game / undo a card from the game

  const inGame = (id) => {
    const cardOnTable = inGameCards.find((c) => c.id === id);

    if (cardOnTable) {
      const newInGameCards = inGameCards.filter((c) => c.id !== id);
      setInGameCards(newInGameCards);

      const newSelectedCards = [...selectedCards];
      let emptyIndex = -1;
      for (let i = 0; i < newSelectedCards.length; i++) {
        if (newSelectedCards[i].id === undefined) {
          emptyIndex = i;
          break;
        }
      }

      if (emptyIndex !== -1) {
        newSelectedCards.splice(emptyIndex, 1, cardOnTable);
      } else {
        newSelectedCards.push(cardOnTable);
      }
      setSelectedCards(newSelectedCards);
    } else {
      const cardIndex = selectedCards.findIndex((c) => c.id === id);
      moveCardToInGame(selectedCards[cardIndex]);
    }
  };

  // Move card to game 
  const moveCardToInGame = (card) => {
    const cardIndex = selectedCards.findIndex((c) => c.id === card.id);
    if (cardIndex !== -1 && card.id !== undefined && inGameCards.length < 3) {
      const newSelectedCards = [...selectedCards];
      newSelectedCards.splice(cardIndex, 1, {});
      setSelectedCards(newSelectedCards);
      setInGameCards([...inGameCards, card]);
    }
  };

  // Logic of the game
  const checkCards = () => {
    if (inGameCards.length === 3) {

      // The same Color
      const colors = inGameCards.map((card) => card.color);
      const sameColor = colors.every((color) => color === colors[0]);

      // Consecutive numbers
      const numbers = inGameCards.map((card) => card.number);
      numbers.sort((a, b) => a - b);
      const consecutiveNumbers = numbers.every(
        (number, index) => number === numbers[0] + index
      );
      // The same numbers
      const sameNumbers = numbers.every((number) => number === numbers[0]);
      // Different colors
      const differentColor = colors.some((color) => color !== colors[0]);

      if (sameColor && consecutiveNumbers) {
        return "validColor";
      } else if (differentColor && consecutiveNumbers) {
        return "invalidColor";
      } else if (differentColor && sameNumbers) {
        return "invalidColorAndNumbers";
      } else {
        return "noMatches";
      }
    }
  };
  useEffect(() => {
    setPoints(null);
  }, [checkCards()]);


  // Checking cards and adding the appropriate number of points
  useEffect(() => {

    const result = checkCards();

    // Valid colors y,y,y and valid numbers 1,2,3
    if (result === "validColor") {
      const maxNumber = Math.max(...inGameCards.map((card) => card.number));

      let points = 40;
      for (let i = 3; i <= maxNumber; i++) {
        points += 10;
      }
      // Show the number of points
      console.log(points)

      // Update points and score
      setScore(score + points);
      setPoints(points);

      // Show success if the cards match
      setShowSuccess(true);

      // Set the card to fade after time
      setTimeout(() => {
        setInGameCards([]);
        setShowSuccess(false);
      }, 1250);

      // Invalid colors y,r,y and valid numbers 1,2,3
    } else if (result === "invalidColor") {
      const minNumber = Math.min(...inGameCards.map((card) => card.number));

      let points = 0;
      for (let i = 1; i <= minNumber; i++) {
        points += 10;
      }

      console.log(points)
      setScore(score + points);
      setPoints(points);
      setShowSuccess(true);

      setTimeout(() => {
        setInGameCards([]);
        setShowSuccess(false);
      }, 1250);

      // Invalid colors y,r,b and invalid numbers 1,1,1
    } else if (result === "invalidColorAndNumbers") {
      const Number = inGameCards[0].number;

      let points = 10;
      for (let i = 1; i <= Number; i++) {
        points += 10;
      }

      setScore(score + points);
      setPoints(points);
      setShowSuccess(true);

      setTimeout(() => {
        setInGameCards([]);
        setShowSuccess(false);
      }, 1250);

      // Invalid numbers 1,4,2
    } else if (result === "noMatches") {
      console.log(result)

      setTimeout(() => {
        const newSelectedCards = [...selectedCards];

        // Check where the empty spaces are
        let emptyIndexes = [];
        newSelectedCards.forEach((card, i) => {
          if (card.id === undefined) {
            emptyIndexes.push(i);
          }
        });

        if (emptyIndexes.length > 3) {
          emptyIndexes = emptyIndexes.slice(0, 3);
        }

        emptyIndexes.forEach((emptyIndex, i) => {
          newSelectedCards.splice(emptyIndex, 1, inGameCards[i]);
        });

        setSelectedCards(newSelectedCards);

        const newInGameCards = [];
        setInGameCards(newInGameCards);
      }, 300);
    }
  }, [inGameCards]);

  return (
    <>
      <section className={styles.section} onContextMenu={(e) => e.preventDefault()}>
        <h1>Okey Card Game</h1>
        {game && (
          <div className={styles["in-game"]}>
            <Modal
              showModalText={modalText}
              showModal={showModal}
              imgSrc={require("./images/emptyModal.png")}
              setShowModal={setShowModal}
              id={id}
              onClickYes={() => handleYesButtonClick(id)}
              onClickNo={handleNoButtonClick}
            />
            <Board />
            <AmountOfCards amountOfCards={amountOfCards} />
            <Score score={score} />
            <Points points={points} />
            <AddCard
              addCard={addCard}
              amountOfCards={amountOfCards}
            />
            <EndGame
              endGame={endGame}
              setEndGame={setEndGame}
              setSecondModal={setShowModal}
              setScore={setScore}
              setSelectedCards={setSelectedCards}
              setUpdateChest={setUpdateChest}
              score={score}
              setRunSelectRandomCards={setRunSelectRandomCards}
              setInGameCards={setInGameCards}
              setAmountOfCards={setAmountOfCards}
            />
            {showSuccess && <Success />}
            <div className={styles.cards}>
              {selectedCards.map((card) => {
                return (
                  <Cards
                    key={card.id}
                    onContextClick={RemoveHandler}
                    onClick={inGame}
                    cardId={card.id}
                    cardColor={card.color}
                    cardNr={card.number}
                    cardWidth={card.width}
                    cardHeight={card.height}
                  />
                );
              })}
            </div>
            <div className={styles["card-selected"]}>
              {inGameCards.map((card) => {
                return (
                  <Cards
                    onContextClick={RemoveHandler}
                    onClick={inGame}
                    cardId={card.id}
                    cardColor={card.color}
                    cardNr={card.number}
                    key={card.id}
                    cardWidth={card.width}
                    cardHeight={card.height}
                  />
                );
              })}
            </div>
          </div>
        )}
      </section>
      {/* add gameplay board (the player sets the security mode) */}
      {game || (
        <section onContextMenu={(e) => e.preventDefault()}>
          <div className={styles.container}>
            <StartGame setGame={setGame} />
            <SecureMode onSecureMode={() => setSecurityMode(!securityMode)} />
            <Rules />
          </div>
        </section>
      )}
      <section>
        <YourGames
          endGame={endGame}
          updateChest={updateChest}

        />
      </section>
      <SoundPlayer />
    </>
  );
};

export default App;
