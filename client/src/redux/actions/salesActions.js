import toast from "react-hot-toast";
import instance from "../../api/axiosConfig";

export const GET_SALES = "GET_SALES";
export const GET_SALE_BY_ID = "GET_SALE_BY_ID";
export const GET_SALE_BY_USER_ID = "GET_SALE_BY_USER_ID";
export const CREATED_SALE = "CREATED_SALE";
export const DELETE_SALE_ROW = "DELETE_SALE_ROW";


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
      dispatch({
        type: GET_SALES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createSale = (data) => async (dispatch) => {
    try {
      const res = await instance.post(`/api/sheets/sale`, data);
  
      dispatch({
        type: CREATED_SALE,
        payload: res,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  
  export const deleteSaleRow = (rowIndex) => async (dispatch) => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await instance.delete(`/api/sheets/delete/sale/${rowIndex}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Eliminado exitosamente");
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