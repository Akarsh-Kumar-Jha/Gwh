import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { getSupabase } from "@/lib/supabase";

/** Hidden form field real visitors never see; bots tend to fill it in. */
const HONEYPOT_FIELD = "nickname";

export async function POST(request: Request) {
  let json: Record<string, unknown>;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof json[HONEYPOT_FIELD] === "string" && json[HONEYPOT_FIELD] !== "") {
    // Pretend it worked so bots don't retry, but store nothing.
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const parseResult = contactFormSchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", details: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error("Contact form: Supabase is not configured, enquiry was not stored.");
    return NextResponse.json(
      { error: "Our enquiry form is temporarily unavailable." },
      { status: 503 }
    );
  }

  const { name, email, phone, service, message } = parseResult.data;

  try {
    const { error } = await supabase.from("enquiries").insert([
      { name, email, phone: phone || null, service, message: message || null },
    ]);

    if (error) {
      console.error("Contact form: failed to store enquiry.", error);
      return NextResponse.json(
        { error: "We couldn't send your enquiry right now." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form: unexpected error.", error);
    return NextResponse.json(
      { error: "We couldn't send your enquiry right now." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
