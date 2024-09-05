import CryptoJS from "crypto-js";
import instance from "../../api/axiosConfig";
import toast from "react-hot-toast";

export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const AUTHENTICATE_USER_FROM_SESSION = "AUTHENTICATE_USER_FROM_SESSION";
export const CREATED_SELLER = "CREATED_SELLER";
export const AUTH_SELLER = "AUTH_SELLER";
export const FETCH_USERS = "FETCH_USERS";
export const CREATED_USER = "CREATED_USER";


//USER
export const authenticationUser = (email) => async (dispatch) => {
  try {
    const response = await instance.post(`/api/user/auth/${email}`);
    if (response.status === 200) {
      dispatch({
        type: AUTH_SELLER,
        payload: response.data,
      });
      toast.success("Usuario creado y guardado");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    toast.error("Error al crear usuario");
  }
};

export const createUser = (data) => async (dispatch) => {
  console.log(data);
  try {
    const response = await instance.post(`/api/user/create`, data);
    if (response.ok) {
      dispatch({
        type: CREATED_USER,
      });
      toast.success("Usuario creado y guardado");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    toast.error("Error al crear usuario");
  }
};

export const createSeller = (email, name, uid, role) => async (dispatch) => {
  try {
    const data = { email, name, uid, role };
    const response = await instance.post(`/api/user/seller`, data);
    if (response.ok) {
      dispatch({
        type: CREATED_SELLER,
      });
      dispatch(fetchUsers());
      toast.success("Usuario creado y guardado");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    toast.error("Error al crear usuario");
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await instance.get(`/api/user/users`);
    if (response.status === 200) {
      dispatch({
        type: FETCH_USERS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.error("Error al mostrar usuario:", error);
    toast.error("Error al mostrar usuario");
  }
};


export const fetchPaymentDetails = (id) => async () => {
  try {
    const res = await instance.get(`/api/mp/payment-status/${id}`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
//VENTAS
export const createPayment = (venta) => async () => {
  try {
    const response = await instance.post("/api/mp/create-payment", venta);

    toast.loading("Redirigiendo a Mercado Pago");
    if (response.status === 200) {
      // Aquí es donde rediriges al usuario a MercadoPago
      window.location.href = response.data.redirectUrl;
    } else {
      toast.error("Error al crear el pago.");
      console.error("Error al crear el pago:", response.data.error);
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    toast.error("Error al conectar con el servidor.");
  }
};



//LOGIN
export const loginWithGoogle = (userInfo) => ({
  type: LOGIN_WITH_GOOGLE,
  payload: userInfo,
});

export const authenticateUserFromSession = () => {
  return (dispatch) => {
    const hashedUserInfo = sessionStorage.getItem("user");

    if (hashedUserInfo) {
      try {
        const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;
        const bytes = CryptoJS.AES.decrypt(hashedUserInfo, secretKey);
        const userInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        dispatch({
          type: AUTHENTICATE_USER_FROM_SESSION,
          payload: userInfo,
        });
      } catch (error) {
        console.error(
          "Error desencriptando la información del usuario:",
          error
        );
        toast.error("Error autenticando usuario");
      }
    }
  };
};




