import React from 'react'

export const SendEmailStateChanged = ({data}) => {
  const { cliente, newStatus, orderNumber } = data;

  return (
    <div
      style={{
        maxWidth: "32rem",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.5rem",
        fontFamily: "Arial, sans-serif",
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
        ¡Hola {cliente.nombre}!
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#718096",
          marginTop: "0.5rem",
        }}
      >
        Queremos informarte que el estado de tu pedido ha cambiado:
      </p>

      <div style={{ marginTop: "1rem" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Número de Pedido:
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "bold",
                }}
              >
                {orderNumber}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Nuevo Estado:
              </td>
              <td
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "bold",
                  color: newStatus === "Confirmada" ? "#38a169" : "#DD6B20",
                }}
              >
                {newStatus}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#718096",
          marginTop: "1rem",
        }}
      >
        Si tienes alguna pregunta o necesitas más información, no dudes en
        contactarnos.
      </p>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <a
          href="https://wa.me/3772430213"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#25D366",
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            borderRadius: "0.5rem",
          }}
        >
          Contactar por WhatsApp
        </a>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#718096",
          marginTop: "1.5rem",
          fontSize: "0.875rem",
        }}
      >
        Gracias por confiar en nosotros.
      </p>
    </div>
  )
}

