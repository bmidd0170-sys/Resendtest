import { NextResponse } from "next/server";

import { sendEmail } from "@/lib/email";

type RequestBody = {
  to?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RequestBody;
  const recipient = body.to?.trim();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!recipient) {
    return NextResponse.json({ error: "Recipient email is required." }, { status: 400 });
  }

  if (!from) {
    return NextResponse.json({ error: "Missing RESEND_FROM_EMAIL environment variable." }, { status: 500 });
  }

  const { data, error } = await sendEmail({
    from,
    to: recipient,
    subject: "A note for yourself",
    html: "<p>This message was prepared from the self-email page.</p>",
    text: "This message was prepared from the self-email page.",
    replyTo: recipient,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}