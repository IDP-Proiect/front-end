import axios from "axios";
import React from "react";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function FormLogin({ onClose }: Props) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleusernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.data.token);
      console.log(localStorage.getItem("token") + " e tokenuuuuu");
      onClose();
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      console.log(error);
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block bg-blue rounded-lg text-left overflow-hidden transform transition-all px-10 pt-10 pb-4 sm:pb-6">
          <div className="w-full max-w-2xl">
            <form className="bg-blue-400 rounded px-10 py-10 border">
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-72 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={handleusernameChange}
                ></input>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="*****"
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 border-b-4 border-gray-400 font-semibold py-2 px-4  rounded shadow"
                  type="button"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="bg-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow border-b-4 border-blue-700 hover:border-blue-500"
                  
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}