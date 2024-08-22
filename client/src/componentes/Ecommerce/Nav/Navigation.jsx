import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartList from "../Cart/CartList";
import UserLogged from "../User/UserLogged";

const Navigation = ({ isCart }) => {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleShowLogin = () => {
    if (!isEmpty(user)) {
      setShowLogin(!showLogin);
    } else {
      navigate("/login");
    }
  };

  const handleOnClose = () => {
    setShowLogin(false);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, product) => {
      const price = parseFloat(product.precio);
      const quantity = product.cantidad || 1;
      return acc + (isNaN(price) ? 0 : price * quantity);
    }, 0);

    return total.toFixed(2);
  };

  return (
    <nav className="relative">
      <div className="relative z-30 bg-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex gap-2 justify-center items-center px-2 lg:px-0">
              <div className="flex lg:hidden border border-gray-300 rounded-md p-2">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
              </div>
              <Link to="/" className="flex-shrink-0">
                <img
                  className="h-12 w-12 object-cover rounded-full"
                  src="../ninalogo.webp"
                  alt="Logo"
                />
              </Link>
              <div className="hidden lg:block lg:ml-2">
                <div className="flex">
                  <Link
                    to="/"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/product"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Products
                  </Link>
                  <Link
                    to="#"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Recipe
                  </Link>
                  <Link
                    to="#"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Promo
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 flex gap-2 px-2 lg:ml-6 lg:justify-end">
              {!isCart && (
                <div className="tooltip">
                  <button
                    onClick={toggleCart}
                    className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2 flex items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    {cartItems?.length > 0 && (
                      <span className="bg-secondary text-white text-xs rounded-full w-4 h-4 text-center top-0 left-0">
                        {cartItems?.length}
                      </span>
                    )}
                  </button>
                </div>
              )}
              <div className="tooltip">
                <button
                  onClick={handleShowLogin}
                  className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2 flex items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative mt-4">
                {showLogin && (
                  <UserLogged onClose={handleOnClose} user={user} />
                )}
              </div>
            </div>
            <div className="relative mt-4">
                {showCart && (
                  <CartList
                    cartItems={cartItems}
                    calculateTotal={calculateTotal}
                  />
                )}
              </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute bg-gray-100 w-full">
            <div className="px-2 pt-2 pb-3">
              <Link
                to="/"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
              >
                Inicio
              </Link>
              <Link
                to="/product"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
              >
                Products
              </Link>
              <Link
                to="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
              >
                Recipe
              </Link>
              <Link
                to="#"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
              >
                Promo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
