// components/CrearSuscripcionModal.tsx
import React, { useState } from "react";
import { Plan } from "@/types/index"; // Ajusta el import según tu estructura

interface Props {
    isOpen: boolean;
    onClose: () => void;
    plans: Plan[];
    onSubmit: (data: { estado: boolean; diasActivo: number; planId: string }) => void;
    isLoading: boolean;
  }
  
  export default function CrearSuscripcionModal({ isOpen, onClose, plans, onSubmit, isLoading }: Props) {
    const [estado, setEstado] = useState(true);
    const [diasActivo, setDiasActivo] = useState(0);
    const [planId, setPlanId] = useState("1");
  
    if (!isOpen) return null;
  
    const handleSubmit = () => {
      onSubmit({ estado, diasActivo, planId });
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Crear nueva suscripción</h2>
  
          <div className="space-y-4">
            {/* Estado toggle */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Estado:</label>
              <input
                type="checkbox"
                checked={estado}
                onChange={(e) => setEstado(e.target.checked)}
                className="w-5 h-5 text-blue-600"
                disabled={isLoading}
              />
            </div>
  
            {/* Días activo */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Días Activo</label>
              <input
                type="number"
                min={0}
                value={diasActivo}
                onChange={(e) => setDiasActivo(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                disabled={isLoading}
              />
            </div>
  
            {/* Plan ID */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Plan</label>
              <select
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                disabled={isLoading}
              >
                {plans.map((plan) => (
                  <option key={plan.idPlan} value={plan.idPlan}>
                    {plan.nombrePlan}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Botones */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center ${
                isLoading ? "cursor-not-allowed opacity-60" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Confirmar"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }