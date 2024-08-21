import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import Carrousel from "../../componentes/Ecommerce/Carrousel/Carrousel";
import { fetchSheets } from "../../redux/actions/actions";
import ProdustHome from "../../componentes/Ecommerce/Products/ProdustHome";
import Features from "../../componentes/Ecommerce/Features/Features";
import FooterPage from "../../componentes/Ecommerce/Footer/FooterPage";
import WhatsAppBubble from "../../componentes/Ecommerce/Whatsapp/WhatsAppBubble";

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
    <div className="w-full">
      <Navigation />
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
        ref={refProducts}
        className={`flex w-full justify-center items-center transition-transform duration-1000 bg-pink-100 ${
          inViewProducts
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <ProdustHome allProducts={sheetsData} />
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
