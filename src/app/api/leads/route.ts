import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Server-side shape validation. The client posts { formName, data, timestamp }
// where `data` is the per-form field object. We keep it permissive on the
// inner shape (each form has its own fields) but enforce sane bounds so a
// malformed or abusive request is rejected with a 400 instead of being logged.
const LeadSchema = z.object({
  formName: z.string().trim().min(1).max(100),
  data: z.record(z.string(), z.unknown()),
  timestamp: z.string().datetime().optional(),
});

// Reject payloads larger than 32 KB to avoid logging/processing abuse.
const MAX_BODY_BYTES = 32 * 1024;

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: "Payload too large" },
        { status: 413 }
      );
    }

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON" },
        { status: 400 }
      );
    }

    const parsed = LeadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid lead payload" },
        { status: 400 }
      );
    }

    const { formName, data, timestamp } = parsed.data;

    // TODO: Integrate with one or more of:
    //   1. Email notification (SendGrid / Resend / Postmark)
    //   2. CRM (HubSpot / Salesforce / Attio)
    //   3. Google Sheets append
    //   4. Slack notification
    //
    // Until that integration lands, every valid lead is logged to the server
    // console so it shows up in `vercel logs` for the function. (Once a real
    // CRM/email sink is wired, drop PII from the log line for compliance.)
    console.log(
      "[api/leads] new lead",
      JSON.stringify({ formName, data, timestamp })
    );

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
    });
  } catch (error) {
    console.error("[api/leads] failed to process", error);
    return NextResponse.json(
      { success: false, message: "Failed to process" },
      { status: 500 }
    );
  }
}
