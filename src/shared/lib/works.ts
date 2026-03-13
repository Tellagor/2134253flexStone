import type { WorkItem } from "@/shared/types";

const defaultFileNames = [
  "Rectangle 50.png",
  "Rectangle 51.png",
  "Rectangle 52.png",
  "Rectangle 53.png",
  "Rectangle 54.png",
  "Rectangle 55.png",
  "Rectangle 56.png",
];

function encodePublicPath(path: string) {
  return path.replace(/ /g, "%20");
}

export function createDefaultWorksItems(): WorkItem[] {
  return defaultFileNames.map((fileName, index) => ({
    id: `work-${index + 1}`,
    imageUrl: encodePublicPath(`/scroll/${fileName}`),
    alt: `Выполненная работа ${index + 1}`,
    title: "",
  }));
}

