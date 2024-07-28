import { Status } from "@prisma/client";

export interface Appointment {
  serviceName: string;
  serviceId: number;
  scheduleId: string;
  date: string;
  time: string;
  email: string;
  comment: string;
}
export interface User {
  firstName: string;
  lastName: string;
  handle: string;
  email: string;
  company: string;
  status: Status;
  image: string;
}