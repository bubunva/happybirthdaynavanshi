/**
 * NAVANSHI'S 15TH BIRTHDAY EXPERIENCE ENGINE
 * Architecture: Modular Canvas Renderers + iOS VisionOS Glass Physics + Particle Systems
 */

// ==========================================================================
// 1. SURPRISE CONTENT DATA STORE (15 GIFTS)
// ==========================================================================
const NAVANSHI_GIFTS = [
    {
        id: 1,
        title: "The Birthday Letter 💌",
        icon: "💌",
        badge: "Chapter 01",
        content: `Happy 15th Birthday, Navanshi! 🌸<br><br>
        Turning 15 is such a special milestone. I built this digital experience just for you to celebrate every single part of who you are. Explore every gift card, take your time, and enjoy your special day!`
    },
    {
        id: 2,
        title: "Golden Memories 📸",
        icon: "📸",
        badge: "Chapter 02",
        content: `Looking back at all the times we've shared, every laugh and crazy conversation stands out. You have a way of making ordinary days feel unforgettable.`
    },
    {
        id: 3,
        title: "VIP Dessert Pass 🎫",
        icon: "🎫",
        badge: "Chapter 03",
        content: `<b>REDEEMABLE ANYTIME:</b><br><br>
        This coupon entitles Navanshi to one complete treat/dessert date of her absolute choice—no questions asked!`
    },
    {
        id: 4,
        title: "Your Birthday Song 🎧",
        icon: "🎧",
        badge: "Chapter 04",
        content: `Every great birthday needs a dedicated soundtrack. Turn up your volume, kick back, and celebrate turning 15 in style!`
    },
    {
        id: 5,
        title: "Reason #1 You’re Special ✨",
        icon: "✨",
        badge: "Chapter 05",
        content: `Your kindness is genuine. You care deeply about the people around you, and that energy brightens up any room instantly.`
    },
    {
        id: 6,
        title: "Reason #2 You’re Special 🌸",
        icon: "🌸",
        badge: "Chapter 06",
        content: `Your sense of humor and smile are contagious. You know exactly how to make people feel comfortable and happy.`
    },
    {
        id: 7,
        title: "A Wish for Year 15 🌠",
        icon: "🌠",
        badge: "Chapter 07",
        content: `May your 15th year bring you closer to all your big dreams, exciting new adventures, and endless reasons to smile every single day.`
    },
    {
        id: 8,
        title: "Secret Surprise Note 🎁",
        icon: "🎁",
        badge: "Chapter 08",
        content: `You deserve all the happiness in the world today. Never forget how much you are appreciated!`
    },
    {
        id: 9,
        title: "Pinky Promise 🤝",
        icon: "🤝",
        badge: "Chapter 09",
        content: `Promised: To always be there to support you, listen to you, and celebrate all your big wins along the way.`
    },
    {
        id: 10,
        title: "Words to Remember 💬",
        icon: "💬",
        badge: "Chapter 10",
        content: `<i>"Count your life by smiles, not tears. Count your age by friends, not years."</i><br><br>
        Cheers to 15 incredible years!`
    },
    {
        id: 11,
        title: "Digital Bouquet 💐",
        icon: "💐",
        badge: "Chapter 11",
        content: `Sending you a virtual bouquet of cherry blossoms and pale pink roses in full bloom for your 15th birthday!`
    },
    {
        id: 12,
        title: "Movie Night Pass 🍿",
        icon: "🍿",
        badge: "Chapter 12",
        content: `You get 100% full authority over the choice of movie, snacks, and schedule for the next watch party!`
    },
    {
        id: 13,
        title: "Star of the Day ⭐",
        icon: "⭐",
        badge: "Chapter 13",
        content: `Today is 100% about celebrating Navanshi. Take a moment to reflect on how awesome you are!`
    },
    {
        id: 14,
        title: "Warm Hug Coupon 🤗",
        icon: "🤗",
        badge: "Chapter 14",
        content: `Valid indefinitely for one giant, warm hug whenever you need it standard or rough day included!`
    },
    {
        id: 15,
        title: "15th Chapter Grand Finale 👑",
        icon: "👑",
        badge: "Chapter 15",
        content: `🎉 <b>HAPPY 15TH BIRTHDAY NAVANSHI!</b> 🎉<br><br>
        You've unlocked all 15 surprises! Here’s to a year filled with magic, laughter, success, and incredible memories. Make this year your best chapter yet!`
    }
];

// Opened items tracker
const openedGifts = new Set();

// ==========================================================================
// 2. AMBIENT BACKGROUND CANVAS: SHORE WAVES + FLOATING STARS & PARTICLES
// ==========================================================================
class AmbientCanvasEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.stars = [];
        this.waveStep = 0;
        
        this.resize();
        this.init();
        
        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    init() {
        // Generate Starfield
        this.stars = Array.from({ length: 60 }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        }));

        // Generate Floating Pink Particles
        this.particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            radius: Math.random() * 3 + 1,
            color: ["#F8BBD0", "#E91E63", "#FFFFFF", "#F48FB1"][Math.floor(Math.random() * 4)],
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.7 + 0.3
        }));
    }

    drawWaves() {
        this.waveStep += 0.015;
        const colors = [
            "rgba(248, 187, 208, 0.25)",
            "rgba(244, 143, 177, 0.18)",
            "rgba(233, 30, 99, 0.10)"
        ];

        colors.forEach((color, i) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = color;
            
            for (let x = 0; x <= this.width; x += 20) {
                const y = Math.sin(x * 0.005 + this.waveStep + i) * 25 + 
                          Math.cos(x * 0.003 + this.waveStep) * 15 + 
                          (this.height - 120 + i * 30);
                if (x === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }

            this.ctx.lineTo(this.width, this.height);
            this.ctx.lineTo(0, this.height);
            this.ctx.closePath();
            this.ctx.fill();
        });
    }

    drawStars() {
        this.stars.forEach(s => {
            s.alpha += s.speed;
            if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;

            this.ctx.save();
            this.ctx.globalAlpha = Math.abs(s.alpha);
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    drawParticles() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawStars();
        this.drawParticles();
        this.drawWaves();
        requestAnimationFrame(() => this.render());
    }
}

// ==========================================================================
// 3. CURSOR SPARKLE / TRAIL ANIMATION SYSTEM
// ==========================================================================
class CursorSparkleTrail {
    constructor() {
        window.addEventListener("mousemove", (e) => this.createSparkle(e.clientX, e.clientY));
        window.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
                this.createSparkle(e.touches[0].clientX, e.touches[0].clientY);
            }
        });
    }

    createSparkle(x, y) {
        if (Math.random() > 0.4) return; // Limit density for smoothness

        const sparkle = document.createElement("div");
        sparkle.className = "cursor-sparkle";
        
        const size = Math.random() * 8 + 4;
        const colors = ["#E91E63", "#F48FB1", "#FFFFFF", "#F8BBD0"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        Object.assign(sparkle.style, {
            position: "fixed",
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            boxShadow: `0 0 10px ${color}`,
            pointerEvents: "none",
            zIndex: "9999",
            transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
            transform: `translate(-50%, -50%) scale(1)`
        });

        document.body.appendChild(sparkle);

        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(-50%, -50%) translate(${(Math.random() - 0.5) * 40}px, ${(Math.random() - 0.5) * 40}px) scale(0)`;
            sparkle.style.opacity = "0";
        });

        setTimeout(() => sparkle.remove(), 600);
    }
}

// ==========================================================================
// 4. APPLE VISIONOS 3D CARD TILT EFFECT
// ==========================================================================
function init3DTiltEffect() {
    const cards = document.querySelectorAll(".glass-card, .glass-hero-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}

// ==========================================================================
// 5. CONFETTI BURST EXPLOSION
// ==========================================================================
function triggerConfettiBurst() {
    const confettiCount = 70;
    const colors = ["#E91E63", "#F8BBD0", "#FFFFFF", "#C2185B", "#F48FB1"];

    for (let i = 0; i < confettiCount; i++) {
        const piece = document.createElement("div");
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 6;

        Object.assign(piece.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            zIndex: "2000",
            pointerEvents: "none",
            transform: `translate(-50%, -50%) scale(1)`,
            transition: `transform 1.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.2s ease`
        });

        document.body.appendChild(piece);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 350 + 100;
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity;
        const rotation = Math.random() * 720;

        requestAnimationFrame(() => {
            piece.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${rotation}deg) scale(0)`;
            piece.style.opacity = "0";
        });

        setTimeout(() => piece.remove(), 1200);
    }
}

// ==========================================================================
// 6. MAIN APPLICATION INTERACTIVITY
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Start Ambient WebGL Waves & Stars Canvas
    const canvasEngine = new AmbientCanvasEngine("ambient-canvas");
    canvasEngine.render();

    // Start Cursor Sparkle Effect
    new CursorSparkleTrail();

    // Elements
    const heroScreen = document.getElementById("hero-screen");
    const enterBtn = document.getElementById("enter-experience-btn");
    const mainDashboard = document.getElementById("main-dashboard");
    const giftModal = document.getElementById("gift-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalActionBtn = document.getElementById("modal-action-btn");
    const openedCountEl = document.getElementById("opened-count");

    // Modal Content Elements
    const modalBadge = document.getElementById("modal-badge");
    const modalIcon = document.getElementById("modal-icon");
    const modalTitle = document.getElementById("modal-title");
    const modalBodyContent = document.getElementById("modal-body-content");

    // Intro Experience Transition
    enterBtn.addEventListener("click", () => {
        triggerConfettiBurst();
        heroScreen.style.opacity = "0";
        heroScreen.style.transition = "opacity 0.8s ease";

        setTimeout(() => {
            heroScreen.classList.add("hidden");
            mainDashboard.classList.remove("hidden");
            mainDashboard.style.opacity = "0";
            
            requestAnimationFrame(() => {
                mainDashboard.style.transition = "opacity 0.8s ease";
                mainDashboard.style.opacity = "1";
                init3DTiltEffect();
            });
        }, 800);
    });

    // Gift Card Click Handlers
    const cardWrappers = document.querySelectorAll(".gift-card-wrapper");
    cardWrappers.forEach(card => {
        card.addEventListener("click", () => {
            const giftId = parseInt(card.getAttribute("data-gift-id"));
            const giftData = NAVANSHI_GIFTS.find(g => g.id === giftId);

            if (giftData) {
                // Populate Modal Data
                modalBadge.innerText = giftData.badge;
                modalIcon.innerText = giftData.icon;
                modalTitle.innerText = giftData.title;
                modalBodyContent.innerHTML = giftData.content;

                // Track Opened State
                openedGifts.add(giftId);
                openedCountEl.innerText = openedGifts.size;

                // Show Modal
                giftModal.classList.remove("hidden");
                triggerConfettiBurst();
            }
        });
    });

    // Close Modal Events
    const closeModal = () => giftModal.classList.add("hidden");

    modalCloseBtn.addEventListener("click", closeModal);
    modalActionBtn.addEventListener("click", closeModal);
    giftModal.addEventListener("click", (e) => {
        if (e.target === giftModal) closeModal();
    });

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !giftModal.classList.contains("hidden")) {
            closeModal();
        }
    });
});
