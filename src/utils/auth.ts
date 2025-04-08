import { jwtDecode } from "jwt-decode";

export interface TokenData {
  correoUsuario: string;
  rol: string;
  iat: number;
  exp: number;
}

// Obtener el token desde localStorage
export function getToken(): string | null {
  return localStorage.getItem("token");
}

// Decodificar el token
export function getUserFromToken(): TokenData | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenData>(token);

    // Verificar si el token ha expirado
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      localStorage.removeItem("token"); // Eliminar token expirado
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

// Verificar si el usuario es adminsaas
export function isAdminSaas(): boolean {
  const user = getUserFromToken();
  return user?.rol === "adminsaas";
}

export function isAdminInquilino(): boolean {
  const user = getUserFromToken();
  return user?.rol === "admininquilino";
}

export function isGestor(): boolean {
  const user = getUserFromToken();
  return user?.rol === "gestorenergético";
}
