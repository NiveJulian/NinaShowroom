import { useDispatch, useSelector } from "react-redux";
import {
  clearFilteredProducts,
  filterByCategory,
  renderCondition,
} from "../../../redux/actions/actions";
import { useState, useRef } from "react";

const FilterCategories = () => {
  const categories = useSelector((state) => state.sheets.categories);
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    const category = event.target.value;

    if (category !== "Todos") {
      dispatch(filterByCategory(category));
      dispatch(renderCondition("filteredProducts"));
    } else {
      dispatch(renderCondition("allProducts"));
      dispatch(clearFilteredProducts());
    }
  };

  return (
    <div className="flex items-center mt-5 px-1">
      <div className="p-4 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <button
            value={"Todos"}
            onClick={handleFilter}
            className="px-4 py-2 bg-secondary rounded-md text-white text-xs whitespace-nowrap"
          >
            Todos
          </button>
          {categories.map((category, index) => {
            if (category !== "") {
              return (
                <button
                  key={index}
                  value={category}
                  onClick={handleFilter}
                  className="px-3 flex justify-center items-center py-3 w-auto bg-secondary rounded-md text-white text-xs p-4" // Ajusta padding y font-size
                >
                  {category}
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterCategories;
