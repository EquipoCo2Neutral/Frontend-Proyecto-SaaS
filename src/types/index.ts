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
  suscripcionId: z.number(),
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


/*
Analizar el uso mas tarde (la ocupo para el TenantInfo ya que necesito la info de la suscripcion)
*/

export const inquilinosView = z.object({
  inquilinoId: z.string(),
  rutInquilino: z.number(),
  nombreInquilino: z.string(),
  direccionInquilino: z.string(),
  telefonoInquilino: z.number(),
  correoInquilino: z.string(),
  sectorE: z.string(),
  subSectorE: z.string(),
  estadoInquilino: z.boolean(),
  suscripcion: z.object({
      id: z.number(),
      diasActivo: z.number(),
      estado: z.boolean()
    }),
});
export type InquilinoView = z.infer<typeof inquilinosView>;




/*
*/