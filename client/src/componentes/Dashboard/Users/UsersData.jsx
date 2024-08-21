import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateUser from "./CreateUser";
import { fetchUsers } from "../../../redux/actions/actions";

const UsersData = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const toggleModal = (usuario) => {
    setSelectedUser(usuario);
    setActiveForm(!activeForm);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {activeForm && (
        <CreateUser
          isOpen={activeForm}
          onClose={toggleModal}
          user={selectedUser}
        />
      )}
      <nav>
        <div className="flex justify-between items-center p-4 bgWhite">
          <div className="flex items-center">
            <button
              onClick={() => toggleModal()}
              className="p-2 border border-secondary bg-secondary text-white rounded-md hover:bg-primary hover:text-white active:translate-y-[2px] shadow-sm hover:shadow-md"
            >
              Crear nuevo vendedor
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div className="w-10">
              <img className="rounded-full" src={user.picture} alt="" />
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div className="p-4">
          <div className="bgWhite p-4 rounded-md">
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-700">
                Administrar usuarios
              </h2>
              <div>
                <div>
                  <div className="flex justify-between bg-gradient-to-tr from-primary to-secondary rounded-md py-2 px-4 text-white font-bold text-md">
                    <div>
                      <span>Nombre</span>
                    </div>
                    <div>
                      <span>Email</span>
                    </div>
                    <div>
                      <span>Rol</span>
                    </div>
                    <div>
                      <span>Fecha</span>
                    </div>
                    {/* <div>
                      <span>Edit</span>
                    </div> */}
                  </div>
                  <div>
                    {data &&
                      data?.map((usuario, i) => (
                        <div key={i} className="flex justify-between border-t text-sm text-center font-normal mt-4 space-x-4">
                          <div className="px-2 text-center flex">
                            <span>{usuario.nombre}</span>
                          </div>
                          <div>
                            <span>{usuario.email}</span>
                          </div>
                          <div className="px-2 text-center">
                            <span>{usuario.rol}</span>
                          </div>
                          <div className="px-2 text-center">
                            <span>{usuario.fecha}</span>
                          </div>
                          {/* <div className="px-2 text-center">
                            <select>
                              <option>Admin</option>
                              <option>User</option>
                            </select>
                          </div> */}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersData;
