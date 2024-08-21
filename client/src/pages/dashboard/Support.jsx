import React from "react";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import { useSelector } from "react-redux";
import SupportDevelopers from "../../componentes/Dashboard/Support/SupportDevelopers";

const Support = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Layout isAuth={isAuth}>
      <h1 className="text-xl text-gray-400">Soporte de desarrollo</h1>
      <div className="mt-8 h-screen max-md:h-full">
        <SupportDevelopers />
      </div>
    </Layout>
  );
};

export default Support;
