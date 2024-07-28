'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DayOfWeek, Schedule, Service } from "@prisma/client";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

interface FormattedSchedule {
  scheduleTimes: any;
  dayOfWeek: number;
  serviceId: number;
  scheduleId: string;
  date: string;
  times: {
    timeId: number;
    time: string;
  }[];
}
const daysOfWeek: DayOfWeek[] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];
export default function Appointment({ adminHandle }: { adminHandle: string }) {
  const [services, setServices] = useState<Service[]>([]);
  const [schedules, setSchedules] = useState<FormattedSchedule[]>([]); 
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null); 
  const [timeId, setTimeId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const route = useRouter();
 

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch(`/api/user/${adminHandle}/services`);
      const data = await res.json();
      setServices(data);
    };

    const fetchSchedules = async () => {
      if (serviceId && date) {
       // Obtener el día de la semana a partir de la fecha
       const dayOfWeek = daysOfWeek[date.getDay()] as DayOfWeek;
        const response = await fetch(
          `/api/user/${adminHandle}/schedules/all?serviceId=${serviceId}&day=${dayOfWeek}&date=${date.toISOString().slice(0, 10)}` 
        );
        const data = await response.json();
        
        setSchedules(data);
        setSelectedScheduleId(data[0].scheduleId); 
      }
    };

    fetchServices();
    fetchSchedules();
    // Actualizar horarios al cambiar el servicio o la fecha
    const updateSchedules = () => {
      if (serviceId && date) {
        fetchSchedules(); 
      }
    };

    // Actualizar horarios al cambiar el servicio o la fecha
    const interval = setInterval(updateSchedules, 60000); 
    return () => clearInterval(interval);
  }, [date, serviceId]);
  
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceId = Number(e.target.value);
    setServiceId(selectedServiceId);
    setDate(new Date());
    setTimeId(null);
    setSelectedScheduleId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!serviceId || !date || !selectedScheduleId || !timeId) {
      toast.error('Por favor, completa todos los campos');
      return;
    }
    try {
      const response = await fetch(`/api/user/${adminHandle}/appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          serviceId, 
          scheduleId: selectedScheduleId,
          timeId: Number(timeId),
          email,
          name,
          comment,
          dayOfWeek: daysOfWeek[date.getDay()] as DayOfWeek,
          date: date.toLocaleDateString('en-CO', { day: 'numeric', month: 'numeric', year: 'numeric' }),
        })
      });
      
      if (response.ok) {
        // Appointment created successfully
        toast.success('Cita creada correctamente');
        setServiceId(null);
        setDate(new Date());
        setTimeId(null);
        setSelectedScheduleId(null);
        setComment("");
        setEmail("");
        setName("");
        route.push(`/${adminHandle}/muchas-gracias`);
      } else {
        const errorData = await response.json(); 
        toast.error(errorData.message || 'Error al crear la cita');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };  

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Exclude weekends (0: Sunday, 6: Saturday)
  };
  
  const handleDateChange = (date: Date | null) => {
    setDate(date ?? new Date());
    setTimeId(null);
    setSelectedScheduleId(null);

  };
  return (
    <div className="mx-auto py-10 bg-blue-100 min-h-screen">
      <Toaster position="top-center" richColors />
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex items-center justify-center w-32">
          <Image
            src="/img-diego.webp"
            alt="Diego Andres Salas"
            width={128}
            height={128}
            className="rounded-full border-4 border-blue-500"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">
            Crear una cita
          </h2>
          <div className="mb-4">
            <label htmlFor="service" className="block text-gray-700 font-bold mb-2">
              Servicios:
            </label>
            <select
              id="service"
              value={serviceId || ""}
              onChange={handleServiceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Seleccione --</option>
              {services.map((service) => (
              <option key={service.id} value={service.id}> 
                {service.name}                            
              </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
              Fecha:
            </label>
            <DatePicker
              id="date"
              selected={date}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              filterDate={isWeekday}
              dateFormat="yyyy-MM-dd" 
              required
              showIcon
              withPortal
            />
          </div>

          <div className="mb-4">
            <label htmlFor="timeId" className="block text-gray-700 font-bold mb-2">
              Hora:
            </label>
            <select
              id="timeId"
              value={timeId || ""}
              onChange={(e) => setTimeId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Seleccione --</option>
              {schedules.map((schedule) => 
                schedule.times.map((time) => ( 
                  <option key={time.timeId} value={time.timeId}>
                    {time.time}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Nombre: 
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Correo:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
              Comentario:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Crear cita
          </button>
        </form>
      </div>
    </div>
  );
}