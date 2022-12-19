import styles from './Board.module.css'


const Board = () => {

    return (
        <>
            <img draggable='false' className={styles.board} src={require('./../../images/board.png')} alt="board" />
        </>
    )

}

export default Board