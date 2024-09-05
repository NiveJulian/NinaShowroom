import React, { useState } from 'react';

const SheetsCashFlow = ({ cashFlow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'fecha', direction: 'desc' });
  const itemsPerPage = 15; // Puedes ajustar la cantidad de items por página

  // Función para convertir la fecha de dd/mm/aaaa a un formato Date válido
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  // Función para ordenar el cashFlow según la configuración de ordenamiento
  const sortedCashFlow = [...cashFlow].sort((a, b) => {
    if (sortConfig.key === 'fecha') {
      const dateA = parseDate(a.fecha);
      const dateB = parseDate(b.fecha);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortConfig.key === 'monto') {
      return sortConfig.direction === 'asc' ? a.monto - b.monto : b.monto - a.monto;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCashFlow.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedCashFlow.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-2 mb-2">
      <table className="basic border border-gray-400 w-full">
        <thead>
          <tr>
            <th onClick={() => handleSort('fecha')} className="cursor-pointer bg-gray-100 border">
              Fecha {sortConfig.key === 'fecha' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th onClick={() => handleSort('monto')} className="cursor-pointer  bg-gray-100 border">
              Monto {sortConfig.key === 'monto' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.length > 0 ? (
            currentItems.map((entry, index) => (
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
              <td colSpan="4">No hay movimientos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-primary text-white'} rounded-md`}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-primary text-white'} rounded-md`}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SheetsCashFlow;
