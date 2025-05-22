import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Regiones {
  idRegion: number;
  nombre: string;
}
