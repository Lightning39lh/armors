import {
  ARMOR_PART_LABEL,
  ARMOR_PART_ORDER,
  type ArmorPart,
} from "../domain/armor-part";

type PartFilter = ArmorPart | "all";

interface PartSelectorProps {
  selectedPart: PartFilter;
  onSelectPart: (part: PartFilter) => void;
}

export function PartSelector({ selectedPart, onSelectPart }: PartSelectorProps) {
  return (
    <section className="part-selector" aria-label="Filtro por parte">
      <div className="panel-heading compact">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h2>Partes disponibles</h2>
        </div>
      </div>

      <div className="part-grid">
        <button
          className={selectedPart === "all" ? "part-chip active" : "part-chip"}
          type="button"
          onClick={() => onSelectPart("all")}
        >
          Todas
        </button>

        {ARMOR_PART_ORDER.map((part) => (
          <button
            className={selectedPart === part ? "part-chip active" : "part-chip"}
            key={part}
            type="button"
            onClick={() => onSelectPart(part)}
          >
            {ARMOR_PART_LABEL[part]}
          </button>
        ))}
      </div>
    </section>
  );
}
