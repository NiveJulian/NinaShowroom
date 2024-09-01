import React from "react";
import PurchaseProduct from "../Products/PurchaseProduct";

const UserPurchase = ({ user, sales }) => {
  return (
    <div className="w-full h-full my-4">
      <div className="flex justify-center items-center flex-col md:flex-row mt-8 mx-6 h-full">
        <div className="border rounded-md border-gray-300 p-2 w-full md:w-1/5 md:h-screen">
          {/* Información del usuario */}
          <div className="p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-clip">
              Información del Usuario
            </h2>
            <strong>Nombre:</strong>
            <p>{user.name}</p>

            <strong>Email:</strong>
            <p className="w-full"> {user.email}</p>
          </div>
        </div>
        <div className="border flex justify-between flex-col rounded-md border-gray-300 p-2 w-full h-screen">
          <div className="w-full border p-2">
            <h1 className="text-xl font-semibold text-center">Tus compras</h1>
          </div>
          <div className="w-full border h-full p-2">
            <div className="flex w-full h-full overflow-y-scroll p-4">
              <div className="flex flex-col w-full h-96 gap-2">
                {sales?.length > 0 ? (
                  sales.map((sale, index) => {
                    return <PurchaseProduct key={index} sale={sale} />;
                  })
                ) : (
                  <p>No hay compras registradas.</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full border p-2">
            <p className="text-sm mt-2 md:mt-4 animate-pulse">
              No busques moda,{" "}
              <span className="text-primary italic font-serif font-bold">
                CREA
              </span>{" "}
              tu estilo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPurchase;
