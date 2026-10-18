// Home hero: an "infrastructure constellation". Three stacked network layers (edge,
// compute, data) drawn as glowing line-art, with packets flowing down through them.
// It turns toward the pointer, and the layers pull apart as the hero scrolls away.
// Rendered client-only (client:only="react"); the page has a static fallback.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Line, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const LAYERS = [
  { y: 1.1, cols: 3, rows: 2, w: 3.2, d: 2.0 }, // edge
  { y: 0, cols: 5, rows: 3, w: 4.6, d: 2.8 }, // compute
  { y: -1.1, cols: 4, rows: 2, w: 3.8, d: 2.2 }, // data
];
const PACKETS = 46;
const SIGNAL = new THREE.Color("#f2b33e");
const GLOW = new THREE.Color("#ffffff");

/** Deterministic PRNG so the constellation is the same on every visit. */
function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

/** A soft round sprite for points, drawn once on a canvas. */
function glowTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.75)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function useGraph() {
  return useMemo(() => {
    const rand = rng(7);
    const nodes: { layer: number; base: THREE.Vector3 }[] = [];
    LAYERS.forEach((L, li) => {
      for (let r = 0; r < L.rows; r++)
        for (let c = 0; c < L.cols; c++) {
          const x = (c / (L.cols - 1) - 0.5) * L.w * 0.82 + (rand() - 0.5) * 0.25;
          const z = (L.rows === 1 ? 0 : r / (L.rows - 1) - 0.5) * L.d * 0.7 + (rand() - 0.5) * 0.2;
          nodes.push({ layer: li, base: new THREE.Vector3(x, L.y, z) });
        }
    });
    // Each node links to its two nearest nodes in the next layer down, and to one neighbour in its own layer.
    const edges: [number, number][] = [];
    nodes.forEach((n, i) => {
      const next = nodes.map((m, j) => ({ j, m })).filter(({ m }) => m.layer === n.layer + 1);
      next
        .sort((a, b) => a.m.base.distanceTo(n.base) - b.m.base.distanceTo(n.base))
        .slice(0, 2)
        .forEach(({ j }) => edges.push([i, j]));
      const same = nodes
        .map((m, j) => ({ j, m }))
        .filter(({ m, j }) => m.layer === n.layer && j > i)
        .sort((a, b) => a.m.base.distanceTo(n.base) - b.m.base.distanceTo(n.base))[0];
      if (same && rand() > 0.45) edges.push([i, same.j]);
    });
    const downward = edges.filter(([a, b]) => nodes[a].layer !== nodes[b].layer);
    return { nodes, edges, downward };
  }, []);
}

function Constellation({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointsGeo = useRef<THREE.BufferGeometry>(null);
  const linesGeo = useRef<THREE.BufferGeometry>(null);
  const packetGeo = useRef<THREE.BufferGeometry>(null);
  const frames = useRef<(THREE.Object3D | null)[]>([]);
  const { nodes, edges, downward } = useGraph();
  const sprite = useMemo(glowTexture, []);
  const { size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  // Packets: which downward edge each rides, and how far along it is.
  const packets = useMemo(() => {
    const rand = rng(21);
    return Array.from({ length: PACKETS }, () => ({ edge: Math.floor(rand() * downward.length), t: rand(), speed: 0.12 + rand() * 0.22 }));
  }, [downward.length]);

  const buffers = useMemo(() => {
    const colors = new Float32Array(PACKETS * 3);
    packets.forEach((_, i) => (i % 5 === 0 ? SIGNAL : GLOW).toArray(colors, i * 3));
    return {
      nodePos: new Float32Array(nodes.length * 3),
      linePos: new Float32Array(edges.length * 6),
      packetPos: new Float32Array(PACKETS * 3),
      packetColor: colors,
    };
  }, [nodes.length, edges.length, packets]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const wide = size.width > 900;
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Scroll progress through the first viewport: 0 at the top, 1 once the hero has left.
    const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    const spread = 1 + progress * 1.6;

    // Turn toward the pointer, with damping, plus a slow idle sway.
    const sway = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
    const targetY = -0.55 + sway + pointer.current.x * 0.35 + progress * 0.5;
    const targetX = 0.42 + pointer.current.y * 0.12 - progress * 0.15;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);

    // Layer positions, pulled apart by scroll.
    nodes.forEach((n, i) => {
      buffers.nodePos[i * 3] = n.base.x;
      buffers.nodePos[i * 3 + 1] = n.base.y * spread;
      buffers.nodePos[i * 3 + 2] = n.base.z;
    });
    edges.forEach(([a, b], i) => {
      buffers.linePos.set(buffers.nodePos.subarray(a * 3, a * 3 + 3), i * 6);
      buffers.linePos.set(buffers.nodePos.subarray(b * 3, b * 3 + 3), i * 6 + 3);
    });
    frames.current.forEach((f, li) => f && (f.position.y = LAYERS[li].y * spread));

    // Packets ride downward edges.
    packets.forEach((p, i) => {
      if (!reduced) p.t += delta * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = (p.edge + 7) % downward.length;
      }
      const [a, b] = downward[p.edge];
      const from = tmp.fromArray(buffers.nodePos, a * 3);
      const fx = from.x, fy = from.y, fz = from.z;
      const to = tmp.fromArray(buffers.nodePos, b * 3);
      buffers.packetPos[i * 3] = fx + (to.x - fx) * p.t;
      buffers.packetPos[i * 3 + 1] = fy + (to.y - fy) * p.t;
      buffers.packetPos[i * 3 + 2] = fz + (to.z - fz) * p.t;
    });

    for (const geo of [pointsGeo.current, linesGeo.current, packetGeo.current]) {
      const attr = geo?.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (attr) attr.needsUpdate = true;
    }
  });

  return (
    <group ref={group} position={wide ? [1.75, 0.35, 0] : [0, 0.9, 0]} scale={wide ? 0.88 : 0.7}>
      {LAYERS.map((L, li) => {
        const hw = (L.w / 2) * 1.0;
        const hd = (L.d / 2) * 1.0;
        return (
          <group key={li} ref={(el) => (frames.current[li] = el)} position={[0, L.y, 0]}>
            <Line
              points={[
                [-hw, 0, -hd],
                [hw, 0, -hd],
                [hw, 0, hd],
                [-hw, 0, hd],
                [-hw, 0, -hd],
              ]}
              color="#ffffff"
              lineWidth={1}
              transparent
              opacity={li === 1 ? 0.5 : 0.28}
              dashed={li !== 1}
              dashSize={0.12}
              gapSize={0.09}
            />
          </group>
        );
      })}

      <lineSegments>
        <bufferGeometry ref={linesGeo}>
          <bufferAttribute attach="attributes-position" args={[buffers.linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.22} depthWrite={false} />
      </lineSegments>

      <points>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" args={[buffers.nodePos, 3]} />
        </bufferGeometry>
        <pointsMaterial map={sprite} size={0.26} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} color="#ffffff" />
      </points>

      <points>
        <bufferGeometry ref={packetGeo}>
          <bufferAttribute attach="attributes-position" args={[buffers.packetPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[buffers.packetColor, 3]} />
        </bufferGeometry>
        <pointsMaterial map={sprite} size={0.14} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} vertexColors />
      </points>
    </group>
  );
}

export default function HeroScene() {
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    // Stop rendering once the hero is off screen.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (host.current) io.observe(host.current);
    return () => {
      mq.removeEventListener("change", onChange);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={host} className="hero-scene" aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={!visible ? "never" : reduced ? "demand" : "always"}
        camera={{ position: [0, 0.4, 7.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.75)} />
        <AdaptiveDpr pixelated={false} />
        <Constellation reduced={reduced} />
      </Canvas>
    </div>
  );
}
