import { LazyLoadImage } from "react-lazy-load-image-component";

const SheetsData = ({
  data,
  toggleModal,
  toggleDeleteModal,
  toggleActiveModal,
}) => {
  return (
    <div className="border border-gray-300 p-4">
      
      <div className="overflow-x-auto custom-scroll border border-gray-300 p-2">
        <table className="basic mt-2">
          <thead>
            <tr className="border border-gray-500">
              <th>ID</th>
              <th>Categoría</th>
              <th>Nombre</th>
              <th>Color</th>
              <th>Talle</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>SKU</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center border border-gray-500">
            {data?.length > 0 ? (
              data.map((row, index) => {
                const imgUrl = row?.url?.split(", ");

                const rowClass =
                  row.cantidad === 0 ? "bg-red-500 text-white" : "";
                const rowClassWarning =
                  row.cantidad > 0 && row.cantidad < 2
                    ? "bg-yellow-100 text-gray-800"
                    : "";

                return (
                  <tr
                    key={index}
                    className={`border border-gray-600 ${rowClass} ${rowClassWarning}`}
                  >
                    <td>{row.id}</td>
                    <td>{row.categoria}</td>
                    <td>{row.nombre}</td>
                    <td>{row.color}</td>
                    <td>{row.talle}</td>
                    <td>{row.cantidad}</td>
                    <td>{row.precio}</td>
                    <td className="flex">
                      {imgUrl?.length > 1 ? (
                        imgUrl?.map((url, imgIndex) => (
                          <LazyLoadImage
                            key={imgIndex}
                            src={url}
                            alt={`Imagen ${index}-${imgIndex}`}
                            className="w-16 h-16 rounded-full mr-[-36px] object-cover mb-2"
                          />
                        ))
                      ) : (
                        <LazyLoadImage
                          src={row?.url}
                          alt={`Imagen ${row?.url}-${index}`}
                          className="w-16 h-16 rounded-full mr-[-36px] object-cover mb-2"
                        />
                      )}
                    </td>
                    <td>{row.sku}</td>
                    <td className="gap-2">
                      <button
                        title="Editar"
                        className="hover:text-green-500"
                        onClick={() => toggleModal(row)}
                      >
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l9.686-9.687Zm0 0 2.651 2.652m-4.5-.75 2.25 2.25M18 12v6.375a2.625 2.625 0 0 1-2.625 2.625H6.75A2.625 2.625 0 0 1 4.125 18V8.625A2.625 2.625 0 0 1 6.75 6h6.375"
                          />
                        </svg>
                      </button>
                      <button
                        title="Eliminar"
                        className="hover:text-red-500"
                        onClick={() => toggleDeleteModal(row.id)}
                      >
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                      {row.cantidad !== 0 ? (
                        <button
                          title="Publicar en la pagina"
                          className={`${
                            row.publicado === "si"
                              ? "text-blue-500"
                              : "text-gray-800"
                          }`}
                          onClick={() => toggleActiveModal(row.id)}
                        >
                          {row.publicado === "si" ? (
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
                                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                              />
                            </svg>
                          ) : (
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
                                d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                              />
                            </svg>
                          )}
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10">No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row my-2 gap-4">
        <div className="flex justify-center items-center p-2 border rounded-md bg-yellow-600 text-white gap-2">
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <span>Poco stock</span>
        </div>
        <div className="flex justify-center items-center p-2 border rounded-md bg-red-600 text-white gap-2">
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
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <span>Sin stock</span>
        </div>
      </div>
    </div>
  );
};

export default SheetsData;
