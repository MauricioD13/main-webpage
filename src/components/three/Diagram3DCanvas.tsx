// 3D exploded view of an architecture plate. Same Diagram data as the SVG version:
// each group sits on its own layer by nesting depth (account > network > subnet …),
// nodes stand on the layer of their innermost group, and data flows along edges.
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Billboard, Line, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Diagram } from "../visual/types";

export interface Diagram3DProps {
  diagram: Diagram;
  /** Node id → SVG data URI of its AWS icon (rendered on the server). */
  icons: Record<string, string>;
  /** 0 = flat like the SVG plate, 1 = fully exploded. */
  explode: number;
  reduced: boolean;
}

const UNIT = 90; // SVG units per 3D unit
const LAYER_GAP = 1.15;

function inside(g: { x: number; y: number; w: number; h: number }, x: number, y: number) {
  return x >= g.x && x <= g.x + g.w && y >= g.y && y <= g.y + g.h;
}

function useLayout(diagram: Diagram) {
  return useMemo(() => {
    const groups = diagram.groups ?? [];
    const cx = diagram.width / 2;
    const cy = diagram.height / 2;
    // Depth of a group = how many other groups contain it.
    const depth = new Map(
      groups.map((g) => [
        g.id,
        groups.filter((o) => o !== g && inside(o, g.x + 1, g.y + 1) && inside(o, g.x + g.w - 1, g.y + g.h - 1)).length,
      ]),
    );
    const nodeLevel = new Map(
      diagram.nodes.map((n) => [n.id, Math.max(0, ...groups.filter((g) => inside(g, n.x, n.y)).map((g) => (depth.get(g.id) ?? 0) + 1))]),
    );
    const to3 = (x: number, y: number): [number, number] => [(x - cx) / UNIT, (y - cy) / UNIT];
    const levels = Math.max(1, ...nodeLevel.values(), ...[...depth.values()].map((d) => d + 1));
    return { groups, depth, nodeLevel, to3, levels };
  }, [diagram]);
}

function Packets({ paths, reduced }: { paths: THREE.Vector3[][]; reduced: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const per = 2;
  const state = useMemo(() => paths.flatMap((_, i) => Array.from({ length: per }, (_, k) => ({ path: i, t: k / per }))), [paths]);
  const m = useMemo(() => new THREE.Matrix4(), []);
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    state.forEach((s, i) => {
      if (!reduced) s.t = (s.t + delta * 0.35) % 1;
      const [a, b] = paths[s.path];
      v.lerpVectors(a, b, s.t);
      m.makeTranslation(v.x, v.y, v.z);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, state.length]}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color="#f2b33e" toneMapped={false} />
    </instancedMesh>
  );
}

/** The site font, as resolved by Astro's Fonts API. */
function siteFont() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-archivo").trim();
  return v || "system-ui, sans-serif";
}

/**
 * Text drawn onto a canvas texture, so labels live in the 3D scene (no DOM overlays).
 * `glyph` draws a ringed badge above the text for non-AWS nodes.
 */
function TextLabel({ text, height, color = "#e8e8e6", glyph, flat = false, anchorLeft = false, position }: { text: string; height: number; color?: string; glyph?: string; flat?: boolean; anchorLeft?: boolean; position: [number, number, number] }) {
  const { texture, aspect } = useMemo(() => {
    const px = 48;
    const pad = 12;
    const ring = glyph ? px * 2.2 : 0;
    const c = document.createElement("canvas");
    const g = c.getContext("2d")!;
    const font = `500 ${px}px ${siteFont()}`;
    g.font = font;
    const w = Math.ceil(Math.max(g.measureText(text).width, ring) + pad * 2);
    const h = Math.ceil(px * 1.3 + ring + pad * 2);
    c.width = w;
    c.height = h;
    if (glyph) {
      const r = ring / 2 - 4;
      g.beginPath();
      g.arc(w / 2, pad + r + 2, r, 0, Math.PI * 2);
      g.fillStyle = "#111";
      g.fill();
      g.lineWidth = 3;
      g.strokeStyle = color;
      g.stroke();
      g.font = `600 ${px * 0.7}px ${siteFont()}`;
      g.fillStyle = color;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(glyph, w / 2, pad + r + 4);
    }
    g.font = font;
    g.textAlign = anchorLeft ? "left" : "center";
    g.textBaseline = "top";
    g.shadowColor = "#000";
    g.shadowBlur = 8;
    g.fillStyle = color;
    g.fillText(text, anchorLeft ? pad : w / 2, pad + ring);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { texture: tex, aspect: w / h };
  }, [text, color, glyph, anchorLeft]);
  // Left-anchored labels start at `position` instead of centring on it.
  const shift = anchorLeft ? (height * aspect) / 2 : 0;
  const mesh = (
    <mesh rotation={flat ? [-Math.PI / 2, 0, 0] : [0, 0, 0]} position={[shift, 0, 0]}>
      <planeGeometry args={[height * aspect, height]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
  return flat ? <group position={position}>{mesh}</group> : <Billboard position={position}>{mesh}</Billboard>;
}

function IconCard({ uri, size }: { uri: string; size: number }) {
  const tex = useLoader(THREE.TextureLoader, uri);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

function Scene({ diagram, icons, explode, reduced }: Diagram3DProps) {
  const { groups, depth, nodeLevel, to3 } = useLayout(diagram);
  const gap = 0.02 + explode * LAYER_GAP;

  const nodePos = useMemo(
    () =>
      new Map(
        diagram.nodes.map((n) => {
          const [x, z] = to3(n.x, n.y);
          return [n.id, new THREE.Vector3(x, (nodeLevel.get(n.id) ?? 0) * gap + 0.32, z)];
        }),
      ),
    [diagram, nodeLevel, gap, to3],
  );
  const edgePaths = useMemo(
    () => diagram.edges.flatMap((e) => (nodePos.has(e.from) && nodePos.has(e.to) ? [[nodePos.get(e.from)!, nodePos.get(e.to)!]] : [])),
    [diagram, nodePos],
  );

  return (
    <group>
      {groups.map((g) => {
        const [x0, z0] = to3(g.x, g.y);
        const [x1, z1] = to3(g.x + g.w, g.y + g.h);
        const y = (depth.get(g.id) ?? 0) * gap;
        const strong = g.kind === "cloud" || g.kind === "vpc";
        return (
          <group key={g.id} position={[0, y, 0]}>
            <mesh position={[(x0 + x1) / 2, -0.001, (z0 + z1) / 2]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[x1 - x0, z1 - z0]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={g.kind === "subnet" ? 0.05 : 0.025} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            <Line
              points={[
                [x0, 0, z0],
                [x1, 0, z0],
                [x1, 0, z1],
                [x0, 0, z1],
                [x0, 0, z0],
              ]}
              color="#ffffff"
              transparent
              opacity={strong ? 0.6 : 0.35}
              lineWidth={1}
              dashed={!strong && g.kind !== "subnet"}
              dashSize={0.08}
              gapSize={0.06}
            />
            <TextLabel text={g.label} height={0.2} color="#a3a3a0" flat anchorLeft position={[x0 + 0.06, 0.005, z0 + 0.16]} />
          </group>
        );
      })}

      {diagram.edges.map((e) => {
        const a = nodePos.get(e.from);
        const b = nodePos.get(e.to);
        if (!a || !b) return null;
        return <Line key={`${e.from}-${e.to}`} points={[a, b]} color="#ffffff" transparent opacity={0.45} lineWidth={1.2} dashed={e.dashed} dashSize={0.1} gapSize={0.08} />;
      })}
      <Packets paths={edgePaths} reduced={reduced} />

      {diagram.nodes.map((n) => {
        const p = nodePos.get(n.id)!;
        const s = ((n.size ?? 52) / UNIT) * 0.95;
        // A thin stem shows which layer the node stands on.
        const ground = (nodeLevel.get(n.id) ?? 0) * gap;
        return (
          <group key={n.id}>
            <Line points={[[p.x, ground, p.z], [p.x, p.y - s / 2, p.z]]} color="#ffffff" transparent opacity={0.25} lineWidth={1} />
            <Billboard position={p}>
              {icons[n.id] ? (
                <Suspense fallback={null}>
                  <IconCard uri={icons[n.id]} size={s} />
                </Suspense>
              ) : (
                <TextLabel text="" glyph={n.glyph ?? n.label.slice(0, 2)} height={s * 0.95} position={[0, 0, 0]} />
              )}
            </Billboard>
            <TextLabel text={n.label} height={0.17} position={[p.x, p.y - s / 2 - 0.13, p.z]} />
          </group>
        );
      })}
    </group>
  );
}

export default function Diagram3DCanvas(props: Diagram3DProps) {
  const span = Math.max(props.diagram.width, props.diagram.height) / UNIT;
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={props.reduced ? "demand" : "always"}
      camera={{ position: [span * 0.15, span * 0.75, span * 0.95], fov: 40, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene {...props} />
      <OrbitControls enableDamping dampingFactor={0.08} enablePan={false} minDistance={span * 0.4} maxDistance={span * 2} minPolarAngle={Math.PI * 0.12} maxPolarAngle={Math.PI * 0.4} autoRotate={!props.reduced} autoRotateSpeed={0.35} target={[0, 0.6, 0]} />
    </Canvas>
  );
}
