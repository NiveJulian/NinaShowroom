import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import DisplayProductDashboard from "../../componentes/Dashboard/Products/DisplayProductDashboard";
import { useEffect } from "react";
import { fetchSheets, getCategories } from "../../redux/actions/actions";



const Dashboard = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const products = useSelector((state) => state.sheets.sheetsData);
  const filterProducts = useSelector((state) => state.sheets.filterProducts);
  const condition = useSelector ((state) => state.sheets.rCondition)

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchSheets());
    dispatch(getCategories());
  }, [dispatch]);
  
  
  const renderProducts = () => {
    switch (condition) {
      case "allProducts":
        return <DisplayProductDashboard products={products} />;
      case "filteredProducts":
        return <DisplayProductDashboard products={filterProducts} />;

      default:
        return <DisplayProductDashboard products={products} />; 
    }
  };
  
  return (
    <Layout isAuth={isAuth}>
      {/* {showCart && <Cart product={cartItems} calcularTotal={calculateTotal} onClose={toggleCart} />} */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-300">Panel de control</h1>
      </div>
      <div className="mt-5">
        {renderProducts()}
      </div>
    </Layout>
  );
};


export default Dashboard;