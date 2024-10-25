import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Game from "./components/Game";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { onValue, ref, set } from "firebase/database";

function App() {
    const [user, setUser] = useState(null);

    const nevigate = useNavigate();

    const [gameState, setGameState] = useState([
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
        "-",
    ]);

    const [player, setPlayer] = useState("X");

    const [winner, setWinner] = useState("");

    const changeBoard = (index) => {
        if (gameState[index] != "-") {
            alert("invalid move!");
            return;
        }

        if (winner != "") {
            alert("Game is finished");
            return;
        }

        setGameState((current) => {
            // if cell is empty then only do the whole work

            // update board
            let copy = [...current];
            copy[index] = player;

            return copy;
        });
        // flip turn

        if (player == "X") {
            setPlayer("O");
        } else {
            setPlayer("X");
        }
    };

    const resetGame = () => {
        setGameState(["-", "-", "-", "-", "-", "-", "-", "-", "-"]);
        setWinner("");
        setPlayer("X");
    };

    const checkWins = (playerToCheck) => {
        if (
            gameState[0] == playerToCheck &&
            gameState[1] == playerToCheck &&
            gameState[2] == playerToCheck
        )
            return true;
        // second row
        if (
            gameState[3] == playerToCheck &&
            gameState[4] == playerToCheck &&
            gameState[5] == playerToCheck
        )
            return true;
        // third row
        if (
            gameState[6] == playerToCheck &&
            gameState[7] == playerToCheck &&
            gameState[8] == playerToCheck
        )
            return true;
        // firt col
        if (
            gameState[0] == playerToCheck &&
            gameState[3] == playerToCheck &&
            gameState[6] == playerToCheck
        )
            return true;
        // second col
        if (
            gameState[1] == playerToCheck &&
            gameState[4] == playerToCheck &&
            gameState[7] == playerToCheck
        )
            return true;
        // third col
        if (
            gameState[2] == playerToCheck &&
            gameState[5] == playerToCheck &&
            gameState[8] == playerToCheck
        )
            return true;

        // first diagonal
        if (
            gameState[0] == playerToCheck &&
            gameState[4] == playerToCheck &&
            gameState[8] == playerToCheck
        )
            return true;
        // second diagonal
        if (
            gameState[2] == playerToCheck &&
            gameState[4] == playerToCheck &&
            gameState[6] == playerToCheck
        )
            return true;

        return false;
    };

    useEffect(() => {
        let xWin = checkWins("X");
        let oWin = checkWins("O");

        if (xWin) {
            setWinner("X wins the game");
        }

        if (oWin) {
            setWinner("O wins the game");
        }

        //update in firebase

        const boardRef = ref(db, "board");
        set(boardRef, JSON.stringify(gameState));
    }, [gameState]);

    const setListener = () => {
        const gameRef = ref(db, "board");
        onValue(gameRef, (snapshot) => {
            if (snapshot.exists()) {
                const newBoard = JSON.parse(snapshot.val());
                setGameState(newBoard);
            }
        });

        // 2. Second Listener for Turn
        const turnRef = ref(db, "turn");
        onValue(turnRef, (snapshot) => {
            if (snapshot.exists()) {
                setPlayer(snapshot.val());
            }
        });
    };

    useEffect(() => {
        setListener();
    }, []);

    useEffect(() => {
        // update firebase
        const turnRef = ref(db, "turn");
        set(turnRef, player);
    }, [player]);

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                alert("You have successfully Login!");

                setUser(res.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify({ email: user.email, name: user.name })
                );

                nevigate("/game");
            })

            .catch((err) => {
                alert(err.message);
                console.log(err.message);
            });
    };

    const signIn = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((responce) => alert("Account Created!"))
            .catch((error) => {
                alert(error.message);
                console.log(error.message);
            });
    };

    //check if user exist in localstorage It means user is already logged in.
    useEffect(() => {
        if (localStorage.getItem("user") != null) {
            // 1) update state
            setUser(JSON.parse(localStorage.getItem("user")));

            // 2) redirect to home
            nevigate("/game");
        }
    }, []);

    const logout = () => {
        signOut(auth);
        setUser(null);
        localStorage.removeItem("user");
        nevigate("/");
    };

    return (
        <>
            <AuthContext.Provider
                value={{
                    user,
                    setUser,
                    login,
                    signIn,
                    logout,
                    gameState,
                    changeBoard,
                    checkWins,
                    gameState,
                    player,
                    winner,
                    resetGame,
                    setListener,
                }}
            >
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </AuthContext.Provider>
        </>
    );
}

export default App;
