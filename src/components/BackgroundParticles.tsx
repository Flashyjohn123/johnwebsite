"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hasSpike: boolean;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Color palette for subtle, celestial organic star variance (warm white, pale blue-violet, diamond silver)
    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(240, 245, 255, ",
      "rgba(224, 231, 255, ",
      "rgba(245, 243, 255, ",
      "rgba(254, 243, 199, ",
    ];

    // High density realistic star count based on viewport
    const starCount = Math.floor((width * height) / 4800);
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const radius = Math.random() < 0.88 ? Math.random() * 0.7 + 0.3 : Math.random() * 0.9 + 0.9;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha: Math.random() * 0.45 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        hasSpike: radius > 1.2 && Math.random() < 0.25,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      };
    });

    // Shooting stars / comets
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * (width * 0.85),
        y: Math.random() * (height * 0.5),
        length: Math.random() * 80 + 70,
        speed: Math.random() * 8 + 11,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.25, // ~45 deg downward trajectory
        alpha: 0.75,
        active: true,
      });
    };

    // Pre-seed comets so they are actively visible on load
    if (!prefersReducedMotion) {
      spawnShootingStar();
      setTimeout(() => spawnShootingStar(), 1200);
      setTimeout(() => spawnShootingStar(), 2800);
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Render Stars with Individual Twinkle & Light Bloom
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = prefersReducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(star.twinklePhase + tick * star.twinkleSpeed);
        const currentAlpha = star.baseAlpha * (0.6 + twinkle * 0.4);

        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Delicate 4-point diffraction spike for prominent stars
        if (star.hasSpike && currentAlpha > 0.45) {
          ctx.strokeStyle = `${star.color}${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.5;
          const spikeLen = star.radius * 3.5;
          ctx.beginPath();
          ctx.moveTo(star.x - spikeLen, star.y);
          ctx.lineTo(star.x + spikeLen, star.y);
          ctx.moveTo(star.x, star.y - spikeLen);
          ctx.lineTo(star.x, star.y + spikeLen);
          ctx.stroke();
        }
      }

      // Spawn Shooting Stars / Comets periodically (~every 3-5 seconds, with chance of paired comets)
      const now = Date.now();
      if (!prefersReducedMotion && now - lastShootingStarTime > 3200 && Math.random() < 0.05) {
        spawnShootingStar();
        // Occasional double comet stream
        if (Math.random() < 0.4) {
          setTimeout(() => spawnShootingStar(), 350 + Math.random() * 400);
        }
        lastShootingStarTime = now;
      }

      // Update & Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        if (!s.active) continue;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          s.active = false;
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Translucent Cosmic Nebula Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(99,102,241,0.12),transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_35%,rgba(168,85,247,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_75%,rgba(56,189,248,0.06),transparent_75%)]" />

      {/* High-Precision Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen"
      />
    </div>
  );
}
