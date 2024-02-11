import React, { useState } from 'react'
import Modal from '../Modal/Modal';

import styles from './StartGame.module.css';
import largerModal from '../../images/largerModal.png';
import gameplayBoard from './../../images/introduction.png';

const StartGame = ({ setGame, setShowNameInput }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalText, setShowModalText] = useState("");
    const showModalYang = () => {
        const string = `You must pay a fee of 30000 Yang in order yo play. You will also need 1 Card Set(s). Do you want to start the game?`;
        // Show the welcome modal on game start
        setShowModal(!showModal)
        setShowModalText(string)
    }

    // Give the player the choice to start the game or confirm if they really want to start the game
    const handleYes = () => {
        setGame(true)
        setShowNameInput(true)
    }
    const handleNo = () => {
        setShowModal(false)
    }
    return (
        <>
            <img draggable='false' className={styles['start-board']} src={gameplayBoard} alt="start-board" />
            <button onClick={showModalYang} className={styles['start-game']}></button>
            <div className={styles['start-game-modal']}>
                {showModal && (
                    <Modal showModal={() => setShowModal(true)}
                        showModalText={showModalText}
                        imgSrc={largerModal}
                        onClickYes={handleYes}
                        onClickNo={handleNo}
                    />

                )
                }
            </div>
        </>


    )
}

export default StartGame