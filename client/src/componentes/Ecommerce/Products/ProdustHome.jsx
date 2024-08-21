import React from "react";
import { useInView } from "react-intersection-observer";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/actions";
import toast from "react-hot-toast";

const ProdustHome = ({ allProducts }) => {
  const dispatch = useDispatch();

  // Obtener los últimos 8 productos
  const latestProducts = allProducts?.slice(-8);

  return (
    <div className="max-w-screen grid grid-cols-1 mt-8 mb-8 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {latestProducts.map((product) => (
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
        onAddToCart={() => handleAddToCart(product, dispatch)}
        isNew={true}
      />
    </div>
  );
};

const handleAddToCart = (product, dispatch) => {
  // Lógica para añadir al carrito
  dispatch(addToCart(product));
  toast.success(`Producto ${product.nombre} añadido al carrito`);
};

export default ProdustHome;
