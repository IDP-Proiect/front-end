import axios from "axios";
import React from "react";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function FormSignUp({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateInputFields = () => {
    if (email === "") {
      setErrorMessage("Email field cannot be empty.");
      return false;
    }
    if (username === "") {
      setErrorMessage("Username field cannot be empty.");
      return false;
    }

    if (password === "") {
      setErrorMessage("Password field cannot be empty.");
      return false;
    }

    return true;
  };

  const handleSignIn = async () => {
    if (validateInputFields()) {
      try {
        const response = await axios.post(
          "/register",
          {
            email,
            username,
            password,
          }
        );
        console.log(response)
        localStorage.setItem("id", response.data.data.id);
        console.log(localStorage.getItem("id") + " e iduu");
        onClose();
      } catch (error) {
        setErrorMessage("Creating a new account failed :D. Please try again.");
      }
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center  text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block  rounded-lg text-left overflow-hidden transform transition-all pt-5 pb-4 sm:pb-4 ">
          <div className="w-full max-w-md">
            <form className="bg-blue-400  rounded px-5 pt-6 pb-8 border">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                ></input>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
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
                <p className="text-red-500 text-xs italic">
                  Please choose a password containing 1 number and one special
                  character.
                </p>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}
              <div className="flex items-center justify-between">
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 border-b-4 border-gray-400 font-semibold py-2 px-4  rounded shadow"
                  type="button"
                  onClick={handleSignIn}
                >
                  Sign In
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