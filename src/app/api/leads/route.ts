import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadPayload {
  formName?: string;
  data?: unknown;
  timestamp?: string;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    // TODO: Integrate with one or more of:
    //   1. Email notification (SendGrid / Resend / Postmark)
    //   2. CRM (HubSpot / Salesforce / Attio)
    //   3. Google Sheets append
    //   4. Slack notification
    //
    // Until that integration lands, every lead is logged to the server console
    // so it shows up in `vercel logs` for the function.
    console.log("[api/leads] new lead", JSON.stringify(payload));

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
