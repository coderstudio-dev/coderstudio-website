import { NextResponse } from "next/server";
import { Resend } from "resend";

const LOGO_BASE64 =
  "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";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: Request) {
  const { name, email, message, company } = await req.json();

  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Basic input validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  // Bot detection techniques
  const isBotDetected = await detectBot(req, company);

  if (isBotDetected) {
    return NextResponse.json(
      { error: "Bot activity detected" },
      { status: 403 }
    );
  }

  // Process the message (send email)
  try {
    await sendEmail(name, email, message);
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

function isSameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  if (!host) return true; // can't verify without our own host, don't block
  const candidate = origin ?? referer;
  if (!candidate) return true; // no Origin/Referer sent, don't block legitimate clients

  try {
    return new URL(candidate).host === host;
  } catch {
    return false;
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // lazy cleanup of expired entries so the map doesn't grow unbounded
  rateLimitMap.forEach((entry, key) => {
    if (entry.resetAt < now) rateLimitMap.delete(key);
  });

  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

async function detectBot(req: Request, honeypot: unknown): Promise<boolean> {
  // Honeypot field: real users never see or fill it, naive bots do.
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return true;
  }

  const userAgent = req.headers.get("user-agent");
  if (!userAgent || userAgent.toLowerCase().includes("bot")) {
    return true;
  }

  const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ipAddress)) {
    return true;
  }

  // You can add more sophisticated checks here, such as:
  // - IP reputation check
  // - Behavioral analysis

  return false;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmail(name: string, email: string, message: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL;

  if (!notifyTo) {
    throw new Error("CONTACT_NOTIFY_EMAIL is not set");
  }

  const { error } = await resend.emails.send({
    from,
    to: notifyTo,
    subject: "From Website Service Inquiry",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong> ${escapeHtml(message)}</p>`,
  });

  if (error) {
    throw new Error(error.message);
  }

  await sendAutoReply(resend, from, name, email, message);
}

async function sendAutoReply(
  resend: Resend,
  from: string,
  name: string,
  email: string,
  message: string
) {
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "We've received your message — CoderStudio Labs",
    text: `Hi ${name},\n\nThanks for reaching out to CoderStudio Labs. We've received your message and someone from our team will get back to you within 5 business days.\n\nFor reference, here's what you sent us:\n"${message}"\n\n— CoderStudio Labs`,
    html: autoReplyHtml(name, message),
    attachments: [
      {
        filename: "coderstudio-logo.png",
        content: LOGO_BASE64,
        contentId: "logo",
      },
    ],
  });

  if (error) {
    // Best-effort: the visitor's inquiry already reached CONTACT_NOTIFY_EMAIL successfully
    // above, so a failed confirmation email shouldn't turn that into a 500 for the visitor.
    console.error("Failed to send auto-reply:", error);
  }
}

function autoReplyHtml(name: string, message: string): string {
  const font = "-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f6;padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr>
          <td style="padding:28px 32px;border-bottom:1px solid #eef0f2;">
            <img src="cid:logo" width="160" alt="CoderStudio Labs" style="display:block;height:auto;border:0;" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;font-family:${font};font-size:16px;line-height:1.5;color:#111318;">Hi ${escapeHtml(name)},</p>
            <p style="margin:0 0 16px;font-family:${font};font-size:15px;line-height:1.6;color:#3a3f45;">Thanks for reaching out to CoderStudio Labs. We've received your message and someone from our team will get back to you within 5 business days.</p>
            <p style="margin:24px 0 8px;font-family:${font};font-size:13px;color:#6b7280;">For reference, here's what you sent us:</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f8fa;border-left:3px solid #5dd0ff;border-radius:4px;">
              <tr>
                <td style="padding:14px 16px;font-family:${font};font-size:14px;line-height:1.6;color:#3a3f45;white-space:pre-wrap;">${escapeHtml(message)}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;background-color:#08090b;">
            <p style="margin:0;font-family:${font};font-size:12px;color:#9aa0a6;">— CoderStudio Labs · fully remote, globally distributed</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
