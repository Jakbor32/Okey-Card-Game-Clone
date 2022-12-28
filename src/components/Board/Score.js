import React from 'react'
import styles from './Score.module.css'

const Score = (props) => {
    let style = {};
    if (props.score >= 300) {
        style.color = 'yellow';
    }
    if (props.score >= 400) {
        style.color = 'red';
    }

    return (
        <div style={style} className={styles.score}>{props.score}</div>
    )
}

export default Score