import {
  COMBAT_FORMAT,
  COMBAT_FORMAT_LABEL,
  type CombatFormat,
} from "../domain/buhurt-rules";

const FORMAT_ORDER = [
  COMBAT_FORMAT.BUHURT,
  COMBAT_FORMAT.DUEL,
  COMBAT_FORMAT.OUTRANCE,
  COMBAT_FORMAT.MASS_BATTLE,
  COMBAT_FORMAT.FULL_PLATE_HARNESS,
] as const;

interface CombatFormatSelectorProps {
  selectedFormat: CombatFormat;
  onSelectFormat: (format: CombatFormat) => void;
}

export function CombatFormatSelector({
  selectedFormat,
  onSelectFormat,
}: CombatFormatSelectorProps) {
  return (
    <section className="format-selector" aria-label="Modalidad de combate">
      <p className="eyebrow">Reglamento</p>
      <h2>Modalidad</h2>
      <div className="part-grid">
        {FORMAT_ORDER.map((format) => (
          <button
            className={selectedFormat === format ? "part-chip active" : "part-chip"}
            key={format}
            type="button"
            onClick={() => onSelectFormat(format)}
          >
            {COMBAT_FORMAT_LABEL[format]}
          </button>
        ))}
      </div>
    </section>
  );
}
