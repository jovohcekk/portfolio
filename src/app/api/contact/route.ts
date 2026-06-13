import { NextResponse } from "next/server";

interface ContactBody {
  name: string;
  phone?: string;
  email: string;
  message: string;
  website?: string;
}

const MAX_NAME = 120;
const MAX_PHONE = 20;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function formatTelegramMessage(name: string, phone: string, email: string, message: string): string {
  return [
    "📩 New Portfolio Message",
    "",
    `👤 Name: ${name}`,
    `📱 Phone: ${phone}`,
    `📧 Email: ${email}`,
    "",
    "💬 Message:",
    message,
  ].join("\n");
}

async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[Contact] Telegram credentials are not configured");
    return false;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!response.ok) {
    console.error("[Contact] Telegram API request failed", response.status);
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = (await request.json()) as ContactBody;

    if (body.website?.trim()) {
      return NextResponse.json({ success: true, message: "Received" });
    }

    const name = body.name?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (
      name.length > MAX_NAME ||
      phone.length > MAX_PHONE ||
      email.length > MAX_EMAIL ||
      message.length > MAX_MESSAGE
    ) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const telegramText = formatTelegramMessage(name, phone, email, message);
    const sent = await sendTelegramMessage(telegramText);

    if (!sent) {
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Message received",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
