import { NextResponse } from 'next/server';
import { PrismaClient, Status } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { adminHandle: string } }) {
  const { adminHandle } = params;
  
  try {
    const userAdmin = await prisma.admin.findMany({
      where: { 
        handle: adminHandle, 
        status: Status.ACTIVE, 
      }, 
      select: {
        id: true,
        firstName: true,
        lastName: true,
        handle: true,
        email: true,
        company: true,
        status: true,
        image: true,  
      }
    });
    
    return NextResponse.json(userAdmin);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Error fetching services' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { adminHandle: string } }) {
  const { adminHandle } = params;
  
  const formData = await request.formData();
  const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const company = formData.get('company') as string;
    const handle = formData.get('handle') as string;
    const profileImage = formData.get('profileImage') as File | null;

    let imagePath: string | undefined = undefined;

    // Manejar la imagen de perfil si se ha subido
    if (profileImage) {
      const buffer = Buffer.from(await profileImage.arrayBuffer()); 
      const fileName = `${Date.now()}-${profileImage.name}`;
      const newPath = path.join(process.cwd(), 'public', 'uploads', 'profile', fileName);

      await fs.writeFile(newPath, buffer);
      imagePath = `/uploads/profile/${fileName}`; 
    }
  try {
    
    const updateUser = await prisma.admin.update({
      where: { 
        handle: adminHandle, 
        status: Status.ACTIVE, 
      }, 
      data: {
        firstName,
        lastName,
        company,
        handle,
        image: imagePath,
      }
    });
    
    return NextResponse.json(updateUser);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Error fetching services' }, { status: 500 });
  }
}