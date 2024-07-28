import { NextResponse } from 'next/server';
import * as emailjs from '@emailjs/browser'; 

interface FormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  const data: FormData = await req.json();
  const { name, email, message } = data;

  try {
    // 1. Configure EmailJS
    emailjs.init(process.env.EMAILJS_USER_ID as string); 

    // 2. Prepare EmailJS Template Parameters
    const templateParams = {
      to_name: 'Diego Andres',
      from_name: name,
      from_email: email,
      message: message,
    };

    // 3. Send Email using EmailJS
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID as string, 
      process.env.EMAILJS_TEMPLATE_ID as string, 
      templateParams
    );

    return NextResponse.json({ status: 200, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error); 
    return NextResponse.json({ status: 500, message: 'Error sending message.' });
  }
}