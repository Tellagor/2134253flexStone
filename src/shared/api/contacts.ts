import { DIRECTUS_URL } from "@/shared/config";
import type { ContactsPageContent } from "@/shared/types";

type DirectusItemResponse<T> = {
  data: T;
};

type ContactsPageRow = {
  status: "draft" | "published";
  title: string | null;
  subtitle: string | null;
  work_hours: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
};

async function fetchDirectusItem<T>(path: string) {
  const response = await fetch(`${DIRECTUS_URL.replace(/\/+$/, "")}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as DirectusItemResponse<T>;
}

const DEFAULT_CONTENT: ContactsPageContent = {
  title: "КОНТАКТЫ",
  subtitle:
    "Мы производим инновационный отделочный материал, реалистично имитирующий кирпичную кладку",
  workHours: "С 9:00 до 17:00,\nвоскресенье — выходной",
  phone: "8(876)876-87-87",
  email: "test@mail.ru",
  address: "г. Ярославль",
};

export async function fetchContactsPageContent(): Promise<ContactsPageContent | null> {
  const requirePublished = process.env.NODE_ENV === "production";
  try {
    const response = await fetchDirectusItem<ContactsPageRow>(
      "/items/contacts_page/1?fields=status,title,subtitle,work_hours,phone,email,address"
    );

    if (requirePublished && response.data.status !== "published") {
      return null;
    }

    return {
      title: response.data.title?.trim() || DEFAULT_CONTENT.title,
      subtitle: response.data.subtitle?.trim() || DEFAULT_CONTENT.subtitle,
      workHours: response.data.work_hours?.trim() || DEFAULT_CONTENT.workHours,
      phone: response.data.phone?.trim() || DEFAULT_CONTENT.phone,
      email: response.data.email?.trim() || DEFAULT_CONTENT.email,
      address: response.data.address?.trim() || DEFAULT_CONTENT.address,
    };
  } catch (error) {
    console.error("Failed to fetch contacts_page from Directus", error);
    return null;
  }
}

export { DEFAULT_CONTENT as defaultContactsPageContent };

