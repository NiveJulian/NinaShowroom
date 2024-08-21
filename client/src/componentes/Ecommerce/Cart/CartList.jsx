import toast from "react-hot-toast";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

export default function CartList({ cartItems, calculateTotal }) {
  const navigate = useNavigate();

  const handleContinuePurchase = () => {
    if (cartItems.length === 0) {
      toast.error("Error: carrito vacío");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="absolute w-max top-8 right-0 bg-white rounded-lg p-4 shadow-lg">
      <div
        className={`${
          cartItems.length > 4 ? "h-60 overflow-y-scroll" : "overflow-hidden"
        }`}
      >
        {cartItems.length > 0
          ? cartItems.map((product, index) => (
              <CartItem key={index} product={product} />
            ))
          : "Carrito vacio"}
      </div>
      {/* Total del carrito */}
      <div className="mt-4">
        {cartItems.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold">Total:</h3>
            <p className="text-gray-500">${calculateTotal()}</p>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={handleContinuePurchase}
          className={`border p-2 hover:text-secondary hover:border-secondary hover:shadow-lg active:translate-y-[5%] rounded-md active:shadow-xl ${
            cartItems.length === 0 ? "hidden" : ""
          }`}
        >
          Continuar Compra
        </button>
      </div>
    </div>
  );
}
