export type AssortmentPriceTier = {
  id: number;
  fromM2: number;
  toM2: number | null;
  priceRub: number;
};

export type AssortmentItem = {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  priceTiers: AssortmentPriceTier[];
};

export type AssortmentSectionContent = {
  title: string;
  description: string;
};
