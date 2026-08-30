import {
  ARMOR_PART_LABEL,
  ARMOR_PART_ORDER,
  ARMOR_PART_SLOT,
} from "../domain/armor-part";
import type { SelectedArmorPieces } from "../domain/armor-piece";

interface MannequinProps {
  selectedPieces: SelectedArmorPieces;
}

export function Mannequin({ selectedPieces }: MannequinProps) {
  return (
    <div className="mannequin" aria-label="Maniquí de armadura">
      <div className="silhouette" aria-hidden="true">
        <div className="silhouette-head" />
        <div className="silhouette-body" />
        <div className="silhouette-arm silhouette-arm-left" />
        <div className="silhouette-arm silhouette-arm-right" />
        <div className="silhouette-leg silhouette-leg-left" />
        <div className="silhouette-leg silhouette-leg-right" />
      </div>

      {ARMOR_PART_ORDER.map((part) => {
        const piece = selectedPieces[part];
        const slot = ARMOR_PART_SLOT[part];

        if (!piece) {
          return (
            <div
              className="empty-slot"
              key={part}
              style={{
                top: slot.top,
                left: slot.left,
                width: slot.width,
                zIndex: slot.zIndex,
              }}
            >
              {ARMOR_PART_LABEL[part]}
            </div>
          );
        }

        return (
          <img
            alt={piece.name}
            className={`armor-layer armor-layer-${part}`}
            key={piece.id}
            loading="lazy"
            src={piece.image}
            style={{
              top: slot.top,
              left: slot.left,
              width: slot.width,
              zIndex: slot.zIndex,
            }}
          />
        );
      })}
    </div>
  );
}
