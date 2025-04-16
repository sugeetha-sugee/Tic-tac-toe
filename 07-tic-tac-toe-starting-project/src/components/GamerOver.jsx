export default function GameBoard({Winner,onReStart}){
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
           {Winner && <p>{Winner} Won!</p>}
           {!Winner && <p> It&apos;s a draw!</p>}
            <p><button onClick={onReStart}>Rematch!</button></p>
        </div>
    )
}