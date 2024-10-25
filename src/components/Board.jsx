import React, { useContext } from "react";
import Cell from "./Cell";
import { AuthContext } from "../AuthContext";

function Board() {
    const { gameState, player, winner } = useContext(AuthContext);

    return (
        <>
            <div>
                <h2>Turn : {player}</h2>

                {winner != "" && <p>Winner is : {winner}</p>}

                <div
                    style={{
                        marginTop: "30px",
                        display: "grid",
                        gridTemplateColumns: "auto auto auto",
                    }}
                >
                    {gameState.map((item, index) => (
                        <Cell value={item} index={index} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Board;
