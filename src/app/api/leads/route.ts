import { createLead } from "@/shared/api/leads";
import type { LeadCreatePayload, LeadType } from "@/shared/types";

const ALLOWED_TYPES: ReadonlySet<LeadType> = new Set([
  "request",
  "question",
  "calculator",
  "installation",
  "assortment",
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const raw = body as Partial<LeadCreatePayload>;
  const type: LeadType = ALLOWED_TYPES.has(raw.type as LeadType) ? (raw.type as LeadType) : "request";

  if (!isNonEmptyString(raw.phone)) {
    return Response.json({ error: "Phone is required" }, { status: 400 });
  }

  const payload: LeadCreatePayload = {
    type,
    name: isNonEmptyString(raw.name) ? raw.name.trim() : null,
    middle_name: isNonEmptyString(raw.middle_name) ? raw.middle_name.trim() : null,
    phone: raw.phone,
    city: isNonEmptyString(raw.city) ? raw.city.trim() : null,
    area_m2: typeof raw.area_m2 === "number" && Number.isFinite(raw.area_m2) ? raw.area_m2 : null,
    agree: typeof raw.agree === "boolean" ? raw.agree : null,
    message: isNonEmptyString(raw.message) ? raw.message.trim() : null,
    product_id: typeof raw.product_id === "number" && Number.isFinite(raw.product_id) ? raw.product_id : null,
    product_name_snapshot: isNonEmptyString(raw.product_name_snapshot) ? raw.product_name_snapshot.trim() : null,
    source_url: isNonEmptyString(raw.source_url) ? raw.source_url.trim() : null,
    utm_source: isNonEmptyString(raw.utm_source) ? raw.utm_source.trim() : null,
    utm_medium: isNonEmptyString(raw.utm_medium) ? raw.utm_medium.trim() : null,
    utm_campaign: isNonEmptyString(raw.utm_campaign) ? raw.utm_campaign.trim() : null,
    utm_content: isNonEmptyString(raw.utm_content) ? raw.utm_content.trim() : null,
    utm_term: isNonEmptyString(raw.utm_term) ? raw.utm_term.trim() : null,
  };

  try {
    const created = await createLead(payload);
    return Response.json({ ok: true, id: created.data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
