
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import { useSelector } from "react-redux";
import UsersData from "../../componentes/Dashboard/Users/UsersData";

const Users = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Layout isAuth={isAuth}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-600">Vendedores</h1>
      </div>
      <div className="mt-8 w-full">
        <UsersData />
      </div>
    </Layout>
  );
};

export default Users;
