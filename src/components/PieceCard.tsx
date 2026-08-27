import type { ArmorPiece } from "../domain/armor-piece";

interface PieceCardProps {
  piece: ArmorPiece;
  label: string;
  isCompatible: boolean;
  isSelected: boolean;
  onSelectPiece: (piece: ArmorPiece) => void;
}

export function PieceCard({
  piece,
  label,
  isCompatible,
  isSelected,
  onSelectPiece,
}: PieceCardProps) {
  const isDisabled = !isCompatible || isSelected;

  return (
    <article className={isCompatible ? "piece-card" : "piece-card incompatible"}>
      <img alt="" className="piece-thumb" loading="lazy" src={piece.thumbnail} />
      <div className="piece-details">
        <span className="part-badge">{label}</span>
        <h3>{piece.name}</h3>
        <p>
          {piece.startYear}–{piece.endYear}
        </p>
        {!isCompatible ? (
          <p className="compatibility-warning">No compatible con la selección actual</p>
        ) : null}
        {isSelected ? <p className="compatibility-warning">Ya está colocada</p> : null}
      </div>
      <button type="button" disabled={isDisabled} onClick={() => onSelectPiece(piece)}>
        {isSelected ? "Colocada" : "Colocar"}
      </button>
    </article>
  );
}
