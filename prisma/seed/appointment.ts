import { Prisma } from "@prisma/client";

export const demoAppointment: Prisma.AppointmentCreateManyInput[] = [
  {
    serviceId: 1, 
    timeId: 1,
    scheduleId: 1, 
    email: "cliente1@example.com",
    comment: "Consulta sobre desarrollo de un sitio web",
    serviceDate: new Date(),
    name: "cliente1",
  },
  {
    serviceId: 2, 
    timeId: 2,
    scheduleId: 2, 
    email: "cliente2@example.com",
    comment: "Necesitamos ayuda con la programación de una API",
    serviceDate: new Date(),
    name: "cliente2",
  },
];
