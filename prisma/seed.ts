import { PrismaClient } from "@prisma/client";
import { demoServices } from './seed/service';
import { demoSchedules } from "./seed/schedule";
import { demoTimes } from "./seed/time";
import { demoAppointment } from "./seed/appointment";
import { DayOfWeek, Status } from '@prisma/client';
import { demoAdmin } from './seed/user';

const daysOfWeek: DayOfWeek[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const prisma = new PrismaClient();

async function main() {
  // Crear administradores
  await prisma.admin.createMany({
    data: demoAdmin,
  })
  // Crear servicios
  for (const service of demoServices) {
    await prisma.service.create({ data: service });
  }

  // Crear horas
  await prisma.time.createMany({
    data: demoTimes,
  });
  const createdTimes = await prisma.time.findMany(); // Obtener las horas creadas
  const timeIds = createdTimes.map((time) => time.id); 
  // Crear horarios y ScheduleTimes para cada servicio y día de la semana
  for (const service of demoServices) {
    for (const dayOfWeek of daysOfWeek) {
      const schedule = await prisma.schedule.create({
        data: {
          serviceId: service.id,
          dayOfWeek,
        } as any,
      });

      for (const timeId of timeIds) {
        await prisma.scheduleTime.create({
          data: {
            scheduleId: schedule.id,
            timeId: timeId,
            status: Status.INACTIVE, 
          },
        });
      }
    }
  }

  await prisma.appointment.createMany({
    data: demoAppointment,
  })
  // Crear citas
  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });