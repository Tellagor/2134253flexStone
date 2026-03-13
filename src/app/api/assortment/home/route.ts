import { fetchAssortmentSectionContent, fetchHomeAssortmentItems } from "@/shared/api/assortment";

export async function GET() {
  const [items, section] = await Promise.all([
    fetchHomeAssortmentItems(),
    fetchAssortmentSectionContent(),
  ]);
  return Response.json({ items, section });
}
