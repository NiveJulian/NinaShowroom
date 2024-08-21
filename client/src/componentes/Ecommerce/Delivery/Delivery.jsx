import React from 'react';

const Delivery = ({ selectedOption, setSelectedOption }) => {
  const deliveryOptions = [
    { id: 'pactar', label: 'Pactar con Nina', cost: 'Gratis' },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='flex flex-col gap-2'>
      {deliveryOptions.map(option => (
        <div key={option.id} className='flex w-full flex-row justify-center items-center gap-2 border border-gray-400 rounded-md p-4'>
          <input
            type="checkbox"
            id={option.id}
            name="delivery"
            className='w-6 h-6 text-secondary'
            value={option.id}
            checked={selectedOption === option.id}
            onChange={handleOptionChange}
          />
          <label htmlFor={option.id}>
            {option.label} - {option.cost}
          </label>
        </div>
      ))}
      <div className='flex justify-center gap-2'>
        <h3>Método de envio:</h3>
        <p>{selectedOption ? deliveryOptions.find(option => option.id === selectedOption).label : 'Ninguno seleccionado'}</p>
      </div>
    </div>
  );
};

export default Delivery;
