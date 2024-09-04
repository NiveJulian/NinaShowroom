import React from "react";

const SaleConfirmationEmail = ({ data }) => {
  const { productos, cliente } = data;
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
        ¡Gracias por tu compra, {cliente.nombre}!
      </h1>
      <p style={{ textAlign: "center", color: "#718096", marginTop: "0.5rem" }}>
        A continuación, encontrarás los detalles de tu compra:
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
                  ${product.precio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          style={{ textAlign: "center", color: "#718096", marginTop: "0.5rem" }}
        >
          El estado de tu pedido se encuentra actualmente en:{" "}
          <strong
            style={{
              textAlign: "center",
              color: "#d98f25",
              padding: "1rem",
            }}
          >
            PENDIENTE
          </strong>
        </p>
      </div>

      <p style={{ textAlign: "center", color: "#718096", marginTop: "1rem" }}>
        Esperamos que disfrutes de tus productos. ¡Gracias por confiar en
        nosotros!
      </p>
    </div>
  );
};

export default SaleConfirmationEmail;
