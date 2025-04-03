import { InquilinoView} from "@/types/index";

  interface Props {
    inquilinos: InquilinoView[];
  }

  /*Reemplazar esto por datos del backend */
  const users = [
    {
      name: "Sebastian Gallegos",
      email: "SG@Gmail.com",
      phone: "37188277"
    },
    {
      name: "Camila Rodríguez",
      email: "camila.rodriguez@example.com",
      phone: "98765432"
    },
    {
      name: "Lucas Fernández",
      email: "lucas.fernandez@example.com",
      phone: "12345678"
    },
    {
        name: "Lucas Peres",
        email: "lucas.Peres@example.com",
        phone: "12345655"
    }
  ];
  
  export default function TenantInfo({ inquilinos }: Props) {
    return (
      <div className="space-y-8">
        {inquilinos.map((inquilino) => (
          <div
            key={inquilino.inquilinoId}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col space-y-6 border border-gray-200"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold text-gray-800">{inquilino.nombreInquilino}</h2>
              <span
                className={`px-4 py-2 text-sm font-bold rounded-lg ${
                  inquilino.estadoInquilino ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}
              >
                {inquilino.estadoInquilino ? 'Activo' : 'Inactivo'}
              </span>
            </div>
  
            {/* Sección de Información General */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">RUT:</span> {inquilino.rutInquilino}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Teléfono:</span> {inquilino.telefonoInquilino}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Correo:</span> {inquilino.correoInquilino}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Dirección:</span> {inquilino.direccionInquilino}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Sector:</span> {inquilino.sectorE}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Subsector:</span> {inquilino.subSectorE}
                </p>
              </div>
            </div>
  
            {/* Sección de Suscripcion */}
            <div className="bg-gray-50 p-4 rounded-lg">

              <h3 className="text-lg font-semibold text-gray-800">Suscripción</h3>
              <div className="grid grid-cols-2 gap-6" >
                <div className="space-y-2">
                    <p className="text-gray-700">
                        <span
                            className={`px-2 py-1 text-sm font-bold rounded-lg ${
                            inquilino.suscripcion.estado ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                            }`}
                        >
                            {inquilino.suscripcion.estado ? 'Activo' : 'Inactivo'}
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold ">Dias Activo:</span> {inquilino.suscripcion.diasActivo}
                    </p>                    
                </div>
                <div className="space-y-2">
                    <select className="w-full p-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-semibold bg-white" name="plan" id="plan">
                        <option value="1" selected >Plan 1</option>
                        <option value="2">Plan 2</option>
                    </select>
                </div>

            </div>

            </div>



            <div className="">
                <div className="flex justify-between items-center">
                   <h3 className="text-lg font-semibold text-gray-800">Administradores de la Empresa</h3> 
                   <button>+</button>
                </div>

                <div className="flex space-x-4 overflow-x-auto p-4">
                    {users.map((user,index)=> (
                        <div key={index} className="relative w-64 bg-white shadow-lg rounded-2xl p-4 border border-gray-200 flex-shrink-0">
                    {/* Icono con la inicial */}
                            <div className="absolute top-2 left-2 w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold text-lg rounded-full">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            {/* Contenido */}
                            <div className="mt-8 space-y-2">
                                <p className="text-gray-700 font-semibold">{user.name}</p>
                                <p className="text-gray-500">{user.email}</p>
                                <p className="text-gray-400 text-sm">{user.phone}</p>
                            </div>
                        </div>
                    ))}                    
                </div>
            </div>
          </div>
        ))}
      </div>
    );
  }