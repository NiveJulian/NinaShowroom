import React, { useEffect } from "react";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import ProductList from "../../componentes/Ecommerce/Products/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { fetchSheets, getCategories } from "../../redux/actions/actions";
import Layout from "../../componentes/Ecommerce/Layout/Layout";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sheets.sheetsData);
  const filterProducts = useSelector((state) => state.sheets.filterProducts);
  const condition = useSelector((state) => state.sheets.rCondition);

  useEffect(() => {
    dispatch(fetchSheets());
    dispatch(getCategories());
  }, [dispatch]);

  const renderProducts = () => {
    switch (condition) {
      case "allProducts":
        return <ProductList allProducts={products} />;
      case "filteredProducts":
        return <ProductList allProducts={filterProducts} />;

      default:
        return <ProductList allProducts={products} />;
    }
  };
  return (
    <div>
      <Navigation />
      <Layout>{renderProducts()}</Layout>
    </div>
  );
};

export default AllProducts;
