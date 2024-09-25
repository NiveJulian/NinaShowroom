import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StepContact from "../StepsOrders/StepContact";
import StepShipping from "../StepsOrders/StepShipping";
import StepPayment from "../StepsOrders/StepPayment";
import ProgressSteps from "../StepsOrders/ProgressSteps";
import colorMap from "../../Colors/colorsMap";
import { createSale } from "../../../redux/actions/salesActions";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../redux/actions/cartActions";
import { createPayment } from "../../../redux/actions/authActions";
import instance from "../../../api/axiosConfig";

const processColors = (colors) => {
  return colors
    ? colors.split(",").map((color) => color.trim().toLowerCase())
    : [];
};

const Cart = ({ product, calcularTotal, usuario }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedColors, setSelectedColors] = useState({});
  const [formaPago, setFormaPago] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [totalVenta, setTotalVenta] = useState(0);
  const [descuentoType, setDescuentoType] = useState("");
  const [descuentoValue, setDescuentoValue] = useState(0);
  const [formCliente, setFormCliente] = useState({
    nombre: usuario.name || "",
    correo: usuario.email || "",
    provincia: usuario.provincia || "",
    direccion: usuario.direccion || "",
    cp: usuario.cp || "",
    celular: "",
  });

  useEffect(() => {
    const initialColors = {};
    product.forEach((prod) => {
      if (prod.color) {
        initialColors[prod.id] = prod.color; // Asigna el color preseleccionado si existe
      }
    });
    setSelectedColors(initialColors);
  }, [product]);

  const handleColorSelection = (productId, color) => {
    setSelectedColors((prevState) => ({
      ...prevState,
      [productId]: color,
    }));
  };

  const validateColorSelection = () => {
    return product.every((prod) => selectedColors[prod.id]);
  };

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

  const handleCouponChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await instance.post("/api/coupon/validate-coupon", {
        productos: product, // Asegúrate de pasar los productos correctos
        codigoDescuento: discountCode,
      });
      console.log(response);
      const { total, descuento, message, type, value, isValid } = response.data;

      if (isValid) {
        setDiscountAmount(descuento);
        setIsCouponValid(true);
        setDescuentoType(type);
        setDescuentoValue(value);
        toast.success(message);
        setTotalVenta(total);
      } else {
        setDiscountAmount(0);
        setIsCouponValid(false);
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error al aplicar el cupón");
    }
  };

  const calcularTotalConDescuento = () => {
    const total = calcularTotal();
    return isCouponValid ? total - discountAmount : total;
  };

  const generarMensajeWhatsApp = (venta) => {
    const productos = venta.productos
      .map(
        (prod) =>
          `Producto: ${prod.nombre} - Cantidad: ${prod.cantidad} - SKU: ${prod.sku} - Color: ${prod.color} -  Precio: $${prod.precio}`
      )
      .join("\n");
    const mensaje = `*Ticket de Venta*\n\nCliente: ${venta.cliente.nombre}\nDirección: ${venta.cliente.direccion}, ${venta.cliente.provincia}, CP: ${venta.cliente.cp}\nMétodo de Envío: ${venta.tipoEnvio}\nForma de Pago: ${venta.formaPago}\n\n${productos}\n\nTotal: $${venta.total}`;

    // Generar enlace para WhatsApp
    const numeroWhatsapp = "2614161558"; // Cambia este número por el número del vendedor
    const enlace = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(
      mensaje
    )}`;
    return enlace;
  };

  const handleCreateVenta = () => {
    if (!validateColorSelection()) {
      toast.error("Debes seleccionar un color para cada producto.");
      return;
    }

    const venta = {
      productos: product.map((prod) => ({
        id: prod.id,
        sku: prod.sku,
        nombre: prod.nombre,
        talle: prod.talle,
        color: selectedColors[prod.id],
        precio: prod.precio,
        cantidad: prod.cantidad,
      })),
      total: calcularTotalConDescuento(), // Total con descuento aplicado
      formaPago,
      cliente: formCliente,
      tipoEnvio: selectedDeliveryMethod,
      medio: "Página",
      descuento: {
        type: descuentoType,
        value: descuentoValue,
      },
      descuentoAplicado: discountAmount,
      codigoDescuento: discountCode,
      isCouponValid: isCouponValid, // Agregar el estado del cupón
    };

    if (venta.formaPago === "") {
      toast.error("Falta forma de pago");
    } else if (venta.productos.length === 0) {
      toast.error("El carrito está vacío");
    } else if (venta.cliente.nombre === "") {
      toast.error("Falta tu nombre :(");
    } else {
      setStep(4);
      if (venta.formaPago === "Efectivo") {
        toast.success("Muchas gracias por elegirnos...");
        dispatch(createSale(venta));
        const enlaceWhatsApp = generarMensajeWhatsApp(venta);
        window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
        dispatch(cleanCart());
      } else if (venta.formaPago === "Mercadopago") {
        toast.success("Muchas gracias por elegirnos...");
        dispatch(createSale(venta));
        dispatch(createPayment(venta));
        dispatch(cleanCart());
      }
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

  const toggleCouponInput = () => {
    setShowCouponInput((prev) => !prev);
  };

  return (
    <div className="bg-pink-200 border border-gray-300 shadow-lg">
      <div className="flex lg:flex-row flex-col shadow-lg">
        <div className="lg:w-2/3 bg-gray-50 lg:h-full m-1 text-center shadow-md p-6 rounded-xl flex flex-col">
          <div className="flex justify-between">
            <button
              className="relative flex gap-2 p-2 active:translate-y-[1px]"
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
            <div className="relative">
              <LazyLoadImage
                src="Protegido-MercadoPago.webp"
                className="w-24 h-24"
              />
            </div>
          </div>
          <div className="mt-2">
            <ProgressSteps currentStep={step - 1} />
            {/* Código de cupón */}
            <span className="ml-2 text-sm font-medium">
              {showCouponInput ? "Ocultar" : "¿Ya tenes un cupon?"}
            </span>
            <div className="flex justify-center items-center my-4 gap-2">
              <input
                type="checkbox"
                id="couponToggle"
                checked={showCouponInput}
                onChange={toggleCouponInput}
                className="hidden"
              />
              <label
                htmlFor="couponToggle"
                className={`cursor-pointer flex items-center rounded-full w-12 h-6 p-1 transition ${showCouponInput ? "bg-gray-200": "bg-gray-50 border border-gray-300"}`}
              >
                <span
                  className={`w-5 h-5 rounded-full shadow-md transform transition ${
                    showCouponInput
                      ? "translate-x-6 bg-primary"
                      : "translate-x-0 bg-secondary"
                  }`}
                />
              </label>
            </div>

            {/* Mostrar input de cupón si el switch está activo */}
            {showCouponInput && (
              <div className="flex flex-col mt-4 transition duration-100 ease-in">
                <input
                  type="text"
                  placeholder="Ingresa el código de descuento"
                  value={discountCode}
                  onChange={handleCouponChange}
                  className="border p-2 rounded-md w-full border-gray-400"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="mt-2 bg-secondary text-white px-4 py-2 rounded-md"
                >
                  Aplicar Cupón
                </button>
                {isCouponValid && (
                  <div className="text-green-600 mb-4">
                    ¡Cupón aplicado! Descuento: ${discountAmount}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-4">
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
                product={product}
                usuario={usuario}
              />
            )}
          </div>
        </div>
        <div className="lg:w-1/3 bg-gray-50 lg:h-full opacity-95 text-center shadow-md p-2 rounded-xl m-1 h-full flex flex-col justify-between">
          <h1 className="text-xl font-bold flex-1">Carrito</h1>
          <div
            className={`border border-gray-400 rounded-md p-2 mt-4 flex h-full flex-col justify-center items-center w-full ${
              product.length > 1
                ? "overflow-y-scroll"
                : "flex justify-center items-center"
            }`}
          >
            {product?.length > 0 ? (
              product?.map((prod, i) => {
                const imgUrl = prod?.url?.split(",")[0];
                const colorsArray = processColors(prod?.color);

                return (
                  <div
                    key={i}
                    className="flex flex-row w-full justify-between border border-gray-500 bg-gray-100 p-2 rounded-md items-center mb-4"
                  >
                    <div className="flex justify-between items-center w-2/5">
                      <LazyLoadImage
                        src={imgUrl}
                        className="w-16 h-16 object-cover rounded-full border border-gray-500 bg-gray-100"
                        alt={`${prod?.nombre}-${i}`}
                      />
                      <div className="flex flex-col justify-center items-center">
                        <span className="ml-4 font-semibold text-sm text-primary text-center">
                          {prod?.nombre}
                        </span>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {colorsArray.map((color, index) => (
                            <button
                              key={index}
                              style={{
                                backgroundColor:
                                  colorMap[color.toLowerCase()] || "#CCCCCC",
                              }}
                              className={`w-6 h-6 rounded-full border border-gray-300 ${
                                selectedColors[prod.id] === color
                                  ? "ring-2 ring-primary"
                                  : ""
                              }`}
                              aria-label={`Seleccionar color ${color}`}
                              onClick={() =>
                                handleColorSelection(prod.id, color)
                              }
                            />
                          ))}
                        </div>
                      </div>
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
              <div className="flex flex-col justify-center items-center text-primary">
                <p className="font-semibold text-xl">Tu carrito está vacío.</p>
                <p className="text-md mt-2">Agrega productos para comenzar.</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold mt-4">
              Total: ${calcularTotalConDescuento()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
