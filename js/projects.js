/* ==========================================================
   EDIT ME — all portfolio content lives here.
   Nothing below is invented: leave a field empty ("" or null)
   and the site simply hides that button/label.
   ========================================================== */

window.SITE = {
  name: "Gopinath R",
  title: "Junior Gameplay Programmer | Software Developer",
  email: "gopinath02105@gmail.com",
  github: "https://github.com/Gopinath21052006",
  linkedin: "https://www.linkedin.com/in/gopinath21052006/",
  resume: "assets/GOPINATH_R_Game_developer.pdf",
  profileImage: "https://gopinath21052006.github.io/Portfolio/scr/WhatsApp%20Image%202025-09-28%20at%209.08.48%20PM.jpeg"
};

/* Project fields:
   id, title, category, filters[], engine, platform, languages,
   status, summary, details, features[], tags[],
   image     -> path to screenshot (or null to show the generated cinematic backdrop),
   video     -> path to gameplay preview video clip that plays on hover / mobile scroll,
   telemetry -> game engine HUD spec tag shown in top-left corner of preview,
   art       -> CSS backdrop class used behind/instead of the image,
   links     -> [{label, url}] (only real links!)                         */
window.PROJECTS = [
  {
    id: "retro-ping-pong-arcade",
    index: "01",
    title: "Retro Ping Pong Arcade",
    category: "Gameplay Systems",
    filters: ["Unreal Engine 5", "Arcade"],
    engine: "Unreal Engine 5.8",
    platform: "Windows PC",
    languages: "Pure Blueprint (Content-Only)",
    status: "Completed",
    summary: "A 1980s-style retro arcade table tennis game built 100% in Unreal Engine 5.8 using pure Blueprints to learn state machines, AI paddle tracking, and tournament scoring.",
    details: "A classic Pong game recreated in Unreal Engine 5.8 using 100% Pure Blueprints (Content-Only). Built to explore game state machines (Home, Countdown, Playing, GameOver), AI paddle reaction tracking, 2-player local inputs, and dynamic 2D canvas HUD rendering.",
    features: [
      "1 Player vs CPU & 2-Player Local modes",
      "Target 7 Tournament Scoring (WinningScore = 7)",
      "Animated Round Countdown (3-2-1-GO)",
      "Vector-glow retro neon court & glowing golden ball",
      "Dynamic Canvas HUD & Scoreboard Top Plate",
      "100% Pure Blueprint architecture (Content-Only, zero C++ required)"
    ],
    tags: ["Unreal Engine 5.8", "Blueprints", "Arcade", "Multiplayer", "Physics"],
    image: "assets/images/pingpong-poster.jpg",
    video: "assets/videos/pingpong-master.mp4",
    art: "art--pingpong",
    links: []
  },
  {
    id: "apple-adventure",
    index: "02",
    title: "Apple Adventure",
    category: "2D Game Programming",
    filters: ["Android", "2D"],
    engine: "Native Android",
    platform: "Android",
    languages: "Kotlin & Java",
    status: "Completed",
    summary: "A 2D Android game built with Kotlin and Java featuring multiple worlds, offline level progression, and custom game physics.",
    details: "A 2D Android platformer created to learn mobile game architecture, canvas drawing, collision detection, and offline progress saving using Kotlin and Java. A dedicated landing page and APK download are available.",
    features: ["Multiple worlds", "Level progression", "Offline gameplay"],
    tags: ["Android", "Kotlin", "Java", "2D"],
    image: "https://gopinath21052006.github.io/Portfolio/scr/project_image/apple_adventure.png",
    video: "assets/videos/apple_demo.mp4",
    telemetry: "ANDROID // 60 FPS // KOTLIN & JAVA",
    art: "art--apple",
    links: [
      { label: "Live Demo", url: "https://gopinath21052006.github.io/AppleAdventure_Game/" },
      { label: "Download APK", url: "https://gopinath21052006.github.io/AppleAdventure_Game/assets/Apple_Adventure.apk" },
      { label: "Source Code", url: "https://github.com/Gopinath21052006/AppleAdventure_Game.git" }
    ]
  },
  {
    id: "anti-gravity",
    index: "03",
    title: "ANTI-GRAVITY",
    category: "3D Physics Prototype",
    filters: ["Unreal Engine 5", "3D", "Prototype"],
    engine: "Unreal Engine 5.8",
    platform: "Windows PC",
    languages: "Blueprint Visual Scripting",
    status: "Build Ongoing // Prototype",
    summary: "A first-person 3D physics puzzle prototype built around an Anti-Gravity Gun that grabs, holds, repositions, and launches objects using Physics Handle, line traces, and impulses.",
    details: "A first-person 3D physics puzzle adventure created in Unreal Engine 5.8 using Blueprints. Features a gravity manipulation gun utilizing Physics Handle, line traces, and impulses to interact with movable crates, heavy reactor objects, pressure plates, and animated security doors. Includes collectible coins with persistent tracking and level progression through a Game Instance.",
    features: [
      "Anti-Gravity Gun with Physics Handle & impulses",
      "Puzzles with movable crates, reactor objects & pressure plates",
      "Animated security doors across 3 levels",
      "Persistent coin tracking via Game Instance",
      "Modular Blueprint architecture (player, grabbables, pressure plates, doors)"
    ],
    tags: ["Unreal Engine 5.8", "Blueprints", "Physics Handle", "Puzzle", "First-Person"],
    image: "assets/images/antigravity-screenshot.jpg",
    video: null,
    telemetry: "UE 5.8 // 60 FPS // CHAOS PHYSICS",
    art: "art--gravity",
    links: []
  }
];

window.SKILLS = [
  { group: "Game Engine", items: [
    { name: "Unreal Engine 5", abbr: "UE5", note: "Learning gameplay, physics & level design" } ] },
  { group: "Gameplay Systems", items: [
    { name: "Chaos Physics & Mechanics", abbr: "PHYS", note: "Physics handles, impulse & collisions" },
    { name: "Character & Movement Logic", abbr: "CMC", note: "Pawn controls, input mapping & game feel" },
    { name: "Interactive Level Systems", abbr: "LVL", note: "Game loops, collectibles & progression" } ] },
  { group: "Programming & Scripting", items: [
    { name: "Blueprint Visual Scripting", abbr: "BP", note: "Gameplay logic, player controls & mechanics" },
    { name: "Kotlin", abbr: "Kt", note: "2D Android game development" },
    { name: "Java", abbr: "Jv", note: "Android game development & OOP" } ] },
  { group: "Tools & Pipeline", items: [
    { name: "Git", abbr: "Git", note: "Version control & project tracking" },
    { name: "GitHub", abbr: "GH", note: "Repositories & project hosting" },
    { name: "Visual Studio Code", abbr: "VS", note: "Code & configuration editing" } ] }
];

/* Factual milestones styled as an RPG progression tree */
window.TIMELINE = [
  { when: "2023", quest: "// PHASE 01: FOUNDATION", title: "CS Foundation", text: "Started B.Sc. Computer Science at SSM College of Arts and Science, Dindigul (CGPA: 7.3 / 10), building strong algorithmic and programming fundamentals." },
  { when: "2024", quest: "// PHASE 02: GAME DEVELOPMENT", title: "Game Prototyping & Mobile", text: "Built Apple Adventure, an offline 2D Android platformer in Kotlin/Java with custom Canvas rendering. Started exploring physics-driven UE5 prototypes with Blueprints." },
  { when: "2025", quest: "// PHASE 03: INDUSTRY INTERNSHIP", title: "Web Dev Intern • AIS Education", text: "Internship at AIS Education, Madurai. Built a Library Management System using Django with full CRUD operations and responsive UI." },
  { when: "2026", quest: "// PHASE 04: GAMEPLAY PROGRAMMER", title: "Unreal Engine 5 Gameplay", text: "Graduating B.Sc. Computer Science (batch 2023–2026). Developed ANTI-GRAVITY and Retro Ping Pong Arcade in UE 5.8. Pursuing Junior Gameplay Programmer roles." }
];
