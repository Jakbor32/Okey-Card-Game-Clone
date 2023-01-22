import React, { useState, useEffect } from 'react';
import styles from './SoundPlayer.module.css';

import m1_monster from '../../images/m1.png';
import m2_monster from '../../images/m2.png';
import desert_monster from '../../images/desert.png';
import orc_valley_monster from '../../images/orc-valley.png';
import xmas from '../../images/xmas.png';
import mute from '../../images/mute.png';
import music from '../../images/music.png';

const SoundPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [audioLoaded, setAudioLoaded] = useState(false);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const soundUrls = ['64qy', 'rt7p', 'h4r9', 'r7jy', 'djjw'];

    useEffect(() => {
        if (audio) {
            audio.addEventListener("canplay", () => {
                audio.play();
            });
        }
    }, [audio]);

    const handleClick = (index) => {

        if (index === currentPlayingIndex) {
            return;
        }

        setCurrentPlayingIndex(index);
        if (audioLoaded && isPlaying) {
            audio.pause();
        }
        const currentUrl = `https://sndup.net/${soundUrls[index]}/a`;
        if (!audioLoaded) {
            setAudioLoaded(true);
            setAudio(new Audio(currentUrl));
        } else {
            audio.src = currentUrl;
            audio.play();
        }
        setIsPlaying(true);
        setTimeout(() => setIsChecked(false), 300);
    };

    const handleMute = (indexMute) => {
        setCurrentPlayingIndex(indexMute)
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            setTimeout(() => setIsChecked(false), 300);
        }
    }

    const data = [
        { src: m1_monster, onClick: () => handleClick(0) },
        { src: m2_monster, onClick: () => handleClick(1) },
        { src: desert_monster, onClick: () => handleClick(2) },
        { src: orc_valley_monster, onClick: () => handleClick(3) },
        { src: xmas, onClick: () => handleClick(4) },
        { src: mute, onClick: () => handleMute(5) },
    ];

    return (
        <nav className={styles.menu}>
            <input type="checkbox" href="#" checked={isChecked} className={styles["menu-open"]} onClick={() => setIsChecked(!isChecked)} name="menu-open" id="menu-open" />
            <label className={styles["menu-open-button"]} htmlFor="menu-open">
                <img src={music} />
            </label>
            {
                data.map((image, index) => (
                    <a key={index} onClick={image.onClick} className={`${styles["menu-item"]} ${currentPlayingIndex === index ? styles["active"] : ""}`}>
                        <img draggable="false" src={image.src} />
                    </a>
                ))
            }
        </nav>
    )
}

export default SoundPlayer;