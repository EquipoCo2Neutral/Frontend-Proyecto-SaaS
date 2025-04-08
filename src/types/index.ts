import { z } from "zod";

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
  "correoUsuario" | "contrasenaUsuario" | "inquilinoId" | "rolId"
>;
export type RequestConfirmationCodeForm = Pick<
  AuthUsers,
  "correoUsuario" | "contrasenaUsuario" | "inquilinoId" | "rolId"
>;

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

export type Persona = z.infer<typeof personaSchema>;
