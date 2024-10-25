import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const { login } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        login(email, password);
    };

    return (
        <>
            <div className="bg-gray-300 h-screen w-screen flex justify-center items-center">
                <div className="bg-gray-500 backdrop-blur-2xl h-96 w-96 flex flex-col gap-5 justify-center items-center my-auto">
                    <h1 className="font-medium text-lg text-white">
                        Login page
                    </h1>

                    <div className="bg-black h-12 w-56 rounded-3xl flex justify-start items-center">
                        <input
                            type="email"
                            className="px-2 py-1 bg-black outline-none text-white w-40 ml-2"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="bg-black h-12 w-56 rounded-3xl flex justify-center items-center ">
                        <input
                            type={`${showPass == false ? "password" : "text"}`}
                            className="px-2 py-1 mr-3 bg-black outline-none text-white w-40"
                            placeholder="Enter your Password"
                            value={password}
                            required
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
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <div className="flex  ">
                        Don't have an Account?
                        <Link
                            to="/signin"
                            className="font-semibold ml-1 cursor-pointer hover:text-red-400"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
