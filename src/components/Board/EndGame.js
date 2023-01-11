import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import styles from './EndGame.module.css'

import emptyModal from '../../images/emptyModal.png'

const EndGame = ({ score, setScore, setSelectedCards, setInGameCards, setAmountOfCards, setRunSelectRandomCards, setSecondModal, endGame, setEndGame, setUpdateChest }) => {

    const [showModal, setShowModal] = useState(false);
    const [showModalText, setShowModalText] = useState("");

    const resetGame = () => {
        setRunSelectRandomCards(false);
        setScore(0);
        setSelectedCards([]);
        setInGameCards([]);
        setAmountOfCards(24);
    }

    const handleYes = () => {
        setEndGame(!endGame);
        // set the number of points to state
        setUpdateChest(score)
        resetGame();
        setShowModal(false);
    }

    const handleNo = () => {
        setShowModal(false);
    }
    const changeModal = () => {
        const string = `Do you want to end the game and collect your reward? Your score and remaining cards will then be reset!`;
        setShowModal(!showModal);
        // Disable the discard card modal if the end of game modal is active
        setSecondModal(false);
        setShowModalText(string);
    }

    return (
        <>
            <button className={styles.endgame} onClick={changeModal}></button>
            <div className={styles["endgame-modal"]}>
                {showModal && (
                    <Modal className={styles["endgame-modal"]} showModal={() => setShowModal(true)}
                        showModalText={showModalText}
                        imgSrc={emptyModal}
                        onClickYes={handleYes}
                        onClickNo={handleNo}
                    />

                )
                }
            </div>
        </>
    );
}

export default EndGame;