import { DIRECTUS_TOKEN, DIRECTUS_URL } from "@/shared/config";
import type { AssortmentItem, AssortmentPriceTier, AssortmentSectionContent } from "@/shared/types";

const DEFAULT_PRODUCT_IMAGE = "/Calculate%20background.png";

type DirectusListResponse<T> = {
  data: T[];
};

type DirectusItemResponse<T> = {
  data: T;
};

type HomeProductRow = {
  product_id: number | string | { id?: number | string | null } | null;
};

type ProductRow = {
  id: number | string;
  name: string | null;
  short_description: string | null;
  image_id: string | { id?: string | null } | null;
};

type PriceTierRow = {
  id: number;
  product_id: number | string | { id?: number | string | null } | null;
  from_m2: number;
  to_m2: number | null;
  price_rub: number;
};

export const defaultAssortmentItems: AssortmentItem[] = [
  {
    id: "product-1",
    name: "Гибкий кирпич для фасада на сетке с защитной пленкой",
    shortDescription:
      "Модуль полезной площадью 0,47 м2, на модуле 24 плитки размером 240×70 мм, с учетом шва 8–9 мм, толщина 4 мм",
    imageUrl: DEFAULT_PRODUCT_IMAGE,
    priceTiers: [
      { id: 1, fromM2: 0, toM2: 100, priceRub: 1170 },
      { id: 2, fromM2: 101, toM2: 299, priceRub: 1170 },
      { id: 3, fromM2: 300, toM2: null, priceRub: 1170 },
    ],
  },
  {
    id: "product-2",
    name: "Гибкий кирпич для фасада на сетке с защитной пленкой",
    shortDescription:
      "Модуль полезной площадью 0,47 м2, на модуле 24 плитки размером 240×70 мм, с учетом шва 8–9 мм, толщина 4 мм",
    imageUrl: DEFAULT_PRODUCT_IMAGE,
    priceTiers: [
      { id: 4, fromM2: 0, toM2: 100, priceRub: 1170 },
      { id: 5, fromM2: 101, toM2: 299, priceRub: 1170 },
      { id: 6, fromM2: 300, toM2: null, priceRub: 1170 },
    ],
  },
  {
    id: "product-3",
    name: "Гибкий кирпич для фасада на сетке с защитной пленкой",
    shortDescription:
      "Модуль полезной площадью 0,47 м2, на модуле 24 плитки размером 240×70 мм, с учетом шва 8–9 мм, толщина 4 мм",
    imageUrl: DEFAULT_PRODUCT_IMAGE,
    priceTiers: [
      { id: 7, fromM2: 0, toM2: 100, priceRub: 1170 },
      { id: 8, fromM2: 101, toM2: 299, priceRub: 1170 },
      { id: 9, fromM2: 300, toM2: null, priceRub: 1170 },
    ],
  },
  {
    id: "product-4",
    name: "Гибкий кирпич для фасада на сетке с защитной пленкой",
    shortDescription:
      "Модуль полезной площадью 0,47 м2, на модуле 24 плитки размером 240×70 мм, с учетом шва 8–9 мм, толщина 4 мм",
    imageUrl: DEFAULT_PRODUCT_IMAGE,
    priceTiers: [
      { id: 10, fromM2: 0, toM2: 100, priceRub: 1170 },
      { id: 11, fromM2: 101, toM2: 299, priceRub: 1170 },
      { id: 12, fromM2: 300, toM2: null, priceRub: 1170 },
    ],
  },
];

function createHeaders() {
  const headers: HeadersInit = {};
  if (DIRECTUS_TOKEN) {
    headers.Authorization = `Bearer ${DIRECTUS_TOKEN}`;
  }
  return headers;
}

function extractFileId(value: ProductRow["image_id"]): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && typeof value.id === "string") return value.id;
  return null;
}

function createAssetUrl(fileId: string | null): string {
  if (!fileId) return DEFAULT_PRODUCT_IMAGE;
  return `${DIRECTUS_URL.replace(/\/+$/, "")}/assets/${fileId}`;
}

function normalizePriceTier(row: PriceTierRow): AssortmentPriceTier {
  return {
    id: row.id,
    fromM2: row.from_m2,
    toM2: row.to_m2,
    priceRub: row.price_rub,
  };
}

async function fetchDirectusList<T>(path: string) {
  const response = await fetch(`${DIRECTUS_URL.replace(/\/+$/, "")}${path}`, {
    headers: createHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as DirectusListResponse<T>;
}

async function fetchDirectusItem<T>(path: string) {
  const response = await fetch(`${DIRECTUS_URL.replace(/\/+$/, "")}${path}`, {
    headers: createHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Directus request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as DirectusItemResponse<T>;
}

function normalizeNumericId(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (value && typeof value === "object" && "id" in value) {
    // Directus relational fields can come back as { id } depending on settings.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return normalizeNumericId((value as any).id);
  }
  return null;
}

type AssortmentSectionRow = {
  status: "draft" | "published";
  title: string | null;
  description: string | null;
};

export async function fetchAssortmentSectionContent(): Promise<AssortmentSectionContent | null> {
  const requirePublished = process.env.NODE_ENV === "production";
  try {
    const response = await fetchDirectusItem<AssortmentSectionRow>(
      "/items/assortment_section/1?fields=status,title,description"
    );

    if (requirePublished && response.data.status !== "published") {
      return null;
    }

    return {
      title: response.data.title?.trim() || "",
      description: response.data.description?.trim() || "",
    };
  } catch (error) {
    console.error("Failed to fetch assortment_section from Directus", error);
    return null;
  }
}

export async function fetchHomeAssortmentItems(): Promise<AssortmentItem[]> {
  const requirePublished = process.env.NODE_ENV === "production";

  try {
    const homeBase =
      "/items/assortment_home_products?fields=product_id&sort=sort" +
      (requirePublished ? "&filter[status][_eq]=published" : "");
    let homeProducts = await fetchDirectusList<HomeProductRow>(homeBase);
    if (!requirePublished && homeProducts.data.length === 0) {
      homeProducts = await fetchDirectusList<HomeProductRow>(
        "/items/assortment_home_products?fields=product_id&sort=sort"
      );
    }

    const productIds = homeProducts.data
      .map((item) => normalizeNumericId(item.product_id))
      .filter((value): value is number => typeof value === "number");

    if (productIds.length === 0) {
      return defaultAssortmentItems;
    }

    const idsFilter = productIds.join(",");
    const productBase =
      `/items/assortment_products?fields=id,name,short_description,image_id&sort=sort&filter[id][_in]=${idsFilter}` +
      (requirePublished ? "&filter[status][_eq]=published" : "");
    const productFallback =
      `/items/assortment_products?fields=id,name,short_description&sort=sort&filter[id][_in]=${idsFilter}` +
      (requirePublished ? "&filter[status][_eq]=published" : "");

    let products: DirectusListResponse<ProductRow>;
    try {
      products = await fetchDirectusList<ProductRow>(productBase);
    } catch (error) {
      // If public role doesn't have access to image_id, still render products with default image.
      console.error("Failed to fetch assortment_products with image_id, retrying without it", error);
      products = (await fetchDirectusList<Omit<ProductRow, "image_id">>(
        productFallback
      )) as DirectusListResponse<ProductRow>;
    }

    const tiersBase =
      `/items/assortment_price_tiers?fields=id,product_id,from_m2,to_m2,price_rub&sort=sort&filter[product_id][_in]=${idsFilter}` +
      (requirePublished ? "&filter[status][_eq]=published" : "");
    let tiers: DirectusListResponse<PriceTierRow>;
    try {
      tiers = await fetchDirectusList<PriceTierRow>(tiersBase);
    } catch (error) {
      // Price tiers are optional for now; keep page functional even with restrictive permissions.
      console.error("Failed to fetch assortment_price_tiers, falling back to empty", error);
      tiers = { data: [] };
    }

    const tiersByProduct = new Map<number, AssortmentPriceTier[]>();
    for (const tier of tiers.data) {
      const productId = normalizeNumericId(tier.product_id);
      if (productId === null) continue;
      const current = tiersByProduct.get(productId) ?? [];
      current.push(normalizePriceTier(tier));
      tiersByProduct.set(productId, current);
    }

    const productsById = new Map<number, ProductRow>();
    for (const product of products.data) {
      const id = normalizeNumericId(product.id);
      if (id === null) continue;
      productsById.set(id, product);
    }

    const normalized = productIds
      .map((id) => {
        const product = productsById.get(id);
        if (!product) return null;
        return {
          id: String(product.id),
          name: product.name?.trim() || "Без названия",
          shortDescription: product.short_description?.trim() || "",
          imageUrl: createAssetUrl(extractFileId(product.image_id)),
          priceTiers: tiersByProduct.get(id) ?? [],
        } satisfies AssortmentItem;
      })
      .filter((item): item is AssortmentItem => item !== null);

    return normalized.length > 0 ? normalized : defaultAssortmentItems;
  } catch (error) {
    console.error("Failed to fetch assortment items from Directus", error);
    return defaultAssortmentItems;
  }
}
