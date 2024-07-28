import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { serviceId: string, adminHandle: string } }) {
   
  try {
    const { serviceId, adminHandle } = params;
    
    const { status } = await request.json();
   
    const service = await prisma.service.update({
      where: { id: Number(serviceId) },
      data: {
        status: status
      },
    });
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Error updating service' }, { status: 500 });
  }
}
export async function DELETE(request: Request, { params }: { params: { serviceId: string, adminHandle: string } }) {
  try {
    const { serviceId, adminHandle } = params;
    await prisma.service.delete({ where: { id: Number(serviceId) } });
    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Error deleting service' }, { status: 500 });
  }
}