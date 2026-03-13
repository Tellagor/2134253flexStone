import { fetchCertificatesItems, fetchCertificatesSectionContent } from "@/shared/api/certificates";

export async function GET() {
  const [items, section] = await Promise.all([
    fetchCertificatesItems(),
    fetchCertificatesSectionContent(),
  ]);

  return Response.json({ items, section });
}

