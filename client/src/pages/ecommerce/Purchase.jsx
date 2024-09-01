import React, { useEffect, useState } from "react";
import UserPurchase from "../../componentes/Ecommerce/User/UserPurchase";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSaleByUserID } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import Loader from "../../componentes/Ecommerce/Loader/Loader";
import FooterPage from "../../componentes/Ecommerce/Footer/FooterPage";

const Purchase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const sale = useSelector((state) => state.cart.saleInfo);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
       dispatch(getSaleByUserID(id));
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <Navigation />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          <UserPurchase sales={sale} user={user} />
          <FooterPage />
        </div>
      )}
    </div>
  );
};

export default Purchase;
