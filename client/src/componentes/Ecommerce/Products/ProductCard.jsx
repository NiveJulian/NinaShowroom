import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ImageComponent from "../Images/ImageComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "blue",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "blue",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const ProductCard = ({ id, name, url, sku, price, onAddToCart, isNew }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "orange",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px",
        }}
      ></div>
    ),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <ul style={{ margin: 0, padding: 0, display: "flex" }}>{dots}</ul>
      </div>
    ),
  };
  console.log(url);
  return (
    <article className="w-56 h-full rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 mb-6 border border-gray-300">
      <div>
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <Link to={`/product/${id}`}>
            {url.includes(",") ? (
              <ImageComponent imageUrls={url} />
            ) : (
              <LazyLoadImage
                src={url}
                alt={name}
                className="w-64 h-64 object-cover"
              />
            )}
          </Link>
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-2 text-sm text-slate-400">4.9</span>
          </div>

          <button
            className="absolute bottom-3 left-2 inline-flex items-center rounded-lg bg-white p-2 shadow-lg hover:shadow-lg transition-transform duration-300 transform hover:scale-110"
            // onClick={onAddToFav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`h-5 w-5`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="ml-1 text-sm text-slate-400">{}</span>
          </button>
        </div>
      </div>
      {isNew && (
        <div className="absolute top-5 right-5">
          <div className="relative">
            <div className="transform flex justify-center items-center rotate-45 rounded-t-3xl rounded-b-sm translate-x-1/2 -translate-y-1/2 w-20 bg-red-500 text-white text-center text-xs font-bold px-6 py-1 shadow-lg">
              Nuevo
            </div>
          </div>
        </div>
      )}
      <div className="mt-1 p-2">
        <h2 className="text-slate-700">{name}</h2>
        <p className="mt-1 text-sm text-slate-400">{sku}</p>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-lg font-bold text-secondary">${price}</p>

          <div
            onClick={() => onAddToCart()}
            className="flex items-center space-x-1.5 rounded-lg border border-gray-300 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <button className="text-sm text-slate-700">Agregar</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
