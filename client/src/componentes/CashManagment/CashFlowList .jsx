const CashFlowList = ({ cashFlow }) => {
    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Listado de Flujo de Caja</h2>
        <div className="overflow-x-auto custom-scroll">
          <table className="basic mt-2">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {cashFlow.length > 0 ? (
                cashFlow.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.description}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay entradas en el flujo de caja.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default CashFlowList;
  