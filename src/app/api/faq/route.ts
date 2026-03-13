import { fetchFaqItems, fetchFaqSectionContent } from "@/shared/api/faq";

export async function GET() {
  const [items, section] = await Promise.all([fetchFaqItems(), fetchFaqSectionContent()]);
  return Response.json({ items, section });
}

