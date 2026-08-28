import { ARMOR_PART_LABEL, ARMOR_PART_ORDER } from "../domain/armor-part";
import type { ArmorPiece, SelectedArmorPieces } from "../domain/armor-piece";
import { COMBAT_FORMAT_LABEL } from "../domain/buhurt-rules";
import { HISTORICAL_REGION_LABEL } from "../domain/historical-region";

interface ArmorPieceDetailsProps {
  selectedPieces: SelectedArmorPieces;
}

export function ArmorPieceDetails({ selectedPieces }: ArmorPieceDetailsProps) {
  const pieces = ARMOR_PART_ORDER.map((part) => selectedPieces[part]).filter(
    (piece): piece is ArmorPiece => Boolean(piece),
  );

  return (
    <section className="piece-details-report card" aria-label="Detalle de piezas">
      <div className="panel-heading compact">
        <div>
          <p className="eyebrow">Detalle final</p>
          <h2>Cosas a tener en cuenta por pieza</h2>
        </div>
      </div>

      {pieces.length === 0 ? (
        <div className="empty-catalog compact">
          Todavía no seleccionaste piezas. Cuando armes la armadura, acá vas a
          ver el detalle técnico de cada parte.
        </div>
      ) : (
        <div className="piece-detail-grid">
          {pieces.map((piece) => (
            <PieceDetailCard key={piece.id} piece={piece} />
          ))}
        </div>
      )}
    </section>
  );
}

interface PieceDetailCardProps {
  piece: ArmorPiece;
}

function PieceDetailCard({ piece }: PieceDetailCardProps) {
  const regions = piece.historicalRegions?.map(
    (region) => HISTORICAL_REGION_LABEL[region],
  );

  return (
    <article className="piece-detail-card">
      <div className="piece-detail-header">
        <img alt="" className="piece-thumb" loading="lazy" src={piece.thumbnail} />
        <div>
          <span className="part-badge">{ARMOR_PART_LABEL[piece.part]}</span>
          <h3>{piece.name}</h3>
          <p>
            {piece.startYear}–{piece.endYear} · {piece.subtype}
          </p>
        </div>
      </div>

      <dl className="detail-list">
        <div>
          <dt>Región / cultura</dt>
          <dd>{regions?.join(", ") ?? "Sin región cargada"}</dd>
        </div>
        <div>
          <dt>Grupo cultural</dt>
          <dd>{piece.cultureGroup ?? "Sin grupo cargado"}</dd>
        </div>
        <div>
          <dt>Modalidades marcadas</dt>
          <dd>
            {piece.allowedFormats
              .map((format) => COMBAT_FORMAT_LABEL[format])
              .join(", ")}
          </dd>
        </div>
        <div>
          <dt>Zonas protegidas declaradas</dt>
          <dd>{piece.protectedZones.join(", ") || "Ninguna"}</dd>
        </div>
        <div>
          <dt>Requiere</dt>
          <dd>{piece.requires.join(", ") || "Sin requisitos cargados"}</dd>
        </div>
      </dl>

      {piece.reviewFlags.length > 0 ? (
        <div className="review-block">
          <strong>Revisar antes de aprobar</strong>
          <ul>
            {piece.reviewFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="source-block">
        <strong>Fuentes</strong>
        <ul>
          {piece.sources.map((source) => (
            <li key={`${source.name}-${source.url}-${source.note}`}>
              <a href={source.url} rel="noreferrer" target="_blank">
                {source.name}
              </a>
              <span> — {source.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
