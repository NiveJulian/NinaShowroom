import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSale, removeFromCart } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const Cart = ({ product, calcularTotal, usuario }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formaPago, setFormaPago] = useState("");
  const [formCliente, setFormCliente] = useState({
    nombre: usuario.name || "",
    correo: usuario.email || "",
    provincia: usuario.provincia || "",
    direccion: usuario.direccion || "",
    cp: usuario.cp || "",
    celular: "",
  });
  const handleFormaPagoChange = (forma) => {
    setFormaPago(forma);
  };

  const handleFormClienteChange = (e) => {
    const { name, value } = e.target;
    setFormCliente({
      ...formCliente,
      [name]: value,
    });
  };

  const handleCreateVenta = () => {
    const venta = {
      productos: product.map((prod) => ({
        id: prod.id,
        sku: prod.sku,
        nombre: prod.nombre,
        talle: prod.talle,
        color: prod.color,
        precio: prod.precio,
        cantidad: prod.cantidad,
      })),
      total: calcularTotal(),
      formaPago,
      cliente: formCliente,
    };

    if (venta.formaPago === "") {
      toast.error("Falta forma de pago");
    } else if (venta.productos.length === 0) {
      toast.error("El carrito está vacío");
    } else if (venta.cliente.nombre.trim() === "") {
      toast.error("Falta nombre del cliente");
    } else {
      toast.success("Venta creada exitosamente...");
      dispatch(createSale(venta));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex items-center justify-center bg-gray-200">
      <div className="bg-gray-50 h-screen text-center shadow-md p-6 rounded-xl w-2/3 flex flex-col">
        <div className="flex justify-start">
          <button
            className="flex gap-2 border border-gray-400 p-2 active:translate-y-[1px] hover:shadow-lg rounded-md"
            onClick={() => navigate("/")}
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <span>Volver</span>
          </button>
          <h1 className="text-xl font-bold flex-1">Carrito</h1>
        </div>

        <div
          className={`border border-gray-500 p-2 mt-4 ${
            product.length > 0
              ? "overflow-y-scroll"
              : "h-full flex justify-center items-center"
          }`}
        >
          {product?.length > 0 ? (
            product?.map((prod, i) => {
              const imagenes = prod?.url?.split(",")[0];
              return (
                <div
                  key={i}
                  className="md:flex items-center py-2 md:py-2 lg:py-2 border-t border-gray-500"
                >
                  <div className="md:w-4/12 2xl:w-1/4 w-full gap-2 p-1 flex">
                    <img
                      key={i}
                      src={imagenes}
                      alt="Black Leather Purse"
                      className="h-48 w-48 border border-gray-400 object-center p-2 rounded-md object-cover md:block hidden"
                    />
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center p-4">
                    <p className="text-base mt-4 leading-3 text-gray-800">
                      <span className="font-bold">SKU:</span> {prod.sku}
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base font-bold leading-none text-gray-800">
                        {prod.nombre}
                      </p>
                    </div>
                    {prod.talle && (
                      <p className="text-base leading-3 text-gray-600 pt-2">
                        <span className="font-bold">Talle:</span> {prod.talle}
                      </p>
                    )}
                    <p className="text-base leading-3 text-gray-800 py-4">
                      <span className="font-bold">Color:</span> {prod.color}
                    </p>
                    <p className="text-base leading-3 text-gray-800 py-4">
                      <span className="font-bold">Cantidad:</span>{" "}
                      {prod.cantidad}
                    </p>

                    <div className="flex items-center justify-between pt-5">
                      <p className="text-xl text-gray-800">
                        ${prod.precio * prod.cantidad},00
                      </p>
                      <button
                        onClick={() => handleRemove(prod.id)}
                        className="text-xs leading-3 p-2 hover:shadow-md border hover:border-red-500  active:translate-y-[2px] rounded-full text-red-500 cursor-pointer"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">
              Carrito vacío, llénalo y podrás concretar una venta
            </p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 opacity-95 text-center shadow-md p-6 rounded-xl w-1/3 m-2 h-screen flex flex-col justify-between">
        <h1 className="text-xl text-black">Resumen</h1>
        <div className="p-2">
          <div className="mt-2 flex justify-center items-center">
            <label
              className="border border-gray-300 p-2 text-center"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formCliente.nombre}
              onChange={handleFormClienteChange}
              className="border p-2 w-full border-gray-300"
              placeholder="Nombre completo"
            />
          </div>
          <div className="mt-2 flex justify-center items-center">
            <label
              className="border border-gray-300 p-2 text-center"
              htmlFor="correo"
            >
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={formCliente.correo}
              onChange={handleFormClienteChange}
              className="border p-2 w-full"
              placeholder="Email"
            />
          </div>
          <div className="mt-2 flex flex-row justify-center items-center">
            <div className="flex">
              <label
                className="border border-gray-300 p-2 text-center"
                htmlFor="provincia"
              >
                Provincia
              </label>
              <input
                type="text"
                name="provincia"
                value={formCliente.provincia}
                onChange={handleFormClienteChange}
                className="border p-2 w-full"
                placeholder="Provincia"
              />
            </div>
            <div className="ml-2 flex">
              <label
                className="border border-gray-300 p-2 text-center"
                htmlFor="cp"
              >
                CP
              </label>
              <input
                type="text"
                name="cp"
                value={formCliente.cp}
                onChange={handleFormClienteChange}
                className="border p-2 w-full"
                placeholder="Código Postal"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-row justify-center items-center">
            <div className="flex">
              <label
                className="border border-gray-300 p-2 text-center"
                htmlFor="direccion"
              >
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formCliente.direccion}
                onChange={handleFormClienteChange}
                className="border p-2 w-full"
                placeholder="Dirección"
              />
            </div>
            <div className="ml-2 flex">
              <label
                className="border border-gray-300 p-2 text-center"
                htmlFor="celular"
              >
                Celular
              </label>
              <input
                type="text"
                name="celular"
                value={formCliente.celular}
                onChange={handleFormClienteChange}
                className="border p-2 w-full"
                placeholder="Número de celular"
              />
            </div>
          </div>
        </div>
        <div className="p-2 mt-2">
          Forma de pago
          <div className="flex gap-2 mt-2 justify-center items-center">
            <button
              onClick={() => handleFormaPagoChange("Efectivo")}
              className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
                formaPago === "Efectivo" ? "border-teal-300" : "border-gray-400"
              }`}
            >
              Efectivo
            </button>
            <button
              onClick={() => handleFormaPagoChange("Mercado Pago")}
              className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
                formaPago === "Mercado Pago"
                  ? "border-teal-300"
                  : "border-gray-400"
              }`}
            >
              Mercado Pago
            </button>
            <button
              onClick={() => handleFormaPagoChange("Transferencia")}
              className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
                formaPago === "Transferencia"
                  ? "border-teal-300"
                  : "border-gray-400"
              }`}
            >
              Transferencia
            </button>
          </div>
        </div>
        <div className="p-2 mt-4">Total: ${calcularTotal()}</div>
        <div className="p-2 mt-4">
          {/* <button
            onClick={handleCreateVenta}
            className="border p-2 text-white bg-gray-800 w-full hover:bg-gray-700"
          >
            Empezar el pago
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
