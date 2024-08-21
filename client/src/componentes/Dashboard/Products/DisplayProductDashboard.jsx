import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cleanCart,
  createSale,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../redux/actions/actions";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Filter from "../Filter/Filter";

const DisplayProductDashboard = ({ products }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [formaPago, setFormaPago] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, product) => {
      const precio = parseInt(product.precio);
      const quantity = product.cantidad || 1;
      return acc + (isNaN(precio) ? 0 : precio * quantity);
    }, 0);
    let recargo7;
    let totalConRecargo7;
    let recargo12;
    let totalFinal = total;
    switch (formaPago) {
      case "qr":
        totalFinal += total * 0.07;
        break;
      case "tarjetaDebito":
        totalFinal += total * 0.07;
        break;
      case "tarjetaCredito":
        recargo7 = total * 0.07;
        totalConRecargo7 = total + recargo7;
        recargo12 = totalConRecargo7 * 0.12;
        totalFinal = totalConRecargo7 + recargo12;
        break;
      default:
        break;
    }

    return totalFinal.toFixed(2);
  };

  const handleFormaPagoChange = (e) => {
    setFormaPago(e.target.value);
  };

  const handleNombreClienteChange = (e) => {
    setNombreCliente(e.target.value);
  };

  const handleCreateVenta = () => {
    const venta = {
      productos: cartItems.map((prod) => ({
        id: prod.id,
        sku: prod.sku,
        nombre: prod.nombre,
        talle: prod.talle,
        color: prod.color,
        precio: prod.precio,
        cantidad: prod.cantidad,
      })),
      total: calculateTotal(),
      formaPago,
      nombreCliente,
    };
    if (venta.formaPago === "") {
      toast.error("Falta forma de pago");
    } else if (venta.productos.length === 0) {
      toast.error("El carrito está vacío");
    } else if (venta.nombreCliente.trim() === "") {
      toast.error("Falta nombre del cliente");
    } else {
      toast.success("Venta creada exitosamente...");
      dispatch(createSale(venta));
      console.log(venta);
    }
  };

  const handleAddToCart = (product) => {
    const available = product.cantidad;

    const data = {
      id: product.id,
      categoria: product.categoria,
      nombre: product.nombre,
      color: product.color,
      talle: product.talle,
      cantidad: 1, // Empezamos con 1 porque lo vamos a agregar al carrito
      precio: product.precio,
      imagen: product.url,
      sku: product.sku,
    };

    if (available > 0) {
      toast.success("Se agregó al carrito");
      dispatch(addToCart(data));
    } else {
      toast.error("Producto sin stock");
    }
  };

  const handleQuantityChange = (index, action) => {
    const productId = cartItems[index].id;
    if (action === "increase") {
      dispatch(incrementQuantity(productId));
    } else if (action === "decrease") {
      dispatch(decrementQuantity(productId));
    }
  };

  const handleRemoveFromCart = (index) => {
    const productId = cartItems[index].id;
    dispatch(removeFromCart(productId));
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      product.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.sku.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="container mx-auto bg-white border border-gray-300 shadow-lg">
      <div className="flex lg:flex-row flex-col shadow-lg">
        {/* Productos */}
        <div className="lg:w-2/3 h-screen overflow-y-scroll shadow-lg">
          <div className="flex flex-row justify-between items-center px-4 mt-5">
            <div className="text-gray-800">
              <div className="font-bold text-xl flex gap-2 justify-center items-center">
                <img
                  src="../ninalogo.webp"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                NINA Showroom
              </div>
              <span className="text-xs">Location ID#MEND007</span>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-center mr-4">
                <div className="font-light text-gray-500"></div>
                <span className="font-semibold"></span>
              </div>
              <div>
                <Link
                  to={"/support"}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded"
                >
                  Ayuda
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-5 px-5">
            <Filter />
          </div>
          <div className="mt-5 px-5">
            <input
              type="text"
              placeholder="Buscar por nombre o SKU"
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="border p-2 rounded-md w-full border-gray-400"
            />
          </div>
          <div className="grid grid-cols-3 px-3 py-3 gap-4 mt-5 overflow-y-auto h-auto">
            {filteredProducts &&
              filteredProducts.map((product, i) => {
                const imageUrls = product.url?.split(", ");
                return (
                  <button
                    key={i}
                    onClick={() => handleAddToCart(product)}
                    className="flex border cursor-pointer shadow-md rounded-md p-2 flex-col items-center justify-center w-full mx-auto hover:shadow-xl active:shadow-lg active:translate-y-[2px]"
                  >
                    {imageUrls?.length > 1 ? (
                      <div className="flex">
                        <LazyLoadImage
                          className="object-cover w-full rounded-md h-16 xl:h-32"
                          src={imageUrls[0]}
                          alt={`${product.nombre}`}
                        />
                      </div>
                    ) : (
                      <LazyLoadImage
                        className="object-cover w-full rounded-md h-16 xl:h-32"
                        src={product.url}
                        alt={`${product.nombre}-1`}
                      />
                    )}
                    <h4 className="mt-2 text-sm font-medium text-primary">
                      {product.nombre}
                    </h4>
                    <p className="text-tertiary mt-2 text-sm">
                      ${product.precio}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
        {/* Carrito */}
        <div className="lg:w-2/5 h-screen">
          <div className="flex flex-row items-center justify-between px-5 mt-5">
            <div className="font-bold text-xl">Orden Actual</div>
            <div className="font-semibold flex gap-2">
              <span
                onClick={() => dispatch(cleanCart())}
                className="px-4 py-2 hover:text-pink-200 rounded-md bg-secondary text-white cursor-pointer"
              >
                Borrar todo
              </span>
              {/* <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-800">
                Setting
              </span> */}
            </div>
          </div>
          <div className="px-5 py-4 mt-5 overflow-y-auto h-64">
            {cartItems?.length > 0
              ? cartItems?.map((item, i) => {
                  const imgUrl = item?.imagen?.split(",");
                  return (
                    <div
                      key={i}
                      className="flex flex-row justify-between items-center mb-4"
                    >
                      <div className="flex flex-row items-center w-2/5">
                        <LazyLoadImage
                          src={imgUrl}
                          className="w-12 h-12 object-cover rounded-md"
                          alt={`${item.nombre}-${i}`}
                        />
                        <span className="ml-4 font-semibold text-sm text-primary text-center">
                          {item?.nombre}
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
                          {item?.cantidad || 1}
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
                          ${parseInt(item.precio) * item.cantidad || 1}
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
              : null}
          </div>
          {/* Formulario */}
          <div className="px-5">
            <input
              type="text"
              value={nombreCliente}
              onChange={handleNombreClienteChange}
              placeholder="Nombre del cliente"
              className="border p-2 rounded-md w-full border-gray-400 mb-4"
            />
            <select
              value={formaPago}
              onChange={handleFormaPagoChange}
              className="border p-2 rounded-md w-full border-gray-400"
            >
              <option value="">Seleccione forma de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">transferencia</option>
              <option value="qr">QR (7% recargo)</option>
              <option value="tarjetaDebito">
                Tarjeta de Débito (7% recargo)
              </option>
              <option value="tarjetaCredito">
                Tarjeta de Crédito (12% recargo)
              </option>
            </select>
          </div>
          <div className="flex flex-row justify-between items-center px-5 mt-10">
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-xl font-bold text-primary">
                ${calculateTotal()}
              </div>
            </div>
            <button
              onClick={handleCreateVenta}
              className="px-5 py-2 bg-secondary text-white rounded-md"
            >
              Crear Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProductDashboard;