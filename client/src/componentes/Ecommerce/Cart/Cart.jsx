import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSale,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../redux/actions/actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Delivery from "../Delivery/Delivery";

const StepContact = ({ formCliente, handleFormClienteChange, nextStep }) => (
  <div>
    <h2>Información de Contacto</h2>
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
        htmlFor="nombre"
      >
        Nombre
      </label>
      <input
        type="text"
        name="nombre"
        value={formCliente.nombre}
        onChange={handleFormClienteChange}
        className="border p-2 w-full border-gray-500"
        placeholder="Nombre completo"
      />
    </div>
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
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
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
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
    {/* Resto de los campos */}
    <button
      onClick={nextStep}
      className="border p-2 text-white bg-gray-800 w-full hover:bg-gray-700 mt-4"
    >
      Siguiente
    </button>
  </div>
);

const StepShipping = ({
  formCliente,
  handleFormClienteChange,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  prevStep,
  nextStep,
  }) => (
  <div>
    <h2>Información de Envío</h2>
    {/* Aquí va el componente o campos para la información de envío */}
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
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
    <div className="mt-2 flex justify-center items-center">
      <label className="border border-primary bg-secondary text-white p-2 text-center" htmlFor="cp">
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
    <Delivery
      selectedOption={selectedDeliveryMethod}
      setSelectedOption={setSelectedDeliveryMethod}
    />
    <div className="flex justify-between mt-4">
      <button
        onClick={prevStep}
        className="border p-2 text-white bg-gray-800 hover:bg-gray-700"
      >
        Anterior
      </button>
      <button
        onClick={nextStep}
        className="border p-2 text-white bg-gray-800 hover:bg-gray-700"
      >
        Siguiente
      </button>
    </div>
  </div>
);

const StepPayment = ({
  formaPago,
  handleFormaPagoChange,
  prevStep,
  handleCreateVenta,
}) => (
  <div>
    <h2>Forma de Pago</h2>
    <div className="flex gap-2 mt-2 justify-center items-center">
      <button
        onClick={() => handleFormaPagoChange("Efectivo")}
        className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
          formaPago === "Efectivo" ? "border-primary" : "border-gray-400"
        }`}
      >
        Efectivo
      </button>
      {/* Resto de los botones de forma de pago */}
    </div>
    <div className="flex justify-between mt-4">
      <button
        onClick={prevStep}
        className="border p-2 text-white bg-gray-800 hover:bg-gray-700"
      >
        Anterior
      </button>
      <button
        onClick={handleCreateVenta}
        className="border p-2 text-white bg-gray-800 w-full hover:bg-gray-700"
      >
        Finalizar Compra
      </button>
    </div>
  </div>
);

const Cart = ({ product, calcularTotal, usuario }) => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const [formaPago, setFormaPago] = useState("");
  const [formCliente, setFormCliente] = useState({
    nombre: usuario.name || "",
    correo: usuario.email || "",
    provincia: usuario.provincia || "",
    direccion: usuario.direccion || "",
    cp: usuario.cp || "",
    celular: "",
  });

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(""); // Estado para el tipo de envío

  const handleFormaPagoChange = (forma) => {
    setFormaPago(forma);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
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
      tipoEnvio: selectedDeliveryMethod, // Pasa el método de envío seleccionado
    };

    if (venta.formaPago === "") {
      toast.error("Falta forma de pago");
    } else if (venta.productos.length === 0) {
      toast.error("El carrito está vacío");
    } else if (venta.cliente.nombre.trim() === "") {
      toast.error("Falta nombre del cliente");
    } else {
      toast.success("Venta creada exitosamente...");
      console.log(venta);
      // dispatch(createSale(venta));
    }
  };

  const handleRemoveFromCart = (index) => {
    const productId = product[index].id;
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (index, action) => {
    const productId = product[index].id;
    if (action === "increase") {
      dispatch(incrementQuantity(productId));
    } else if (action === "decrease") {
      dispatch(decrementQuantity(productId));
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200">
      <div className="bg-gray-50 h-screen text-center shadow-md p-6 rounded-xl w-2/3 flex flex-col">
        {step === 1 && (
          <StepContact
            formCliente={formCliente}
            handleFormClienteChange={handleFormClienteChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <StepShipping
            handleFormClienteChange={handleFormClienteChange}
            formCliente={formCliente}
            selectedDeliveryMethod={selectedDeliveryMethod}
            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
        {step === 3 && (
          <StepPayment
            formaPago={formaPago}
            handleFormaPagoChange={handleFormaPagoChange}
            prevStep={prevStep}
            handleCreateVenta={handleCreateVenta}
          />
        )}
      </div>
      <div className="bg-gray-50 opacity-95 text-center shadow-md p-6 rounded-xl w-1/3 m-2 h-screen flex flex-col justify-between">
        <h1 className="text-xl font-bold flex-1">Carrito</h1>
        <div
          className={`border border-gray-400 rounded-md p-2 mt-4 ${
            product.length > 0
              ? "overflow-y-scroll"
              : "h-full flex justify-center items-center"
          }`}
        >
          {product?.length > 0 ? (
            product?.map((prod, i) => {
              const imgUrl = prod?.url?.split(",")[0];
              return (
                <div
                  key={i}
                  className="flex flex-row justify-between border border-gray-500 bg-gray-300 p-2 rounded-md items-center mb-4"
                >
                  <div className="flex flex-row items-center w-2/5">
                    <LazyLoadImage
                      src={imgUrl}
                      className="w-16 h-16 object-cover rounded-full border border-gray-500 bg-gray-300"
                      alt={`${prod?.nombre}-${i}`}
                    />
                    <span className="ml-4 font-semibold text-sm text-primary text-center">
                      {prod?.nombre}
                    </span>
                  </div>
                  <div className="w-24 flex justify-between items-center">
                    <button
                      onClick={() => handleQuantityChange(i, "decrease")}
                      className="px-3 py-1 rounded-md bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-semibold mx-4">
                      {prod?.cantidad || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(i, "increase")}
                      className="px-3 py-1 rounded-md bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-1/5 flex flex-col justify-between items-center">
                    <span className="font-semibold text-primary text-center">
                      ${parseInt(prod?.precio) * prod?.cantidad || 1}
                    </span>
                    <button
                      onClick={() => handleRemoveFromCart(i)}
                      className="mt-2 font-semibold text-xs text-red-500 hover:text-pink-600"
                    >
                      Borrar
                    </button>
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

        <div className="p-2 mt-4">Total: ${calcularTotal()}</div>
        <div className="p-2 mt-4">
          <button
            onClick={handleCreateVenta}
            className="border p-2 text-white bg-gray-800 w-full hover:bg-gray-700"
          >
            Empezar el pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
