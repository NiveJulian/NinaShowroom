import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import { addToCart, getProductById } from "../../redux/actions/actions";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.sheets.product);
  const imgUrl = product?.url?.split(", ");

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = (product) => {
    toast.success("Producto agregado al carrito");
    dispatch(addToCart(product));
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <Navigation />
      <div className="detail-container my-4">
        <div className="detail-cont p-4 border">
          <div className="p-2 flex justify-between">
            <div className="thumbnail-container flex-col">
              {imgUrl?.length > 1 ? (
                imgUrl?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail border border-gray-300 w-36 h-36 ${
                      currentImageIndex === index ? "selected" : ""
                    } `}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))
              ) : (
                <img
                  className="w-24 h-auto object-cover border border-gray-300"
                  src={imgUrl ? imgUrl : "neoshoplogo.jpeg"}
                  alt={`Product Image ${currentImageIndex + 1}`}
                />
              )}
            </div>
            <div className="image-container">
              {imgUrl?.length > 1 && (
                <button onClick={handlePrevImage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              )}
              <img
                src={imgUrl ? imgUrl[currentImageIndex] : "ninaShowrrom.jpeg"}
                alt={`Product Image ${currentImageIndex + 1}`}
              />
              {imgUrl?.length > 1 && (
                <button onClick={handleNextImage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="info-container">
            <p className="product-date">SKU: {product ? product.sku : null}</p>
            <h1 className="product-name">{product?.Nombre}</h1>
            <p className="brand">Categoria: {product?.categoria}</p>
            <p className="product-price">${product?.precio}</p>
            <div className="product-quantity">
              <label htmlFor="quantity-select">Cantidad: </label>
              <select
                id="quantity-select"
                value={selectedQuantity}
                onChange={handleQuantityChange}
              >
                {[...Array(product?.quantity).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <span className="total-available">
                ({product?.cantidad} {"Disponible"})
              </span>
            </div>
            <div className="flex">
              <button
                onClick={() => handleAddToCart(product)}
                className="p-4 rounded-md text-white w-full shadow-md bg-secondary"
              >
                {"Agregar al carrito"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
