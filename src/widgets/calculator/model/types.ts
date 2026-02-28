export type CalculatorField = {
  label: string;
  name: string;
  type: "text" | "tel";
  placeholder?: string;
  mask?: "ru-phone";
  sanitize?: "digits";
};
