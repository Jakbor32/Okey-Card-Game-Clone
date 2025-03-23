import React, { useState, useEffect } from 'react';
import styles from './SoundPlayer.module.css';

import m1_monster from '../../images/m1.png';
import m2_monster from '../../images/m2.png';
import desert_monster from '../../images/desert.png';
import orc_valley_monster from '../../images/orc-valley.png';
import xmas from '../../images/xmas.png';
import mute from '../../images/mute.png';
import music from '../../images/music.png';

const soundUrls = [
    "https://firebasestorage.googleapis.com/v0/b/soundy-web-react.appspot.com/o/enter_the_east.mp3?alt=media&token=8aa45558-04b2-4d6f-9a76-40b848fc224c",
    "https://firebasestorage.googleapis.com/v0/b/soundy-web-react.appspot.com/o/back_to_back.mp3?alt=media&token=a161b9fb-ec2a-4fed-8e0f-bdb8c271e708",
    "https://firebasestorage.googleapis.com/v0/b/soundy-web-react.appspot.com/o/open_the_gate.mp3?alt=media&token=0edbbd28-e85e-4f8c-ac38-b99044212847",
    "https://firebasestorage.googleapis.com/v0/b/soundy-web-react.appspot.com/o/save_me.mp3?alt=media&token=a2e0a470-37ed-407e-9f93-46c48df13f3f",
    "https://firebasestorage.googleapis.com/v0/b/soundy-web-react.appspot.com/o/xmas.mp3?alt=media&token=2265854b-d507-4d7a-b918-47c7ea668023"
];

const SoundPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (!audio) return;
        
        const handleCanPlay = () => audio.play();
        const handleEnded = () => audio.play();

        audio.addEventListener("canplay", handleCanPlay);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("canplay", handleCanPlay);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audio]);

    const handleClick = (index) => {
        if (index === currentPlayingIndex) return;

        setCurrentPlayingIndex(index);
        if (audio) audio.pause();

        const newAudio = new Audio(soundUrls[index]);
        setAudio(newAudio);
        newAudio.play();
        setIsPlaying(true);
        setTimeout(() => setIsChecked(false), 300);
    };

    const handleMute = () => {
        if (audio) audio.pause();
        setIsPlaying(false);
        setCurrentPlayingIndex(null);
        setTimeout(() => setIsChecked(false), 300);
    };

    const data = [
        { src: m1_monster, onClick: () => handleClick(0) },
        { src: m2_monster, onClick: () => handleClick(1) },
        { src: desert_monster, onClick: () => handleClick(2) },
        { src: orc_valley_monster, onClick: () => handleClick(3) },
        { src: xmas, onClick: () => handleClick(4) },
        { src: mute, onClick: handleMute },
    ];

    return (
        <nav className={styles.menu}>
            <input type="checkbox" checked={isChecked} className={styles["menu-open"]} onChange={() => setIsChecked(!isChecked)} id="menu-open" />
            <label className={styles["menu-open-button"]} htmlFor="menu-open">
                <img src={music} alt="Music" />
            </label>
            {data.map((item, index) => (
                <a key={index} onClick={item.onClick} className={`${styles["menu-item"]} ${currentPlayingIndex === index ? styles["active"] : ""}`}>
                    <img draggable="false" src={item.src} alt={`Sound ${index}`} />
                </a>
            ))}
        </nav>
    );
};

export default SoundPlayer;