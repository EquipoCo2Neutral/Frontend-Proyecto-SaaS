import { z } from "zod";

/* Auth & Users */

const authEquipoSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  correo: z.string().email(),
  contrasena: z.string(),
});

type AuthEquipo = z.infer<typeof authEquipoSchema>;
export type EquipoLoginForm = Pick<AuthEquipo, "correo" | "contrasena">;

/* PLAN */

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
