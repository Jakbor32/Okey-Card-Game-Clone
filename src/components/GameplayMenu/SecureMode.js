import React, { useState } from 'react';
import styles from './SecureMode.module.css';

import secureModeImg from '../../images/secureMode.png';

const SecureMode = (props) => {
    const [image, setImage] = useState();

    // Change the security mode
    return (
        <button className={styles['secure-mode']} style={{
            backgroundImage: `url(${image})`
        }} onClick={() => {
            setImage(image ? null : secureModeImg);
            props.onSecureMode();

        }
        }></button>
    )
}

export default SecureMode