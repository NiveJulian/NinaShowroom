import React, { useEffect } from "react";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import ProductList from "../../componentes/Ecommerce/Products/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSheets,
  getCategories,
  getColors,
} from "../../redux/actions/productActions";
import WhatsAppBubble from "../../componentes/Ecommerce/Whatsapp/WhatsAppBubble";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sheets.sheetsData);
  const filterProducts = useSelector((state) => state.sheets.filterProducts);
  const condition = useSelector((state) => state.sheets.rCondition);
  const filterColors = useSelector((state) => state.sheets.filterColors);
  const searchedProducts = useSelector((state) => state.sheets.searchedProducts);
 
  

  

  useEffect(() => {
    dispatch(fetchSheets());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const renderProducts = () => {
    switch (condition) {
      case "allProducts":
        return <ProductList allProducts={products} />;
      case "filteredProducts":
        return <ProductList allProducts={filterProducts} />;
      case "filteredColor":
        return <ProductList allProducts={filterColors} />;
      case "searchedProducts":
        return <ProductList allProducts={searchedProducts} />;  
      default:
        return <ProductList allProducts={products} />;
    }
  };
  return (
    <div>
      <Navigation isCart={false} />
      <WhatsAppBubble />

      {renderProducts()}
    </div>
  );
};

export default AllProducts;
