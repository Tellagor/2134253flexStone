export type LeadType = "request" | "question" | "calculator" | "installation" | "assortment";

export type LeadCreatePayload = {
  type: LeadType;
  name?: string | null;
  middle_name?: string | null;
  phone: string;
  city?: string | null;
  area_m2?: number | null;
  agree?: boolean | null;
  message?: string | null;
  product_id?: number | null;
  product_name_snapshot?: string | null;
  source_url?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
};
