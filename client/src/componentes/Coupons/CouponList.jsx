// components/CouponsList.jsx
import React, { useEffect, useState } from "react";
import instance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import CreateCouponForm from "./CreateCouponForm";

const CouponsList = () => {
  const [coupons, setCoupons] = useState([]);
  const [activeForm, setActiveForm] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const toggleModal = () => {
    // setSelectedProduct(product);
    setActiveForm(!activeForm);
  };

  const fetchCoupons = async () => {
    try {
      const response = await instance.get("/api/coupon/coupons"); // Debes implementar este endpoint para obtener cupones
      setCoupons(response.data.coupons);
    } catch (error) {
      console.error("Error obteniendo cupones:", error);
    //   toast.error("Error obteniendo cupones.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const action = currentStatus === "active" ? "deactivate" : "activate";
      await instance.patch(`/api/coupon/coupons/${id}/toggle`, { action });
      toast.success(
        `Cupón ${
          action === "activate" ? "activado" : "desactivado"
        } exitosamente.`
      );
      fetchCoupons(); // Actualizar la lista de cupones
    } catch (error) {
      console.error("Error cambiando el estado del cupón:", error);
      toast.error("Error cambiando el estado del cupón.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen">
      {activeForm && <CreateCouponForm onClose={toggleModal} />}
      <div className="flex justify-between">
        <h2 className="text-2xl mb-4">Lista de Cupones</h2>
        <button
          onClick={() => toggleModal()}
          className="border p-2 my-2 border-secondary bg-secondary text-white rounded-md hover:bg-primary hover:text-white active:translate-y-[2px] shadow-sm hover:shadow-md"
        >
          Crear cupon
        </button>
      </div>
      <div className="overflow-x-auto custom-scroll border border-gray-300 p-2">
        <table className="w-full basic">
          <thead>
            <tr>
              <th className="border px-4 py-2">Código</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Tipo de Descuento</th>
              <th className="border px-4 py-2">Valor</th>
              <th className="border px-4 py-2">Expiración</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="border px-4 py-2">{coupon.code}</td>
                <td className="border px-4 py-2">{coupon.name}</td>
                <td className="border px-4 py-2">{coupon.discountType}</td>
                <td className="border px-4 py-2">{coupon.discountValue}</td>
                <td className="border px-4 py-2">{coupon.expirationDate}</td>
                <td className="border px-4 py-2">{coupon.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => toggleStatus(coupon.id, coupon.status)}
                    className={`px-2 py-1 rounded ${
                      coupon.status === "active"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {coupon.status === "active" ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsList;
