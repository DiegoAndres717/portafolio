"use client";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function AppointmentConfirmation() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-16 bg-blue-100">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        {/* Animación de Check */}
        {showAnimation && (
          <CheckCircle
            className="text-green-500 w-24 h-24 animate-spin"
          />
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Muchas gracias!
        </h2>
        <p className="text-gray-700 mb-6">
          Hemos recibido tu solicitud de cita. Nos pondremos en contacto contigo
          pronto para confirmar la fecha y hora.
        </p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Volver a la página principal
        </a>
      </div>
    </div>
  );
}