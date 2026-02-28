"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { Modal } from "./Modal";
import { QuestionForm } from "./QuestionForm";

type QuestionModalContextValue = {
  open: () => void;
  close: () => void;
};

const QuestionModalContext = createContext<QuestionModalContextValue | null>(null);

export function useQuestionModal(): QuestionModalContextValue {
  const ctx = useContext(QuestionModalContext);
  if (!ctx) {
    throw new Error("useQuestionModal must be used within QuestionModalProvider");
  }
  return ctx;
}

export function QuestionModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <QuestionModalContext.Provider value={value}>
      {children}
      <Modal open={isOpen} onClose={close} height={760} constrainToViewport={false}>
        <QuestionForm />
      </Modal>
    </QuestionModalContext.Provider>
  );
}
