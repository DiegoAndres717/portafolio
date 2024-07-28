import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { adminHandle: string } }
) {
  try {
    const services = await prisma.service.findMany({
      where: { status: Status.ACTIVE, admin: { handle: params.adminHandle } },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Error fetching services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: { params: { adminHandle: string } }) {
  try {
    const data = await request.json();
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        status: "INACTIVE",
        admin: { connect: { handle: params.adminHandle } },
      },
    });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Error creating service" },
      { status: 500 }
    );
  }
}

