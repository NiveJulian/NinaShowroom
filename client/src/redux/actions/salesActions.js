import toast from "react-hot-toast";
import instance from "../../api/axiosConfig";
import {
  sendEmail,
  sendEmailChangeStateOrder,
  sendEmailOrder,
} from "./emailActions";

export const GET_SALES = "GET_SALES";
export const GET_SALE_BY_ID = "GET_SALE_BY_ID";
export const GET_SALE_BY_USER_ID = "GET_SALE_BY_USER_ID";
export const CREATED_SALE = "CREATED_SALE";
export const CREATED_SALE_DASHBOARD = "CREATED_SALE_DASHBOARD";
export const DELETE_SALE_ROW = "DELETE_SALE_ROW";
export const GET_SALE_CHANGE_STATE = "GET_SALE_CHANGE_STATE";

export const getSaleInfo = (id) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/sheets/sale/${id}`);
    dispatch({
      type: GET_SALE_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSaleChangeState = (id, state) => async (dispatch) => {
  try {
    // Primero obtenemos la información de la venta
    const saleInfoResponse = await instance.get(`/api/sheets/sale/${id}`);
    const saleInfo = saleInfoResponse.data;

    // Luego actualizamos el estado de la venta
    const res = await instance.put(
      `/api/sheets/sale/${id}/changestate/${state}`
    );
    if (res.status === 200) {
      // Después de actualizar el estado, obtenemos la información del usuario
      const userMail = saleInfo[0].correo; // Asegúrate de que esto sea correcto según tu API
      const paymentDetail = {
        orderNumber: saleInfo[0].id,
        newStatus: state,
        cliente: { nombre: saleInfo[0].cliente }, // Datos del cliente
      };

      // Enviamos el correo electrónico
      await sendEmailChangeStateOrder(userMail, paymentDetail);

      // Actualizamos la información en el store de Redux
      dispatch(getSales());
      dispatch({
        type: GET_SALE_CHANGE_STATE,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSaleByUserID = (uid) => async (dispatch) => {
  try {
    const res = await instance.get(`/api/sheets/sales/${uid}`);
    if (res.status === 200) {
      dispatch({
        type: GET_SALE_BY_USER_ID,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSales = () => async (dispatch) => {
  try {
    const res = await instance.get(`/api/sheets/sale`);
    const salesData = res.data;

    // Filtrar las ventas para que solo haya una por cada ID
    const uniqueSales = Object.values(
      salesData.reduce((acc, sale) => {
        acc[sale.id] = sale; // Si el ID ya existe, lo sobrescribe
        return acc;
      }, {})
    );

    // Invertir el orden para que la más reciente esté al principio
    const reversedSales = uniqueSales.reverse();

    dispatch({
      type: GET_SALES,
      payload: reversedSales,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSale = (data) => async (dispatch) => {
  try {
    const res = await instance.post(`/api/sheets/sale`, data);
    if (res.status === 200) {
      dispatch(getSales());

      await sendEmail(data.cliente.correo, data);
      await sendEmailOrder("niveyrojulian5@gmail.com", data);
      dispatch({
        type: CREATED_SALE,
        payload: res,
      });
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const createSaleDashboard = (data) => async (dispatch) => {
  try {
    const res = await instance.post(`/api/sheets/sale/dashboard`, data);
    if (res.status === 200) {
      dispatch(getSales());

      dispatch({
        type: CREATED_SALE_DASHBOARD,
        payload: res,
      });
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const deleteSaleRow = (rowIndex) => async (dispatch) => {
  try {
    const res = await instance.delete(`/api/sheets/delete/sale/${rowIndex}`);
    if (res.status === 200) {
      toast.success("Eliminado exitosamente");
      dispatch(getSales());

      dispatch({
        type: DELETE_SALE_ROW,
        payload: rowIndex,
      });
      dispatch(getSales());
    }
  } catch (error) {
    console.log(error);
  }
};
