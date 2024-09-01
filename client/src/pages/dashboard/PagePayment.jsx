import React, { useEffect, useState } from "react";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import PagePaymentTable from "../../componentes/Dashboard/Payment/PagePaymentTable";
import { getAllPayments } from "../../redux/actions/paymentActions";

const PagePayment = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const allPayments = useSelector((state) => state.payment.allPayments);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4, 5]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda

  useEffect(() => {
    setFilteredData(allPayments);
  }, [allPayments]);

  useEffect(() => {
    dispatch(getAllPayments());
  }, [dispatch]);

  // Filtrar datos basados en el término de búsqueda
  useEffect(() => {
    const filtered = allPayments.filter((payment) => {
      return (
        payment.ordenId.toString().includes(searchTerm) ||
        payment.pagoId.toString().includes(searchTerm) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.dni.toString().includes(searchTerm)
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, allPayments]);

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisiblePages(pageNumber);
  };

  const updateVisiblePages = (pageNumber) => {
    let startPage, endPage;
    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (pageNumber <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (pageNumber >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = pageNumber - 1;
        endPage = pageNumber + 2;
      }
    }
    setVisiblePages(
      [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i)
    );
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [totalPages]);

  return (
    <Layout isAuth={isAuth}>
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">
          Control de pagos desde la pagina
        </h1>
      </div>
      <div className="mt-8 h-screen">
        <div className="flex">
          <span className="border p-2 bg-gray-300 text-white rounded-md">
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
          </span>
          <input
            type="text"
            placeholder="Buscar por N°Orden, N°Pago, Email o DNI"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <PagePaymentTable allPayments={currentItems} />
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
      </div>
    </Layout>
  );
};

export default PagePayment;
