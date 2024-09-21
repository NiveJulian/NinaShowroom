import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageComponent = ({ imageUrls }) => {
  const images = imageUrls.split(","); // Asumiendo que las URLs vienen en formato de cadena separada por comas

  return (
    <>
      {images.map((url, index) => (
        <div key={index}>
          <LazyLoadImage
            src={url.trim()}
            alt={`Producto ${index + 1}`}
            className="w-64 h-64 object-cover object-center"
          />
        </div>
      ))}
    </>
  );
};

export default ImageComponent;
