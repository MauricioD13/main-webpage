import type { AwsIconKey } from "./icons";

export interface DiagramNode {
  id: string;
  label: string;
  /** An AWS icon key, or omit and set `glyph` for non-AWS things (users, Odoo, GitHub…). */
  icon?: AwsIconKey;
  glyph?: string;
  x: number;
  y: number;
  size?: number;
  /** Shown in the hover/tap tooltip. */
  note?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  /** Intermediate points for orthogonal routing. */
  via?: [number, number][];
  dashed?: boolean;
}

export interface DiagramGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind?: "cloud" | "region" | "vpc" | "subnet" | "zone" | "external";
  /** Put the label at the bottom edge when lines enter the group from the top. */
  labelAt?: "top" | "bottom";
}

export interface Diagram {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
}

export interface ChartPoint {
  label: string;
  value: number;
}

export type DiagramI18n = Record<string, { label?: string; note?: string }>;

export const edgeId = (e: Pick<DiagramEdge, "from" | "to">) => `${e.from}-${e.to}`;

/** Payload sent from a <Scrolly> to the plate it controls. */
export interface PlateState {
  /** Element ids not revealed yet (edges touching a hidden node are hidden too). */
  hidden: string[];
  focus: string[];
  step: number;
}
