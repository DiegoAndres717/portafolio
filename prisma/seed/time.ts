// prisma/seed/time.ts
import { Prisma } from "@prisma/client";

export const demoTimes: Prisma.TimeCreateInput[] = [
  { time: "09:00:00 am" },
  { time: "10:00:00 am" },
  { time: "11:00:00 am" },
  { time: "12:00:00 pm" },
  { time: "01:00:00 pm" },
  { time: "02:00:00 pm" },
  { time: "03:00:00 pm" },
  { time: "04:00:00 pm" },
  { time: "05:00:00 pm" },
  { time: "06:00:00 pm" },
  { time: "07:00:00 pm" },
  { time: "08:00:00 pm" },
];