import { useSelector } from "react-redux";
import Cart from "../../componentes/Ecommerce/Cart/Cart";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import { useState } from "react";

const CartPage = () => {
  const products = useSelector((state) => state.cart.cartItems);
  const usuario = useSelector(state => state.auth.user)

  const calculateTotal = () => {
    const total = products.reduce((acc, product) => {
      const price = parseFloat(product.precio);
      const quantity = product.cantidad || 1;
      return acc + (isNaN(price) ? 0 : price * quantity);
    }, 0);

    return total.toFixed(2);
  };
  return (
    <div className="w-full">
      <Navigation isCart={true} />
      <Cart product={products} calcularTotal={calculateTotal} usuario={usuario}/>
    </div>
  );
};

export default CartPage;
