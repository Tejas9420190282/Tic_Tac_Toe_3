import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

//import { doc, setDoc } from "firebase/firestore";

function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signIn } = useContext(AuthContext);

    const handleSignin = (e) => {
        e.preventDefault();

        signIn(email, password);
    };

    return (
        <>
            <div className="bg-gray-300 h-screen w-screen flex justify-center items-center">
                <div className="bg-gray-500 backdrop-blur-2xl h-96 w-96 flex flex-col gap-5 justify-center items-center my-auto">
                    <h1 className="font-medium text-lg text-white">
                        Create new Account
                    </h1>
                    <div className="bg-black h-12 w-56 rounded-3xl flex justify-start items-center">
                        <input
                            type="text"
                            className="px-2 py-1 bg-black outline-none text-white ml-2 w-40"
                            placeholder="Enter your Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="bg-black h-12 w-56 rounded-3xl flex justify-start items-center">
                        <input
                            type="email"
                            className="px-2 py-1 bg-black outline-none text-white ml-2 w-40"
                            placeholder="Enter your Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="bg-black h-12 w-56 rounded-3xl flex justify-center items-center ">
                        <input
                            type={`${showPass == false ? "password" : "text"}`}
                            className="px-2 py-1 mr-3 bg-black outline-none text-white w-40"
                            required
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <p
                            className="text-white font-semibold cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass == false ? "show" : "hide"}
                        </p>
                    </div>

                    <button
                        className="bg-blue-500 h-12 w-56 rounded-3xl flex justify-center items-center cursor-pointer font-semibold"
                        onClick={handleSignin}
                    >
                        Create account
                    </button>
                    <div className="flex ">
                        <p className={`font-semibold `}>
                            Already have an Account?
                        </p>
                        <Link to="/" className="text-white">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signin;
