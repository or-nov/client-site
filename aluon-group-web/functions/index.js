import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import nodemailer from "nodemailer";

const SMTP_HOST = defineSecret("SMTP_HOST");
const SMTP_PORT = defineSecret("SMTP_PORT");
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");
const MAIL_TO = defineSecret("MAIL_TO");
const MAIL_FROM = defineSecret("MAIL_FROM");

const SUBJECT_BY_TYPE = {
  "contact-sales": "Lead - Contact Sales",
  "contact-technical": "Support Request - Technical",
  "home-quote": "Lead - Home Quote",
  "quote-modal": "Lead - Quote Modal",
};

function buildBody(payload) {
  const now = new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });
  const lines = [
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

export const sendLead = onRequest(
  {
    region: "europe-west1",
    cors: true,
    secrets: [SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM],
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const payload = req.body;
      if (!payload || !payload.formType || !payload.source || typeof payload.fields !== "object") {
        res.status(400).json({ error: "Missing formType, source or fields" });
        return;
      }

      const name = (payload.fields.fullName || payload.fields.name || "").trim();
      const phone = (payload.fields.phone || "").trim();
      if (!name || !phone) {
        res.status(400).json({ error: "name and phone are required" });
        return;
      }

      const subject = SUBJECT_BY_TYPE[payload.formType] || `Lead - ${payload.formType}`;
      const text = buildBody(payload);
      const mailTo = MAIL_TO.value();
      const mailFrom = MAIL_FROM.value();
      const replyTo = (payload.fields.email || "").trim() || undefined;

      const transporter = nodemailer.createTransport({
        host: SMTP_HOST.value(),
        port: Number(SMTP_PORT.value()) || 587,
        secure: false,
        auth: {
          user: SMTP_USER.value(),
          pass: SMTP_PASS.value(),
        },
      });

      await transporter.sendMail({
        from: mailFrom,
        to: mailTo,
        replyTo: replyTo || undefined,
        subject,
        text,
      });

      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("[sendLead]", err);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(500).json({
        error: err instanceof Error ? err.message : "Failed to send email",
      });
    }
  }
);
