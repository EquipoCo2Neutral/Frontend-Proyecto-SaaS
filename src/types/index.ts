import { z } from "zod";

/*Adquisiciones */

const adquisicionSchema = z.object({
  idAdquisicion: z.number(),
  idTransaccion: z.number(),
  idGrupoEnergetico: z.number(),
  idEnergetico: z.number(),
  idPaisOrigen: z.number().nullable(),
  empresaOrigen: z.string().nullable(),
  porcentajeHumedad: z.number().nullable(),
  compraMercadoSpot: z.boolean().nullable(),
  idMesProceso: z.string(),
  idUnidad: z.number(),
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

const grupoEnergeticoSchema = z.object({
  idGrupoEnergetico: z.number(),
  nombreGrupoEnergetico: z.string(),
});

const energeticoSchema = z.object({
  idEnergetico: z.number(),
  nombreEnergetico: z.string(),
});

const unidadSchema = z.object({
  idUnidad: z.number(),
  nombreUnidad: z.string(),
});

const paisOrigenSchema = z.object({
  idPais: z.number(),
  nombrePais: z.string(),
}).nullable();

// Schema principal para Adquisición
export const adquisicionSchemaLista = z.object({
  idAdquisicion: z.number(),
  compraMercadoSpot: z.boolean(),
  Cantidad: z.number(),
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
  paisOrigen: paisOrigenSchema,
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
