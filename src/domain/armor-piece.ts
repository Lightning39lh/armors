import type { ArmorPart } from "./armor-part";

export interface ArmorPiece {
  id: string;
  name: string;
  part: ArmorPart;
  startYear: number;
  endYear: number;
  thumbnail: string;
  image: string;
}

export type SelectedArmorPieces = Partial<Record<ArmorPart, ArmorPiece>>;
