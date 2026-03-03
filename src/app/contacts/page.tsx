import type { Metadata } from "next";

import { ContactsPage } from "@/pages-layer";

export const metadata: Metadata = {
  title: "Контакты — Flexstone",
  description: "Контакты Flexstone",
};

export default function ContactsRoutePage() {
  return <ContactsPage />;
}

