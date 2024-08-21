import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUserFromSession } from "./redux/actions/actions";
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

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(authenticateUserFromSession());
  }, [dispatch]);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {isAuth ? (
          <>
            <Route path="/dashboard/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/sales" element={<Sales />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/balance" element={<Balance />} />
            <Route path="/dashboard/support" element={<Support />} />
          </>
        ) : (
          <Route path="/error" element={<Error />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
