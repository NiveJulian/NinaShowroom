import { useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartList from "../Cart/CartList";
import UserLogged from "../User/UserLogged";
import {
  clearFilteredProducts,
  filterByCategory,
  renderCondition,
  setVariable,
} from "../../../redux/actions/productActions";

const Navigation = ({ isCart }) => {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
    }, 1500); // Debe coincidir con la duración de la animación
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hideTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowCategories(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowCategories(false);
    }, 250); // 1.5 segundos de retardo antes de ocultar
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.sheets.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user)

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

  const handleFilter = (category) => {
    if (category !== "Todos") {
      dispatch(filterByCategory(category));
      dispatch(renderCondition("filteredProducts"));
      dispatch(setVariable(category));
    } else {
      dispatch(renderCondition("allProducts"));
      dispatch(clearFilteredProducts());
    }

    // Navegar utilizando `useNavigate` en lugar de `window.location.href`
    navigate("/product");
  };

  return (
    <nav
      className={`w-full ${
        isScrolled ? "fixed top-0 z-30" : "relative"
      } bg-white`}
    >
      <div className="relative z-30 bg-transparent shadow-lg">
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
              <div className="logo-container">
                <Link to="/" className="flex-shrink-0">
                  <div
                    className={`flex gap-1 items-center ${
                      animationCompleted ? "completed" : ""
                    }`}
                  >
                    {["N", "I", "N", "A"].map((letter, index) => (
                      <span
                        key={index}
                        className="logo-text text-primary font-serif"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
              <div className="hidden lg:block lg:ml-2">
                <div className="flex">
                  <Link
                    to="/"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Inicio
                  </Link>
                  <ul
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex justify-between items-center ml-4"
                  >
                    <Link
                      to="/product"
                      className="text-sm px-3 py-2 rounded-md leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700"
                    >
                      Productos
                    </Link>
                    {showCategories && (
                      <ul className="bg-white border transition duration-150 ease-in-out border-gray-800 rounded-md h-auto absolute p-8 left-0 grid grid-cols-6 top-16 w-full gap-2">
                        {categories.map((category, index) => {
                          if (category !== "") {
                            return (
                              <li
                                key={index}
                                className="border border-gray-400 flex justify-center items-center text-center p-1 hover:text-gray-50 hover:bg-tertiary rounded-md"
                              >
                                <button
                                  onClick={() => handleFilter(category)}
                                  className="w-full h-full text-center"
                                >
                                  {category}
                                </button>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    )}
                  </ul>
                  <Link
                    to="/howcanbuy"
                    className="ml-4 px-3 py-2 rounded-md text-sm leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    ¿Como Comprar?
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 flex gap-2 px-2 justify-end">
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
                  className="border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2 flex items-center gap-2"
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
                  <span className="hidden lg:block">
                    {!isEmpty(user) ? `Hola ${user?.name}!` : "Iniciar sesión"}
                  </span>
                </button>
              </div>
              <div className="relative mt-4">
                {showLogin && (
                  <UserLogged onClose={handleOnClose} user={user} />
                )}
              </div>
            </div>
            <div className="relative">
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
            <div className="px-2 pt-2 pb-3 gap-2">
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
                Productos
              </Link>
              <Link
                to="/howcanbuy"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
              >
                ¿Como Comprar?
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
