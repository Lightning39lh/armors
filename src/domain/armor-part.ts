export const ARMOR_PART = {
  HELMET: "helmet",
  NECK_PROTECTION: "neckProtection",
  CHEST: "chest",
  ARMS: "arms",
  GLOVES: "gloves",
  LEGS: "legs",
  BOOTS: "boots",
  WEAPON: "weapon",
  SHIELD: "shield",
  TABARD: "tabard",
} as const;

export type ArmorPart = (typeof ARMOR_PART)[keyof typeof ARMOR_PART];

export const ARMOR_PART_LABEL: Record<ArmorPart, string> = {
  [ARMOR_PART.HELMET]: "Casco",
  [ARMOR_PART.NECK_PROTECTION]: "Protección de cuello",
  [ARMOR_PART.CHEST]: "Pechera",
  [ARMOR_PART.ARMS]: "Brazos",
  [ARMOR_PART.GLOVES]: "Guantes",
  [ARMOR_PART.LEGS]: "Piernas",
  [ARMOR_PART.BOOTS]: "Botas",
  [ARMOR_PART.WEAPON]: "Arma",
  [ARMOR_PART.SHIELD]: "Escudo",
  [ARMOR_PART.TABARD]: "Tabardo",
};

export const ARMOR_PART_ORDER = [
  ARMOR_PART.HELMET,
  ARMOR_PART.NECK_PROTECTION,
  ARMOR_PART.CHEST,
  ARMOR_PART.ARMS,
  ARMOR_PART.GLOVES,
  ARMOR_PART.LEGS,
  ARMOR_PART.BOOTS,
  ARMOR_PART.WEAPON,
  ARMOR_PART.SHIELD,
  ARMOR_PART.TABARD,
] as const;

export function getNextArmorPart(currentPart: ArmorPart): ArmorPart | "all" {
  const currentIndex = ARMOR_PART_ORDER.indexOf(currentPart);
  const nextPart = ARMOR_PART_ORDER[currentIndex + 1];

  return nextPart ?? "all";
}

export interface ArmorPartSlot {
  top: string;
  left: string;
  width: string;
  zIndex: number;
}

export const ARMOR_PART_SLOT: Record<ArmorPart, ArmorPartSlot> = {
  [ARMOR_PART.HELMET]: {
    top: "5%",
    left: "38%",
    width: "24%",
    zIndex: 60,
  },
  [ARMOR_PART.NECK_PROTECTION]: {
    top: "15%",
    left: "35%",
    width: "30%",
    zIndex: 55,
  },
  [ARMOR_PART.CHEST]: {
    top: "22%",
    left: "26%",
    width: "48%",
    zIndex: 40,
  },
  [ARMOR_PART.ARMS]: {
    top: "18%",
    left: "1%",
    width: "98%",
    zIndex: 30,
  },
  [ARMOR_PART.GLOVES]: {
    top: "22%",
    left: "3%",
    width: "94%",
    zIndex: 82,
  },
  [ARMOR_PART.LEGS]: {
    top: "42%",
    left: "27%",
    width: "46%",
    zIndex: 20,
  },
  [ARMOR_PART.BOOTS]: {
    top: "78%",
    left: "30%",
    width: "40%",
    zIndex: 70,
  },
  [ARMOR_PART.WEAPON]: {
    top: "30%",
    left: "73%",
    width: "22%",
    zIndex: 80,
  },
  [ARMOR_PART.SHIELD]: {
    top: "30%",
    left: "2%",
    width: "29%",
    zIndex: 75,
  },
  [ARMOR_PART.TABARD]: {
    top: "26%",
    left: "32%",
    width: "36%",
    zIndex: 65,
  },
};
