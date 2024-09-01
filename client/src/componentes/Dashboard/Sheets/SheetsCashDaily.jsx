import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCashFlowEntry } from '../../../redux/actions/productActions';

const SheetsCashDaily = ({ cashFlow }) => {
  const dispatch = useDispatch();
  const [cajaInicial, setCajaInicial] = useState(0);
  const [cajaFinal, setCajaFinal] = useState(0);
  const [showEditCajaModal, setShowEditCajaModal] = useState(false);
  const [newCajaInicial, setNewCajaInicial] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
 
  
  
  useEffect(() => {
    // if (cashFlow.length > 0) {
    //   // Establecer la fecha seleccionada como la primera del flujo de caja si no hay ninguna seleccionada
    //   if (!selectedDate) {
    //     setSelectedDate(cashFlow[0].fecha);
    //   }
    // }
    setSelectedDate(new Date().toLocaleDateString("es-AR").slice(0, 10))
  }, []);

  const movimientosHoy = cashFlow.filter(entry => entry.fecha === selectedDate);

  const turnoMañana = movimientosHoy
  .filter(entry => entry.hora && parseInt(entry.hora.split(':')[0]) < 14)
  .sort((a, b) => new Date(`1970-01-01T${b.hora}:00Z`) - new Date(`1970-01-01T${a.hora}:00Z`));

const turnoTarde = movimientosHoy
  .filter(entry => entry.hora && parseInt(entry.hora.split(':')[0]) >= 14)
  .sort((a, b) => new Date(`1970-01-01T${b.hora}:00Z`) - new Date(`1970-01-01T${a.hora}:00Z`));

  useEffect(() => {
    // Buscar el valor más reciente de "Caja Inicial" en el arreglo cashFlow para la fecha seleccionada
    const cajaInicialEntry = cashFlow
      .filter(entry => entry.fecha === selectedDate && entry.tipo === 'Caja Inicial')
      .reduce((prev, curr) => (new Date(prev.hora) > new Date(curr.hora) ? prev : curr), { monto: 0 });
  
    setCajaInicial(cajaInicialEntry.monto || 0);
  }, [selectedDate, cashFlow]);

  useEffect(() => {
    // Calcular la caja final
    const saldoFinal = movimientosHoy.reduce((acc, entry) => {
      if (entry.tipo === 'Ingreso') {
        return acc + entry.monto;
      } else if (entry.tipo === 'Gasto') {
        return acc - entry.monto;
      } else {
        return acc; // Ignorar otros tipos como "Caja Inicial"
      }
    }, parseFloat(cajaInicial));
  
    setCajaFinal(saldoFinal);
  }, [cajaInicial, movimientosHoy]);

  const handleUpdateCajaInicial = () => {
    setCajaInicial(newCajaInicial);

    // Guardar el cambio en el backend
    dispatch(addCashFlowEntry({
      tipo: 'Caja Inicial',
      monto: newCajaInicial,
      descripcion: 'Ajuste de caja inicial',
      fecha: selectedDate,
    }));

    setShowEditCajaModal(false);
  };

  // const uniqueDates = [...new Set(cashFlow.map(entry => entry.fecha))];

  const formatDateToArgentinian = (dateString) => {
    const [year, month, day] = dateString.split('-');
    
    // Quitar el '0' delante del mes si existe
    const formattedDay = day.startsWith('0') ? day.substring(1) : day;
    const formattedMonth = month.startsWith('0') ? month.substring(1) : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleDateChange = (e) => {
    const finalDate = formatDateToArgentinian(e.target.value);
    setSelectedDate(finalDate);
  };

  return (
    <div className="p-4">
      <div>
        <label className="font-semibold">Caja Inicial:</label>
        <span className="ml-2">{cajaInicial}</span>
      </div>
      <div>
        <label className="font-semibold">Caja Final:</label>
        <span className="ml-2">{cajaFinal}</span>
      </div>

      {/* Selector de Fecha */}
      <div className="mb-4">
  <label className="font-semibold">Seleccionar Fecha:</label>
  <input
    type="date"
    className="ml-1 border border-gray-300 p-1 rounded"
    value={selectedDate}
    onChange={handleDateChange}
  />
</div>

      {/* Turno Mañana */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Turno Mañana: {selectedDate}</h2>
        <div className="border border-gray-400 p-2 mb-4">
          <div className="flex justify-between items-center"></div>
          <table className="basic mt-2 w-full">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {turnoMañana.length > 0 ? (
                turnoMañana.map((entry, index) => (
                  <tr key={index} className={entry.tipo === 'Gasto' ? 'bg-red-100' : entry.tipo === 'Ingreso' ? 'bg-green-100' : ''}>
                    <td>{entry.hora}</td>
                    <td>{entry.descripcion}</td>
                    <td>{entry.tipo}</td>
                    <td>{entry.monto}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay movimientos para este turno.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Turno Tarde */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Turno Tarde: {selectedDate}</h2>
        <div className="border border-gray-400 p-2 mb-4">
          <table className="basic mt-2 w-full">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {turnoTarde.length > 0 ? (
                turnoTarde.map((entry, index) => (
                  <tr key={index} className={entry.tipo === 'Gasto' ? 'bg-red-100' : entry.tipo === 'Ingreso' ? 'bg-green-100' : ''}>
                    <td>{entry.hora}</td>
                    <td>{entry.descripcion}</td>
                    <td>{entry.tipo}</td>
                    <td>{entry.monto}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay movimientos para este turno.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para editar caja inicial */}
      {showEditCajaModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl mb-4">Editar Caja Inicial</h3>
            <input
              type="number"
              value={newCajaInicial}
              onChange={(e) => setNewCajaInicial(parseFloat(e.target.value) || 0)}
              className="border border-gray-300 p-2 rounded mb-4"
            />
            <button onClick={handleUpdateCajaInicial} className="bg-blue-500 text-white p-2 rounded">
              Guardar
            </button>
            <button onClick={() => setShowEditCajaModal(false)} className="ml-4 bg-gray-500 text-white p-2 rounded">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Botón para abrir el modal */}
      <button onClick={() => setShowEditCajaModal(true)} className="bg-gray-800 text-white p-2 rounded mt-1">
        Editar Caja Inicial
      </button>
    </div>
  );
};

export default SheetsCashDaily;
