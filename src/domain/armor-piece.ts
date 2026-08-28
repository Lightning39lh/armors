import type { ArmorPart } from "./armor-part";
import type { CombatFormat, ProtectedZone } from "./buhurt-rules";
import type { HistoricalRegion } from "./historical-region";

export interface ArmorPieceSource {
  name: string;
  url: string;
  note: string;
}

export interface ArmorPiece {
  id: string;
  name: string;
  part: ArmorPart;
  subtype: string;
  historicalRegions?: HistoricalRegion[];
  cultureGroup?: string;
  startYear: number;
  endYear: number;
  thumbnail: string;
  image: string;
  allowedFormats: CombatFormat[];
  protectedZones: ProtectedZone[];
  requires: string[];
  reviewFlags: string[];
  sources: ArmorPieceSource[];
}

export type SelectedArmorPieces = Partial<Record<ArmorPart, ArmorPiece>>;
