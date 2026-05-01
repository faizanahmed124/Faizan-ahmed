import React, { useEffect, useRef } from 'react';

const CircuitCanvas = () => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const mouseRef  = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    // ── Responsive config ────────────────────────────────────────
    const isMobile  = () => window.innerWidth <= 768;
    const isTablet  = () => window.innerWidth > 768 && window.innerWidth <= 1024;

    const getConfig = () => {
      if (isMobile())  return { NODE_COUNT: 40,  CONNECT_DIST: 90  };
      if (isTablet())  return { NODE_COUNT: 70,  CONNECT_DIST: 120 };
      return               { NODE_COUNT: 130, CONNECT_DIST: 150 };
    };
    // ─────────────────────────────────────────────────────────────

    const MOUSE_DIST   = 20;
    const MOUSE_FORCE  = 0.015;
    const RETURN_FORCE = 0.010;
    const FRICTION     = 0.37;

    const COLORS = [
      '#6B46C1', '#7C3AED', '#5B21B6', '#4B3F72',
      '#888899', '#6B7280', '#9CA3AF', '#a78bfa',
    ];

    let nodes = [];

    const buildNodes = () => {
      const { NODE_COUNT } = getConfig();
      const mobile = isMobile();
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const ox = Math.random() * window.innerWidth;
        const oy = Math.random() * window.innerHeight;
        return {
          ox, oy, x: ox, y: oy,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r:   Math.random() * (mobile ? 0.8 : 1.8) + 0.4,
          col: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.45 + 0.35,
        };
      });
    };

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildNodes();
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouchMove  = (e) => {
      if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('touchmove',  onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    function hexRGB(hex) {
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
      const { CONNECT_DIST }  = getConfig();
      const mobile = isMobile();

      ctx.fillStyle = 'rgba(8, 6, 18, 0.20)';
      ctx.fillRect(0, 0, W, H);

      // Physics
      for (const n of nodes) {
        const dx   = mx - n.x, dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < MOUSE_DIST) {
          const s = MOUSE_FORCE * (1 - dist / MOUSE_DIST) * dt;
          n.vx += (dx / dist) * s * dist * 0.12;
          n.vy += (dy / dist) * s * dist * 0.12;
        }

        n.vx += (n.ox - n.x) * RETURN_FORCE * dt;
        n.vy += (n.oy - n.y) * RETURN_FORCE * dt;
        n.vx *= Math.pow(FRICTION, dt);
        n.vy *= Math.pow(FRICTION, dt);
        n.x  += n.vx * dt;
        n.y  += n.vy * dt;
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d >= CONNECT_DIST) continue;

          const baseAlpha = (1 - d / CONNECT_DIST) * (mobile ? 0.18 : 0.38);
          const midX = (a.x + b.x) * 0.5, midY = (a.y + b.y) * 0.5;
          const md   = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
          const boost = md < MOUSE_DIST ? (1 - md / MOUSE_DIST) * 0.75 : 0;

          if (boost > 0.1) {
            ctx.strokeStyle = `rgba(140,80,240,${Math.min(baseAlpha + boost * 0.6, 0.88)})`;
            ctx.lineWidth   = 0.5 + boost;
          } else {
            ctx.strokeStyle = `rgba(88,80,120,${baseAlpha})`;
            ctx.lineWidth   = mobile ? 0.25 : 0.5;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const dx    = n.x - mx, dy = n.y - my;
        const d     = Math.sqrt(dx * dx + dy * dy);
        const boost = d < MOUSE_DIST ? 1 - d / MOUSE_DIST : 0;
        const [r, g, b] = hexRGB(n.col);

        if (!mobile && boost > 0.18) {
          const glowR = n.r * 4 + boost * 7;
          const grd   = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          grd.addColorStop(0, `rgba(120,55,220,${boost * 0.35})`);
          grd.addColorStop(1, `rgba(120,55,220,0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = boost > 0.15
          ? `rgba(180,130,255,${Math.min(n.alpha + boost * 0.5, 0.95)})`
          : `rgba(${r},${g},${b},${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (mobile ? 0 : boost * 1.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursor ring — desktop only
      if (!mobile && mx > 0 && my > 0) {
        const pulse = 0.35 + 0.22 * Math.sin(ts * 0.004);
        ctx.beginPath();
        ctx.arc(mx, my, 20, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(150,90,255,${pulse * 0.3})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(170,110,255,0.8)';
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    ctx.fillStyle = '#08060e';
    ctx.fillRect(0, 0, W, H);
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100vw',
        height:        '100vh',
        zIndex:        0,
        pointerEvents: 'none',
        display:       'block',
      }}
    />
  );
};

export default CircuitCanvas;