import type {
  InfractionSeverity,
  RuleEvidence,
  ValidationStatus,
} from "./buhurt-rules";

export interface ReviewFlagRule {
  status: ValidationStatus;
  severity: InfractionSeverity;
  title: string;
  description: string;
  evidence: RuleEvidence;
}

const AUTHENTICITY_INDEX_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Rules/Policies index",
  note: "Índice oficial con documentos de Marshal, Tournament y Authenticity.",
};

const WEAPONS_OCR_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Technical Requirements for Weapons.pdf",
  note: "Documento oficial identificado, pero sin texto extraíble localmente; requiere OCR antes de cargar medidas exactas.",
};

const GREAT_HELMS_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Helmet - Great Helms 2024.12.docx.pdf",
  note: "Texto extraído: reproducciones deben respetar fuente; eye slots máximo 25mm; no fabric aventails; placas cervicales ocultas.",
};

const KLAPPVISORS_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Klappvisors.pdf",
  note: "Texto extraído: proporciones históricas, bisagra/fijación, throat plate oculta, breath holes redondos máximo 10mm y eye slots máximo 25mm.",
};

const SIDE_HINGED_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Side-hinged visored Bascinets V2024.12.pdf",
  note: "Texto extraído: proporciones históricas, bisagras según fuente, throat plates ocultas, breath holes máximo 10mm y eye slots máximo 25mm.",
};

const WOLF_RIBS_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Wolf Ribs.pdf",
  note: "Texto extraído: visor con 5 ribs horizontales; ribs redondas o tipo barra; no lámina plana; eye slots sobredimensionados no recomendados.",
};

const AVENTAILS_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Aventails.docx.pdf",
  note: "Texto extraído: tipos chainmail/scale/fabric; scale aventails solapados sin gaps; fabric aventails aprobados para 14th/transitional y denegados para 15th-century armors.",
};

const NECK_PROTECTION_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Neck Protection.pdf",
  note: "Texto extraído: cuello/garganta obligatorios; visible debe basarse en fuentes; no documentado debe ocultarse; piezas firmemente sujetas.",
};

const SHIELDS_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Shields and Bucklers(1).pdf",
  note: "Texto extraído: escudos/bucklers basados en fuentes, proporciones/curvas históricas, madera/metal, estilo coherente con kit, sin símbolos modernos/ofensivos, máximo 5kg.",
};

const TEXTILES_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Textiles and Leather V2024.12.pdf",
  note: "Texto extraído: textiles/leather deben basarse en fuentes; elementos modernos visibles no permitidos; piel cubierta.",
};

const TABARDS_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Tabards V2024.12.pdf",
  note: "Texto extraído: tipos de tabard, materiales permitidos, sistemas de fijación, colores, símbolos/decoraciones y excepción de cuirass.",
};

const BELT_FLAG_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Belt Flag V2024.12.docx.pdf",
  note: "Texto extraído: máximo dos belt flags; fabric/leather; número 01-99; decoración moderna denegada; decoración no debe afectar legibilidad.",
};

const AESTHETICS_EVIDENCE: RuleEvidence = {
  sourceName: "Buhurt International",
  sourceUrl: "https://www.buhurtinternational.com/rules",
  documentName: "Armors and weapons Aesthetics and Decoration V2024.12.pdf",
  note: "Texto extraído: metal armor/buckler/weapon pintado denegado; decoración de casco permitida si respeta espíritu medieval y fuentes; reparaciones modernas permitidas si ocultas.",
};

export const REVIEW_FLAG_RULES: Record<string, ReviewFlagRule> = {
  "eye-slot-safety": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar altura de eye slots",
    description:
      "Hay regla confirmada: varios documentos de casco indican que los eye slots no deben exceder 25mm de alto. Falta cargar la medida real de esta pieza para validar automáticamente.",
    evidence: SIDE_HINGED_EVIDENCE,
  },
  "breath-hole-safety": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar breath holes del visor",
    description:
      "Hay regla confirmada: en klappvisors/side-hinged bascinets los breath holes redondos no deben exceder 10mm y no deben comprometer la estructura.",
    evidence: KLAPPVISORS_EVIDENCE,
  },
  "perforation-or-opening-safety": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar perforaciones y aberturas",
    description:
      "Parte de la regla está confirmada para cascos con texto extraíble, pero el documento Perforated Visor Bascinets todavía requiere OCR para sus requisitos específicos.",
    evidence: AUTHENTICITY_INDEX_EVIDENCE,
  },
  "great-helm-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar requisitos de Great Helm",
    description:
      "Regla confirmada: debe respetar apariencia/proporciones de fuente histórica; eye slots máximo 25mm; no fabric aventails; placas cervicales ocultas bajo aventail.",
    evidence: GREAT_HELMS_EVIDENCE,
  },
  "klappvisor-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar requisitos de Klappvisor",
    description:
      "Regla confirmada: debe respetar proporciones de fuente, bisagra/fijación histórica, aberturas seguras y cualquier placa de garganta agregada debe quedar oculta bajo aventail.",
    evidence: KLAPPVISORS_EVIDENCE,
  },
  "side-hinged-bascinet-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar side-hinged bascinet",
    description:
      "Regla confirmada: debe respetar fuente/proporciones, bisagras históricas, throat plates ocultas, breath holes máximo 10mm y eye slots máximo 25mm.",
    evidence: SIDE_HINGED_EVIDENCE,
  },
  "visor-hinge": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar bisagra/fijación del visor",
    description:
      "Regla confirmada: la bisagra o sistema de fijación del visor debe reproducirse según fuentes históricas; soldadura permitida solo si conserva apariencia funcional.",
    evidence: KLAPPVISORS_EVIDENCE,
  },
  "visor-proportions": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar proporciones del visor",
    description:
      "Regla confirmada: el visor no debe ser demasiado largo/corto y debe respetar proporciones documentadas por fuentes históricas.",
    evidence: SIDE_HINGED_EVIDENCE,
  },
  "wolf-ribs-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar visor Wolf Ribs",
    description:
      "Regla confirmada: el visor debe tener 5 ribs horizontales; las ribs deben ser redondas o tipo barra y no pueden ser lámina plana.",
    evidence: WOLF_RIBS_EVIDENCE,
  },
  "wolfrib-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar visor Wolf Ribs",
    description:
      "Regla confirmada: el visor debe tener 5 ribs horizontales; las ribs deben ser redondas o tipo barra y no pueden ser lámina plana.",
    evidence: WOLF_RIBS_EVIDENCE,
  },
  "rib-shape": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar forma de ribs",
    description:
      "Regla confirmada: las ribs del visor Wolf Ribs deben ser redondas o tipo barra; las piezas hechas con lámina plana quedan denegadas.",
    evidence: WOLF_RIBS_EVIDENCE,
  },
  "scale-overlap": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar solape de scales",
    description:
      "Regla confirmada: las scales del aventail deben estar contorneadas, fijadas con seguridad, apoyar parejo y solaparse levemente sin gaps.",
    evidence: AVENTAILS_EVIDENCE,
  },
  "pelerine-attachment": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar pelerine/suspensión del aventail",
    description:
      "Regla confirmada: el PDF de Aventails contiene requisitos de suspension system y materiales; falta modelar cómo declara la pieza su sistema de sujeción.",
    evidence: AVENTAILS_EVIDENCE,
  },
  "not-for-15th-century-risk": {
    status: "manualReview",
    severity: "manualReview",
    title: "Fabric aventail no aprobado para 15th-century armor",
    description:
      "Regla confirmada: los fabric aventails están aprobados para 14th-century/transitional armor y denegados para 15th-century armor. Falta validar contra la datación del kit completo.",
    evidence: AVENTAILS_EVIDENCE,
  },
  "aventail-compatibility": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar compatibilidad casco-aventail",
    description:
      "Regla confirmada: Great Helms admiten chainmail o scale aventails y no admiten fabric aventails; Wolf Ribs admiten chainmail o fabric y no scale.",
    evidence: GREAT_HELMS_EVIDENCE,
  },
  "must-be-concealed": {
    status: "manualReview",
    severity: "manualReview",
    title: "Elemento debe estar oculto",
    description:
      "Regla confirmada: placas cervicales/neck plates no documentadas o protectores agregados deben ocultarse bajo aventail/gambeson según el documento aplicable.",
    evidence: NECK_PROTECTION_EVIDENCE,
  },
  "visible-source-or-concealed": {
    status: "manualReview",
    severity: "manualReview",
    title: "Visible con fuente histórica u oculto",
    description:
      "Regla confirmada: todo tipo de neck protection visible debe basarse en fuentes históricas; si no se basa en fuentes, debe quedar oculto.",
    evidence: NECK_PROTECTION_EVIDENCE,
  },
  "neck-protection-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar protección de cuello",
    description:
      "Regla confirmada: la protección de cuello/garganta es obligatoria en Buhurt y debe estar firmemente sujeta para mantener protección alta.",
    evidence: NECK_PROTECTION_EVIDENCE,
  },
  "attachment-safety": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar sujeción de la pieza",
    description:
      "Regla confirmada en neck protection y cascos: las piezas agregadas deben estar firmemente sujetas para evitar roturas y mantener protección durante contacto completo.",
    evidence: NECK_PROTECTION_EVIDENCE,
  },
  "shields-and-bucklers": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar reglas de shields/bucklers",
    description:
      "Regla confirmada: deben basarse en fuentes, reproducir proporciones/curvas, ser de madera o metal, matchear el kit, no usar imágenes modernas/ofensivas y no exceder 5kg.",
    evidence: SHIELDS_EVIDENCE,
  },
  "buckler-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar buckler",
    description:
      "Regla confirmada: bucklers aparecen como sección específica dentro de Shields and Bucklers; aplicar requisitos generales y específicos del documento.",
    evidence: SHIELDS_EVIDENCE,
  },
  "punch-shield-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar punch shield",
    description:
      "Regla confirmada: Punch shield tiene sección específica dentro de Shields and Bucklers; aplicar requisitos generales y específicos del documento.",
    evidence: SHIELDS_EVIDENCE,
  },
  "round-shield-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar round shield",
    description:
      "Regla confirmada: Round shield tiene sección específica dentro de Shields and Bucklers; aplicar requisitos generales y específicos del documento.",
    evidence: SHIELDS_EVIDENCE,
  },
  "metal-shield-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar escudo metálico",
    description:
      "Regla confirmada: Shields and Bucklers incluye requisitos para metal shields; además, metal bucklers pintados están denegados por Aesthetics and Decoration.",
    evidence: SHIELDS_EVIDENCE,
  },
  "belt-flag": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar belt flag",
    description:
      "Regla confirmada: competidor debe tener belt flag con número; puede tener segunda decorativa; máximo dos; fabric/leather; símbolos modernos denegados.",
    evidence: BELT_FLAG_EVIDENCE,
  },
  "number-readability": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar legibilidad del número",
    description:
      "Regla confirmada: el belt flag debe usar números 01-99 y la decoración no debe interferir con su legibilidad.",
    evidence: BELT_FLAG_EVIDENCE,
  },
  "textile-and-leather": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar textiles/leather",
    description:
      "Regla confirmada: textiles y cuero deben basarse en fuentes; elementos modernos visibles como leggings/knee pads/underpants están denegados.",
    evidence: TEXTILES_EVIDENCE,
  },
  "material-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar materiales",
    description:
      "Regla confirmada: tabards/textiles admiten wool, linen, silk, cotton u otros materiales con fuente histórica; materiales modernos requieren replicar estética y resistencia.",
    evidence: TABARDS_EVIDENCE,
  },
  "symbols-and-decorations": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar símbolos y decoración",
    description:
      "Regla confirmada: formas, diseños y decoraciones deben basarse en fuentes; símbolos modernos/ofensivos quedan denegados en documentos de tabards, shields y casco.",
    evidence: TABARDS_EVIDENCE,
  },
  tabards: {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar tabard",
    description:
      "Regla confirmada: Tabards define sleeveless, short-sleeves y long-sleeves, además de materiales, fastening, colores y decoración.",
    evidence: TABARDS_EVIDENCE,
  },
  "aesthetics-and-decorations": {
    status: "manualReview",
    severity: "manualReview",
    title: "Validar estética/decoración",
    description:
      "Regla confirmada: piezas metálicas pintadas de armadura, bucklers metálicos y armas pintadas están denegadas; decoración debe estar basada en fuente o coherencia medieval.",
    evidence: AESTHETICS_EVIDENCE,
  },
  "weapon-requirements": {
    status: "manualReview",
    severity: "manualReview",
    title: "Requiere OCR de armas",
    description:
      "El documento oficial de armas fue identificado, pero localmente no tiene texto extraíble. No se deben cargar medidas ni tolerancias hasta extraerlo con OCR.",
    evidence: WEAPONS_OCR_EVIDENCE,
  },
  "weapon-chart": {
    status: "manualReview",
    severity: "manualReview",
    title: "Requiere OCR de tabla de armas",
    description:
      "La compatibilidad técnica de armas depende del documento oficial de armas/weapon chart; todavía requiere OCR antes de validar medidas o categorías.",
    evidence: WEAPONS_OCR_EVIDENCE,
  },
  "weapon-shield-chart": {
    status: "manualReview",
    severity: "manualReview",
    title: "Requiere tabla weapon/shield",
    description:
      "La combinación arma-escudo depende de chart oficial. Shields tiene texto extraíble, pero la parte de armas todavía requiere OCR.",
    evidence: WEAPONS_OCR_EVIDENCE,
  },
  "edge-and-tip-safety": {
    status: "manualReview",
    severity: "manualReview",
    title: "Requiere OCR para filo/punta",
    description:
      "No cargar radios, espesores ni tolerancias de filos/puntas sin OCR del documento oficial Technical Requirements for Weapons.pdf.",
    evidence: WEAPONS_OCR_EVIDENCE,
  },
  "polearm-grip-rule": {
    status: "manualReview",
    severity: "manualReview",
    title: "Verificar regla de agarre de polearm",
    description:
      "Hay referencia pública a uso de pole weapons con al menos una mano, pero los requisitos técnicos completos del arma siguen dependiendo del PDF que requiere OCR.",
    evidence: WEAPONS_OCR_EVIDENCE,
  },
};

export function getReviewFlagRule(flag: string): ReviewFlagRule | undefined {
  return REVIEW_FLAG_RULES[flag];
}
