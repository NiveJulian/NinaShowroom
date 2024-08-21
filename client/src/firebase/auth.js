import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import rutaBack from "../redux/actions/rutaBack";
import { auth } from "./firebase.config";
import store from "../redux/store";
import {
  createSeller,
  createUser,
  loginWithGoogle,
} from "../redux/actions/actions";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await fetch(`${rutaBack}/api/login/third`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
      toast.success("Ingreso exitoso, redirigiendo..");
      const { theUser } = await response.json();
      const { uid, email, displayName, photoURL } = result.user;

      const userInfo = {
        uid,
        email,
        name: displayName,
        picture: photoURL,
        rol: theUser.rol, // Agregamos el rol al userInfo
      };
      const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;

      const hashedUserInfo = CryptoJS.AES.encrypt(
        JSON.stringify(userInfo),
        secretKey
      ).toString();

      sessionStorage.setItem("user", hashedUserInfo);
      localStorage.setItem("authToken", token);

      store.dispatch(loginWithGoogle(userInfo));

      setTimeout(() => {
        if (theUser.rol === "vendedor" || theUser.rol === "admin") {
          window.location.replace("/dashboard/dashboard");
        } else {
          window.location.replace("/");
        }
      }, 2000);
    } else {
      toast.error("Error al ingresar");
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error al ingresar");
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    const response = await fetch(`${rutaBack}/api/login/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
      toast.success("Ingreso exitoso, redirigiendo..");
      const sellerData = await response.json();
      console.log(sellerData);
      let userInfo;
      if (sellerData.rol === "user") {
        userInfo = {
          uid: sellerData.uid,
          email: sellerData.email,
          name: sellerData.nombre,
          direccion: sellerData.direccion,
          provincia: sellerData.provincia,
          cp: sellerData.cp,
          rol: sellerData.rol,
        };
      } else {
        userInfo = {
          uid: sellerData.uid,
          email: sellerData.email,
          name: sellerData.nombre,
          rol: sellerData.rol,
        };
      }

      const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;

      const hashedUserInfo = CryptoJS.AES.encrypt(
        JSON.stringify(userInfo),
        secretKey
      ).toString();

      sessionStorage.setItem("user", hashedUserInfo);
      localStorage.setItem("authToken", token);

      store.dispatch(loginWithGoogle(userInfo));

      setTimeout(() => {
        if (sellerData.rol === "seller" || sellerData.rol === "admin") {
          window.location.replace("/dashboard/dashboard");
        } else {
          window.location.replace("/");
        }
      }, 2000);
    } else {
      toast.error("Error al ingresar");
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error al ingresar:", error);
    toast.error("Error al ingresar");
  }
};

export const createNewSeller = async (newSeller) => {
  try {
    const { email, nombre, password, role } = newSeller;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Despacha la acción para crear el usuario en tu backend y guardarlo en Google Sheets
    store.dispatch(createSeller(user.email, nombre, user.uid, role));

    toast.success("Usuario creado exitosamente");
  } catch (error) {
    console.log("Error al crear nuevo vendedor:", error);
    toast.error("Error al crear nuevo vendedor");
  }
};

export const createNewUser = async (newUser) => {
  try {
    const { name, state, postalCode, address, email, password, role } = newUser;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    const user = userCredential.user;

    let data = {
      uid: user.uid,
      email: user.email,
      name,
      address,
      state,
      postalCode,
      role,
    };
    // Despacha la acción para crear el usuario en tu backend y guardarlo en Google Sheets
    store.dispatch(createUser(data));

    toast.success("Usuario creado exitosamente");
  } catch (error) {
    console.log(error);
    toast.error("Error al crear nuevo usuario");
  }
};

export const doSignOut = async () => {
  try {
    // Eliminar datos de sessionStorage y localStorage
    sessionStorage.removeItem("user");
    localStorage.removeItem("authToken");

    // Cerrar la sesión con Firebase Auth
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Saliendo...");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Error");
        console.log(error);
      });
    // Redireccionar a la página de inicio de sesión u otra página
    window.location.replace("/login");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
