import React, { useEffect, useRef } from 'react';

/**
 * Fish Follow Effect
 * An additive, isolated interactive canvas effect.
 * Features: Steering behaviors, procedural animation, resolution independence,
 * hidden tab pausing, and reduced motion support.
 */

export interface FishConfig {
    maxSpeed: number;
    maxForce: number;
    damping: number;
    stopRadius: number;
    wagAmplitude: number;
    wagFrequency: number;
    bubbleEnabled: boolean;
    bubbleRate: number; // 0 to 1
    bubbleLife: number;
    backgroundEnabled: boolean;
    zIndex: number;
    opacity: number;
    containerSelector?: string; // If provided, attaches to this element
    fallbackToBody: boolean;
}

const DEFAULT_CONFIG: FishConfig = {
    maxSpeed: 2.5,
    maxForce: 0.12,
    damping: 0.98,
    stopRadius: 40,
    wagAmplitude: 12,
    wagFrequency: 0.08,
    bubbleEnabled: true,
    bubbleRate: 0.05,
    bubbleLife: 100,
    backgroundEnabled: false,
    zIndex: 0,
    opacity: 0.6,
    fallbackToBody: true
};

class Fish {
    pos: { x: number; y: number };
    vel: { x: number; y: number };
    target: { x: number; y: number };
    angle: number;
    wag: number;
    config: FishConfig;

    constructor(x: number, y: number, config: FishConfig) {
        this.pos = { x, y };
        this.vel = { x: 0, y: 0 };
        this.target = { x, y };
        this.angle = 0;
        this.wag = 0;
        this.config = config;
    }

    update(time: number, isReducedMotion: boolean) {
        const dx = this.target.x - this.pos.x;
        const dy = this.target.y - this.pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const currentMaxSpeed = isReducedMotion ? this.config.maxSpeed * 0.2 : this.config.maxSpeed;

        if (dist > this.config.stopRadius) {
            // Arrival steering logic
            const speed = Math.min(currentMaxSpeed, dist * 0.1);
            const desiredX = (dx / dist) * speed;
            const desiredY = (dy / dist) * speed;

            const steerX = (desiredX - this.vel.x) * this.config.maxForce;
            const steerY = (desiredY - this.vel.y) * this.config.maxForce;

            this.vel.x += steerX;
            this.vel.y += steerY;
        } else {
            this.vel.x *= this.config.damping;
            this.vel.y *= this.config.damping;
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        // Rotation
        const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
        if (speed > 0.1) {
            const targetAngle = Math.atan2(this.vel.y, this.vel.x);
            // Smooth angle interpolation
            let diff = targetAngle - this.angle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            this.angle += diff * 0.1;
        }

        // Wagging
        if (!isReducedMotion) {
            const wagSpeedFactor = Math.min(1, speed / currentMaxSpeed);
            this.wag = Math.sin(time * this.config.wagFrequency) * this.config.wagAmplitude * wagSpeedFactor;
        } else {
            this.wag = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);

        // Enhanced gradient for body (more realistic color transition)
        const bodyGradient = ctx.createLinearGradient(-25, -15, 25, 15);
        bodyGradient.addColorStop(0, '#0ea5e9'); // Sky 500 (deeper)
        bodyGradient.addColorStop(0.3, '#38bdf8'); // Sky 400
        bodyGradient.addColorStop(0.6, '#7dd3fc'); // Sky 300
        bodyGradient.addColorStop(1, '#bae6fd'); // Sky 200 (lighter belly)

        // Shadow for depth
        ctx.shadowBlur = 25;
        ctx.shadowColor = 'rgba(14, 165, 233, 0.4)';

        // Main Body (more organic shape)
        ctx.fillStyle = bodyGradient;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Scale pattern for realism
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.8;
        for (let i = -15; i < 20; i += 5) {
            for (let j = -8; j < 8; j += 4) {
                ctx.beginPath();
                ctx.arc(i, j, 2.5, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Dorsal Fin (top fin - more detailed)
        const dorsalGradient = ctx.createLinearGradient(0, -15, 0, -25);
        dorsalGradient.addColorStop(0, '#38bdf8');
        dorsalGradient.addColorStop(1, 'rgba(56, 189, 248, 0.3)');
        ctx.fillStyle = dorsalGradient;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-5, -12);
        ctx.quadraticCurveTo(-3, -22, 0, -20);
        ctx.quadraticCurveTo(5, -22, 8, -12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Pectoral Fins (side fins - more realistic)
        const finGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
        finGradient.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
        finGradient.addColorStop(1, 'rgba(56, 189, 248, 0.1)');
        ctx.fillStyle = finGradient;

        // Top fin
        ctx.beginPath();
        ctx.moveTo(-2, -10);
        ctx.quadraticCurveTo(-8, -16, -12, -20);
        ctx.quadraticCurveTo(-10, -12, -5, -9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Bottom fin
        ctx.beginPath();
        ctx.moveTo(-2, 10);
        ctx.quadraticCurveTo(-8, 16, -12, 20);
        ctx.quadraticCurveTo(-10, 12, -5, 9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Tail (more detailed with wagging)
        const tailGradient = ctx.createLinearGradient(-20, 0, -40, this.wag);
        tailGradient.addColorStop(0, '#38bdf8');
        tailGradient.addColorStop(0.5, '#7dd3fc');
        tailGradient.addColorStop(1, 'rgba(125, 211, 252, 0.4)');
        ctx.fillStyle = tailGradient;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;

        const tailX = -22;
        const tailY = this.wag;
        ctx.beginPath();
        ctx.moveTo(tailX, 0);
        ctx.quadraticCurveTo(tailX - 10, tailY - 8, tailX - 20, tailY - 14);
        ctx.quadraticCurveTo(tailX - 15, tailY, tailX - 20, tailY + 14);
        ctx.quadraticCurveTo(tailX - 10, tailY + 8, tailX, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Tail fin details (lines for realism)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = -10; i <= 10; i += 5) {
            ctx.beginPath();
            ctx.moveTo(tailX - 5, tailY + i * 0.8);
            ctx.lineTo(tailX - 18, tailY + i * 1.2);
            ctx.stroke();
        }

        // Eye (more realistic with highlight)
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';

        // Eye white
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(15, -4, 3.5, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Iris
        const irisGradient = ctx.createRadialGradient(15.5, -4, 0, 15.5, -4, 2);
        irisGradient.addColorStop(0, '#fbbf24'); // Amber 400
        irisGradient.addColorStop(1, '#f59e0b'); // Amber 500
        ctx.fillStyle = irisGradient;
        ctx.beginPath();
        ctx.arc(15.5, -4, 2, 0, Math.PI * 2);
        ctx.fill();

        // Pupil
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(16, -4, 1, 0, Math.PI * 2);
        ctx.fill();

        // Eye highlight
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(16.5, -5, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Mouth detail
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(20, 2, 2, 0.2, 1);
        ctx.stroke();

        ctx.restore();
    }
}

class Bubble {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    maxLife: number;

    constructor(x: number, y: number, life: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = -Math.random() * 2;
        this.size = Math.random() * 3 + 1;
        this.life = life;
        this.maxLife = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const opacity = this.life / this.maxLife;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

/**
 * FishManager handles the animation loop and state for a single canvas.
 * This is used by both the React component and the global init functions.
 */
class FishManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    config: FishConfig;
    fish: Fish | null = null;
    bubbles: Bubble[] = [];
    time: number = 0;
    width: number = 0;
    height: number = 0;
    isPaused: boolean = false;
    requestRef: number | null = null;
    container: HTMLElement;
    resizeObserver: ResizeObserver;

    constructor(canvas: HTMLCanvasElement, options: Partial<FishConfig>) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        this.ctx = ctx;
        this.config = { ...DEFAULT_CONFIG, ...options };

        if (this.config.containerSelector) {
            this.container = document.querySelector(this.config.containerSelector) || document.body;
        } else {
            this.container = document.body;
        }

        this.fish = new Fish(window.innerWidth / 2, window.innerHeight / 2, this.config);

        this.resizeObserver = new ResizeObserver(() => this.updateSize());
        this.resizeObserver.observe(this.container);
        this.updateSize();

        window.addEventListener('pointermove', this.handlePointerMove);
        window.addEventListener('pointerdown', this.handlePointerMove);
        window.addEventListener('pointerleave', this.handlePointerLeave);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        this.animate(0);
    }

    updateSize() {
        const rect = this.container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const w = this.config.containerSelector ? rect.width : window.innerWidth;
        const h = this.config.containerSelector ? rect.height : window.innerHeight;

        this.width = w;
        this.height = h;
        this.canvas.width = w * dpr;
        this.canvas.height = h * dpr;
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
        this.ctx.scale(dpr, dpr);

        // Ensure fish target is set to center if it was just initialized
        if (this.fish) {
            this.fish.target = { x: w / 2, y: h / 2 };
        }
    }

    handlePointerMove = (e: PointerEvent) => {
        if (!this.fish) return;
        const rect = this.container.getBoundingClientRect();
        this.fish.target = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    handlePointerLeave = () => {
        if (!this.fish) return;
        this.fish.target = {
            x: this.width / 2,
            y: this.height / 2
        };
    };

    handleVisibilityChange = () => {
        this.isPaused = document.hidden;
    };

    animate = (time: number) => {
        if (!this.isPaused) {
            const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            this.ctx.clearRect(0, 0, this.width, this.height);

            if (this.fish) {
                this.fish.update(time, isReducedMotion);
                this.fish.draw(this.ctx);

                if (this.config.bubbleEnabled && !isReducedMotion && Math.random() < this.config.bubbleRate) {
                    this.bubbles.push(new Bubble(this.fish.pos.x, this.fish.pos.y, this.config.bubbleLife));
                }
            }

            this.bubbles = this.bubbles.filter(b => {
                b.update();
                b.draw(this.ctx);
                return b.life > 0;
            });
        }
        this.requestRef = requestAnimationFrame((t) => this.animate(t));
    };

    destroy() {
        if (this.requestRef) cancelAnimationFrame(this.requestRef);
        window.removeEventListener('pointermove', this.handlePointerMove);
        window.removeEventListener('pointerdown', this.handlePointerMove);
        window.removeEventListener('pointerleave', this.handlePointerLeave);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        this.resizeObserver.disconnect();
    }
}

let globalManager: FishManager | null = null;

/**
 * Global API for non-React use
 */
export const initFishFollowEffect = (options: Partial<FishConfig> = {}) => {
    if (globalManager) globalManager.destroy();

    const canvas = document.createElement('canvas');
    const config = { ...DEFAULT_CONFIG, ...options };

    canvas.style.position = config.containerSelector ? 'absolute' : 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = config.zIndex.toString();
    canvas.style.opacity = config.opacity.toString();
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const container = config.containerSelector ? document.querySelector(config.containerSelector) : document.body;
    if (container) {
        container.appendChild(canvas);
        if (config.containerSelector && getComputedStyle(container).position === 'static') {
            (container as HTMLElement).style.position = 'relative';
        }
        globalManager = new FishManager(canvas, options);
    }
};

export const destroyFishFollowEffect = () => {
    if (globalManager) {
        globalManager.destroy();
        globalManager.canvas.remove();
        globalManager = null;
    }
};

/**
 * React Component for easy integration
 */
export const FishFollowEffect: React.FC<{ options?: Partial<FishConfig> }> = ({ options }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const managerRef = useRef<FishManager | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            managerRef.current = new FishManager(canvasRef.current, options || {});
        }
        return () => managerRef.current?.destroy();
    }, [options]);

    const config = { ...DEFAULT_CONFIG, ...options };
    const style: React.CSSProperties = {
        position: config.containerSelector ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: config.zIndex,
        opacity: config.opacity,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    };

    return <canvas ref={canvasRef} style={style} />;
};
