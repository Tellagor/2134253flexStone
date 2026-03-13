import { DIRECTUS_URL } from "@/shared/config";
import type { CertificateItem, CertificatesSectionContent } from "@/shared/types";

type DirectusListResponse<T> = {
  data: T[];
};

type DirectusItemResponse<T> = {
  data: T;
};

type CertificatesSectionRow = {
  status: "draft" | "published";
  title: string | null;
  subtitle: string | null;
  download_all_file_id: string | { id?: string | null } | null;
};

type CertificatesItemRow = {
  id: number | string;
  title: string | null;
  description: string | null;
  file_id: string | { id?: string | null } | null;
};

function extractFileId(value: string | { id?: string | null } | null) {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && typeof value.id === "string") return value.id;
  return null;
}

function createFileHref(fileId: string | null) {
  if (!fileId) return "/pdf/test.pdf";
  return `${DIRECTUS_URL.replace(/\/+$/, "")}/assets/${fileId}?download`;
}

const defaultItems: CertificateItem[] = [
  {
    id: "water",
    title: "Гарантия качества — Водопоглощение",
    description:
      "Материал имеет минимальный уровень водопоглощения, что предотвращает разрушение покрытия при длительном контакте с влагой.",
    fileHref: "/pdf/test.pdf",
  },
  {
    id: "frost",
    title: "Гарантия качества — Морозостойкость",
    description:
      "Продукция выдерживает многократные циклы замораживания и оттаивания без образования трещин и сколов.",
    fileHref: "/pdf/test.pdf",
  },
  {
    id: "vapor",
    title: "Гарантия качества — Паропроницаемость",
    description:
      "Материал обеспечивает естественный воздухообмен стен, предотвращая накопление влаги внутри конструкции.",
    fileHref: "/pdf/test.pdf",
  },
  {
    id: "conformity",
    title: "Сертификат соответствия",
    description:
      "Продукция прошла обязательную сертификацию и полностью соответствует требованиям технических регламентов и нормативных стандартов.",
    fileHref: "/pdf/test.pdf",
  },
];

export const defaultCertificatesItems = defaultItems;

export const defaultCertificatesSectionContent: CertificatesSectionContent = {
  title: "Сертификаты",
  subtitle:
    "Обязательная сертификация продукции проводится в соответствии с требованиями технических регламентов",
  downloadAllHref: null,
};

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

export async function fetchCertificatesSectionContent(): Promise<CertificatesSectionContent | null> {
  const requirePublished = process.env.NODE_ENV === "production";

  try {
    const response = await fetchDirectusItem<CertificatesSectionRow>(
      "/items/certificates_section/1?fields=status,title,subtitle,download_all_file_id"
    );

    if (requirePublished && response.data.status !== "published") {
      return null;
    }

    return {
      title: response.data.title?.trim() || defaultCertificatesSectionContent.title,
      subtitle: response.data.subtitle?.trim() || defaultCertificatesSectionContent.subtitle,
      downloadAllHref: createFileHref(extractFileId(response.data.download_all_file_id)),
    };
  } catch (error) {
    console.error("Failed to fetch certificates_section from Directus", error);
    return null;
  }
}

export async function fetchCertificatesItems(): Promise<CertificateItem[]> {
  const requirePublished = process.env.NODE_ENV === "production";

  try {
    const response = await fetchDirectusList<CertificatesItemRow>(
      "/items/certificates_items?fields=id,title,description,file_id&sort=sort" +
        (requirePublished ? "&filter[status][_eq]=published" : "")
    );

    const items = response.data.map((item) => ({
      id: String(item.id),
      title: item.title?.trim() || "Сертификат",
      description: item.description?.trim() || "",
      fileHref: createFileHref(extractFileId(item.file_id)),
    }));

    return items.length > 0 ? items : defaultCertificatesItems;
  } catch (error) {
    console.error("Failed to fetch certificates_items from Directus", error);
    return defaultCertificatesItems;
  }
}

