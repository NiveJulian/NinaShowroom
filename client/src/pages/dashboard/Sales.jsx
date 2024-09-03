import React, { useEffect, useState } from "react";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSaleChangeState, getSaleInfo, getSales } from "../../redux/actions/salesActions";
import SheetsSales from "../../componentes/Dashboard/Sheets/SheetsSales";
import TabViewSale from "../../componentes/Dashboard/Popup/TabViewSale";
import TabDeleteSaleButton from "../../componentes/Dashboard/Popup/TabDeleteSaleButton";
import TabConfirmStateChangeSale from "../../componentes/Dashboard/Popup/TabConfirmStateChangeSale";

const Sales = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);
  const [openModalChangeState, setOpenModalChangeState] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null); // Para mantener el ID de la venta seleccionada
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
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

  // Filtrar las ventas
  const filteredSales = sales.filter((sale) => {
    const lowercasedFilter = searchTerm.toLowerCase();
    return (
      sale.id.toString().toLowerCase().includes(lowercasedFilter) ||
      sale.cliente.toLowerCase().includes(lowercasedFilter) ||
      sale.total.toString().toLowerCase().includes(lowercasedFilter) ||
      sale.fecha.toLowerCase().includes(lowercasedFilter) ||
      sale.hora.toLowerCase().includes(lowercasedFilter)
    );
  });

  // Recalcular las páginas y actualizar la vista cuando cambian las ventas filtradas o la página actual
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

  const updateVisiblePages = (pageNumber) => {
    let startPage, endPage;
    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (pageNumber === 1) {
        startPage = 1;
        endPage = 3;
      } else if (pageNumber === totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = pageNumber - 1;
        endPage = pageNumber + 1;
      }
    }
    return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
  };

  const visiblePages = updateVisiblePages(currentPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout isAuth={isAuth}>
      {openModal && (
        <TabViewSale
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          sale={sale}
          loading={isLoading}
          infoVentas={sales}
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
          buttonChange={(state) => toggleModalChangeState(selectedSaleId, state)}
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
          data={currentItems}
          onViewSale={toggleModal}
          toggleDelete={toggleDeleteModal}
          changeState={openChangeStateModal}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 mx-1 border border-gray-400 rounded-md ${
              currentPage === number ? "bg-primary text-white" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </Layout>
  );
};

export default Sales;
