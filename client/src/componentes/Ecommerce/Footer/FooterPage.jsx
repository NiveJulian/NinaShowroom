import React from "react";

function FooterPage() {
  return (
    <footer className="w-full py-8 bg-tertiary text-white">
      <div className="container mx-auto px-6 flex justify-center items-center flex-col">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">NinaShowrrom</h5>
            <p className="mb-4">
              Tu tienda de confianza para todas tus necesidades.
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">Enlaces</h5>
            <ul className="mx-3 mb-4">
              <li>
                <a href="#" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tienda
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">Contacto</h5>
            <ul className="mx-3 mb-4">
              <li>
                Email:{" "}
                <a
                  href="mailto:contacto@neoshop.com"
                  className="hover:underline"
                >
                  contacto@neoshop.com
                </a>
              </li>
              <li>
                Teléfono:{" "}
                <a href="https://wa.me/2614161558" className="hover:underline">
                  +54 9 2614 16-1558
                </a>
              </li>
              <li>Dirección: Av. Bartolomé Mitre 734, M5500 Mendoza</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">Siguenos</h5>
            <ul className="flex justify-center mb-4">
              <li className="mx-3">
                <a href="#">
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/124/124010.png"
                    className="bg-white"
                    alt="Facebook"
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
              </li>
              <li className="mx-3">
                <a href="#">
                  <img
                    src="https://i.blogs.es/b4eb3e/x-linda/450_1000.jpeg"
                    alt="X"
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
              </li>
              <li className="mx-3">
                <a href="#">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png"
                    alt="Instagram"
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h5 className="uppercase mb-6 font-bold text-center">
            Formas de Pago
          </h5>
          <div className="flex justify-center mb-8">
            <img
              src="https://via.placeholder.com/64"
              alt="Visa"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="MasterCard"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="PayPal"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="Amex"
              className="mx-2"
            />
            <img
              src="https://via.placeholder.com/64"
              alt="MercadoPago"
              className="mx-2"
            />
          </div>
        </div>

        <div className="mt-8">
          <h5 className="uppercase mb-6 font-bold text-center">Newsletter</h5>
          <div className="text-center">
            <input
              type="email"
              placeholder="Tu email"
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <button className="ml-2 px-4 py-2 bg-gray-900 border border-white rounded-lg transition-colors duration-300 hover:bg-gray-700">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterPage;
