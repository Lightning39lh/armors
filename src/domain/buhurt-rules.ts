import { ARMOR_PART } from "./armor-part";
import type { ArmorPart } from "./armor-part";
import type { ArmorPiece, SelectedArmorPieces } from "./armor-piece";
import { areHistoricalRegionsCompatible } from "./historical-region";

export const COMBAT_FORMAT = {
  BUHURT: "buhurt",
  DUEL: "duel",
  OUTRANCE: "outrance",
  MASS_BATTLE: "massBattle",
  FULL_PLATE_HARNESS: "fullPlateHarness",
} as const;

export type CombatFormat = (typeof COMBAT_FORMAT)[keyof typeof COMBAT_FORMAT];

export const COMBAT_FORMAT_LABEL: Record<CombatFormat, string> = {
  [COMBAT_FORMAT.BUHURT]: "Buhurt",
  [COMBAT_FORMAT.DUEL]: "Duelo",
  [COMBAT_FORMAT.OUTRANCE]: "Outrance",
  [COMBAT_FORMAT.MASS_BATTLE]: "Batalla masiva",
  [COMBAT_FORMAT.FULL_PLATE_HARNESS]: "Full plate harness",
};

export const PROTECTED_ZONE = {
  HEAD: "head",
  FACE: "face",
  NECK: "neck",
  THROAT: "throat",
  TORSO: "torso",
  SPINE: "spine",
  SHOULDERS: "shoulders",
  ELBOWS: "elbows",
  FOREARMS: "forearms",
  HANDS: "hands",
  GROIN: "groin",
  KNEES: "knees",
  SHINS: "shins",
  FEET: "feet",
} as const;

export type ProtectedZone = (typeof PROTECTED_ZONE)[keyof typeof PROTECTED_ZONE];

export const INFRACTION_SEVERITY = {
  INFO: "info",
  MINOR: "minor",
  MODERATE: "moderate",
  MAJOR: "major",
  CRITICAL: "critical",
  MANUAL_REVIEW: "manualReview",
} as const;

export type InfractionSeverity =
  (typeof INFRACTION_SEVERITY)[keyof typeof INFRACTION_SEVERITY];

export const INFRACTION_SEVERITY_LABEL: Record<InfractionSeverity, string> = {
  [INFRACTION_SEVERITY.INFO]: "Información",
  [INFRACTION_SEVERITY.MINOR]: "Falta menor",
  [INFRACTION_SEVERITY.MODERATE]: "Falta moderada",
  [INFRACTION_SEVERITY.MAJOR]: "Falta mayor",
  [INFRACTION_SEVERITY.CRITICAL]: "Crítica / rechazo o descalificación posible",
  [INFRACTION_SEVERITY.MANUAL_REVIEW]: "Revisión manual",
};

export const VALIDATION_STATUS = {
  PASS: "pass",
  WARNING: "warning",
  FAIL: "fail",
  MANUAL_REVIEW: "manualReview",
} as const;

export type ValidationStatus =
  (typeof VALIDATION_STATUS)[keyof typeof VALIDATION_STATUS];

export interface RuleEvidence {
  sourceName: string;
  sourceUrl: string;
  documentName: string;
  note: string;
}

export interface ValidationIssue {
  id: string;
  status: ValidationStatus;
  severity: InfractionSeverity;
  title: string;
  description: string;
  relatedParts: ArmorPart[];
  evidence: RuleEvidence;
}

const BUHURT_RULES_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Rules/Policies index",
  note: "Índice oficial con documentos de Marshal, Tournament y Authenticity.",
};

const BOTN_RULES_EVIDENCE: RuleEvidence = {
  sourceName: "Battle of the Nations / HMBIA",
  sourceUrl: "https://botn.info/rules/rules-for-buhurt-categories/",
  documentName: "Rules for Buhurt Categories",
  note: "Texto público con reglas generales, equipo autorizado, técnicas prohibidas y sanciones.",
};

const MINIMUM_BUHURT_PARTS = [
  ARMOR_PART.HELMET,
  ARMOR_PART.NECK_PROTECTION,
  ARMOR_PART.CHEST,
  ARMOR_PART.ARMS,
  ARMOR_PART.GLOVES,
  ARMOR_PART.LEGS,
  ARMOR_PART.BOOTS,
] as const;

const REQUIRED_BUHURT_ZONES = [
  PROTECTED_ZONE.HEAD,
  PROTECTED_ZONE.FACE,
  PROTECTED_ZONE.NECK,
  PROTECTED_ZONE.THROAT,
  PROTECTED_ZONE.TORSO,
  PROTECTED_ZONE.SPINE,
  PROTECTED_ZONE.ELBOWS,
  PROTECTED_ZONE.HANDS,
  PROTECTED_ZONE.KNEES,
  PROTECTED_ZONE.SHINS,
  PROTECTED_ZONE.FEET,
] as const;

export function validateBuhurtSelection(
  selectedPieces: SelectedArmorPieces,
  format: CombatFormat,
): ValidationIssue[] {
  const selectedValues = Object.values(selectedPieces).filter(Boolean);

  return [
    ...validateRequiredParts(selectedPieces, format),
    ...validateFormatAdmission(selectedValues, format),
    ...validateProtectedZones(selectedValues, format),
    ...validateRegionalCoherence(selectedValues),
    ...validateManualReviewFlags(selectedValues),
  ];
}

function validateRequiredParts(
  selectedPieces: SelectedArmorPieces,
  format: CombatFormat,
): ValidationIssue[] {
  if (format !== COMBAT_FORMAT.BUHURT) {
    return [];
  }

  return MINIMUM_BUHURT_PARTS.filter((part) => !selectedPieces[part]).map(
    (part) => ({
      id: `missing-${part}`,
      status: VALIDATION_STATUS.FAIL,
      severity: INFRACTION_SEVERITY.CRITICAL,
      title: `Falta ${part}`,
      description:
        "Para una revisión de Buhurt no alcanza con fecha histórica: debe existir cobertura completa de equipo protector.",
      relatedParts: [part],
      evidence: BUHURT_RULES_EVIDENCE,
    }),
  );
}

function validateFormatAdmission(
  selectedPieces: ArmorPiece[],
  format: CombatFormat,
): ValidationIssue[] {
  return selectedPieces
    .filter((piece) => !piece.allowedFormats.includes(format))
    .map((piece) => ({
      id: `format-${piece.id}-${format}`,
      status: VALIDATION_STATUS.FAIL,
      severity: INFRACTION_SEVERITY.MAJOR,
      title: `${piece.name} no está marcada para ${COMBAT_FORMAT_LABEL[format]}`,
      description:
        "Las reglas oficiales separan Buhurt, Duels, Outrance y otras modalidades. Una pieza debe validarse contra la modalidad correcta.",
      relatedParts: [piece.part],
      evidence: BUHURT_RULES_EVIDENCE,
    }));
}

function validateProtectedZones(
  selectedPieces: ArmorPiece[],
  format: CombatFormat,
): ValidationIssue[] {
  if (format !== COMBAT_FORMAT.BUHURT) {
    return [];
  }

  const protectedZones = new Set(
    selectedPieces.flatMap((piece) => piece.protectedZones),
  );

  return REQUIRED_BUHURT_ZONES.filter((zone) => !protectedZones.has(zone)).map(
    (zone) => ({
      id: `missing-zone-${zone}`,
      status: VALIDATION_STATUS.WARNING,
      severity: INFRACTION_SEVERITY.MANUAL_REVIEW,
      title: `Zona sin cobertura declarada: ${zone}`,
      description:
        "La zona no aparece cubierta por las piezas seleccionadas. Antes de aprobar, un marshal/authenticity checker debería revisarlo.",
      relatedParts: [],
      evidence: BOTN_RULES_EVIDENCE,
    }),
  );
}

function validateRegionalCoherence(selectedPieces: ArmorPiece[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  selectedPieces.forEach((piece, index) => {
    selectedPieces.slice(index + 1).forEach((otherPiece) => {
      if (
        !areHistoricalRegionsCompatible(
          piece.historicalRegions,
          otherPiece.historicalRegions,
        )
      ) {
        issues.push({
          id: `region-${piece.id}-${otherPiece.id}`,
          status: VALIDATION_STATUS.MANUAL_REVIEW,
          severity: INFRACTION_SEVERITY.MANUAL_REVIEW,
          title: `Posible mezcla regional: ${piece.name} + ${otherPiece.name}`,
          description:
            "La autenticidad histórica no depende solo del año: también puede depender de región, tradición material y contexto cultural. Esta combinación necesita revisión.",
          relatedParts: [piece.part, otherPiece.part],
          evidence: BUHURT_RULES_EVIDENCE,
        });
      }
    });
  });

  return issues;
}

function validateManualReviewFlags(
  selectedPieces: ArmorPiece[],
): ValidationIssue[] {
  return selectedPieces.flatMap((piece) =>
    piece.reviewFlags.map((flag) => ({
      id: `review-${piece.id}-${flag}`,
      status: VALIDATION_STATUS.MANUAL_REVIEW,
      severity: INFRACTION_SEVERITY.MANUAL_REVIEW,
      title: `${piece.name}: revisar ${flag}`,
      description:
        "Los PDFs oficiales tienen requisitos técnicos específicos. Esta app marca el punto para revisión manual hasta cargar la regla exacta con página/sección.",
      relatedParts: [piece.part],
      evidence: BUHURT_RULES_EVIDENCE,
    })),
  );
}
