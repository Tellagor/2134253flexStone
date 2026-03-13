import { DIRECTUS_TOKEN, DIRECTUS_URL } from "@/shared/config";
import type { LeadCreatePayload } from "@/shared/types";

type DirectusItemResponse<T> = {
  data: T;
};

function createHeaders() {
  const headers: HeadersInit = { "content-type": "application/json" };
  if (DIRECTUS_TOKEN) headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;
  return headers;
}

export async function createLead(payload: LeadCreatePayload) {
  if (!DIRECTUS_TOKEN) {
    throw new Error("DIRECTUS_TOKEN is missing");
  }

  const response = await fetch(`${DIRECTUS_URL.replace(/\/+$/, "")}/items/leads`, {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Directus create lead failed: ${response.status} ${body}`);
  }

  return (await response.json()) as DirectusItemResponse<{ id: number }>;
}

