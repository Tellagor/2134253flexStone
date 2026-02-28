import type { Metadata } from "next";

import { DeliveryPage } from "@/pages-layer";

export const metadata: Metadata = {
  title: "Доставка — Flexstone",
  description: "Информация о доставке Flexstone",
};

export default function DeliveryRoutePage() {
  return <DeliveryPage />;
}
