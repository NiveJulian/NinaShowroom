import { useSelector } from "react-redux";
import React from "react";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import CouponsList from "../../componentes/Coupons/CouponList";

const Coupons = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Layout isAuth={isAuth}>
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Cupones</h1>
      </div>
      <div className="mt-8">
        <CouponsList />
      </div>
    </Layout>
  );
};

export default Coupons;
