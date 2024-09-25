import React, { useState } from "react";
import instance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CreateCouponForm = ({ onClose }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // Estado para las categorías seleccionadas

  // Obtener las categorías del estado global de Redux
  const categories = useSelector((state) => state.sheets.categories);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !code ||
      !name ||
      !discountValue ||
      !expirationDate ||
      !usageLimit ||
      selectedCategories.length === 0
    ) {
      toast.error(
        "Todos los campos son requeridos, incluyendo las categorías."
      );
      return;
    }

    try {
      const response = await instance.post("/api/coupon/coupons", {
        code,
        name,
        discountType,
        discountValue,
        expirationDate,
        usageLimit,
        categories: selectedCategories, // Enviar las categorías seleccionadas
      });

      toast.success("Cupón creado exitosamente.");
      setCode("");
      setName("");
      setDiscountType("percentage");
      setDiscountValue("");
      setExpirationDate("");
      setUsageLimit("");
      setSelectedCategories([]);
      toast.loading("Espera un momento");
      setTimeout(() => {
        window.location.reload()
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error creando el cupón:", error.response.data);
      toast.error(error.response.data.message || "Error creando el cupón.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded relative"
      >
        <button
          onClick={onClose}
          className="text-gray-400 absolute right-3 flex text-3xl hover:text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4">Crear Cupón de Descuento</h2>
        <div className="mb-4">
          <label className="block mb-1">Código del Cupón</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-400 px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Nombre del Cupón</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-400 px-3 py-2 rounded"
            required
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="mb-4 w-1/2">
            <label className="flex mb-1">Tipo de Descuento</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full border border-gray-400 px-3 py-2 rounded"
            >
              <option value="percentage">Porcentaje (%)</option>
              <option value="fixed">Cantidad Fija ($)</option>
            </select>
          </div>
          <div className="mb-4 w-1/2">
            <label className="block mb-1">Expiración</label>
            <input
              type="datetime-local"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="mb-4">
            <label className="block mb-1">Valor del Descuento</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Límite de Uso</label>
            <input
              type="number"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
              min="1"
            />
          </div>
        </div>
        <div className="mb-4 w-full">
            <label className="block mb-1">Asignar a Categorías</label>
          <div className="flex justify-center items-center flex-wrap gap-2 border border-gray-400 p-2">
            {categories?.map((category, index) => (
              <div key={index} className="flex justify-center items-center">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label className="ml-2">{category}</label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded-md"
        >
          Crear Cupón
        </button>
      </form>
    </div>
  );
};

export default CreateCouponForm;
