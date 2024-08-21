import React, { useState, useEffect } from "react";

const colors = ["bg-pink-500", "bg-secondary", "bg-tertiary"];

const CarrouselHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[500px]">
      <div className={`w-full h-full ${colors[currentIndex]} flex justify-center items-center transition duration-500`}>
        <h1 className="text-7xl text-gray-50 italic text-center">Ninashowrrom</h1>
      </div>
    </div>
  );
};

export default CarrouselHome;
