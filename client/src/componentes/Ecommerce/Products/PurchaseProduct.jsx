const PurchaseProduct = ({ sale }) => {
  console.log(sale);

  return (
    <div
      className={`flex items-center gap-4 border rounded-lg p-4 w-full ${
        sale.status === "Confirmada"
          ? "border-green-500"
          : sale.status === "Pendiente"
          ? "border-yellow-500"
          : sale.status === "Anulado"
          ? "hidden"
          : sale.status === "En proceso"
          ? "border-orange-500"
          : ""
      }`}
    >
      <img
        src={sale?.product?.url.split(",")[0]}
        alt={`${sale?.product?.nombre}`}
        width={80}
        height={80}
        className="rounded-md"
        style={{ aspectRatio: "80/80", objectFit: "cover" }}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{sale?.product?.nombre}</h3>
        <p className="text-sm text-muted-foreground">
          Cantidad: {sale?.quantity}
        </p>
        <p className="text-sm text-muted-foreground">Fecha: {sale?.date}</p>
      </div>
      <div className="text-right flex flex-col gap-2">
        <p className="text-sm border border-gray-300 rounded-md p-1 text-center">
          {sale?.time}
        </p>
        <p
          className={`text-sm border border-gray-300 rounded-md p-1 text-center ${
            sale.status === "Confirmada"
              ? "border-green-500"
              : sale.status === "Pendiente"
              ? "border-yellow-500"
              : sale.status === "Anulado"
              ? "hidden"
              : sale.status === "En proceso"
              ? "border-orange-500"
              : ""
          }`}
        >
          {sale?.status}
        </p>
        <p className="text-lg font-semibold">${sale?.totalPrice}</p>
      </div>
    </div>
  );
};

export default PurchaseProduct;
