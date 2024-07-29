// prisma/seed/schedule.ts
import { Prisma } from "@prisma/client";

export const demoSchedules: Prisma.ScheduleCreateManyInput[] = [
  {
    serviceId: 1,
    dayOfWeek: "MONDAY",
  },
  {
    serviceId: 2,
    dayOfWeek: "TUESDAY",
  },
  {
    serviceId: 3,
    dayOfWeek: "WEDNESDAY",
    
  },
];