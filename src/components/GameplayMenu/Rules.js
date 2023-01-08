import { useState } from 'react';
import styles from './Rules.module.css';

const Rules = () => {
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const paragraphs = [
        "Defeat monsters to earn cards. As soon as you,ve\n collected and stacked toether 24 Okey Cards,\n you'll automatically receive an Okey Card Set\n and can play game. The aim of the game is to\n make combinations of sets and runs.\n\n A set consists of three cards with the same\n number (e.g. 7,7,7). The lower the number on\n the cards, the fewer points you'll earn for the",
        "set.\n\n A run consists of at least three consecutive\n cards (e.g. 6,7,8). The lower the number on\n the cards, the fewer points you'll earn for the\n set. Runs in the same colour will earn more\n points than multicolured runs.\n Game Instructions",
        "1. Left-click on the deck to reveala the first 5\n cards.\n 2. Earn points by selecting 3 cards. (NOTE:\n Left-click = select card, right-click =\n permanently discard card)\n 3. The more points you earn by the end of the\n game, the better your prize.\n\n Hints",
        "1) You can pasue your game at any time by\n pressing ESC. Changing map or teleporting will\n end the current game!\n 2) Once discarded, cards cannot be restored, so\n think carefully before deciding!\n 3) Cancelled games will NOT be refuneded! Choose\n where you want to play your game wisely.",
    ];

    // Set good text based on clicking arrows 
    if (currentParagraph < 0) {
        setCurrentParagraph(0);
    }
    if (currentParagraph >= paragraphs.length) {
        setCurrentParagraph(paragraphs.length - 1);
    }

    return (
        <>
            <div className={styles.btns}>
                <button
                    className={styles["btn-move"]}
                    onClick={() => setCurrentParagraph(currentParagraph - 1)} // shift -1
                >

                </button>
                <button
                    className={styles["btn-move"]}
                    onClick={() => setCurrentParagraph(currentParagraph + 1)} // shift +1
                >

                </button>
            </div>
            <div className={styles.rules}>
                {currentParagraph >= 0 && currentParagraph < paragraphs.length ? paragraphs[currentParagraph].split('\n').map((item, key) => {
                    return <span key={key}>{item}<br /></span>;
                }) : null}
            </div>
        </>
    );
}

export default Rules;