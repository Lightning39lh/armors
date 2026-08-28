import { useEffect, useState } from "react";

import { ARMOR_PART, getNextArmorPart } from "../domain/armor-part";
import type { ArmorPart } from "../domain/armor-part";
import type { ArmorPiece, SelectedArmorPieces } from "../domain/armor-piece";
import {
  COMBAT_FORMAT,
  type CombatFormat,
  validateBuhurtSelection,
} from "../domain/buhurt-rules";
import { getCatalogPieces } from "../domain/compatibility";
import { getArmorPieces } from "../services/armor-repository";
import { ArmorPieceDetails } from "./ArmorPieceDetails";
import { CombatFormatSelector } from "./CombatFormatSelector";
import { Mannequin } from "./Mannequin";
import { PartSelector } from "./PartSelector";
import { PieceCatalog } from "./PieceCatalog";
import { SelectedPieces } from "./SelectedPieces";
import { ValidationReport } from "./ValidationReport";

const ALL_PARTS_FILTER = "all" as const;

type PartFilter = ArmorPart | typeof ALL_PARTS_FILTER;

export function ArmorBuilder() {
  const [pieces, setPieces] = useState<ArmorPiece[]>([]);
  const [selectedPieces, setSelectedPieces] = useState<SelectedArmorPieces>({});
  const [selectedPart, setSelectedPart] = useState<PartFilter>(
    ARMOR_PART.HELMET,
  );
  const [selectedFormat, setSelectedFormat] = useState<CombatFormat>(
    COMBAT_FORMAT.BUHURT,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPieces() {
      try {
        const loadedPieces = await getArmorPieces();
        setPieces(loadedPieces);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : "Unknown loading error",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadPieces();
  }, []);

  const catalogPieces = getCatalogPieces(
    pieces,
    selectedPieces,
    selectedPart,
  );

  const selectedCount = Object.values(selectedPieces).filter(Boolean).length;
  const validationIssues = validateBuhurtSelection(
    selectedPieces,
    selectedFormat,
  );

  function selectPiece(piece: ArmorPiece) {
    setSelectedPieces((currentSelection) => ({
      ...currentSelection,
      [piece.part]: piece,
    }));
    setSelectedPart(getNextArmorPart(piece.part));
  }

  function removePiece(part: ArmorPart) {
    setSelectedPieces((currentSelection) => {
      const nextSelection = { ...currentSelection };
      delete nextSelection[part];
      return nextSelection;
    });
    setSelectedPart(part);
  }

  function resetSelection() {
    setSelectedPieces({});
    setSelectedPart(ARMOR_PART.HELMET);
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <h1>Constructor de armaduras históricas</h1>
        <p>
          Elegí una pieza y el sistema muestra solo las partes compatibles por
          rango de años.
        </p>
      </section>

      <section className="builder-layout">
        <div className="mannequin-panel card">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Maniquí</p>
              <h2>{selectedCount} piezas seleccionadas</h2>
            </div>
            <button className="ghost-button" type="button" onClick={resetSelection}>
              Reiniciar
            </button>
          </div>

          <Mannequin selectedPieces={selectedPieces} />
          <SelectedPieces selectedPieces={selectedPieces} onRemove={removePiece} />
        </div>

        <aside className="catalog-panel card">
          <PartSelector selectedPart={selectedPart} onSelectPart={setSelectedPart} />
          {isLoading ? <div className="empty-catalog">Cargando piezas...</div> : null}
          {loadError ? <div className="empty-catalog">{loadError}</div> : null}
          {!isLoading && !loadError ? (
            <PieceCatalog items={catalogPieces} onSelectPiece={selectPiece} />
          ) : null}
        </aside>
      </section>

      <section className="rules-layout">
        <div className="card rules-panel">
          <CombatFormatSelector
            selectedFormat={selectedFormat}
            onSelectFormat={setSelectedFormat}
          />
          <p className="rules-note">
            Este modelo usa fuentes oficiales disponibles públicamente, pero los
            PDFs técnicos requieren carga manual de páginas/secciones exactas
            antes de convertir advertencias en reglas definitivas.
          </p>
        </div>
        <ValidationReport issues={validationIssues} />
      </section>

      <ArmorPieceDetails selectedPieces={selectedPieces} />
    </main>
  );
}
