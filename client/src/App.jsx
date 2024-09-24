import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateUserFromSession,
} from "./redux/actions/authActions";
import { useEffect } from "react";
import Login from "./pages/dashboard/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import Sales from "./pages/dashboard/Sales";
import Support from "./pages/dashboard/Support";
import Users from "./pages/dashboard/Users";
import Error from "./pages/dashboard/Error";
import Home from "./pages/ecommerce/Home";
import Balance from "./pages/dashboard/Balance";
import CartPage from "./pages/ecommerce/CartPage";
import Register from "./pages/dashboard/Register";
import ProductDetail from "./pages/ecommerce/ProductDetail";
import AllProducts from "./pages/ecommerce/AllProducts";
import SuccessPayment from "./pages/ecommerce/Payment/SuccessPayment";
import FailurePayment from "./pages/ecommerce/Payment/FailurePayment";
import PendingPayment from "./pages/ecommerce/Payment/PendingPayment";
import HowCanBuy from "./pages/ecommerce/HowCanBuy";
import Purchase from "./pages/ecommerce/Purchase";
import PagePayment from "./pages/dashboard/PagePayment";
import { getCategories } from "./redux/actions/productActions";
import Coupons from "./pages/dashboard/Coupons";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(authenticateUserFromSession());
  }, [dispatch]);
  return (
    <div>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 1500,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/howcanbuy" element={<HowCanBuy />} />
        <Route path="/userpurchase/:id" element={<Purchase />} />
        <Route path="/product" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/failure" element={<FailurePayment />} />
        <Route path="/pending" element={<PendingPayment />} />
        {isAuth ? (
          <>
            <Route path="/dashboard/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/sales" element={<Sales />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/balance" element={<Balance />} />
            <Route path="/dashboard/support" element={<Support />} />
            <Route path="/dashboard/coupons" element={<Coupons />} />
            <Route path="/dashboard/pagepayment" element={<PagePayment />} />
          </>
        ) : (
          <Route path="/error" element={<Error />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
