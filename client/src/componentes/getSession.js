import CryptoJS from "crypto-js";

function getUserFromSessionStorage() {
  const hashedUserInfo = sessionStorage.getItem("user");

  if (hashedUserInfo) {
    const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;
    const bytes = CryptoJS.AES.decrypt(hashedUserInfo, secretKey);
    const userInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return userInfo;
  }

  return null;
}

export default getUserFromSessionStorage;
