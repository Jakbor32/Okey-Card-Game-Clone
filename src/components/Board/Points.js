import React from 'react'
import styles from './Points.module.css'

const Points = (props) => {


    return (
        <div className={styles.points}>{props.points}</div>
    )
}

export default Points