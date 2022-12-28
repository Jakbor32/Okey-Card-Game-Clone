import React from 'react'
import styles from './AmountOfCards.module.css'

const AmountOfCards = (props) => {

    return (
        <>
            <div className={styles.counter}>{props.amountOfCards}</div>

        </>
    )
}

export default AmountOfCards