import React from 'react';

const SheetsCashFlow = ({ data, cashFlow, cajaInicial, cajaFinal }) => {
  
  // Ordenar el cashFlow por fecha (de la más antigua a la más reciente)
  const sortedCashFlow = [...cashFlow].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="border border-gray-400 p-2">
      <div className="overflow-x-auto custom-scroll">
        <table className="basic mt-2">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sortedCashFlow.length > 0 ? (
              sortedCashFlow.map((entry, index) => (
                <tr 
                  key={index}
                  className={entry.tipo === 'Gasto' ? 'bg-red-100' : entry.tipo === 'Ingreso' ? 'bg-green-100' : ''}
                >
                  <td>{entry.fecha}</td>
                  <td>{entry.descripcion}</td>
                  <td>{entry.tipo}</td>
                  <td>{entry.monto}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay movimientos de caja.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Caja Inicial y Caja Final debajo de la tabla con ancho ajustado */}
      <div className="mt-3 flex justify-end">
        <div className="bg-white border border-gray-400 rounded-md p-3 shadow-lg inline-block">
          <div className="text-lg font-semibold">Caja Inicial: {cajaInicial}</div>
          <div className="text-lg font-semibold">Caja Final: {cajaFinal}</div>
        </div>
      </div>
    </div>
  );
};

export default SheetsCashFlow;
