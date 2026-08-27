import type { ArmorPart } from "./armor-part";
import type { ArmorPiece, SelectedArmorPieces } from "./armor-piece";

export interface ArmorPieceAvailability {
  piece: ArmorPiece;
  isCompatible: boolean;
  isSelected: boolean;
}

export function areYearRangesCompatible(a: ArmorPiece, b: ArmorPiece): boolean {
  return a.startYear <= b.endYear && b.startYear <= a.endYear;
}

export function isCompatibleWithSelection(
  candidate: ArmorPiece,
  selectedPieces: SelectedArmorPieces,
): boolean {
  const selectedValues = Object.values(selectedPieces);

  return selectedValues.every((selectedPiece) => {
    if (!selectedPiece || selectedPiece.part === candidate.part) {
      return true;
    }

    return areYearRangesCompatible(candidate, selectedPiece);
  });
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
    .map((piece) => ({
      piece,
      isCompatible: isCompatibleWithSelection(piece, selectedPieces),
      isSelected: selectedPieces[piece.part]?.id === piece.id,
    }));
}
