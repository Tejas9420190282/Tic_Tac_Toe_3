import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Board from "./Board";

function Game() {
    const { user, logout, resetGame } = useContext(AuthContext);

    const nevigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            // redirecting to login page.
            setTimeout(() => {
                nevigate("/");
            }, 2000);
        }
    }, []);

    return (
        <>
            {auth.currentUser ? (
                <div>
                    <h1>Welcome in Tic Tac Toe game</h1>

                    <Board />

                    <button
                        className="bg-blue-500 h-12 w-56 rounded-3xl flex  cursor-pointer font-semibold"
                        onClick={logout}
                    >
                        Logout
                    </button>

                    <button
                        className="bg-blue-500 h-12 w-56 rounded-3xl flex  cursor-pointer font-semibold"
                        onClick={resetGame}
                    >
                        Reset Game
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Redirecting to login page</h2>
                </div>
            )}
        </>
    );
}

export default Game;
