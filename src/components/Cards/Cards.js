import React, { useEffect, useRef } from 'react';

import availableCards from './../../images/Cards.png';

import styles from './Cards.module.css';

const Cards = (props) => {


    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = availableCards;
        image.onload = () => {
            ctx.drawImage(image, props.cardWidth, props.cardHeight, 51, 58, 0, -2, 51, 57);
        };
    }, []);


    const deleteCard = (id) => {
        props.onContextClick(id)

    }
    const inGame = (id) => {
        props.onClick(id);

    }
    return (
        <>

            <div >
                <canvas
                    key={props.cardId}
                    onClick={() => inGame(props.cardId)}
                    onContextMenu={() => deleteCard(props.cardId)}
                    id={'Card' + props.cardId}
                    ref={canvasRef}
                    width={42}
                    height={54}
                    className={styles['animation-flash']}
                >

                </canvas>
            </div>
        </>
    )


}

export default Cards