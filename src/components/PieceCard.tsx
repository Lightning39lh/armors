import type { ArmorPiece } from "../domain/armor-piece";
import { COMBAT_FORMAT_LABEL } from "../domain/buhurt-rules";

interface PieceCardProps {
  piece: ArmorPiece;
  label: string;
  isCompatible: boolean;
  isSelected: boolean;
  incompatibleReasons: string[];
  onSelectPiece: (piece: ArmorPiece) => void;
}

export function PieceCard({
  piece,
  label,
  isCompatible,
  isSelected,
  incompatibleReasons,
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
        <div className="format-tags" aria-label="Modalidades permitidas">
          {piece.allowedFormats.map((format) => (
            <span key={format}>{COMBAT_FORMAT_LABEL[format]}</span>
          ))}
        </div>
        {!isCompatible ? (
          <div className="compatibility-warning">
            <strong>No compatible con la selección actual</strong>
            <ul>
              {incompatibleReasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {isSelected ? <p className="compatibility-warning">Ya está colocada</p> : null}
      </div>
      <button type="button" disabled={isDisabled} onClick={() => onSelectPiece(piece)}>
        {isSelected ? "Colocada" : "Colocar"}
      </button>
    </article>
  );
}
