import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_TO = process.env.EMAIL_TO || "aluoncoil@gmail.com";

const SUBJECT_BY_TYPE: Record<string, string> = {
  "contact-sales": "Lead - Contact Sales",
  "contact-technical": "Support Request - Technical",
  "home-quote": "Lead - Home Quote",
  "quote-modal": "Lead - Quote Modal",
};

type BodyPayload = {
  formType: string;
  source: string;
  fields: Record<string, string>;
};

function buildBody(payload: BodyPayload): string {
  const now = new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });
  const lines: string[] = [
    `מקור: ${payload.source}`,
    `תאריך/שעה: ${now}`,
    `סוג טופס: ${payload.formType}`,
    "",
    "--- שדות ---",
  ];
  for (const [key, value] of Object.entries(payload.fields)) {
    if (value != null && String(value).trim() !== "") {
      lines.push(`${key}: ${String(value).trim()}`);
    }
  }
  return lines.join("\n");
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BodyPayload;
    if (!payload.formType || !payload.source || typeof payload.fields !== "object") {
      return NextResponse.json(
        { error: "Missing formType, source or fields" },
        { status: 400 }
      );
    }

    const subject = SUBJECT_BY_TYPE[payload.formType] || `Lead - ${payload.formType}`;
    const text = buildBody(payload);

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "Email not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local" },
        { status: 503 }
      );
    }

    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === "true";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to: EMAIL_TO,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[send-form]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send email" },
      { status: 500 }
    );
  }
}
