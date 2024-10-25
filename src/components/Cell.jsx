import React from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Cell({ value, index }) {
    const { changeBoard } = useContext(AuthContext);

    return (
        <>
            <div
                className="w-24 h-24 bg-gray-200 border-2 border-gray-400 flex items-center justify-center cursor-pointer text-4xl font-bold text-gray-800 hover:bg-gray-300 transition-all"
                onClick={() => changeBoard(index)}
            >
                <h2>{value}</h2>
            </div>
        </>
    );
}

export default Cell;
