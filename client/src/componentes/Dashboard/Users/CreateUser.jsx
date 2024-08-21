import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import validationUserForm from "./ValidationUserForm";
import { createNewSeller } from "../../../firebase/auth";

export default function CreateUser({ isOpen, onClose, user }) {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const memoizedErrors = useMemo(() => {
    return validationUserForm(formData);
  }, [formData]);

  useEffect(() => {
    setErrors(memoizedErrors);
  }, [memoizedErrors]);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        nombre: user.nombre || "",
        email: user.email || "",
        password: user.password || "",
        role: user.role || "",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(memoizedErrors).length === 0) {
      try {
        const newUser = {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };

        if (user) {
          const updatedUser = {
            id: formData.id,
            nombre: formData.nombre,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          };

          console.log("Updating user: ", updatedUser);

          // dispatch(updateUser(updatedUser));
        } else {
          await createNewSeller(newUser);
  
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
        setFormData({});
        onClose();
      } catch (error) {
        toast.error("Error creating user");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        className="bg-white h-auto text-center shadow-md p-6 rounded-xl md:w-1/2 lg:w-auto m-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <button
          onClick={onClose}
          className="text-gray-400 flex text-3xl hover:text-gray-500"
        >
          &times;
        </button>
        <div className="mt-2">
          <label htmlFor="nombre">Name</label>
          <input
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
              errors.nombre ? "border-red-500" : "border-gray-400"
            }`}
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs">{errors.nombre}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="email">Email</label>
          <input
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-400"
            }`}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="password">Password</label>
          <input
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
              errors.password ? "border-red-500" : "border-gray-400"
            }`}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${
              errors.role ? "border-red-500" : "border-gray-400"
            }`}
          >
            <option value="" disabled>
              Select a role
            </option>
            {/* <option value="admin">Admin</option> */}
            <option value="seller">Vendedor</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
        </div>
        <button
          type="submit"
          className="p-4 shadow-lg bg-blue-300 text-gray-900 rounded-md mt-2"
        >
          {user ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
