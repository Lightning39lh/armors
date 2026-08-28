import { ARMOR_PART_LABEL } from "../domain/armor-part";
import type { ArmorPieceAvailability } from "../domain/compatibility";
import type { ArmorPiece } from "../domain/armor-piece";
import { PieceCard } from "./PieceCard";

interface PieceCatalogProps {
  items: ArmorPieceAvailability[];
  onSelectPiece: (piece: ArmorPiece) => void;
}

export function PieceCatalog({ items, onSelectPiece }: PieceCatalogProps) {
  if (items.length === 0) {
    return (
      <div className="empty-catalog">
        No hay piezas para este filtro. Elegí otra parte o agregá más datos al
        JSON.
      </div>
    );
  }

  const compatibleCount = items.filter((item) => item.isCompatible).length;
  const incompatibleCount = items.length - compatibleCount;
  const compatibleItems = items.filter((item) => item.isCompatible);
  const incompatibleItems = items.filter((item) => !item.isCompatible);

  return (
    <section className="piece-list" aria-label="Piezas del catálogo">
      <div className="catalog-summary">
        <strong>{compatibleCount}</strong> compatibles ·{" "}
        <strong>{incompatibleCount}</strong> no compatibles
      </div>

      <div className="catalog-section">
        <h3>Disponibles</h3>
        {compatibleItems.length > 0 ? (
          compatibleItems.map(({ piece, isCompatible, isSelected, incompatibleReasons }) => (
            <PieceCard
              key={piece.id}
              isCompatible={isCompatible}
              isSelected={isSelected}
              incompatibleReasons={incompatibleReasons}
              label={ARMOR_PART_LABEL[piece.part]}
              piece={piece}
              onSelectPiece={onSelectPiece}
            />
          ))
        ) : (
          <div className="empty-catalog compact">
            No hay piezas compatibles para esta parte.
          </div>
        )}
      </div>

      {incompatibleItems.length > 0 ? (
        <div className="catalog-section incompatible-section">
          <h3>No compatibles</h3>
          {incompatibleItems.map(({ piece, isCompatible, isSelected, incompatibleReasons }) => (
            <PieceCard
              key={piece.id}
              isCompatible={isCompatible}
              isSelected={isSelected}
              incompatibleReasons={incompatibleReasons}
              label={ARMOR_PART_LABEL[piece.part]}
              piece={piece}
              onSelectPiece={onSelectPiece}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
