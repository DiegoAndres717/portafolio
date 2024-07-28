"use client";
import { useState, useEffect } from "react";
import { Check, XCircle } from "lucide-react";
import { DayOfWeek, Status } from "@prisma/client";

interface Service {
  id: number;
  name: string;
}

interface Schedule {
  id: number;
  serviceId: number;
  date: string;
  dayOfWeek: DayOfWeek;
  scheduleTimes: {
    id: number;
    timeId: number;
    time: {
      id: number;
      time: string;
    };
    status: Status;
  }[];
}

const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const timesOfDay = [
  "09:00:00 am",
  "10:00:00 am",
  "11:00:00 am",
  "12:00:00 pm",
  "01:00:00 pm",
  "02:00:00 pm",
  "03:00:00 pm",
  "04:00:00 pm",
  "05:00:00 pm",
  "06:00:00 pm",
  "07:00:00 pm",
  "08:00:00 pm",
];

export default function SchedulesPage({ params }: { params: { adminHandle: string } }) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("MONDAY");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { adminHandle } = params;

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedServiceId) {
      fetchSchedules();
    }
  }, [selectedServiceId, selectedDay]);

  const fetchServices = async () => {
    const response = await fetch("/api/user/" + adminHandle + "/services");
    const data = await response.json();
    setServices(data);
  };

  const fetchSchedules = async () => {
    const response = await fetch(
      `/api/user/${adminHandle}/schedules?serviceId=${selectedServiceId}&day=${selectedDay}`
    );
    const data = await response.json();
    setSchedules(data);
  };

  const handleToggleScheduleTimeStatus = async (
    scheduleTimeId: number,
    enabled: boolean
  ) => {
    try {
      const response = await fetch(`/api/user/${adminHandle}/schedules/${scheduleTimeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: enabled ? "ACTIVE" : "INACTIVE" }),
      });

      if (response.ok) {
        fetchSchedules(); // Actualizar la lista de horarios después de la actualización
      } else {
        console.error("Error updating ScheduleTime status");
      }
    } catch (error) {
      console.error("Error updating ScheduleTime status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis horarios</h1>

      <div className="flex mb-4">
        {/* Dropdown de Servicios */}
        <div className="mr-4">
          <label
            htmlFor="service"
            className="block text-gray-700 font-bold mb-2"
          >
            Servicios:
          </label>
          <select
            id="service"
            value={selectedServiceId || ""}
            onChange={(e) => setSelectedServiceId(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar a servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown de Días */}
        <div>
          <label htmlFor="day" className="block text-gray-700 font-bold mb-2">
            Día:
          </label>
          <select
            id="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value as DayOfWeek)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar dia</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Horarios */}
      {selectedServiceId && selectedDay && (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Hora</th>
                <th className="py-3 px-6 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-light">
              {timesOfDay.map((timeOfDay) => {
                const scheduleTime = schedules
                  .flatMap((s) => s.scheduleTimes)
                  .find((st) => st.time.time === timeOfDay);

                return (
                  <tr
                    key={timeOfDay}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {timeOfDay}
                    </td>
                    <td className="py-3 px-6 text-center"> 
                      <label
                        htmlFor={`time-status-${scheduleTime?.id}-${timeOfDay}`}
                        className="relative inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`time-status-${scheduleTime?.id}-${timeOfDay}`}
                          className="sr-only peer"
                          checked={scheduleTime?.status === "ACTIVE"}
                          onChange={() =>
                            handleToggleScheduleTimeStatus(
                              scheduleTime?.id!,
                              !scheduleTime?.status ||
                                scheduleTime?.status === "INACTIVE"
                            )
                          }
                        />
                        <div
                          className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
                          peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
                          after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                          after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                        ></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
