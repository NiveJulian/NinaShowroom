import React, { useEffect, useState } from "react";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getSaleChangeState,
  getSaleInfo,
  getSales,
} from "../../redux/actions/salesActions";
import SheetsSales from "../../componentes/Dashboard/Sheets/SheetsSales";
import TabViewSale from "../../componentes/Dashboard/Popup/TabViewSale";
import TabDeleteSaleButton from "../../componentes/Dashboard/Popup/TabDeleteSaleButton";
import TabConfirmStateChangeSale from "../../componentes/Dashboard/Popup/TabConfirmStateChangeSale";

const Sales = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);
  const [openModalChangeState, setOpenModalChangeState] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const sales = useSelector((state) => state.cart.sales);
  const sale = useSelector((state) => state.cart.saleInfo);

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const toggleModal = (saleInfo) => {
    dispatch(getSaleInfo(saleInfo.id));
    setOpenModal(!openModal);
  };

  const toggleDeleteModal = (i) => setDeleteRowIndex(i);

  const toggleModalChangeState = (id, state) => {
    dispatch(getSaleChangeState(id, state));
    setOpenModalChangeState(false);
  };

  const openChangeStateModal = (id) => {
    setSelectedSaleId(id);
    setOpenModalChangeState(true);
  };

  useEffect(() => {
    if (!isEmpty(sale)) {
      setIsLoading(false);
    }
  }, [sale]);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  const filteredSales = sales.filter((sale) => sale.estadoPago !== "Anulado");
  // Filtrar las ventas
  const searchedSales  = filteredSales?.filter((sale) => {
    const lowercasedFilter = searchTerm.toLowerCase();
    return (
      sale.id.toString().toLowerCase().includes(lowercasedFilter) ||
      sale.cliente.toLowerCase().includes(lowercasedFilter) ||
      sale.total.toString().toLowerCase().includes(lowercasedFilter) ||
      sale.fecha.toLowerCase().includes(lowercasedFilter) ||
      sale.hora.toLowerCase().includes(lowercasedFilter) ||
      sale.pago.toLowerCase().includes(lowercasedFilter)
    );
  });

  return (
    <Layout isAuth={isAuth}>
      {openModal && (
        <TabViewSale
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          sale={sale}
          loading={isLoading}
        />
      )}
      {deleteRowIndex !== null && (
        <TabDeleteSaleButton
          rowIndex={deleteRowIndex}
          onClose={() => toggleDeleteModal(null)}
        />
      )}
      {openModalChangeState && (
        <TabConfirmStateChangeSale
          buttonChange={(state) =>
            toggleModalChangeState(selectedSaleId, state)
          }
          isOpen={openModalChangeState}
          onClose={() => setOpenModalChangeState(false)}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-500">Ventas</h1>
      </div>
      <div className="mt-8 h-full">
        <div className="flex flex-row justify-center items-center mb-2">
          <div className="flex border border-gray-300 rounded-md text-white bg-gray-300 p-2 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Buscar por N° venta, Cliente, Total, Fecha, Hora"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md w-full border-gray-400"
          />
        </div>
        <SheetsSales
          data={searchedSales}
          onViewSale={toggleModal}
          toggleDelete={toggleDeleteModal}
          changeState={openChangeStateModal}
        />
      </div>
    </Layout>
  );
};

export default Sales;
