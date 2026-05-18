import { useEffect, useRef } from "react";

interface IPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
}

const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 2);

export const InteractiveHeroField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ active: false, x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let points: IPoint[] = [];

    const createPoints = () => {
      const gap = width < 700 ? 20 : 24;
      const columns = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;

      points = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = column * gap - gap;
        const y = row * gap - gap;

        return {
          baseX: x,
          baseY: y,
          x,
          y,
          vx: 0,
          vy: 0,
          depth: 0.55 + ((column * 13 + row * 7) % 10) / 18,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = getPixelRatio();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createPoints();
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(168, 220, 255, 0.18)");
      gradient.addColorStop(0.5, "rgba(37, 99, 176, 0.12)");
      gradient.addColorStop(1, "rgba(10, 10, 15, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const pointer = pointerRef.current;

      points.forEach((point) => {
        const dx = point.baseX - pointer.x;
        const dy = point.baseY - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = pointer.active ? Math.min(260, width * 0.28) : 0;
        const force = Math.max(0, 1 - distance / radius);
        const angle = Math.atan2(dy, dx);
        const displacement = force * force * 76 * point.depth;
        const targetX = point.baseX + Math.cos(angle) * displacement;
        const targetY = point.baseY + Math.sin(angle) * displacement;
        point.vx += (targetX - point.x) * 0.08;
        point.vy += (targetY - point.y) * 0.08;
        point.vx *= 0.74;
        point.vy *= 0.74;
        point.x += point.vx;
        point.y += point.vy;

        const size = 1.1 + point.depth * 1.7 + force * 3.2;

        context.beginPath();
        context.fillStyle = `rgba(233, 247, 255, ${0.24 + point.depth * 0.22 + force * 0.35})`;
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fill();
      });

      context.strokeStyle = "rgba(233, 247, 255, 0.08)";
      context.lineWidth = 1;
      points.forEach((point, index) => {
        const next = points[index + 1];

        if (!next || Math.abs(next.y - point.y) > 30) {
          return;
        }

        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      });

      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      pointerRef.current = {
        active: x >= 0 && x <= rect.width && y >= 0 && y <= rect.height,
        x,
        y,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    resize();
    animationFrame = window.requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
