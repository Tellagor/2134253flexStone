import { DIRECTUS_URL } from "@/shared/config";
import type { FaqItem, FaqSectionContent } from "@/shared/types";

type DirectusListResponse<T> = {
  data: T[];
};

type DirectusItemResponse<T> = {
  data: T;
};

type FaqSectionRow = {
  status: "draft" | "published";
  title: string | null;
  ask_button_text: string | null;
};

type FaqItemRow = {
  id: number;
  question: string;
  answer: string;
};

const DEFAULT_TITLE = "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ";
const DEFAULT_ASK_BUTTON_TEXT = "ЗАДАТЬ ВОПРОС";

async function fetchDirectusList<T>(path: string) {
  const response = await fetch(`${DIRECTUS_URL.replace(/\/+$/, "")}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as DirectusListResponse<T>;
}

async function fetchDirectusItem<T>(path: string) {
  const response = await fetch(`${DIRECTUS_URL.replace(/\/+$/, "")}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as DirectusItemResponse<T>;
}

export async function fetchFaqSectionContent(): Promise<FaqSectionContent | null> {
  const requirePublished = process.env.NODE_ENV === "production";
  try {
    const response = await fetchDirectusItem<FaqSectionRow>(
      "/items/faq_section/1?fields=status,title,ask_button_text"
    );

    if (requirePublished && response.data.status !== "published") {
      return null;
    }

    return {
      title: response.data.title?.trim() || DEFAULT_TITLE,
      askButtonText: response.data.ask_button_text?.trim() || DEFAULT_ASK_BUTTON_TEXT,
    };
  } catch (error) {
    console.error("Failed to fetch faq_section from Directus", error);
    return null;
  }
}

export async function fetchFaqItems(): Promise<FaqItem[]> {
  const requirePublished = process.env.NODE_ENV === "production";
  try {
    const base =
      "/items/faq_items?fields=id,question,answer&sort=sort" +
      (requirePublished ? "&filter[status][_eq]=published" : "");
    const response = await fetchDirectusList<FaqItemRow>(base);
    return response.data.map((item) => ({
      id: String(item.id),
      question: item.question,
      answer: item.answer,
    }));
  } catch (error) {
    console.error("Failed to fetch faq_items from Directus", error);
    return [];
  }
}

