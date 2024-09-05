import React from "react";

const SendOrder = ({ data }) => {
  const { productos, cliente, tipoEnvio, formaPago } = data;
  return (
    <div
      style={{
        maxWidth: "32rem",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#2d3748",
        }}
      >
        ¡Felicidades por tu venta, el nombre de tu cliente es {cliente.nombre}!
      </h1>
      <p style={{ textAlign: "center", color: "#718096", marginTop: "0.5rem" }}>
        A continuación, encontrarás los detalles de tu venta:
      </p>

      <div style={{ overflowX: "auto", marginTop: "1rem" }}>
        <table
          style={{
            minWidth: "100%",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Producto
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Cantidad
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                SKU
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((product, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td
                  style={{
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {product.nombre}
                </td>
                <td
                  style={{
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {product.cantidad}
                </td>
                <td
                  style={{
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {product.sku}
                </td>
                <td
                  style={{
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  ${product.precio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ overflowX: "auto", marginTop: "1rem" }}>
        <p
          style={{ textAlign: "center", color: "#718096", marginTop: "0.5rem" }}
        >
          Aqui la informacion del pedido:
        </p>
        <table
          style={{
            minWidth: "100%",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Forma de envio
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Forma de pago
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Correo Cliente
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Direccion
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Codigo Postal
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Provincia
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Celular
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ textAlign: "center" }}>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {tipoEnvio}
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {formaPago}
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {cliente.correo}
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {cliente.direccion}
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {cliente.cp}
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {cliente.provincia}
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {cliente.celular}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ textAlign: "center", color: "#718096", marginTop: "1rem" }}>
        Esperamos que disfrutes de nuestro servicio. ¡Gracias por confiar en
        nosotros!
      </p>
    </div>
  );
};

export default SendOrder;
