import React, { useState, useEffect } from 'react';

import FormSignUp from '../../components/nav/forms/signup';
import FormLogin from '../../components/nav/forms/login';
import Checkout from '../../components/nav/forms/checkout';
import History from './forms/history';

export default function Navbar() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setisLoginModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    const storedCheckoutModalOpen = localStorage.getItem('checkoutModalOpen');
    setIsCheckoutModalOpen(storedCheckoutModalOpen === 'true');
  }, []);

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleLoginClick = () => {
    setisLoginModalOpen(true);
  };
  const handleHistoryClick = () => {
    setIsHistoryModalOpen(true);
  };

  const handleCheckoutClick = () => {
    setIsCheckoutModalOpen(true);
    localStorage.setItem('checkoutModalOpen', 'true');
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };
  const handleCloseLoginModal = () => {
    setisLoginModalOpen(false);
  };
  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    localStorage.setItem('checkoutModalOpen', 'false');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('price');
    window.location.reload();
  };

  return (
    <nav className="bg-blue-800 h-[7vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-2xl">ColorShop</span>
            </div>
          </div>
          <div className="flex">
            {!localStorage.getItem('token') && (
              <>
                <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600" onClick={handleSignUpClick}>
                  Signup
                </button>
                <button className="px-4 py-2 ml-6 text-white bg-blue-500 hover:bg-blue-600" onClick={handleLoginClick}>
                  Login
                </button>
              </>
            )}
            {localStorage.getItem('token') && (
              <button className="px-4 py-2 ml-4 text-white bg-blue-500 hover:bg-blue-600" onClick={handleCheckoutClick}>
                Checkout
              </button>
            )}
            {localStorage.getItem('token') && (
              <button className="px-4 py-2 ml-4 text-white bg-blue-500 hover:bg-blue-600" onClick={handleHistoryClick}>
                History
              </button>
            )}
            {localStorage.getItem('token') && (
              <button
                className="px-4 py-2 ml-4 text-white bg-gray-500 hover:bg-gray-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
          {isSignUpModalOpen && (
            <FormSignUp onClose={handleCloseSignUpModal} />
          )}
          {isLoginModalOpen && (
            <FormLogin onClose={handleCloseLoginModal} />
          )}
          {isCheckoutModalOpen && (
            <Checkout onClose={handleCloseCheckoutModal} />
          )}
                    {isHistoryModalOpen && (
            <History onClose={handleCloseHistoryModal} />
          )}
        </div>
      </div>
    </nav>
  );
}
