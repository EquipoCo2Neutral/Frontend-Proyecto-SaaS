import { z } from "zod";

/*Adquisiciones */

const adquisicionSchema = z.object({
  idAdquisicion: z.number(),
  idTransaccion: z.string(),
  idGrupoEnergetico: z.string(),
  idEnergetico: z.string(),
  idUnidad: z.string(),
  idPaisOrigen: z.number().nullable(),
  empresaOrigen: z.string().nullable(),
  porcentajeHumedad: z.number().nullable(),
  compraMercadoSpot: z.boolean().nullable(),
  idMesProceso: z.string(),

  Cantidad: z.number(),
  cantidadInicial: z.number().nullable(),
  cantidadFinal: z.number().nullable(),
  poderCalorifico: z.number().nullable(),
});

export type Adquisiciones = z.infer<typeof adquisicionSchema>;
export type AdquisicionFormData = Pick<
  Adquisiciones,
  | "idTransaccion"
  | "idGrupoEnergetico"
  | "idEnergetico"
  | "idPaisOrigen"
  | "empresaOrigen"
  | "porcentajeHumedad"
  | "compraMercadoSpot"
  | "idMesProceso"
  | "idUnidad"
  | "Cantidad"
  | "cantidadInicial"
  | "cantidadFinal"
  | "poderCalorifico"
>;

/*Adquisiciones para listar refacotrizar y eliminar mas tarde */

// Definiciones individuales de schemas Zod para relaciones
const mesProcesoSchemaLista = z.object({
  idMesProceso: z.string().uuid(),
  estado: z.boolean(),
});

const transaccionSchema = z.object({
  idTransaccion: z.number(),
  nombreTransaccion: z.string(),
});

/*Grupo Energetico*/

const grupoEnergeticoSchema = z.object({
  idGrupoEnergetico: z.number(),
  nombreGrupoEnergetico: z.string(),
});

/*-------Fin--------*/

/*Energetico*/

const energeticoSchema = z.object({
  idEnergetico: z.number(),
  nombreEnergetico: z.string(),
  grupoEnergetico: grupoEnergeticoSchema,
});

/*-------Fin--------*/

/*Unidad*/

const unidadSchema = z.object({
  idUnidad: z.number(),
  nombreUnidad: z.string(),
  energetico: energeticoSchema,
});

/*-------Fin--------*/

/*Pais*/
const paisOrigenSchema = z
  .object({
    idPais: z.number(),
    nombrePais: z.string(),
  })
  .nullable();

/*-------Fin--------*/

// Schema principal para Adquisición
export const adquisicionSchemaLista = z.object({
  idAdquisicion: z.number(),
  compraMercadoSpot: z.boolean().nullable(),
  Cantidad: z.number().nullable(),
  cantidadInicial: z.number().nullable(),
  cantidadFinal: z.number().nullable(),
  empresaOrigen: z.string().nullable(),
  poderCalorifico: z.number().nullable(),
  porcentajeHumedad: z.number().nullable(),
  mesProceso: mesProcesoSchemaLista,
  transaccion: transaccionSchema,
  grupoEnergetico: grupoEnergeticoSchema,
  energetico: energeticoSchema,
  unidad: unidadSchema,
  paisOrigen: paisOrigenSchema.nullable(),
});
// Tipos TypeScript inferidos
export type MesProcesoLista = z.infer<typeof mesProcesoSchemaLista>;
export type Transaccion = z.infer<typeof transaccionSchema>;
export type GrupoEnergetico = z.infer<typeof grupoEnergeticoSchema>;
export type Energetico = z.infer<typeof energeticoSchema>;
export type Unidad = z.infer<typeof unidadSchema>;
export type PaisOrigen = z.infer<typeof paisOrigenSchema>;
export type AdquisicionLista = z.infer<typeof adquisicionSchemaLista>;
export type AdquisicionesLista = AdquisicionLista[];

/*-------------------*/

/*Exportacion*/

// Esquemas para las entidades relacionadas
const MesProcesoSchema = z.object({
  idMesProceso: z.string().uuid(),
  estado: z.boolean(),
});

const EnergeticoSchema = z.object({
  idEnergetico: z.number(),
  nombreEnergetico: z.string(),
});

const UnidadSchema = z.object({
  idUnidad: z.number(),
  nombreUnidad: z.string(),
});

const PaisSchema = z.object({
  idPais: z.number(),
  nombre: z.string(),
});

// Esquema para la respuesta GET
export const ExportacionGetSchema = z.object({
  idExportacion: z.number(),
  empresaDestino: z.string(),
  cantidad: z.number(),
  mesProceso: MesProcesoSchema,
  energetico: EnergeticoSchema,
  unidad: UnidadSchema,
  pais: PaisSchema,
});

// Esquema para el request POST
export const ExportacionPostSchema = z.object({
  idEnergetico: z.number(),
  idPais: z.number(),
  empresaDestino: z.string(),
  cantidad: z.number(),
  idUnidad: z.number(),
  idMesProceso: z.string().uuid(),
});

// Tipos TypeScript derivados de los esquemas Zod
export type ExportacionGet = z.infer<typeof ExportacionGetSchema>;
export type ExportacionPost = z.infer<typeof ExportacionPostSchema>;
export type ExpMesProceso = z.infer<typeof MesProcesoSchema>;
export type ExpEnergetico = z.infer<typeof EnergeticoSchema>;
export type ExpUnidad = z.infer<typeof UnidadSchema>;
export type Pais = z.infer<typeof PaisSchema>;
export type ExportacionLista = ExportacionGet[];

/*-------Fin--------*/

/*Generacion*/

//Esquema para la respuesta POST
export const GeneracionPostSchema = z.object({
  idMesProceso: z.string().uuid(),
  idTecnologia: z.string(),
  idUnidad_CGB: z.string(),
  idUnidad_Ci: z.string(),
  cantidadGeneradaBruta: z.number(),
  capacidadInstalada: z.number(),
  idUnidad_Cena: z.number().nullable(),
  idUnidad_Ce: z.number().nullable(),
  idEnergetico: z.number().nullable(),
  consumoEnergetico: z.number().nullable(),
  cantidadEnergiaNoAprovechada: z.number().nullable(),
  Observaciones: z.string().nullable(),
  Tipo: z.string().nullable(),
});

export type Generaciones = z.infer<typeof GeneracionPostSchema>;
export type GeneracionFormData = Pick<
  Generaciones,
  | "idMesProceso"
  | "idTecnologia"
  | "idUnidad_CGB"
  | "idUnidad_Ci"
  | "cantidadGeneradaBruta"
  | "capacidadInstalada"
  | "idUnidad_Cena"
  | "idUnidad_Ce"
  | "idEnergetico"
  | "consumoEnergetico"
  | "cantidadEnergiaNoAprovechada"
  | "Observaciones"
  | "Tipo"
>;

const unidadCGB = z.object({
  idUnidad: z.number(),
  nombreUnidad: z.string(),
});
const unidadCI = z.object({
  idUnidad: z.number(),
  nombreUnidad: z.string(),
});
const unidadCENA = z.object({
  idUnidad: z.number(),
  nombreUnidad: z.string(),
});
const unidadCE = z.object({
  idUnidad: z.number(),
  nombreUnidad: z.string(),
});

//Esquema para la respuesta GET
export const GeneracionGetSchema = z.object({
  idGeneracion: z.number(),
  idTecnologia: z.number(),
  unidadCGB: unidadCGB,
  unidadCI: unidadCI,
  cantidadGeneradaBruta: z.number(),
  capacidadInstalada: z.number(),
  unidadCENA: unidadCENA.nullable(),
  unidadCE: unidadCE.nullable(),
  unergetico: EnergeticoSchema.nullable(),
  consumoEnergetico: z.number().nullable(),
  cantidadEnergiaNoAprovechada: z.number().nullable(),
  Observaciones: z.string().nullable(),
  Tipo: z.string().nullable(),
  mesProceso: MesProcesoSchema,
});
export type GeneracionGet = z.infer<typeof GeneracionGetSchema>;
export type GeneracionPost = z.infer<typeof GeneracionPostSchema>;
export type GeneracionLista = GeneracionGet[];

/*-------Fin--------*/

/*Transfomracion */

const energeticoProducidoSchema = z.object({
  idEnergetico: z.number(),
  nombreEnergetico: z.string(),
});

//Esquema para la respuesta POST
export const TransformacionPostSchema = z.object({
  idEnergetico: z.number().or(z.string()),
  cantidad: z.number(),
  idUnidad: z.number().or(z.string()),
  idEnergeticoProducido: z.number().or(z.string()),
  idMesProceso: z.string().uuid(),
});

export type Transformaciones = z.infer<typeof TransformacionPostSchema>;
export type TransformacionFormData = Pick<
  Transformaciones,
  | "idMesProceso"
  | "idEnergetico"
  | "cantidad"
  | "idUnidad"
  | "idEnergeticoProducido"
>;

//Esquema para la respuesta GET
export const TransformacionGetSchema = z.object({
  idTransformacion: z.number(),
  cantidad: z.number(),
  unidad: unidadSchema,
  energetico: EnergeticoSchema,
  energeticoProducido: energeticoProducidoSchema,
  mesProceso: MesProcesoSchema,
});

export type TransformacionGet = z.infer<typeof TransformacionGetSchema>;
export type TransformacionPost = z.infer<typeof TransformacionPostSchema>;
export type TransformacionLista = TransformacionGet[];

/*-------Fin--------*/

/*Usos Finales */

//Esquema para la respuesta POST
export const UsoFinalPostSchema = z.object({
  idEnergetico: z.number().or(z.string()),
  idCategoriaUF: z.string().or(z.number()),
  idTipoUF: z.number().nullable(),
  idUnidad: z.string().or(z.number()),
  cantidad: z.number(),
  tipo: z.string().nullable(),
  detalle: z.string().nullable(),
  idMesProceso: z.string().uuid(),
});

export type UsosFinales = z.infer<typeof UsoFinalPostSchema>;
export type UFFormData = Pick<
  UsosFinales,
  | "idMesProceso"
  | "idEnergetico"
  | "idCategoriaUF"
  | "idTipoUF"
  | "idUnidad"
  | "cantidad"
  | "tipo"
  | "detalle"
>;

const categoriaUF = z.object({
  idCategoriaUF: z.number(),
  nombreCategoria: z.string(),
});
const tipoUF = z.object({
  idTipoUF: z.number(),
  nombreTipoUF: z.string(),
});

//Esquema para la respuesta GET
export const UsoFinalGetSchema = z.object({
  idUsoFinal: z.number(),
  cantidad: z.number(),
  tipo: z.string().nullable(),
  detalle: z.string().nullable(),

  energetico: EnergeticoSchema,
  categoriaUF: categoriaUF,
  tipoUF: tipoUF.nullable(),
  unidad: unidadSchema,
  mesProceso: MesProcesoSchema,
});
export type UsoFinalGet = z.infer<typeof UsoFinalGetSchema>;
export type UsoFinalPost = z.infer<typeof UsoFinalPostSchema>;
export type UsoFinalLista = UsoFinalGet[];

/*-------Fin--------*/

/*Venta Electricidad */

//Esquema para la respuesta POST

export const VentaElectricidadPostSchema = z.object({
  idDestinoVenta: z.number().or(z.string()),
  ventaMercadoSpot: z.boolean().nullable(),
  empresaDestino: z.string(),
  idRegion: z.number().nullable(),
  idSector: z.number().nullable(),
  idSubSector: z.number().nullable(),
  cantidadVendida: z.number(),
  idUnidad: z.number().or(z.string()),
  idMesProceso: z.string().uuid(),
});

export type VentaElectricidad = z.infer<typeof VentaElectricidadPostSchema>;
export type VentaElectricidadFormData = Pick<
  VentaElectricidad,
  | "idMesProceso"
  | "idDestinoVenta"
  | "ventaMercadoSpot"
  | "empresaDestino"
  | "idRegion"
  | "idSector"
  | "idSubSector"
  | "cantidadVendida"
  | "idUnidad"
>;

export const VentaElectricidadGetSchema = z.object({
  idVentaElectricidad: z.number(),
  idDestinoVenta: z.number(),
  ventaMercadoSpot: z.boolean().nullable(),
  cantidadVendida: z.string(),
  empresaDestino: z.string(),
  region: z.string().nullable(),
  sectorE: z.number().nullable(),
  subSectorE: z.number().nullable(),
  unidad: unidadSchema,
  mesProceso: MesProcesoSchema,
});

export type VentaElectricidadGet = z.infer<typeof VentaElectricidadGetSchema>;
export type VentaElectricidadPost = z.infer<typeof VentaElectricidadPostSchema>;
export type VentaElectricidadLista = VentaElectricidadGet[];

/*-------Fin--------*/

/*Venta energeticos */

//Esquema para la respuesta POST
export const VentaEnergeticosPostSchema = z.object({
  idEnergetico: z.number(),
  idRegion: z.number(),
  idSector: z.number(),
  idSubSector: z.number(),
  idUnidad: z.number(),
  cantidad: z.number(),
  idMesProceso: z.string().uuid(),
});

const region = z.object({
  idRegion: z.number(),
  nombre: z.string(),
});
const sector = z.object({
  idSector: z.number(),
  nombreSector: z.string(),
});
const subSector = z.object({
  idSubSector: z.number(),
  nombreSubSector: z.string(),
});

export const VentaEnergeticosGetSchema = z.object({
  idVentaEnergetico: z.number(),

  energetico: EnergeticoSchema,
  region: region.nullable(),
  sector: sector.nullable(),
  subSector: subSector.nullable(),
  unidad: unidadSchema,
  cantidad: z.number(),
  mesProceso: MesProcesoSchema,
});

export type VentaEnergeticosGet = z.infer<typeof VentaEnergeticosGetSchema>;
export type VentaEnergeticosPost = z.infer<typeof VentaEnergeticosPostSchema>;
export type VentaEnergeticosLista = VentaEnergeticosGet[];

/*-------Fin--------*/

/*Plantas */

const plantasSchema = z.object({
  idPlanta: z.string(),
  nombre: z.string(),
  direccion: z.string(),
  estado: z.boolean(),
  usuarioId: z.string(),
  inquilinoId: z.string(),
  comunaId: z.number(),
});

export type Plantas = z.infer<typeof plantasSchema>;
export type PlantaRegisterForm = Pick<
  Plantas,
  "nombre" | "direccion" | "estado" | "usuarioId" | "inquilinoId" | "comunaId"
>;

export const dashboardPlantasSchema = z.array(
  plantasSchema.pick({
    idPlanta: true,
    nombre: true,
    direccion: true,
    estado: true,
  })
);

/* Auth & Users */
//EQUIPO SAAS
const authEquipoSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  correo: z.string().email(),
  contrasena: z.string(),
});

export type AuthEquipo = z.infer<typeof authEquipoSchema>;
export type EquipoLoginForm = Pick<AuthEquipo, "correo" | "contrasena">;

//USUARIOS DE INQUILINOS
const authUsersSchema = z.object({
  nombre: z.string(),
  usuarioId: z.string(),
  inquilinoId: z.string(),
  correoUsuario: z.string().email(),
  contrasenaUsuario: z.string(),
  rolId: z.number(),
  token: z.string(),
  rut: z.number(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
  telefono: z.number(),
});

export type AuthUsers = z.infer<typeof authUsersSchema>;

export type UsersLoginForm = Pick<
  AuthUsers,
  "correoUsuario" | "contrasenaUsuario"
>;

export type UsersInviteForm = Pick<
  AuthUsers,
  "nombre" | "correoUsuario" | "inquilinoId" | "rolId"
>;

export type UsersRegisterForm = Pick<
  AuthUsers,
  | "correoUsuario"
  | "contrasenaUsuario"
  | "inquilinoId"
  | "nombre"
  | "rolId"
  | "rut"
  | "primerApellido"
  | "segundoApellido"
  | "telefono"
>;
export type RequestConfirmationCodeForm = Pick<AuthUsers, "correoUsuario">;
export type ForgotPasswordForm = Pick<AuthUsers, "correoUsuario">;
export type NewPasswordForm = Pick<AuthUsers, "contrasenaUsuario">;
export type ConfirmToken = Pick<AuthUsers, "token">;

/* Plan */

export const planSchema = z.object({
  idPlan: z.number(),
  nombrePlan: z.string(),
  cantidadAdministradores: z.number(),
  cantidadGestores: z.number(),
  cantidadPlantas: z.number(),
  cantidadUsuarios: z.number(),
  estadoPlan: z.boolean(),
});

export type Plan = z.infer<typeof planSchema>;

/* SUSCRIPCION */

export const suscripcionSchema = z.object({
  id: z.number(),
  estado: z.boolean(),
  diasActivo: z.number(),
  plan: planSchema,
});

export type Suscripcion = z.infer<typeof suscripcionSchema>;

/* PROCESOS */

export const procesosSchema = z.object({
  idProceso: z.string(),
  año_proceso: z.number(),
  estado: z.boolean(),
  idPlanta: z.string(),
});

export type Procesos = z.infer<typeof procesosSchema>;
export type ProcesosFormData = Pick<Procesos, "año_proceso" | "idPlanta">;

/*Meses */
export const mesesSchema = z.object({
  idMes: z.number(),
  nombre: z.string(),
});

/* MESPROCESO */
export const mesProcesoSchema = z.object({
  idMesProceso: z.string(),
  estado: z.boolean(),
  proceso: procesosSchema,
  mes: mesesSchema,
});

export type MesProceso = z.infer<typeof mesProcesoSchema>;
export type MesProcesoFormData = Pick<MesProceso, "estado" | "proceso" | "mes">;
/* INQUILINOS  */

export const inquilinosSchema = z.object({
  inquilinoId: z.string(),
  rutInquilino: z.number(),
  nombreInquilino: z.string(),
  direccionInquilino: z.string(),
  telefonoInquilino: z.number(),
  correoInquilino: z.string(),
  sectorE: z.string(),
  subSectorE: z.string(),
  estadoInquilino: z.boolean(),
  suscripcion: suscripcionSchema,
});

export type Inquilino = z.infer<typeof inquilinosSchema>;
export type InquilinoFormData = Pick<
  Inquilino,
  | "rutInquilino"
  | "nombreInquilino"
  | "direccionInquilino"
  | "telefonoInquilino"
  | "correoInquilino"
  | "sectorE"
  | "subSectorE"
  | "estadoInquilino"
>;

export type CreateInquilinoFormData = Pick<
  Inquilino,
  | "rutInquilino"
  | "nombreInquilino"
  | "direccionInquilino"
  | "telefonoInquilino"
  | "correoInquilino"
  | "sectorE"
  | "subSectorE"
>;

export const dashboardTenantsSchema = z.array(
  inquilinosSchema.pick({
    inquilinoId: true,
    rutInquilino: true,
    nombreInquilino: true,
    direccionInquilino: true,
    telefonoInquilino: true,
    correoInquilino: true,
    sectorE: true,
    subSectorE: true,
    estadoInquilino: true,
  })
);

/* Rol */

export const rolSchema = z.object({
  id: z.number(),
  rol: z.string(),
});
export type Rol = z.infer<typeof rolSchema>;

/* Usuarios */
export const usuarioSchema = z.object({
  usuarioId: z.string(),
  correoUsuario: z.string().email(),
  estadoUsuario: z.boolean(),
  confirmacionUsuario: z.boolean(),
  rol: rolSchema.optional(),
  inquilino: inquilinosSchema.optional(),
});

export type Usuario = z.infer<typeof usuarioSchema>;

/* Persona  */

/* Persona */
export const personaSchema = z.object({
  rut: z.number(),
  nombre: z.string(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
  telefono: z.number(),
  usuario: usuarioSchema,
});

export const personaRegistro = z.object({
  rut: z.number(),
  nombre: z.string(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
  telefono: z.number(),
  usuarioId: z.string(),
});

export type Persona = z.infer<typeof personaSchema>;
export type PersonaRegistro = z.infer<typeof personaRegistro>;
