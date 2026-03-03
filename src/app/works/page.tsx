import type { Metadata } from "next";

import { WorksPage } from "@/pages-layer";

export const metadata: Metadata = {
  title: "Наши работы — Flexstone",
  description: "Примеры выполненных работ Flexstone",
};

export default function WorksRoutePage() {
  return <WorksPage />;
}
