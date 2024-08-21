import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../../redux/actions/actions";
import ProductCard from "./ProductCard";
import Paginate from "../Paginate/Paginate";

export default function ProductList({ allProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const dispatch = useDispatch();

  // Calcular los índices de inicio y fin de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Cambiar de página
  const page = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
      toast.success("Producto añadido al carrito");
      dispatch(addToCart(product));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  return (
    <div className="h-full mb-16 flex justify-center items-center flex-col border-t border-l border-gray-200 p-2 rounded-md">
      {currentProducts.length === 0 ? (
        <div className="text-center text-gray-600 font-bold text-2xl mt-16">
          No se encontraron resultados
        </div>
      ) : (
        <div className="max-w-screen grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              url={product.url}
              price={product.precio}
              onAddToCart={() => handleAddToCart(product)}
              isNew={false}
            />
          ))}
        </div>
      )}
      <Paginate
        productsPerPage={productsPerPage}
        totalProducts={allProducts.length}
        page={page}
        currentPage={currentPage}
      />
    </div>
  );
}
