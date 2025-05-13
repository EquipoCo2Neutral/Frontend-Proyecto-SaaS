import { z } from "zod";

/*Adquisiciones */

const adquisicionSchema = z.object({
  idAdquisicion: z.number(),
  idTransaccion: z.number(),
  idGrupoEnergetico: z.number(),
  idEnergetico: z.number(),
  idPaisOrigen: z.number(),
  empresaOrigen: z.string(),
  porcentajeHumedad: z.number(),
  compraMercadoSpot: z.boolean(),
  idMesProceso: z.string(),
  idUnidad: z.number(),
  Cantidad: z.number(),
  cantidadInicial: z.number(),
  cantidadFinal: z.number(),
  poderCalorifico: z.number(),
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
