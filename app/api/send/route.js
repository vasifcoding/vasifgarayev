import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Başlangıçta sadece bu adresten gönderebilirsin
      to: ['garayevvasif2004@gmail.com'], // Kendi mailini buraya yaz
      subject: `New mail from ${name}`,
      html: `
        <div style="font-family: monospace; background: #050505; color: #e0e0e0; padding: 20px; border: 1px solid #1a1a1a;">
          <h2 style="color: #00f2ff;">> NEW_MESSAGE_RECEIVED</h2>
          <p><strong>IDENTIFIER:</strong> ${name}</p>
          <p><strong>RETURN_ADDRESS:</strong> ${email}</p>
          <p><strong>PAYLOAD:</strong></p>
          <div style="background: #0a0a0a; padding: 15px; border-left: 3px solid #00f2ff;">
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}