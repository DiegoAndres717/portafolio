// prisma/seed/schedule.ts
import { Prisma } from "@prisma/client";

export const demoSchedules: Prisma.ScheduleCreateInput[] = [
  {
    serviceId: 1,
    date: "2024-07-04",
    dayOfWeek: "MONDAY",
    scheduleTimes: {
      create: [
        { timeId: 1 }, // 09:00:00 am
        { timeId: 2 }, // 10:00:00 am
        { timeId: 3 }, // 11:00:00 am
      ],
    },
  },
  {
    serviceId: 2,
    date: "2024-07-05",
    dayOfWeek: "TUESDAY",
    scheduleTimes: {
      create: [
        { timeId: 4 }, // 12:00:00 pm
        { timeId: 5 }, // 01:00:00 pm
      ],
    },
  },
  {
    serviceId: 3,
    date: "2024-07-06",
    dayOfWeek: "WEDNESDAY",
    scheduleTimes: {
      create: [
        { timeId: 6 }, // 02:00:00 pm
        { timeId: 7 }, // 03:00:00 pm
        { timeId: 8 }, // 04:00:00 pm
      ],
    },
  },
];