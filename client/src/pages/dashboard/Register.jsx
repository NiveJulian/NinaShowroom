// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FormRegister } from "../../componentes/Dashboard/Users/FormRegister";

export default function Register() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-1/2 hidden lg:inline-flex h-full text-white">
        <div className="w-[550px] shadow-md shadow-gray-400 h-full bg-secondary px-10 flex flex-col gap-6 justify-center">
          <div className="flex flex-row justify-center items-center gap-2 border-b">
            <div className="mb-2">
              <Link to="/">
                <img
                  src={"ninalogo.webp"}
                  alt="logoImg"
                  className="w-20 h-20 rounded-full mt-4 border border-gray-400 p-1 hover:animate-pulse"
                />
              </Link>
            </div>
            <div className="flex flex-col">
              <h1 className="font-titleFont text-2xl font-bold">Registrate</h1>
              <p className="text-base">
                Crea una cuenta para disfrutar de todos los beneficios
              </p>
            </div>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Inicio rápido
              </span>
              <br />
              Regístrate y comienza a comprar en minutos.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Acceso a todos los servicios
              </span>
              <br />
              Disfruta de todos los servicios que ofrecemos.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Confiado por miles
              </span>
              <br />
              Únete a una comunidad de clientes satisfechos.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Historial de compras
              </span>
              <br />
              Accede a tus compras anteriores fácilmente.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1"></span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Ofertas y descuentos exclusivos
              </span>
              <br />
              Recibe promociones y descuentos solo para miembros.
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 mb-6">
            <Link to="/">
              <p className="text-sm font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
                © 2024 Nina.
              </p>
            </Link>
            <p className="text-sm font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
              Términos
            </p>
            <p className="text-sm font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
              Privacidad
            </p>
            <p className="text-sm font-semibold text-gray-300 hover:text-secondary cursor-pointer duration-300">
              Seguridad
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
        <FormRegister />
      </div>
    </div>
  );
}
