import { DIRECTUS_URL } from "@/shared/config";
import { createDefaultWorksItems } from "@/shared/lib/works";
import type { WorkItem } from "@/shared/types";

type DirectusListResponse<T> = {
  data: T[];
};

type WorksItemRow = {
  id: number | string;
  alt: string | null;
  title: string | null;
  image_id: string | { id?: string | null } | null;
  show_on_works_page?: boolean | number | null;
  show_on_home_carousel?: boolean | number | null;
};

export const defaultWorksItems = createDefaultWorksItems();

function extractFileId(value: WorksItemRow["image_id"]): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && typeof value.id === "string") return value.id;
  return null;
}

function createAssetUrl(fileId: string | null, fallbackIndex: number) {
  if (!fileId) {
    const fallback = defaultWorksItems[fallbackIndex % defaultWorksItems.length];
    return fallback.imageUrl;
  }
  return `${DIRECTUS_URL.replace(/\/+$/, "")}/assets/${fileId}`;
}

async function fetchDirectusList<T>(path: string) {
  const response = await fetch(`${DIRECTUS_URL.replace(/\/+$/, "")}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as DirectusListResponse<T>;
}

function normalizeWorkItem(row: WorksItemRow, index: number): WorkItem {
  return {
    id: String(row.id),
    imageUrl: createAssetUrl(extractFileId(row.image_id), index),
    alt: row.alt?.trim() || `Выполненная работа ${index + 1}`,
    title: row.title?.trim() || "",
  };
}

async function fetchWorksByFlag(flag: "show_on_works_page" | "show_on_home_carousel") {
  const requirePublished = process.env.NODE_ENV === "production";
  const base =
    `/items/works_items?fields=id,alt,title,image_id,${flag}&sort=sort&filter[${flag}][_eq]=1` +
    (requirePublished ? "&filter[status][_eq]=published" : "");

  const response = await fetchDirectusList<WorksItemRow>(base);
  return response.data.map(normalizeWorkItem);
}

export async function fetchWorksPageItems(): Promise<WorkItem[]> {
  try {
    const items = await fetchWorksByFlag("show_on_works_page");
    return items.length > 0 ? items : defaultWorksItems;
  } catch (error) {
    console.error("Failed to fetch works page items from Directus", error);
    return defaultWorksItems;
  }
}

export async function fetchWorksCarouselItems(): Promise<WorkItem[]> {
  try {
    const items = await fetchWorksByFlag("show_on_home_carousel");
    return items.length > 0 ? items : defaultWorksItems;
  } catch (error) {
    console.error("Failed to fetch works carousel items from Directus", error);
    return defaultWorksItems;
  }
}
