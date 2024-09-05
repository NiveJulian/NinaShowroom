import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { renderCondition, cleanSearchProducts, searchProduct } from "../../../redux/actions/productActions";
import toast from "react-hot-toast";

export const SearchBar = () => {
    
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setName(value);

    // Limpia la búsqueda si el input está vacío
    if (!value.trim()) {
      dispatch(cleanSearchProducts());
      dispatch(renderCondition("allProducts"));
    }
  };

  const handleSearch = () => {
    if (!name.trim()) {
        toast.error("No se ingreso ningun dato");
      return;
    }
    dispatch(searchProduct(name)); // Realiza la acción que busca por nombre
    
    
    dispatch(renderCondition("searchedProducts"));
  };

 

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute left-3 h-5 w-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="search"
          name="valueSearch"
          value={name}
          onChange={handleChange}
          placeholder="Buscar producto"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        type="submit"
        className="mt-2 w-full bg-secondary text-white p-2 rounded-md hover:bg-gray-700"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
