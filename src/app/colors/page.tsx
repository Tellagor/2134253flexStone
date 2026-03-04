import type { Metadata } from "next";

import { ColorsPage } from "@/pages-layer";

export const metadata: Metadata = {
  title: "Цвета — Flexstone",
  description: "Цвета Flexstone",
};

export default function ColorsRoutePage() {
  return <ColorsPage />;
}

