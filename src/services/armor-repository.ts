import type { ArmorPiece } from "../domain/armor-piece";

export async function getArmorPieces(): Promise<ArmorPiece[]> {
  const response = await fetch("/data/armor-pieces.json");

  if (!response.ok) {
    throw new Error("Could not load armor pieces");
  }

  return (await response.json()) as ArmorPiece[];
}
