import React from 'react'
import successImg from '../../images/success.png'

import styles from './Success.module.css'
const Success = () => {
    return (
        <div className={styles.success}>
            <img src={successImg} />
        </div>
    )
}

export default Success