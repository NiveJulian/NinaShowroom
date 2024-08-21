import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../../redux/actions/actions";

function CartItem({ product }) {
  const [cartQuantity, setCartQuantity] = useState(product?.cantidad || 1);
  const dispatch = useDispatch();

  // Función para manejar cambios en la cantidad del carrito
  const handleChangeQuantity = (event) => {
    const newCartQuantity = parseInt(event.target.value, 10);
    setCartQuantity(newCartQuantity);
    dispatch(updateCartItemQuantity(product.id, newCartQuantity));
  };

  // Función para eliminar el producto del carrito
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calcular el subtotal del producto
  const subtotal = (parseFloat(product?.precio) * cartQuantity).toFixed(2);

  const imgUrl = product?.url?.split(",")[0];
  return (
    <div className="flex items-center gap-2 border rounded-lg px-2 py-2">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={product?.nombre}
          className="w-16 h-16 object-cover rounded-full"
        />
      ) : (
        <div className="p-2 border border-gray-300 rounded-full">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{product?.nombre}</h3>
        <p className="text-gray-500">${product?.precio}</p>
      </div>
      <input
        type="number"
        value={cartQuantity}
        onChange={handleChangeQuantity}
        className="w-9 justify-center border rounded-md p-1 text-center mr-4"
        min="1"
      />
      <div className="flex-col">
        <p className="text-gray-500 text-sm">Subtotal: </p>
        <span>${subtotal}</span>
      </div>
      <button
        onClick={() => handleRemove(product.id)}
        className="text-red-500 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)] hover:text-red-400"
      >
        {/* Icono para eliminar producto */}
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
  );
}

export default CartItem;
