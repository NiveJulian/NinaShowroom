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
  const [activeTab, setActiveTab] = useState("diaria");
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
    .reduce((acc, entry) => acc - entry.monto, 0);

  const cajaFinal = totalIngresos + totalGastos;

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout isAuth={isAuth}>
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Balance</h1>
      </div>

      <div className="mt-4 flex">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "diaria" ? "border-primary text-primary" : "border-gray-400 text-gray-500"
          }`}
          onClick={() => changeTab("diaria")}
        >
          Caja Diaria
        </button>
        <button
          className={`px-4 py-2 border-b-2 ml-2 ${
            activeTab === "historica" ? "border-primary text-primary" : "border-gray-400 text-gray-500"
          }`}
          onClick={() => changeTab("historica")}
        >
          Caja Histórica
        </button>
      </div>

      <div className="mt-2 h-screen">
        {activeTab === "diaria" ? (
          <>
            <SheetsCashDaily
              cashFlow={cashFlow}
              cajaFinal={cajaFinal}
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={toggleAddCashFlowModal}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Añadir Entrada
              </button>
            </div>
          </>
        ) : (
          <SheetsCashFlow
            cashFlow={cashFlow}
            cajaFinal={cajaFinal}
          />
        )}

        {showAddCashFlowModal && (
          <AddCashFlowEntry
            onAddCashFlowEntry={handleAddCashFlowEntry}
            onClose={toggleAddCashFlowModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default Balance;
