import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTenat, getTenants } from "@/api/TenantAPI";
import { toast } from "react-toastify";
import AddTenatModal from "@/views/Inquilinos/AddTenantModal";
import EditTenantModal from "@/views/Inquilinos/EditTenantModal";

export default function DashboardView() {
  const navigate = useNavigate();

  // Estado para manejar el modal de edición
  const [inquilinoIdSeleccionado, setInquilinoIdSeleccionado] = useState<
    string | null
  >(null);

  const { data, isLoading } = useQuery({
    queryKey: ["inquilinos"],
    queryFn: getTenants,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTenat,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["inquilinos"] });
    },
  });

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black">Inquilinos</h1>
            <p className="text-2xl font-light">
              Espacio para el manejo y administración de inquilinos
            </p>
          </div>
          <div>
            <div className="relative group">
              <button
                className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg hover:shadow-xl text-white text-3xl font-bold focus:outline-none focus:ring-4 focus:ring-red-300"
                onClick={() => navigate(location.pathname + "?newTenant=true")}
              >
                +
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                Agregar inquilino
              </span>
            </div>
          </div>
        </div>

        {data.length ? (
          <ul
            role="list"
            className=" border border-gray-100 mt-10  shadow-lg space-y-6 w-5/6 mx-auto "
          >
            {data.map((Inquilino) => (
              <li
                key={Inquilino.inquilinoId}
                className="flex justify-between gap-x-6 px-5 py-10 bg-white shadow-md rounded-lg "
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <Link
                      to={`/inquilinos/${Inquilino.inquilinoId}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {Inquilino.nombreInquilino}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Correo: {Inquilino.correoInquilino}
                    </p>
                    {Inquilino.estadoInquilino === true ? (
                      <p className="text-sm text-gray-400">
                        Estado:<span className="text-green-500">Activo</span>
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">
                        Estado:
                        <span className="text-red-500 font-bold">
                          {" "}
                          Inactivo
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </MenuButton>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                          <Link
                            to={``}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Detalle Inquilino
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <button
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            onClick={() =>
                              setInquilinoIdSeleccionado(Inquilino.inquilinoId)
                            }
                          >
                            Editar Inquilino
                          </button>
                        </MenuItem>

                        <MenuItem>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => mutate(Inquilino.inquilinoId)}
                          >
                            Eliminar Inquilino
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No hay inquilinos actualmente {""}
            <Link className="text-orange-500" to="/inquilinos/create">
              Agregar Inquilinos
            </Link>
          </p>
        )}
        <AddTenatModal />

        {/* Renderizar el modal solo si hay un inquilino seleccionado */}
        {inquilinoIdSeleccionado && (
          <EditTenantModal
            inquilinoId={inquilinoIdSeleccionado}
            onClose={() => setInquilinoIdSeleccionado(null)}
          />
        )}
      </>
    );
}
