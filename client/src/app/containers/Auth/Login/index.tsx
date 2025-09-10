"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginRequest } from "@/app/stores/reducers/auth";

export default function Login() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: any) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginRequest({ email, password }));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
}
