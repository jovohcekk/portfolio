// =====================================
// ALOQA API ROUTE
// Kontakt formasidan kelgan xabarlarni qabul qiladi.
// Production uchun: Resend, SendGrid yoki Nodemailer ulang.
// O'zgartirish mumkin: email yuborish logikasi
// =====================================

import { NextResponse } from "next/server";
import { socialLinks } from "@/config/portfolio";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi shart" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Email noto'g'ri" }, { status: 400 });
    }

    // =========================
    // O'ZGARTIRISH MUMKIN
    // Bu yerda haqiqiy email xizmatini ulang (Resend, SendGrid, va h.k.)
    // Hozircha server logiga yoziladi — development uchun yetarli
    // =========================
    console.log("[Portfolio Contact]", {
      to: socialLinks.email,
      from: body.email,
      name: body.name,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Xabar qabul qilindi",
    });
  } catch {
    return NextResponse.json(
      { error: "Server xatosi" },
      { status: 500 }
    );
  }
}
