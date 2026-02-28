"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { Modal } from "./Modal";
import { RequestForm } from "./RequestForm";

type RequestModalContextValue = {
  open: () => void;
  close: () => void;
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

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <RequestModalContext.Provider value={value}>
      {children}
      <Modal open={isOpen} onClose={close}>
        <RequestForm />
      </Modal>
    </RequestModalContext.Provider>
  );
}
