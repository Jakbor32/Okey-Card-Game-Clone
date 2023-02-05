import React, { useState, useEffect } from 'react';

import styles from './YourGames.module.css';
import bronze from '../../images/bronze_chest.png';
import silver from '../../images/silver_chest.png';
import gold from '../../images/gold_chest.png';

const YourGames = ({ updateChest, endGame }) => {
    let score = updateChest;

    const [field1, setField1] = useState(parseInt(localStorage.getItem('field1')) || 0);
    const [field2, setField2] = useState(parseInt(localStorage.getItem('field2')) || 0);
    const [field3, setField3] = useState(parseInt(localStorage.getItem('field3')) || 0);

    // save number in localStorage
    const [games, setGames] = useState(parseInt(localStorage.getItem('games')) || 0);

    // add 1 depending on the points earned
    useEffect(() => {
        if (score >= 300 && score <= 399) {
            setField2(field2 + 1);
        } else if (score > 400) {
            setField3(field3 + 1);
        } else {
            setField1(field1 + 1);
        }
        setGames(games + 1)

    }, [endGame])


    useEffect(() => {

        localStorage.setItem('games', games - 1);
        localStorage.setItem('field1', field1 - 1);
        localStorage.setItem('field3', field3);
        localStorage.setItem('field2', field2);
    }, [games])


    return (
        <>
            <div className={styles.reward}>
                <table>
                    <tbody>
                        <tr>
                            <td><img src={bronze} /> {field1 - 1}</td>
                            <td><img src={silver} />{field2}</td>
                            <td><img src={gold} />{field3}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles["all-games"]}>total games: {games - 1}</div>
        </>

    );
};

export default YourGames