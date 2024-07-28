import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { scheduleId: string, adminHandle: string } }
) {
  try {
    const { scheduleId, adminHandle } = params;
    const { status } = await request.json();

    const updatedScheduleTime = await prisma.scheduleTime.update({
      where: { id: Number(scheduleId) },
      data: { status: status },
    });
    return NextResponse.json(updatedScheduleTime, { status: 200 });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: "Error updating schedule" },
      { status: 500 }
    );
  }
}
