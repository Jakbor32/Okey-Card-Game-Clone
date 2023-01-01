import React, { useState } from "react";
import styles from "./Modal.module.css";



const Modal = (props) => {
    const { id } = props;
    const [imageLoaded, setImageLoaded] = useState(false);



    return (
        <>
            {

                props.showModal ?
                    <>
                        <div className={styles.overlay}></div>
                        <div>
                            <div className={styles.modal}>
                                <img
                                    draggable="false"
                                    src={props.imgSrc}
                                    alt="modal"
                                    onLoad={() => setImageLoaded(true)}
                                />
                                <p className={styles["modal-text"]}> {imageLoaded ? props.showModalText : null}{ }</p>
                                <div className={styles.buttons}>
                                    <button
                                        onClick={() => props.onClickYes(id)}
                                        className={styles["btn-modal"]}
                                    ></button>
                                    <button className={styles["btn-modal"]}
                                        onClick={() => props.onClickNo()}
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }
        </>
    );
};

export default Modal;