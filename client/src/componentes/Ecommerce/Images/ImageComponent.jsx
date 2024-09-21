import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageComponent = ({ imageUrls }) => {
  const images = imageUrls.split(","); // Asumiendo que las URLs vienen en formato de cadena separada por comas

  return (
    <LazyLoadImage
      src={images[0]}
      alt={`Producto image`}
      className="w-64 h-64 object-cover"
    />
  );
};

export default ImageComponent;
