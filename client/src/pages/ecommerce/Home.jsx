import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import Carrousel from "../../componentes/Ecommerce/Carrousel/Carrousel";
import { fetchSheets } from "../../redux/actions/productActions";
import ProdustHome from "../../componentes/Ecommerce/Products/ProdustHome";
import Features from "../../componentes/Ecommerce/Features/Features";
import FooterPage from "../../componentes/Ecommerce/Footer/FooterPage";
import WhatsAppBubble from "../../componentes/Ecommerce/Whatsapp/WhatsAppBubble";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const sheetsData = useSelector((state) => state.sheets.sheetsData);
  const [refCarrousel, inViewCarrousel] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [refProducts, inViewProducts] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);

  return (
    <div className="w-full shadow-md bg-pink-100">
      <Navigation isCart={false} />
      <WhatsAppBubble />
      <div
        ref={refCarrousel}
        className={`transition-transform duration-1000 ${
          inViewCarrousel
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <Carrousel />
      </div>
      <div
        className={`relative -top-18 md:-top-28 flex w-full justify-center items-center transition-transform duration-1000 bg-pink-100`}
      >
          <ProdustHome allProducts={sheetsData} />
      </div>
      <div
        ref={refProducts}
        className={`flex w-full justify-center items-center transition-transform duration-1000 bg-pink-100`}
      >
        <Link
          className="flex flex-col justify-center items-center shadow-lg hover:bg-pink-50 hover:animate-pulse bg-gray-100 border border-gray-500 p-4 w-full rounded-lg mx-4"
          to={"https://www.instagram.com/ninashowroomza/"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
          </svg>
          <p className="font-bold text-3xl">
            @<span className="text-primary">nina</span>showroomza
          </p>
          <h2
            className="text-sm font-bold mt-2
           tracking-[1px] text-gray-700"
          >
            ⭐<span className="text-gray-500">+40mil</span> seguidores
          </h2>
          <span className="p-2 border mt-4 border-gray-400 rounded-lg shadow-md">
            Encontranos en Instagram
          </span>
        </Link>
      </div>
      <div
        className={`flex w-full justify-center items-center transition-transform duration-1000 bg-pink-100 `}
      >
        <Features />
      </div>
      <FooterPage />
    </div>
  );
};

export default Home;
