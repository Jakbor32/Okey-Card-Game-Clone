import React from 'react'
import styles from './AddCard.module.css'

const AddCard = (props) => {


    return (
        <button onClick={props.addCard} className={styles['btn-addcard']}>Add Card</button>
    )
}

export default AddCard