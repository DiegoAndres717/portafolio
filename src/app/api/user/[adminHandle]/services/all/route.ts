import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Status } from '@prisma/client';

export async function GET(request: Request, { params }: { params: { adminHandle: string } }) {
 
  try {
    const services = await prisma.service.findMany({
      where: { admin: { handle: params.adminHandle } },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Error fetching services' }, { status: 500 });
  }
}