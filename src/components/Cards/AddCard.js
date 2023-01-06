import React from 'react'
import styles from './AddCard.module.css'

import card1 from '../../images/onecard.png'
import card2 from '../../images/twocards.png'
import card3 from '../../images/threecards.png'

const AddCard = (props) => {

    let imageSrc;
    let className;
    switch (true) {
        case (props.amountOfCards >= 17 && props.amountOfCards <= 24):
            imageSrc = card3;
            className = 'card-window-3';
            break;
        case (props.amountOfCards >= 9 && props.amountOfCards <= 16):
            imageSrc = card2;
            className = 'card-window-2';
            break;
        case (props.amountOfCards >= 1 && props.amountOfCards <= 8):
            imageSrc = card1;
            className = 'card-window-1';
            break;
        case (props.amountOfCards === 0):
            imageSrc = null;
            break;
        default:
            imageSrc = null;
    }

    return (

        <button onClick={props.addCard} className={styles['btn-addcard']}>
            <img draggable="false" src={imageSrc} className={styles[className]} />
        </button>
    )
}

export default AddCard