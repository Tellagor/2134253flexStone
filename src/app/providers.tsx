"use client";

import React from "react";
import { RequestModalProvider } from "@/shared/ui/RequestModalProvider";
import { QuestionModalProvider } from "@/shared/ui/QuestionModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RequestModalProvider>
      <QuestionModalProvider>{children}</QuestionModalProvider>
    </RequestModalProvider>
  );
}
