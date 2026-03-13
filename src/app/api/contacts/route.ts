import { fetchContactsPageContent } from "@/shared/api/contacts";

export async function GET() {
  const content = await fetchContactsPageContent();
  return Response.json({ content });
}

