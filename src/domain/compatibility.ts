import type { ArmorPart } from "./armor-part";
import type { ArmorPiece, SelectedArmorPieces } from "./armor-piece";
import { areHistoricalRegionsCompatible } from "./historical-region";

export interface ArmorPieceAvailability {
  piece: ArmorPiece;
  isCompatible: boolean;
  isSelected: boolean;
  incompatibleReasons: string[];
}

export function areYearRangesCompatible(a: ArmorPiece, b: ArmorPiece): boolean {
  return a.startYear <= b.endYear && b.startYear <= a.endYear;
}

export function isCompatibleWithSelection(
  candidate: ArmorPiece,
  selectedPieces: SelectedArmorPieces,
): boolean {
  return getCompatibilityIssues(candidate, selectedPieces).length === 0;
}

export function getCompatibilityIssues(
  candidate: ArmorPiece,
  selectedPieces: SelectedArmorPieces,
): string[] {
  const selectedValues = Object.values(selectedPieces);
  const issues: string[] = [];

  selectedValues.forEach((selectedPiece) => {
    if (!selectedPiece || selectedPiece.part === candidate.part) {
      return;
    }

    if (!areYearRangesCompatible(candidate, selectedPiece)) {
      issues.push(`No comparte rango histórico con ${selectedPiece.name}.`);
    }

    if (
      !areHistoricalRegionsCompatible(
        candidate.historicalRegions,
        selectedPiece.historicalRegions,
      )
    ) {
      issues.push(`No comparte región/cultura compatible con ${selectedPiece.name}.`);
    }
  });

  return issues;
}

export function getAvailablePieces(
  pieces: ArmorPiece[],
  selectedPieces: SelectedArmorPieces,
  selectedPart: ArmorPart | "all",
): ArmorPiece[] {
  return pieces.filter((piece) => {
    const matchesPart = selectedPart === "all" || piece.part === selectedPart;
    const isAlreadySelectedForPart = selectedPieces[piece.part]?.id === piece.id;

    return (
      matchesPart &&
      !isAlreadySelectedForPart &&
      isCompatibleWithSelection(piece, selectedPieces)
    );
  });
}

export function getCatalogPieces(
  pieces: ArmorPiece[],
  selectedPieces: SelectedArmorPieces,
  selectedPart: ArmorPart | "all",
): ArmorPieceAvailability[] {
  return pieces
    .filter((piece) => selectedPart === "all" || piece.part === selectedPart)
    .map((piece) => {
      const incompatibleReasons = getCompatibilityIssues(piece, selectedPieces);

      return {
        piece,
        isCompatible: incompatibleReasons.length === 0,
        isSelected: selectedPieces[piece.part]?.id === piece.id,
        incompatibleReasons,
      };
    });
}
