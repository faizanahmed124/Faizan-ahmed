import React, { useEffect, useRef } from 'react';

const HeroBgAnimation = () => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    const NODE_COUNT   = 110;
    const CONNECT_DIST = 130;
    const MOUSE_DIST   = 160;
    const MOUSE_FORCE  = 0.016;
    const RETURN_FORCE = 0.011;
    const FRICTION     = 0.87;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      mouseRef.current  = { x: W / 2, y: H / 2 };
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (W / rect.width),
        y: (e.clientY - rect.top)  * (H / rect.height),
      };
    };
    const onTouch = (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.touches[0].clientX - rect.left) * (W / rect.width),
        y: (e.touches[0].clientY - rect.top)  * (H / rect.height),
      };
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouch, { passive: true });

    const COLORS = ['#6B46C1','#7C3AED','#4B3F72','#888899','#6B7280','#9CA3AF'];

    const nodes = Array.from({ length: NODE_COUNT }, () => {
      const ox = Math.random() * W;
      const oy = Math.random() * H;
      return {
        ox, oy, x: ox, y: oy,
        vx: 0, vy: 0,
        r:   Math.random() * 1.8 + 0.7,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.45 + 0.35,
      };
    });

    function parseHex(hex) {
      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ];
    }

    let t0 = performance.now();

    const frame = (ts) => {
      const dt = Math.min((ts - t0) / 16.67, 2.5);
      t0 = ts;
      const { x: mx, y: my } = mouseRef.current;

      ctx.fillStyle = 'rgba(6,6,14,0.22)';
      ctx.fillRect(0, 0, W, H);

      for (const n of nodes) {
        const dx   = mx - n.x, dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < MOUSE_DIST) {
          const f = MOUSE_FORCE * (1 - dist / MOUSE_DIST) * dt;
          n.vx += (dx / dist) * f * dist * 0.12;
          n.vy += (dy / dist) * f * dist * 0.12;
        }
        n.vx += (n.ox - n.x) * RETURN_FORCE * dt;
        n.vy += (n.oy - n.y) * RETURN_FORCE * dt;
        n.vx *= Math.pow(FRICTION, dt);
        n.vy *= Math.pow(FRICTION, dt);
        n.x  += n.vx * dt;
        n.y  += n.vy * dt;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d >= CONNECT_DIST) continue;

          const baseAlpha = (1 - d / CONNECT_DIST) * 0.4;
          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          const md   = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
          const boost = md < MOUSE_DIST ? (1 - md / MOUSE_DIST) * 0.7 : 0;

          if (boost > 0.12) {
            ctx.strokeStyle = `rgba(130,70,230,${Math.min(baseAlpha + boost * 0.55, 0.85)})`;
            ctx.lineWidth   = 0.8 + boost * 1.2;
          } else {
            ctx.strokeStyle = `rgba(90,85,120,${baseAlpha})`;
            ctx.lineWidth   = 0.5;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const dx    = n.x - mx, dy = n.y - my;
        const d     = Math.sqrt(dx * dx + dy * dy);
        const boost = d < MOUSE_DIST ? (1 - d / MOUSE_DIST) : 0;
        const [r, g, b] = parseHex(n.col);

        if (boost > 0.2) {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5 + boost * 8);
          grd.addColorStop(0, `rgba(120,55,210,${boost * 0.4})`);
          grd.addColorStop(1, `rgba(120,55,210,0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 5 + boost * 8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = boost > 0.15
          ? `rgba(175,120,255,${Math.min(n.alpha + boost * 0.5, 0.95)})`
          : `rgba(${r},${g},${b},${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + boost * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursor glow
      const pulse = 0.4 + 0.25 * Math.sin(ts * 0.004);
      ctx.beginPath();
      ctx.arc(mx, my, 18, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(140,80,255,${pulse * 0.35})`;
      ctx.lineWidth   = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mx, my, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(160,100,255,0.85)';
      ctx.fill();

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <div
      style={{
     
        top: 0, left: 0,
        width: '100%', height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: '#06060e',
          cursor: 'none',
          pointerEvents: 'all',
        }}
      />
    </div>
  );
};

export default HeroBgAnimation;