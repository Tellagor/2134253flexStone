import { fetchWorksCarouselItems, fetchWorksPageItems } from "@/shared/api/works";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");

  if (scope === "carousel") {
    const items = await fetchWorksCarouselItems();
    return Response.json({ items });
  }

  const items = await fetchWorksPageItems();
  return Response.json({ items });
}

