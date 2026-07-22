/**
 * ==========================================================================
 * NAVANSHI'S 15TH BIRTHDAY EXPERIENCE ENGINE
 * Architecture: VisionOS Glass Physics + WebGL-Grade Canvas Renderers
 * System: AAA Performance, High-Fidelity Micro-Interactions, Sequential Flow
 * ==========================================================================
 */

"use strict";

/* ==========================================================================
   1. SURPRISE CONTENT DATA STORE & STATE MANAGEMENT
   ========================================================================== */
const NAVANSHI_GIFTS = [
    {
        id: 1,
        title: "The Birthday Letter",
        icon: "💌",
        badge: "Chapter 01",
        date: "July 2026",
        content: `Happy 15th Birthday, Navanshi! 🌸<br><br>
        Turning 15 is such a special milestone. I built this digital experience just for you to celebrate every single part of who you are. Explore every gift card, take your time, and enjoy your special day!`
    },
    {
        id: 2,
        title: "Golden Memories",
        icon: "📸",
        badge: "Chapter 02",
        date: "July 2026",
        content: `Looking back at all the times we've shared, every laugh and crazy conversation stands out. You have a way of making ordinary days feel unforgettable.`
    },
    {
        id: 3,
        title: "VIP Treat Pass",
        icon: "🎫",
        badge: "Chapter 03",
        date: "July 2026",
        content: `<b>REDEEMABLE ANYTIME:</b><br><br>
        This coupon entitles Navanshi to one complete treat/dessert date of her absolute choice—no questions asked!`
    },
    {
        id: 4,
        title: "Your Birthday Song",
        icon: "🎧",
        badge: "Chapter 04",
        date: "July 2026",
        content: `Every great birthday needs a dedicated soundtrack. Turn up your volume, kick back, and celebrate turning 15 in style!`
    },
    {
        id: 5,
        title: "Reason #1 You’re Special",
        icon: "✨",
        badge: "Chapter 05",
        date: "July 2026",
        content: `Your kindness is genuine. You care deeply about the people around you, and that energy brightens up any room instantly.`
    },
    {
        id: 6,
        title: "Reason #2 You’re Special",
        icon: "🌸",
        badge: "Chapter 06",
        date: "July 2026",
        content: `Your sense of humor and smile are contagious. You know exactly how to make people feel comfortable and happy.`
    },
    {
        id: 7,
        title: "A Birthday Wish",
        icon: "🌠",
        badge: "Chapter 07",
        date: "July 2026",
        content: `May your 15th year bring you closer to all your big dreams, exciting new adventures, and endless reasons to smile every single day.`
    },
    {
        id: 8,
        title: "Secret Note",
        icon: "🎁",
        badge: "Chapter 08",
        date: "July 2026",
        content: `You deserve all the happiness in the world today. Never forget how much you are appreciated!`
    },
    {
        id: 9,
        title: "Pinky Promise",
        icon: "🤝",
        badge: "Chapter 09",
        date: "July 2026",
        content: `Promised: To always be there to support you, listen to you, and celebrate all your big wins along the way.`
    },
    {
        id: 10,
        title: "Favorite Words",
        icon: "💬",
        badge: "Chapter 10",
        date: "July 2026",
        content: `<i>"Count your life by smiles, not tears. Count your age by friends, not years."</i><br><br>
        Cheers to 15 incredible years!`
    },
    {
        id: 11,
        title: "Digital Bouquet",
        icon: "💐",
        badge: "Chapter 11",
        date: "July 2026",
        content: `Sending you a virtual bouquet of cherry blossoms and pale pink roses in full bloom for your 15th birthday!`
    },
    {
        id: 12,
        title: "Movie Pass",
        icon: "🍿",
        badge: "Chapter 12",
        date: "July 2026",
        content: `You get 100% full authority over the choice of movie, snacks, and schedule for the next watch party!`
    },
    {
        id: 13,
        title: "Star of the Day",
        icon: "⭐",
        badge: "Chapter 13",
        date: "July 2026",
        content: `Today is 100% about celebrating Navanshi. Take a moment to reflect on how awesome you are!`
    },
    {
        id: 14,
        title: "Warm Hug Coupon",
        icon: "🤗",
        badge: "Chapter 14",
        date: "July 2026",
        content: `Valid indefinitely for one giant, warm hug whenever you need it standard or rough day included!`
    },
    {
        id: 15,
        title: "15th Chapter Celebration",
        icon: "👑",
        badge: "Chapter 15",
        date: "July 2026",
        content: `🎉 <b>HAPPY 15TH BIRTHDAY NAVANSHI!</b> 🎉<br><br>
        You've unlocked all 15 surprises! Here’s to a year filled with magic, laughter, success, and incredible memories. Make this year your best chapter yet!`
    }
];

class AppState {
    constructor() {
        this.openedGifts = new Set();
        this.currentActiveGift = 1;
        this.audioEnabled = false;
        this.devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    }

    isUnlocked(id) {
        return id === 1 || this.openedGifts.has(id) || this.openedGifts.has(id - 1);
    }

    markOpened(id) {
        this.openedGifts.add(id);
        if (id < 15) {
            this.currentActiveGift = Math.max(this.currentActiveGift, id + 1);
        }
    }
}

const STATE = new AppState();

/* ==========================================================================
   2. SYNTHETIC AUDIO ENGINE (WEB AUDIO API - ZERO EXTERNAL ASSETS)
   ========================================================================== */
class AudioSynthesizer {
    constructor() {
        this.ctx = null;
        this.isMuted = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    toggle() {
        this.isMuted = !this.isMuted;
        if (!this.isMuted) this.init();
        return !this.isMuted;
    }

    playGlassChime() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(1046.50, now); // C6
        osc.frequency.exponentialRampToValueAtTime(2093.00, now + 0.3); // C7

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
    }

    playUnlockFanfare() {
        if (this.isMuted || !this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        notes.forEach((freq, idx) => {
            const now = this.ctx.currentTime + (idx * 0.08);
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.4);
        });
    }
}

const AUDIO = new AudioSynthesizer();

/* ==========================================================================
   3. HIGH-FIDELITY SHORE WAVES & STAR CONSTELLATION RENDERER
   ========================================================================== */
class ShoreAndConstellationEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d", { alpha: false });
        this.stars = [];
        this.constellationLines = [];
        this.petals = [];
        this.waveOffset = 0;
        
        this.resize();
        this.initEntities();
        window.addEventListener("resize", () => this.resize(), { passive: true });
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * STATE.devicePixelRatio;
        this.canvas.height = this.height * STATE.devicePixelRatio;
        this.ctx.scale(STATE.devicePixelRatio, STATE.devicePixelRatio);
    }

    initEntities() {
        // 1. Constellation Nodes (Interactive Multi-Point Stars)
        const starCount = Math.floor((this.width * this.height) / 18000);
        this.stars = Array.from({ length: Math.max(40, starCount) }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * (this.height * 0.75),
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.8 + 0.2,
            pulseSpeed: Math.random() * 0.02 + 0.005,
            points: 4 + Math.floor(Math.random() * 2)
        }));

        // 2. Dynamic Sakura Petals (Soft Ocean Breeze)
        this.petals = Array.from({ length: 25 }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            length: Math.random() * 8 + 6,
            width: Math.random() * 4 + 3,
            vx: Math.random() * 0.8 + 0.2,
            vy: Math.random() * 0.5 + 0.3,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.02,
            color: ["rgba(248, 187, 208, 0.7)", "rgba(244, 143, 177, 0.6)", "rgba(255, 255, 255, 0.8)"][Math.floor(Math.random() * 3)]
        }));
    }

    drawConstellationStar(x, y, radius, points, alpha) {
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        
        this.ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const r = (i % 2 === 0) ? radius : radius * 0.4;
            const angle = (i * Math.PI) / points;
            const px = x + r * Math.cos(angle);
            const py = y + r * Math.sin(angle);
            if (i === 0) this.ctx.moveTo(px, py);
            else this.ctx.lineTo(px, py);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawConstellations() {
        // Draw Interconnecting Star Lines
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const dx = this.stars[i].x - this.stars[j].x;
                const dy = this.stars[i].y - this.stars[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    const lineAlpha = (1 - dist / 110) * 0.15;
                    this.ctx.save();
                    this.ctx.strokeStyle = `rgba(248, 187, 208, ${lineAlpha})`;
                    this.ctx.lineWidth = 0.75;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                    this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }

        // Render Individual Stars
        this.stars.forEach(star => {
            star.alpha += star.pulseSpeed;
            if (star.alpha > 0.95 || star.alpha < 0.15) star.pulseSpeed = -star.pulseSpeed;
            this.drawConstellationStar(star.x, star.y, star.size, star.points, Math.abs(star.alpha));
        });
    }

    drawOceanWaves() {
        this.waveOffset += 0.012;
        const layers = [
            { fill: "rgba(248, 187, 208, 0.18)", amplitude: 22, wavelength: 0.004, speed: 1.0, yOffset: 140 },
            { fill: "rgba(244, 143, 177, 0.12)", amplitude: 18, wavelength: 0.006, speed: 0.7, yOffset: 90 },
            { fill: "rgba(233, 30, 99, 0.06)",   amplitude: 28, wavelength: 0.003, speed: 1.3, yOffset: 40 }
        ];

        layers.forEach(layer => {
            this.ctx.beginPath();
            this.ctx.fillStyle = layer.fill;

            const baseHeight = this.height - layer.yOffset;
            this.ctx.moveTo(0, baseHeight);

            for (let x = 0; x <= this.width; x += 15) {
                const y = Math.sin(x * layer.wavelength + this.waveOffset * layer.speed) * layer.amplitude +
                          Math.cos(x * 0.002 + this.waveOffset) * 10 + baseHeight;
                this.ctx.lineTo(x, y);
            }

            this.ctx.lineTo(this.width, this.height);
            this.ctx.lineTo(0, this.height);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    drawPetals() {
        this.petals.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vRot;

            if (p.x > this.width) p.x = -10;
            if (p.y > this.height) p.y = -10;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, p.length, p.width, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    render() {
        // Deep Night Sky Gradient Background
        const bgGrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
        bgGrad.addColorStop(0, "#0B0210");
        bgGrad.addColorStop(0.5, "#1A0A2A");
        bgGrad.addColorStop(1, "#2C0D2E");
        
        this.ctx.fillStyle = bgGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.drawConstellations();
        this.drawOceanWaves();
        this.drawPetals();

        requestAnimationFrame(() => this.render());
    }
}

/* ==========================================================================
   4. CURSOR TRAIL ENGINE (MAGICAL FLUID PARTICLES)
   ========================================================================== */
class DynamicParticleTrail {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        const handleMove = (x, y) => {
            if (Math.random() > 0.35) return;
            this.spawnSparkle(x, y);
        };

        window.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY), { passive: true });
        window.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
    }

    spawnSparkle(x, y) {
        const p = document.createElement("div");
        p.className = "cursor-sparkle-particle";
        
        const size = Math.random() * 6 + 3;
        const colors = ["#F8BBD0", "#F48FB1", "#E91E63", "#FFFFFF"];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];

        Object.assign(p.style, {
            position: "fixed",
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: chosenColor,
            borderRadius: "50%",
            boxShadow: `0 0 8px ${chosenColor}`,
            pointerEvents: "none",
            zIndex: "99999",
            transform: "translate(-50%, -50%) scale(1)",
            transition: "transform 0.6s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.6s ease"
        });

        document.body.appendChild(p);

        requestAnimationFrame(() => {
            const moveX = (Math.random() - 0.5) * 30;
            const moveY = (Math.random() - 0.5) * 30 - 15;
            p.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(0)`;
            p.style.opacity = "0";
        });

        setTimeout(() => p.remove(), 600);
    }
}

/* ==========================================================================
   5. VISIONOS 3D CARD TILT & GLASS PHYSICS
   ========================================================================== */
class VisionOSPhysics {
    static attach(cardElement) {
        cardElement.addEventListener("mousemove", (e) => {
            const rect = cardElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        cardElement.addEventListener("mouseleave", () => {
            cardElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            cardElement.style.transition = "transform 0.5s ease";
        });

        cardElement.addEventListener("mouseenter", () => {
            cardElement.style.transition = "none";
        });
    }
}

/* ==========================================================================
   6. CELEBRATION CONFETTI ENGINE
   ========================================================================== */
function fireConfettiExplosion() {
    const totalPieces = 60;
    const colors = ["#F8BBD0", "#E91E63", "#FFFFFF", "#FFD700", "#F48FB1"];

    for (let i = 0; i < totalPieces; i++) {
        const particle = document.createElement("div");
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 6;

        Object.assign(particle.style, {
            position: "fixed",
            left: "50%",
            top: "50%",
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: Math.random() > 0.4 ? "50%" : "2px",
            zIndex: "10000",
            pointerEvents: "none",
            transform: "translate(-50%, -50%) scale(1)",
            transition: "transform 1.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.2s ease"
        });

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 320 + 80;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        const rotation = Math.random() * 720;

        requestAnimationFrame(() => {
            particle.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) rotate(${rotation}deg) scale(0)`;
            particle.style.opacity = "0";
        });

        setTimeout(() => particle.remove(), 1200);
    }
}

/* ==========================================================================
   7. MAIN APPLICATION CONTROLLER
   ========================================================================== */
class ApplicationController {
    constructor() {
        this.initDOM();
        this.initEngines();
        this.bindEvents();
        this.updateSequentialUI();
    }

    initDOM() {
        this.heroScreen = document.getElementById("hero-screen");
        this.enterBtn = document.getElementById("enter-experience-btn");
        this.mainDashboard = document.getElementById("main-dashboard");
        this.openedCountEl = document.getElementById("opened-count");
        this.audioToggleBtn = document.getElementById("audio-toggle");

        // Modal Elements
        this.modal = document.getElementById("gift-modal");
        this.modalCloseBtn = document.getElementById("modal-close");
        this.modalActionBtn = document.getElementById("modal-action-btn");
        this.modalBadge = document.getElementById("modal-badge");
        this.modalDate = document.getElementById("modal-date");
        this.modalIcon = document.getElementById("modal-icon");
        this.modalTitle = document.getElementById("modal-title");
        this.modalBody = document.getElementById("modal-body-content");

        this.giftWrappers = document.querySelectorAll(".gift-card-wrapper");
    }

    initEngines() {
        // Start Canvas Engine
        this.canvasEngine = new ShoreAndConstellationEngine("ambient-canvas");
        this.canvasEngine.render();

        // Start Particles
        new DynamicParticleTrail();

        // Attach 3D Glass Physics to Cards
        document.querySelectorAll(".glass-card, .glass-hero-card").forEach(VisionOSPhysics.attach);
        
        document.body.classList.remove("loading");
    }

    bindEvents() {
        // Enter Experience Button
        this.enterBtn.addEventListener("click", () => this.handleEnter());

        // Audio Toggle
        this.audioToggleBtn.addEventListener("click", () => {
            const active = AUDIO.toggle();
            this.audioToggleBtn.setAttribute("aria-pressed", active ? "true" : "false");
            this.audioToggleBtn.style.color = active ? "#F48FB1" : "currentColor";
        });

        // Gift Card Clicks
        this.giftWrappers.forEach(wrapper => {
            const button = wrapper.querySelector(".gift-card-btn");
            button.addEventListener("click", () => {
                const giftId = parseInt(wrapper.getAttribute("data-gift-id"), 10);
                if (STATE.isUnlocked(giftId)) {
                    this.openGiftModal(giftId);
                }
            });
        });

        // Modal Close Listeners
        const closeHandler = () => this.closeGiftModal();
        this.modalCloseBtn.addEventListener("click", closeHandler);
        this.modalActionBtn.addEventListener("click", closeHandler);

        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) closeHandler();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !this.modal.classList.contains("hidden")) {
                closeHandler();
            }
        });
    }

    handleEnter() {
        AUDIO.init();
        AUDIO.playUnlockFanfare();
        fireConfettiExplosion();

        this.heroScreen.style.opacity = "0";
        this.heroScreen.style.transition = "opacity 0.8s ease";

        setTimeout(() => {
            this.heroScreen.classList.add("hidden");
            this.mainDashboard.classList.remove("hidden");
            this.mainDashboard.style.opacity = "0";

            requestAnimationFrame(() => {
                this.mainDashboard.style.transition = "opacity 0.8s ease";
                this.mainDashboard.style.opacity = "1";
            });
        }, 800);
    }

    openGiftModal(id) {
        const data = NAVANSHI_GIFTS.find(g => g.id === id);
        if (!data) return;

        STATE.markOpened(id);
        AUDIO.playGlassChime();
        fireConfettiExplosion();

        // Populate Content
        this.modalBadge.innerText = data.badge;
        this.modalDate.innerText = data.date;
        this.modalIcon.innerText = data.icon;
        this.modalTitle.innerText = data.title;
        this.modalBody.innerHTML = data.content;

        // Display Modal
        this.modal.classList.remove("hidden");
        this.modal.setAttribute("aria-hidden", "false");

        this.updateSequentialUI();
    }

    closeGiftModal() {
        this.modal.classList.add("hidden");
        this.modal.setAttribute("aria-hidden", "true");
    }

    updateSequentialUI() {
        this.openedCountEl.innerText = STATE.openedGifts.size;

        this.giftWrappers.forEach(wrapper => {
            const giftId = parseInt(wrapper.getAttribute("data-gift-id"), 10);
            const button = wrapper.querySelector(".gift-card-btn");
            const badge = wrapper.querySelector(".gift-status-badge");

            if (STATE.isUnlocked(giftId)) {
                wrapper.classList.remove("locked");
                wrapper.classList.add("unlocked");
                button.removeAttribute("disabled");
                button.setAttribute("aria-disabled", "false");

                if (STATE.openedGifts.has(giftId)) {
                    badge.innerText = "Opened";
                    badge.classList.add("opened");
                } else {
                    badge.innerText = "Ready";
                    badge.classList.remove("opened");
                }
            } else {
                wrapper.classList.remove("unlocked");
                wrapper.classList.add("locked");
                button.setAttribute("disabled", "true");
                button.setAttribute("aria-disabled", "true");
                badge.innerText = "Locked";
            }
        });
    }
}

/* ==========================================================================
   8. BOOTSTRAP ENGINE ON DOM READY
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    window.BirthdayApp = new ApplicationController();
});
