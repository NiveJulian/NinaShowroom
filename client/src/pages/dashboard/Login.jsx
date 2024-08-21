import { useDispatch } from "react-redux";
import { doSignInWithGoogle } from "../../firebase/auth";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FormLogin } from "../../componentes/Dashboard/Users/FormLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    dispatch(doSignInWithGoogle());
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-full hidden lg:block">
        <img
          src={"../initLogin.webp"}
          alt="Placeholder Image"
          className="object-fill w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2 flex justify-center gap-2 items-center flex-col">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <div className="mt-6 ml-10 mr-10 w-full">
          <FormLogin />
        </div>
        <div className="border p-0 border-gray-300 w-full mt-6"></div>
        <div className="mt-6 ml-10 mr-10 w-full">
          <button
            onClick={onGoogleSignIn}
            className="group h-12 w-full px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-primary focus:bg-pink-50 active:bg-pink-100"
          >
            <div className="relative flex items-center space-x-4 justify-center">
              <LazyLoadImage
                src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                className="absolute left-0 w-5"
                alt="google logo"
              />
              <span className="flex w-max ml-1 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                Google
              </span>
            </div>
          </button>
        </div>
        <div
          className="flex w-full mt-4
         justify-center items-center gap-2"
        >
          <span className="border border-gray-400 w-full"></span>
          <h3 className="text-sm text-gray-500 w-full text-center">
            O bien registrate
          </h3>
          <span className="border border-gray-400 w-full"></span>
        </div>
        <div className="mt-6 ml-10 mr-10 w-full">
          <button
            onClick={() => navigate("/register")}
            className="group h-12 w-full px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-primary focus:bg-pink-50 active:bg-pink-100"
          >
            <div className="relative flex items-center space-x-4 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute left-0 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>

              <span className="flex w-max ml-1 font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                Registrate
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
