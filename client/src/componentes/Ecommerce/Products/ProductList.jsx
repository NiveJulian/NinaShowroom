import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../../redux/actions/actions";
import ProductCard from "./ProductCard";
import Paginate from "../Paginate/Paginate";
import Layout from "../Layout/Layout";

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

  // Función para procesar los colores
  const processColors = (colorString) => {
    return colorString
      .split(",") // Divide la cadena por comas
      .map(color => color.trim().toLowerCase()) // Elimina espacios y convierte a minúsculas
      .filter(color => color); // Elimina entradas vacías
  };

  return (
    <Layout items={currentProducts.length}>
      <div className="h-full mb-16 flex justify-center items-center flex-col p-2 rounded-md">
        {currentProducts.length === 0 ? (
          <div className="text-center text-gray-600 font-bold text-2xl mt-16">
            No se encontraron resultados
          </div>
        ) : (
          <div className="max-w-screen grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.nombre}
                url={product.url}
                price={product.precio}
                colors={processColors(product.color)} // Procesa los colores antes de pasarlos
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
    </Layout>
  );
}
