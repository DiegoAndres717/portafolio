"use client";
import React, { useState, useEffect } from "react";
import { DateTimeFormatOptions } from "intl";
import { CalendarDays, Clock, X } from "lucide-react";
import AppointmentSkeleton from "@/components/skeletons/AppointmentSkeleton";
import { Appointment } from "@/types/types";

interface FormattedAppointment {
  comment: string;
  email: string;
  date: string | Date;
  time: string;
  serviceName: string;
  id: number;
  appointment: Appointment[];
  name: string;
}

export default function AdminAppointment({ params }: { params: { adminHandle: string } }) {
  const [appointments, setAppointments] = useState<FormattedAppointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<FormattedAppointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { adminHandle } = params;
  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch(`/api/user/${adminHandle}/appointment`);
      const data = await res.json();
      setAppointments(data);
      setIsLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleAppointmentClick = (appointment: FormattedAppointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };
  const options: DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="mx-auto p-6 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-500 mb-8">Mis citas</h1>
      {isLoading ? (
        // Mostrar skeletons mientras se cargan los datos
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, index) => (
            <AppointmentSkeleton key={index} lines={3} /> 
          ))}
        </div>
      ): (
        appointments.map((appointment) => (
        <div
          key={appointment.id}
          onClick={() => handleAppointmentClick(appointment)}
          className="bg-white rounded-lg shadow-md p-4 mb-6 cursor-pointer hover:scale-[1.01] hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="flex gap-x-1 items-center text-lg font-medium text-blue-500 bg-blue-200 p-1 rounded">
              <CalendarDays size={16} />
              {new Date(appointment.date).toLocaleDateString("es-CO", options)}
            </span>
            <span className="flex gap-x-1 items-center text-violet-700 font-medium bg-violet-400 p-1 rounded">
              <Clock size={16} />
              {appointment.time} {/* Acceso directo a la hora */}
            </span>
          </div>
          <p className="text-gray-800 mb-2">
            <span className="font-medium">{appointment.serviceName}</span>
          </p>
        </div>
      )))}
      {/* Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="relative w-[90vw] max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Información de la Cita
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  onClick={() => setShowModal(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-end gap-1">
                  <div className="flex gap-x-1 items-center text-lg font-medium text-blue-500 bg-blue-200 p-1 rounded">
                    <CalendarDays size={16} />
                    {new Date(
                      selectedAppointment.date
                    ).toLocaleDateString("es-CO", options)}
                  </div>
                  <div className="flex gap-x-1 items-center text-lg font-medium text-blue-500 bg-blue-200 p-1 rounded">
                    <Clock size={16} />
                    {selectedAppointment.time}{" "}
                    {/* Acceso directo a la hora */}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Service:</p>
                  <p className="text-gray-900">
                    {selectedAppointment.serviceName}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Name:</p>
                  <p className="text-gray-900">{selectedAppointment.name}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Email:</p>
                  <p className="text-gray-900">{selectedAppointment.email}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Comment:</p>
                  <p className="text-gray-900">{selectedAppointment.comment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}