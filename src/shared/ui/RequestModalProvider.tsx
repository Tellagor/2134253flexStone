"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { Modal } from "./Modal";
import { RequestForm } from "./RequestForm";
import type { LeadType } from "@/shared/types";

type RequestModalContextValue = {
  open: (context?: RequestModalContext) => void;
  close: () => void;
};

export type RequestModalContext = {
  type?: LeadType;
  productId?: number | null;
  productNameSnapshot?: string | null;
};

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

export function useRequestModal(): RequestModalContextValue {
  const ctx = useContext(RequestModalContext);
  if (!ctx) {
    throw new Error("useRequestModal must be used within RequestModalProvider");
  }
  return ctx;
}

export function RequestModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<RequestModalContext>({});

  const open = useCallback((next?: RequestModalContext) => {
    setContext(next ?? {});
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    setContext({});
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <RequestModalContext.Provider value={value}>
      {children}
      <Modal open={isOpen} onClose={close}>
        <RequestForm context={context} onSuccess={close} />
      </Modal>
    </RequestModalContext.Provider>
  );
}
