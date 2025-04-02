import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "@/api/TenantAPI";

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ["inquilinos"],
    queryFn: getTenants,
  });

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Inquilinos</h1>
        <p className="text-2xl font-light ">
          Espacio para el manejo y administracion de inquilinos
        </p>

        <nav className="my-5">
          <Link
            className="bg-green-400 hover:bg-green-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/inquilinos/create"
          >
            Nuevo Inquilino
          </Link>
        </nav>
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
                      to={``}
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
                          <Link
                            to={`/inquilinos/${Inquilino.inquilinoId}/edit`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Editar Inquilino
                          </Link>
                        </MenuItem>

                        <MenuItem>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => {}}
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
      </>
    );
}
