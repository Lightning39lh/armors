import {
  ARMOR_PART_LABEL,
  ARMOR_PART_ORDER,
  type ArmorPart,
} from "../domain/armor-part";
import type { SelectedArmorPieces } from "../domain/armor-piece";

interface SelectedPiecesProps {
  selectedPieces: SelectedArmorPieces;
  onRemove: (part: ArmorPart) => void;
}

export function SelectedPieces({ selectedPieces, onRemove }: SelectedPiecesProps) {
  return (
    <section className="selected-list" aria-label="Piezas seleccionadas">
      {ARMOR_PART_ORDER.map((part) => {
        const piece = selectedPieces[part];

        return (
          <article className="selected-row" key={part}>
            <div>
              <strong>{ARMOR_PART_LABEL[part]}</strong>
              <span>
                {piece
                  ? `${piece.name} · ${piece.startYear}–${piece.endYear}`
                  : "Sin seleccionar"}
              </span>
            </div>

            {piece ? (
              <button type="button" onClick={() => onRemove(part)}>
                Quitar
              </button>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
