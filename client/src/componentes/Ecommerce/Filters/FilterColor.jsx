import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";
import { getProductsByColor, renderCondition } from "../../../redux/actions/actions";

const FilterColor = () => {
  const colors = useSelector((state) => state.sheets.colors);
  const dispatch = useDispatch();

  const handleColorFilter = (event) => {
    const color = event.target.value;

    if (color !== "Todos") {
      dispatch(getProductsByColor(color));
      dispatch(renderCondition("filteredColor"));
    } else {
      dispatch(renderCondition("allProducts"));
    }
  };

  return (
    <div className="flex items-center mt-5 px-1">
      <div className="p-4 rounded-md">
        <div className="grid grid-cols-2 flex-col gap-2">
          <button
            value={"Todos"}
            onClick={handleColorFilter}
            className="px-3 py-2 bg-primary rounded-md text-white text-xs"
          >
            Todos
          </button>
          {colors.map((color, index) => (
            <button
              key={index}
              value={color}
              onClick={handleColorFilter}
              className="px-3 py-2 bg-primary rounded-md text-white text-xs whitespace-nowrap" // Ajusta padding y font-size
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterColor;
