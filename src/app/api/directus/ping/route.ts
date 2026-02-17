import { DIRECTUS_URL } from "@/shared/config";

export async function GET() {
  const url = new URL("/server/ping", DIRECTUS_URL);

  try {
    const response = await fetch(url, {
      // Avoid caching a health check.
      cache: "no-store",
    });

    const text = await response.text();

    return Response.json(
      {
        ok: response.ok,
        status: response.status,
        directusUrl: DIRECTUS_URL,
        endpoint: url.toString(),
        body: text || null,
      },
      { status: response.ok ? 200 : 502 },
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        directusUrl: DIRECTUS_URL,
        endpoint: url.toString(),
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}
