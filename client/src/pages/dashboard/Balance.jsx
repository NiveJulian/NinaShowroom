import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import { useEffect, useState } from "react";
import { addCashFlowEntry, getCashFlow, getSales } from "../../redux/actions/actions";
import SheetsCashFlow from "../../componentes/Dashboard/Sheets/SheetsCashFlow";
import AddCashFlowEntry from "../../componentes/CashManagment/AddCashFlowEntry";
import SheetsCashDaily from "../../componentes/Dashboard/Sheets/SheetsCashDaily";

const Balance = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [showAddCashFlowModal, setShowAddCashFlowModal] = useState(false);
  const [showEditCajaModal, setShowEditCajaModal] = useState(false);
  const [cajaInicial, setCajaInicial] = useState(100000);
  const [activeTab, setActiveTab] = useState("diaria"); // Estado para manejar las solapas
  const dispatch = useDispatch();

  const sales = useSelector((state) => state.cart.sales);
  const cashFlow = useSelector((state) => state.sheets.cashFlow);

  useEffect(() => {
    dispatch(getSales());
    dispatch(getCashFlow());
  }, [dispatch]);

  const handleAddCashFlowEntry = (entry) => {
    dispatch(addCashFlowEntry(entry));
    setShowAddCashFlowModal(false);
  };

  const toggleAddCashFlowModal = () => {
    setShowAddCashFlowModal(!showAddCashFlowModal);
  };

  const totalIngresos = cashFlow
    .filter(entry => entry.tipo === 'Ingreso')
    .reduce((acc, entry) => acc + entry.monto, 0);

  const totalGastos = cashFlow
    .filter(entry => entry.tipo === 'Gasto')
    .reduce((acc, entry) => acc + entry.monto, 0);

  const cajaFinal = cajaInicial + totalIngresos - totalGastos;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCashFlow = cashFlow.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cashFlow.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdateCajaInicial = (newCajaInicial) => {
    setCajaInicial(newCajaInicial);
    setShowEditCajaModal(false);
  };

  // Función para cambiar de solapa
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout isAuth={isAuth}>
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Balance</h1>
      </div>

      {/* Solapas para cambiar entre caja diaria y caja histórica */}
      <div className="mt-4 flex">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "diaria" ? "border-primary text-primary" : "border-transparent text-gray-500"
          }`}
          onClick={() => changeTab("diaria")}
        >
          Caja Diaria
        </button>
        <button
          className={`px-4 py-2 border-b-2 ml-2 ${
            activeTab === "historica" ? "border-primary text-primary" : "border-transparent text-gray-500"
          }`}
          onClick={() => changeTab("historica")}
        >
          Caja Histórica
        </button>
      </div>

      <div className="mt-6 h-screen">
        {activeTab === "diaria" ? (
          <>
            {/* Contenido para la solapa de Caja Diaria */}
            <div>
              <SheetsCashDaily
                cashFlow={currentCashFlow}
                cajaInicial={cajaInicial}
                cajaFinal={cajaFinal}
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={toggleAddCashFlowModal}
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Añadir Entrada
                </button>

                <button
                  onClick={() => setShowEditCajaModal(true)}
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Modificar Caja Inicial
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Contenido para la solapa de Caja Histórica */}
            <SheetsCashFlow
              cashFlow={cashFlow} // Pasar todo el flujo de caja para mostrar histórico completo
              cajaInicial={cajaInicial}
              cajaFinal={cajaFinal}
            />
          </>
        )}

        {showAddCashFlowModal && (
          <AddCashFlowEntry
            onAddCashFlowEntry={handleAddCashFlowEntry}
            onClose={toggleAddCashFlowModal}
          />
        )}

        {showEditCajaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl mb-4">Modificar Caja Inicial</h2>
              <input
                type="number"
                value={cajaInicial}
                onChange={(e) => setCajaInicial(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 w-64"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleUpdateCajaInicial(Number(cajaInicial))}
                  className="px-4 py-2 bg-pink-400 text-white rounded-md"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowEditCajaModal(false)}
                  className="px-4 py-2 ml-2 bg-gray-500 text-white rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-pink-400 text-gray-600 border border-gray-400 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 mx-1 border border-gray-400 rounded-md ${
                currentPage === number ? "bg-primary text-white" : "bg-white text-gray-600"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-pink-400 text-gray-600 border border-gray-400 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Balance;
