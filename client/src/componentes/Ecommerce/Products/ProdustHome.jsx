import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../../redux/actions/cartActions";

const ProdustHome = ({ allProducts }) => {
  const dispatch = useDispatch();
  const cartError = useSelector((state) => state.cart.cartError);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
    }
  }, [cartError]);

  const publishedProducts = allProducts?.filter(
    (product) => product.publicado === "si"
  );
  // Obtener los últimos 8 productos
  const latestProducts = publishedProducts?.slice(-8);

  return (
    <div className="max-w-screen grid grid-cols-2 mt-8 mb-8 lg:grid-cols-4 gap-2 md:gap-12">
      {latestProducts?.map((product) => (
        <FloatingProductCard
          key={product.id}
          product={product}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

const FloatingProductCard = ({ product, dispatch }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const processColors = (colorString) => {
    if (!colorString) return []; // Si colorString es undefined o vacío, retorna un array vacío.
    
    return colorString
      .split(",") // Divide la cadena por comas
      .map((color) => color.trim().toLowerCase()) // Elimina espacios y convierte a minúsculas
      .filter((color) => color); // Elimina entradas vacías
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-1000 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <ProductCard
        id={product.id}
        name={product.nombre}
        url={product.url}
        sku={product.sku}
        price={product.precio}
        quantity={product.stock}
        colors={processColors(product.color)} // Llamada a processColors
        onAddToCart={() => handleAddToCart(product, dispatch)}
        isNew={true}
      />
    </div>
  );
};

const handleAddToCart = (product, dispatch) => {
  // Lógica para añadir al carrito
  dispatch(addToCart(product));
};

export default ProdustHome;
