const authThird = async (decodedToken) => {
  try {
    const { uid, email, name, picture } = decodedToken;

    return {
      uid,
      email,
      name,
      picture,
      isAuth: true,
    };
  } catch (error) {
    console.log("error: ", error, "decodedToken: ", decodedToken);
    throw new Error(error.message);
  }
};

module.exports = { authThird };
