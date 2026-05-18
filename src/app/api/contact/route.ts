import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    await resend.emails.send({
      from: "ICE-BI <contact@resend.dev>",
replyTo: email,
      to: "bolichrist04@gmail.com", // TON email
      subject: `ICE-BI Contact: ${subject}`,
      html: `
        <h2>Nouveau message ICE-BI</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: "Message envoyé !" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}