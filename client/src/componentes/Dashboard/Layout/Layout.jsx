import toast from "react-hot-toast";
import { Nav } from "../Nav/Nav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function Layout({ children, isAuth }) {
  const [showNav, setShowNav] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isAuth) {
      toast.loading("No autorizado, redirigiendo...");
      setTimeout(() => {
        window.location.href = "/dashboard/";
      }, 1000);
    }
  }, [isAuth]);

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <h1 className="text-4xl text-red-500">
          No estás autorizado a ingresar aquí
        </h1>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-pink-50 relative">
      <div className="md:hidden flex items-center justify-between p-4 bg-pink-50 w-full">
        <button
          onClick={() => setShowNav(!showNav)}
          className="p-2 border-2 border-gray-200 shadow-lg text-black focus:bg-primary focus:outline-none focus:text-pink-300 z-50 rounded-full"
        >
          <svg
            className="w-5 h-5 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        id="sidebar"
        className={`bg-pink-100 h-full md:h-auto flex px-3 w-full md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out transform ${
          showNav ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static z-40 top-0 left-0 md:w-auto max-w-full md:max-w-none`}
      >
        <Nav showNav={showNav} user={user} />
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}
