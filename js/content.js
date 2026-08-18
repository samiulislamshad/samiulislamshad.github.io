/* ============================================================================
   content.js  —  ALL site content lives here.
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD CONTENT.

   To add a GIF or video to a project:
     1. Drop the file in  assets/<project-id>/
     2. Add one object to that feature's `media` array:

          { type: 'gif',  src: 'assets/my-game/thing.gif',
            weight: '2.4 MB', caption: 'What the viewer is looking at.' }

   Media `type` values:
     'gif'     - click-to-play (never auto-fetched; weight is shown on the
                 placeholder). Optional `poster` shows a dimmed still behind it.
     'mp4'     - <video preload="none"> so no bytes load until play is pressed.
                 Give it a `poster` image.
     'youtube' - click-to-load facade; `src` is the bare video id.
     'image'   - a plain lazy-loaded still.

   To add a whole project: see the fully-commented NEW_PROJECT_TEMPLATE at the
   very bottom of this file. Copy it, change the `id`, done.
   ============================================================================ */

const SITE = {
  name: 'Samiul Islam',
  role: 'Gameplay Programmer',
  location: 'Dhaka, Bangladesh',
  email: 'samiulislamshad@gmail.com',
  phone: '+880 1521 333415',
  linkedin: 'https://www.linkedin.com/in/samiulislamshad',
  resume: 'resume/Samiul_Islam_Resume.pdf',

  blurb:
    'Gameplay and systems programmer with four years building shipped Unity and ' +
    'Godot titles. I work on the parts of a game that have to hold up under load ' +
    'and under a team: enemy AI, procedural generation, combat systems, and the ' +
    'editor tooling other disciplines depend on. Most of what I do is ' +
    'performance-shaped — allocation-free hot paths, work budgets, and knowing ' +
    'when to delete a system I already built.',

  /* Headline facts. All four are drawn from git history and are checkable. */
  facts: [
    { num: '41%',    label: 'of 2,427 commits on Starfallen Prince — top contributor of nine developers' },
    { num: '100%',   label: 'of the enemy system on Museum Keeper’s Unity rebuild — every state machine and the pathfinding' },
    { num: '~8,000', label: 'Steam sales on AlexanderBall, built by a team of 3' },
    { num: '4 yrs',  label: 'professional gameplay programming across Unity and Godot' }
  ]
};

/* -------------------------------------------------------------------------- */

const PROJECTS = [

  /* ======================================================================
     1. STARFALLEN PRINCE
     ====================================================================== */
  {
    id: 'starfallen-prince',
    title: 'Starfallen Prince',
    studio: 'Bad WiFi Interactive',
    period: 'Sept 2024 — present',
    status: 'In development',
    statusTone: 'amber',
    engine: 'Unity 6.5',
    language: 'C#',
    featured: true,

    tagline:
      'Pixel-art 2D isometric bullet-heaven with a story-driven kingdom-building ' +
      'hub. I am the top contributor of nine on a 78,000-line codebase.',

    about: [
      'A hybrid of two genres: expedition runs are a bullet-heaven where hundreds of ' +
      'enemies converge on the player, and between runs you return to the Nexus hub to ' +
      'build up your kingdom, upgrade permanently, and travel between planets.',

      'On a nine-developer team the work is divided by system. Mine is the combat and ' +
      'presentation layer — the weapon stack, the player, animation, cutscenes, the hub, ' +
      'audio and the data layer. The sections below are limited to systems where I own ' +
      'the majority of the code that is actually in the build.'
    ],

    metrics: [
      { label: '1,205 C# files' },
      { label: '77,978 lines' },
      { label: '997 / 2,427 commits (41%)' },
      { label: 'Top contributor of 9' },
      { label: 'URP 17.5 2D' }
    ],

    cardMetrics: ['77,978 lines / 1,205 files', 'Top contributor of nine', 'Weapon stack: 95% of live code'],

    stack: ['Unity 6.5', 'C#', 'URP 2D', 'Zenject', 'UniRx', 'UniTask', 'FMOD', 'Cinemachine', 'DOTween', 'Shader Graph', 'VFX Graph'],

    roles: [
      { name: 'Gameplay Programmer', detail: 'Combat, movement, dash, light and heavy attack, weapon throw, damage calculation.' },
      { name: 'Systems Programmer',  detail: 'Weapon stack, weapon aspects, skill cards, cutscene sequencer, Nexus hub, data layer.' },
      { name: 'Performance',         detail: 'Allocation-free combat hot paths, chunk-system rework, hit-effect lag fix.' },
      { name: 'Animation',           detail: 'Split-body index-driven player animation, enemy view layer and VFX.' },
      { name: 'Tools',               detail: 'Cutscene property drawers, config validator, and a parameter migrator.' },
      { name: 'Audio Integration',   detail: 'FMOD adaptive music driven from gameplay signals, layered stems on a VCA.' }
    ],

    mediaNote:
      'Gameplay captures for this project are not published yet. Drop GIFs or MP4s into ' +
      'assets/starfallen-prince/ and add them to the matching feature in js/content.js.',

    features: [
      {
        title: 'Allocation elimination on combat hot paths',
        tags: ['GC', 'NonAlloc', 'Hot path'],
        body: [
          'Bullet-heaven combat fires constantly, so anything that allocates per shot or ' +
          'per swing becomes GC pressure within seconds. I went through the fire and strike ' +
          'paths and removed it.',

          'Swing signals are now <strong>reused instances</strong> rather than a fresh event ' +
          'object per attack — the strike path writes into a pre-allocated signal instead of ' +
          'constructing one. The automatic-weapon tick became a plain loop with no ' +
          'allocations, replacing a per-tick signal dispatch.',

          'Targeting queries deliberately avoid <code>Physics2D.OverlapCircleAll</code>, ' +
          'which allocates a fresh array on every call. Sprite lists are handed over as ' +
          '<code>IReadOnlyList&lt;Sprite&gt;</code> so there is no copy. Callbacks are cached ' +
          'rather than passed as method groups, because a method group at the call site ' +
          'allocates a delegate per strike.',

          'Related fix: a lag spike from creating and destroying the hit-effect shader ' +
          'material every time an enemy was struck, plus making the heavy attack async.'
        ],
        media: []
      },

      {
        title: 'A streaming system I built, measured, and deleted',
        tags: ['Chunk streaming', 'Measurement', 'Editor tool'],
        body: [
          'The map originally streamed in chunks, activating and deactivating them from ' +
          'player trigger volumes. It caused a visible hitch on every chunk switch, and once ' +
          'measured, the toggling cost and its edge cases outweighed what it saved.',

          'So it went. Chunks are now enabled once and stay resident, a single startup ' +
          'obstacle bake replaces per-chunk rescans, off-screen decor animators are culled, ' +
          'and the "which chunk am I in" question moved to a position-based lookup.',

          'The commit deleted the chunk controller, the grid model and a now-pointless ' +
          'signal class, and cut the grid controller by 222 lines — net 197 insertions ' +
          'against 532 deletions. I also wrote a <strong>batch editor tool</strong> to strip ' +
          'the abandoned trigger polygons out of the existing scenes, and left the rationale ' +
          'in the code so nobody re-introduces it.',

          'This is the piece of work I would most want to talk through in an interview — not ' +
          'because the system survived, but because it did not.'
        ],
        media: []
      },

      {
        title: 'Data-driven cutscene sequencer',
        tags: ['ScriptableObject', 'Property drawers', 'Data migration'],
        body: [
          'A 75-file sequencer where cutscenes are authored as ScriptableObjects rather than ' +
          'written in code. Eleven typed parameter classes — camera, movement, animation, ' +
          'narrative, music, SFX, VFX, screen fade, pop-up, wait, custom — each with a ' +
          'handler behind a common interface whose contract documents its own cost, because ' +
          'handlers run per frame per active action.',

          'The part I am most pleased with is the migration path. When the parameter system ' +
          'was refactored into typed classes, I shipped a <strong>parameter migrator</strong> ' +
          'and a <strong>config validator</strong> alongside it, plus custom property drawers ' +
          'that make the action graph authorable in the inspector. The refactor carried the ' +
          'already-authored cutscenes across instead of asking the team to redo them.'
        ],
        media: []
      },

      {
        title: 'Weapons, aspects and progression',
        tags: ['Interface segregation', 'Factory', 'Object pool'],
        body: [
          'Seven weapon categories behind segregated contracts — auto-attack, heavy attack, ' +
          'light attack and levelable are separate interfaces, so a weapon only implements ' +
          'what it actually has. Heavy attacks resolve through dedicated geometry calculators ' +
          'for cone and projectile-area shapes, and creation runs through a factory with a ' +
          'documented clone-on-create rule so a weapon instance can never mutate the shared ' +
          'database.',

          'Weapon visuals use an <strong>index-based animation</strong> approach: the attack ' +
          'clip fires one increment event per frame and the component steps through a ' +
          'per-category sprite list, so adding a weapon does not mean authoring a new set of ' +
          'animator clips.',

          'On top sits a <strong>weapon-aspect modifier framework</strong> — ricochet, ' +
          'recall, magnetic, deluge — each aspect its own config, model, controller and view, ' +
          'and a <strong>skill-card draft</strong> on level-up. I also contributed to the ' +
          'quest and pickup systems and to the projectile subsystem with its own factory and ' +
          'pool.'
        ],
        media: []
      },

      {
        title: 'Split-body player animation',
        tags: ['Index-driven', 'ScriptableObject', 'Signals'],
        body: [
          'The player animates as three coordinated layers — upper body, lower body and ' +
          'full-body overrides — so aiming and movement can play independently without a ' +
          'combinatorial explosion of animator states.',

          'Clips are resolved from ScriptableObject animation data by <strong>sprite ' +
          'index</strong> rather than animator parameters, driven by signals, with an ' +
          'attack-cone service supplying the geometry. The cone is recalculated on ' +
          'initialisation and whenever a weapon resizes it — explicitly not per frame — and ' +
          'the light-attack stream is torn down on weapon switch so there is zero per-frame ' +
          'work when nothing is firing.'
        ],
        media: []
      },

      {
        title: 'Enemy presentation: views, VFX and pooling',
        tags: ['Object pooling', 'VFX', 'Spatialised audio'],
        body: [
          'My work on the enemies is the presentation layer rather than their AI. That covers ' +
          'the base enemy view and twelve per-archetype view classes, forward and backward ' +
          'movement animation, the submerged effect, the shaman ring, projectile shaders, ' +
          'unlit variants, and spatialised enemy SFX.',

          'Plus the pooling layer: separate pools for melee, shielded-melee, ranged, flying ' +
          'and shaman enemies, a projectile-preview pool, and the elevation and positioning ' +
          'services that place them correctly in the isometric space.'
        ],
        media: []
      },

      {
        title: 'FMOD adaptive music',
        tags: ['FMOD', 'Signals', 'VCA'],
        body: [
          'Music responds to what is actually happening in a run. The controller subscribes ' +
          'to gameplay signals — wave start, boss spawn, boss closing in on the player, boss ' +
          'death, player death — and swaps stems accordingly, with separate intro-loop and ' +
          'no-intro-loop variants so a transition never restarts a phrase awkwardly.',

          'A layered-track service plays an event over the running soundtrack with ' +
          'exactly-once stop semantics, routed through a VCA so the player’s volume ' +
          'settings still apply to it.'
        ],
        media: []
      },

      {
        title: 'Hitch-free scene loading',
        tags: ['UniTask', 'Shader warmup', 'Quality tiers'],
        body: [
          'Additive async scene loading, with <code>ShaderVariantCollection</code> warmup ' +
          'before the first frame renders so the player does not get a shader-compile hitch ' +
          'the moment gameplay starts. Global warmup is deliberately skipped to avoid Shader ' +
          'Graph keyword-space errors — that tradeoff is documented in the code.',

          'Four URP quality tiers (Low, Medium, High, Ultra) are wired to the graphics ' +
          'options menu so the game scales across the wide hardware range a PC release has ' +
          'to cope with.'
        ],
        media: []
      },

      {
        title: 'Nexus hub, kingdom building and the data layer',
        tags: ['MVC', 'Zenject', 'JSON'],
        body: [
          'The hub between runs, where each building is a full model/view/controller triple: ' +
          'the forge, permanent upgrades, storage, expedition and world portals, and a ' +
          '<strong>navigation building</strong> that cycles between planets and drives the ' +
          'portal. NPCs, dialogue triggers and story objects sit alongside it, with the hub ' +
          'implementing the pause contract so its canvases can open safely.',

          'Underneath, the data layer loads JSON into ScriptableObjects for game and weapon ' +
          'data, with reactive run-state as a ScriptableObject so any system can observe the ' +
          'current run without a static singleton.',

          'Architecturally the project is strict MVC wired through Zenject, with continuous ' +
          'work on <code>ITickable</code> rather than scattered <code>Update</code> methods, ' +
          'which keeps execution order explicit instead of accidental. Reactive state is real ' +
          'rather than decorative — UniRx across 199 files — and async is UniTask-first, 102 ' +
          'files against 16 still using coroutines.'
        ],
        media: []
      },

      {
        title: 'Shaders and visual effects',
        tags: ['HLSL', 'Shader Graph', 'VFX Graph'],
        body: [
          'Shader work on this project is split roughly evenly with another developer. My ' +
          'contributions include hand-written HLSL and Shader Graph work for hit flash, ' +
          'dappled forest light, water waves, projectile aura, sprite transparency, weapon ' +
          'alpha cutoff and a circle-fade UI transition, along with a screen-shake shader ' +
          'bug fix.'
        ],
        media: []
      }
    ]
  },

  /* ======================================================================
     2. MUSEUM KEEPER  (Godot original + Unity rebuild — one game)
     ====================================================================== */
  {
    id: 'museum-keeper',
    title: 'Museum Keeper',
    studio: 'Red Thorn Interactive',
    period: 'Sept 2023 — present',
    status: 'Coming soon on Steam',
    statusTone: 'violet',
    engine: 'Godot 4 → Unity',
    language: 'C#',
    featured: true,

    tagline:
      'Dig a procedurally generated mine for artifacts, then exhibit them in a museum. ' +
      'Built in Godot 4, now being rebuilt in Unity — and I own the mine in both engines.',

    about: [
      'Two connected games. Underground, you explore a procedurally generated mine full of ' +
      'artifacts, minerals, traps and enemies — digging through terrain, fighting AI, and ' +
      'using tools like dynamite and torches that genuinely affect the environment. ' +
      'Artifacts you unearth can only be claimed by clearing a randomised mini-game; fail ' +
      'and you lose the find. Above ground, claimed artifacts become exhibitions in a ' +
      'separate isometric museum, drawing visitors and generating the currency you ' +
      'reinvest in expanding it.',

      'The team splits along the same seam the game does: <strong>I own the mine, a ' +
      'colleague owns the museum</strong>, and that division held across both engines. In ' +
      'the Godot original I wrote 94% of the mine codebase; in the Unity rebuild I am the ' +
      'only author the enemy system has ever had.',

      'The rebuild is a genuine rewrite, not a conversion. The artifact data and sprite ' +
      'assets carried over one-to-one, but every line of code was written from scratch — no ' +
      'Godot script, scene or shader survives, and the Unity architecture (dependency ' +
      'injection, reactive state, strict MVC) has no counterpart in the original. Getting ' +
      'to build the same game twice, in two engines, is the most useful thing that has ' +
      'happened to me as a programmer: it separated what I actually understood about ' +
      'architecture from what was just engine habit.'
    ],

    metrics: [
      { label: 'Godot: 1,421 commits, 5 devs' },
      { label: 'Unity rebuild: 150 commits' },
      { label: '94% of the Godot mine code' },
      { label: '100% of the Unity enemy system' },
      { label: 'Two engines, four years' }
    ],

    cardMetrics: ['Godot 4 → Unity', 'Owns the mine in both engines', '100% of the Unity enemy system'],

    stack: ['Godot 4', 'Unity', 'C#', 'URP 2D', 'Zenject', 'UniRx', 'UniTask', 'ASP.NET Core', 'Finite state machines', 'A* pathfinding', 'Tilemaps', 'Cinemachine 3', 'DOTween'],

    links: [
      { label: 'View on Steam', url: 'https://store.steampowered.com/app/2708780/Museum_Keeper/' }
    ],

    roles: [
      { name: 'Gameplay Programmer', detail: 'Mine generation, digging, combat, item usage and player control — in both engines.' },
      { name: 'AI Programmer',       detail: 'Three enemy species with full state machines, A* pathfinding, spawning and relocation.' },
      { name: 'Systems Designer',    detail: 'Procedural generation, inventory, toolbar and placeables, day/time, collectables.' },
      { name: 'Technical Artist',    detail: 'URP Light2D depth darkening, dynamic light sources, tilemap shadow and crack passes.' },
      { name: 'Audio Integrator',    detail: 'Contextual SFX and ambient music for movement, digging, combat and item use.' },
      { name: 'Backend',             detail: 'Contributed to the ASP.NET Core REST service that served game data in the Godot build.' }
    ],

    mediaNote:
      'The clips above are from the Godot original. Captures of the Unity rebuild are not ' +
      'published yet — drop GIFs or MP4s into assets/museum-keeper/ and add them to the ' +
      'matching feature in js/content.js.',

    features: [
      {
        title: 'Enemy AI in the Unity rebuild',
        tags: ['Unity rebuild', 'State machine', 'A*', 'Cancellation'],
        body: [
          'Three enemy species with genuinely different movement models — a grounded slime, ' +
          'a flying bat, a crawling rattlesnake — each built from the same eight-piece ' +
          'composition (config, model, view, state machine, pool entry, pool, factory, ' +
          'controller), with state machines running 1,700, 1,560 and 1,940 lines.',

          'Pathfinding is a hand-written A* over a rebuildable navigation snapshot: Manhattan ' +
          'heuristic, a multi-destination search for "get to any of these cells", asymmetric ' +
          'edge costs so a drop is priced differently from a step, and <strong>cooperative ' +
          'cancellation polled every 64 node expansions</strong> so a long search can be ' +
          'abandoned mid-flight instead of blocking.',

          'Terrain changes constantly in a mining game, so the service keeps a ' +
          '<strong>navigation revision counter</strong> and an observable of changed cells — ' +
          'enemies react to the mine being dug rather than re-polling it. Path results are ' +
          'generation-stamped, so a result arriving after the world moved on is discarded ' +
          'rather than applied, and failed routes are cached against the revision that ' +
          'failed so an unreachable target is not retried every tick.'
        ],
        media: []
      },

      {
        title: 'Named bug classes, and the fixes',
        tags: ['Unity rebuild', 'Debugging', 'Rigidbody2D'],
        body: [
          'Three AI failure modes I tracked down, fixed, and then wrote up so they would not ' +
          'come back:',

          '<strong>The bat wobble collider bug.</strong> Bats fly with a sinusoidal wobble, ' +
          'and the wobble was being mixed into the rigidbody position — so the physics body ' +
          'was constantly being shoved into geometry and getting stuck. The fix was to make ' +
          'the wobble <em>visual only</em>, applied as a sprite offset, leaving the collider ' +
          'on a clean interpolated path.',

          '<strong>The fall landing-latch.</strong> The fall state needed an ungrounded frame ' +
          'before a grounded one to latch correctly, so entering fall now re-routes back to ' +
          'normal AI if the ground probe still hits. At a ledge lip, steering by horizontal ' +
          'delta reversed the instant it overshot — which reads as edge jitter — so a commit ' +
          'latch replaces it, with a short budget so a stalled drop cannot ride out the ' +
          'movement timeout.',

          '<strong>The stuck ladder.</strong> Escape escalates from a quiet unanimated ' +
          'reposition, to a relocation request, to an unanimated despawn. The detail I like: ' +
          'it checks <em>both</em> success and failure counters, because an enemy that ' +
          'repositions successfully over and over is just as stuck as one whose repositions ' +
          'fail.'
        ],
        media: []
      },

      {
        title: 'The relocation leash',
        tags: ['Unity rebuild', 'Perf', 'Config validation'],
        body: [
          'Without this, every spawned enemy ticks full AI for the entire mine session no ' +
          'matter where the player is — an unbounded cost that grows with how long you have ' +
          'been digging.',

          'The leash accumulates per-enemy dwell time for "the player has been further than ' +
          'X tiles for Y seconds", then hands off. It deliberately does not despawn anything ' +
          'itself — it decides <em>whether</em> an enemy should relocate, never how, so there ' +
          'is no dependency cycle with the manager that owns spawning.',

          'Rather than simply culling, relocation reuses the real despawn path and respawns ' +
          'the enemy near the player but <strong>outside the camera viewport</strong>, so ' +
          'encounter density stays constant while cost does not grow. The config validates ' +
          'that maximum spawn distance is less than relocation distance — otherwise a respawn ' +
          'lands out of range and immediately re-relocates, a loop I would rather catch at ' +
          'author time than in a profiler.'
        ],
        media: []
      },

      {
        title: 'Enemy AI in the Godot original',
        tags: ['Godot original', 'FSM', 'Component-based'],
        body: [
          'The first version of the same problem, solved with a finite state machine over a ' +
          'component-based architecture, with behaviour sets varying by enemy type — patrol, ' +
          'rest, explore, attack.',

          'Enemies move through phases that trigger specific actions once their conditions ' +
          'are met, so encounters escalate rather than presenting one fixed behaviour until ' +
          'death. Comparing this against the Unity rebuild is the clearest illustration of ' +
          'what four years changed: same game, same enemy problem, far more rigour the second ' +
          'time.'
        ],
        media: [
          { type: 'gif', src: 'assets/museum-keeper/enemy-ai-fsm-01.gif', weight: '4.3 MB',
            caption: 'FSM-driven enemy behaviour: patrol, aggro and attack phases.' },
          { type: 'gif', src: 'assets/museum-keeper/enemy-ai-fsm-02.gif', weight: '2.8 MB',
            caption: 'Enemy type variation and phase transitions in combat.' }
        ]
      },

      {
        title: 'Procedural mine generation, in both engines',
        tags: ['Procedural', 'UniTask', 'Erosion', 'Random walk'],
        body: [
          '<strong>Godot version.</strong> A 2D world built from scratch — caves, minerals, ' +
          'traps and artifacts placed dynamically, with the whole generation driven by ' +
          'configurable data held in JSON rather than hard-coded, so designers could retune a ' +
          'mine without a rebuild. Enemies spawn into valid areas according to difficulty and ' +
          'player progress. The save system reuses that same generated JSON to <strong>' +
          'visually reconstruct the exact last state</strong> of the mine through Godot’s ' +
          'tilemap system — the save format and the generation format being one thing is what ' +
          'made that cheap rather than a second serialisation problem.',

          '<strong>Unity version.</strong> A seven-stage pipeline — cells, boss cave, caves, ' +
          'vines, backdrops, artifacts, resources — where <strong>every stage opens by ' +
          'switching to the thread pool</strong> and only returns to the main thread to ' +
          'commit. Generation cannot hitch the frame because it is not on the frame. ' +
          'Everything uses <code>System.Random</code> rather than Unity’s, precisely ' +
          'because it runs off-thread.',

          'The algorithms are hand-rolled rather than noise-based. Caves are drawn from a ' +
          'preset table of allowed rectangles, distributed over a 3×3 slot grid with the ' +
          'centre-bottom slot reserved for the boss area, then made organic in two passes: ' +
          '<strong>edge erosion</strong> eats an irregular number of cells off the boundary, ' +
          'and <strong>interior corrosion</strong> punches small holes to read as worn rock. ' +
          'Resource deposits grow by <strong>random walk</strong> — pick a root cell, extend ' +
          'to a random valid neighbour, stop at a dead end — with occupancy in a hash set for ' +
          'O(1) lookups and the inner adjacency loop using a stack array to stay off the heap.',

          'Generation is kept strictly separate from presentation: a 1,373-line visualizer ' +
          'layer turns the generated data into eleven tilemap passes.'
        ],
        media: [
          { type: 'gif', src: 'assets/museum-keeper/procedural-mine-generation.gif', weight: '6.0 MB',
            caption: 'Godot original: procedural mine generation with caves, minerals, traps and artifacts.' }
        ]
      },

      {
        title: 'Fungal vegetation: an amortised growth queue',
        tags: ['Unity rebuild', 'Amortised O(n)', 'Zero alloc', 'Camera aware'],
        body: [
          'Mushrooms colonise mine surfaces you have broken open, over game time. The naive ' +
          'version rescans the broken-cell list every tick and rerolls each candidate, which ' +
          'gets more expensive the more you dig and — because rerolling is memoryless — ' +
          'eventually saturates the entire mine.',

          'Instead, growth drains a <strong>maturation queue that is sorted by ' +
          'construction</strong>, so taking the ripe front is amortised O(newly matured) ' +
          'rather than O(all broken cells). Anchors are typed — floor, ceiling, left wall, ' +
          'right wall — each requiring a solid neighbour via a static offset table, with ' +
          'weighted selection favouring floors.',

          'It allocates nothing on the per-tick path, by construction: config is flattened ' +
          'into arrays at init so the hot path never touches LINQ, the anchor candidate ' +
          'buffer is reused, collections are pre-sized, and the retry pass compacts in place ' +
          'with read/write indices.',

          'My favourite detail is <strong>camera awareness</strong>: growth is suppressed ' +
          'inside the viewport plus a margin, so a mushroom never visibly pops into existence ' +
          'in front of you. Blocked candidates keep their roll and retry once the camera moves ' +
          'away, so nothing is lost — just deferred. Hard budgets cap it at 12 growths and 96 ' +
          'candidate scans per tick, 250 total.'
        ],
        media: []
      },

      {
        title: 'Inventory system',
        tags: ['Godot original', 'Stacking', 'Three-mode selection'],
        body: [
          'Stack-based storage with per-slot quantities, built around three distinct ' +
          'interactions so item handling stays fast without a modifier key:',

          '<strong>Lot select</strong> — left click takes the entire stack in that slot into ' +
          'hand. <strong>Single select</strong> — right click takes one unit, and repeated ' +
          'right clicks on the same item accumulate more into hand. <strong>Swap select' +
          '</strong> — left clicking an item while already holding a different one exchanges ' +
          'the two.'
        ],
        media: [
          { type: 'gif', src: 'assets/museum-keeper/inventory-system.gif', weight: '428 KB',
            caption: 'Lot, single and swap selection with per-slot quantities.' }
        ]
      },

      {
        title: 'Toolbar and contextual tool behaviour',
        tags: ['Both engines', 'Strategy pattern', 'Placeables'],
        body: [
          'A scrollable toolbar integrated with the inventory — the top row of the three-row ' +
          'inventory <em>is</em> the toolbar, so assigning a tool is a normal inventory move ' +
          'rather than a separate binding step.',

          'A controller then <strong>changes the player’s available actions based on the ' +
          'selected item</strong>. The pickaxe breaks mine walls but does nothing to enemies; ' +
          'the sword is the reverse. Visual feedback marks valid and invalid placement, so ' +
          'the rules are legible before you swing.',

          'The Unity rebuild takes this considerably further — 89 files where item actions are ' +
          'swappable strategies (tool, weapon, placeable, consumable, animated) and each ' +
          'placeable machine runs its own state machine: dynamite in three sizes, an ' +
          'elevator, a pile driver, torches.'
        ],
        media: [
          { type: 'gif', src: 'assets/museum-keeper/toolbar-system.gif', weight: '323 KB',
            caption: 'Scrollable toolbar with slot assignment from the inventory.' },
          { type: 'gif', src: 'assets/museum-keeper/toolbar-contextual-tools.gif', weight: '5.0 MB',
            caption: 'Contextual tool behaviour: pickaxe for walls, sword for enemies.' }
        ]
      },

      {
        title: 'Physics, digging and item-environment interaction',
        tags: ['Both engines', 'Destructible terrain', 'Knockback'],
        body: [
          'Responsive directional movement with attack and interact, gravity applied and ' +
          'defied per entity as needed, and knockback on impact for both players and enemies ' +
          'so trades in combat carry weight.',

          'Terrain is destructible — players break and remove wall tiles to explore or carve ' +
          'their own routes. Items act on the world rather than just on actors: ' +
          '<strong>dynamite explodes and breaks walls</strong>, and a <strong>fire torch ' +
          'ignites flammable objects and lights the area</strong>.',

          'In the Unity rebuild, cells carry hit points and broken-edge state, and damage ' +
          'shows as <strong>progressive directional crack sprites</strong> that update on the ' +
          'pickaxe impact frame rather than on swing start — alongside directional screen ' +
          'shake with graded intensity and pooled explosion smoke.'
        ],
        media: []
      },

      {
        title: 'Lighting: depth-driven darkening',
        tags: ['Unity rebuild', 'Light2D', 'Migration'],
        body: [
          'Mine ambience is driven by player depth through the URP global Light2D intensity. ' +
          'Because lights sharing a blend style accumulate additively before the style is ' +
          'applied, a torch near the player adds on top of the low ambient value and restores ' +
          'normal brightness locally — which is what makes a single global light behave like ' +
          'real darkness.',

          'This replaced an unlit shader quad that no 2D light could ever cut through. I left ' +
          'the old quad in the scene <em>disabled rather than deleted</em>, so the previous ' +
          'look stays one checkbox away for comparison. Light sources register dynamically, ' +
          'and a redundant-write guard skips intensity updates that would not change anything.'
        ],
        media: []
      },

      {
        title: 'Mini-games, time system and audio',
        tags: ['Godot original', 'Randomised', 'Timed events'],
        body: [
          '<strong>Mini-games</strong> gate artifact collection: digging one out throws a ' +
          'random mini-game at you, and only clearing it itemises the artifact into your ' +
          'inventory. Failing loses the find — which makes an artifact a risk rather than a ' +
          'pickup.',

          '<strong>Time system</strong> tracks how long you have been underground and deploys ' +
          'events off it. Stay until midnight and the player passes out. The Unity rebuild ' +
          'formalises this into a seven in-game-day run structure.',

          '<strong>Audio</strong> covers ambient music plus contextual SFX for walking, ' +
          'attacking, taking damage, digging and item use, so the mine reads as responsive ' +
          'rather than silent.'
        ],
        media: []
      },

      {
        title: 'Boss lair as a rolled, separate arena',
        tags: ['Unity rebuild', 'In progress', 'Prefab tooling'],
        body: [
          '<em>Current in-progress work, not yet committed.</em>',

          'When a mine generates, a weighted spawn table rolls for whether a boss gate exists ' +
          'at all — and no boss is the normal case, not a failure. If one is rolled, a ' +
          'placement service finds a valid gate cell in the generated mine.',

          'The lair itself is a <strong>separate prefab arena</strong>, not part of the mine: ' +
          'entering and exiting are async transitions that retarget the Cinemachine confiner, ' +
          'restrict player abilities inside, and guarantee a valid game state on death or ' +
          'teardown. Decor is built once with no per-tick cost.',

          'Hand-authoring that arena was the main source of "the player falls through the ' +
          'floor" bugs, because the wall tilemap has to carry a specific collider pair on a ' +
          'specific layer. So I wrote a <strong>one-click prefab builder</strong> that ' +
          'constructs the whole hierarchy in code — grid, tilemaps with explicit sort orders, ' +
          'the required collider pair, Light2D setup — and fails loudly with an actionable ' +
          'message rather than producing a subtly broken asset.'
        ],
        media: []
      },

      {
        title: 'The engineering standard, and its enforcement',
        tags: ['Unity rebuild', 'SOLID', 'Zenject', 'Audited'],
        body: [
          'The Unity rebuild is held to a written engineering standard I defined: a canonical ' +
          'folder layout per feature, explicit rules for what each layer may and may not do, ' +
          'mandatory idempotent <code>IDisposable</code> on every behaviour-bearing controller ' +
          'and model, no service locators and no hidden singletons — and a <strong>hard ban ' +
          'on <code>Update</code>, <code>FixedUpdate</code>, <code>LateUpdate</code> and ' +
          'coroutines</strong> in favour of dependency-injected tickables with explicit ' +
          'ordering.',

          'Rules are easy to write and hard to keep, so the number that matters is the audit. ' +
          'Across all 477 files: <strong>zero</strong> <code>Update</code>, ' +
          '<code>FixedUpdate</code> or <code>LateUpdate</code> methods and <strong>zero' +
          '</strong> coroutines. Exactly <strong>six</strong> tickables in the whole project. ' +
          'Only <strong>26 MonoBehaviours</strong> — about 5% of files — with the rest plain ' +
          'C# objects constructed by the container. Every enemy in the game runs from a single ' +
          'fixed-tick fan-out rather than per-enemy update methods.',

          'Supporting that: a typed event bus constrained to structs so signal payloads never ' +
          'allocate, an AI state tracer where every method is <code>[Conditional]</code> so ' +
          'both the calls and their argument expressions compile out of release builds, and ' +
          '<code>Validate()</code> contracts on configs and views so authoring mistakes fail ' +
          'at init with a readable message.'
        ],
        media: []
      },

      {
        title: 'Pause, transitions and supporting systems',
        tags: ['Unity rebuild', 'Ref counting', 'UniTask'],
        body: [
          'Pause is usually where a codebase quietly breaks, because two things can pause at ' +
          'once and one of them resumes first. Here every pauser carries an identity and the ' +
          'controller <strong>reference-counts</strong> them — pause fires when the set goes ' +
          'from empty to non-empty, resume only when it fully drains — so an inventory screen ' +
          'opened during a transition nests safely.',

          'The async half is a <strong>pause gate</strong> built on a UniTask completion ' +
          'source: in-flight sequences <em>park</em> at the gate and continue afterwards ' +
          'instead of being cancelled and restarted. Rather than freezing timescale, each ' +
          'entity type snapshots exactly what it needs — velocity, angular velocity, whether ' +
          'the body was simulated, animator speed, damage flags — and restores it on unpause.',

          'Alongside: camp-to-mine transitions with their own routes and state, a notification ' +
          'bar, health and stamina, day and time, pooled collectables with magnet-style ' +
          'collection, and a live grid-coordinate debug overlay.'
        ],
        media: []
      }
    ]
  },

  /* ======================================================================
     3. ALEXANDERBALL
     ====================================================================== */
  {
    id: 'alexanderball',
    title: 'AlexanderBall: A Countryball Tale',
    studio: 'Red Thorn Interactive',
    period: 'Dec 2021 — Aug 2024',
    status: 'Published on Steam',
    statusTone: 'accent',
    engine: 'Unity',
    language: 'C#',
    featured: false,

    tagline:
      'Turn-based strategy where you play Alexander the Great. Shipped on Steam with ' +
      '~8,000 sales, built by a team of three over 18 months.',

    about: [
      'You ascend to the Macedonian throne and relive Alexander’s conquests — ' +
      'recruiting ball types into your army, fighting alongside quirky commanders, ' +
      'founding an unreasonable number of cities named Alexandria, and pushing an empire ' +
      'to the edge of the known world.',

      'I built the battle layer: grid pathfinding, combat resolution, the turn system, ' +
      'abilities and skill trees, the battle UI, and the editor tooling that made 147 ' +
      'pawn animations tractable for a three-person team.'
    ],

    metrics: [
      { label: '~8,000 Steam sales' },
      { label: 'Team of 3' },
      { label: '18 months' },
      { label: '147 pawn animations' }
    ],

    cardMetrics: ['~8,000 Steam sales', 'Team of 3, 18 months', 'A* + editor tooling'],

    stack: ['Unity', 'C#', 'A* pathfinding', 'State pattern', 'Custom editor tools'],

    links: [
      { label: 'View on Steam', url: 'https://store.steampowered.com/app/1944660/AlexanderBall_A_Countryball_Tale/' }
    ],

    roles: [
      { name: 'Gameplay Programmer', detail: 'Battle mechanics, combat logic, pawn abilities, turn-based systems.' },
      { name: 'Systems Designer',    detail: 'Levelling, skill trees, and the three game modes.' },
      { name: 'UI/UX Developer',     detail: 'Context-sensitive battle interfaces and the tutorial system.' },
      { name: 'Tool Developer',      detail: 'Editor automation for Animator Controller setup across 147 animations.' },
      { name: 'Content Integrator',  detail: 'Campaign and local multiplayer, kept coherent across modes.' },
      { name: 'Audio Integrator',    detail: 'Music and per-role contextual sound effects.' }
    ],

    features: [
      {
        title: 'Pathfinding system',
        tags: ['A*', 'Grid', 'Damage prediction'],
        body: [
          'A* shortest-path over a roughly 150-node battle grid, with obstacle detection so ' +
          'restricted nodes cannot be routed through.',

          'The pathfinding does more than move pawns. It drives <strong>dynamic node ' +
          'highlighting</strong> for where a pawn may move this turn, <strong>path ' +
          'preview</strong> showing the exact route it will take, and <strong>valid target ' +
          'detection</strong> for what is actually in attack range.',

          'On top of that sits <strong>damage prediction</strong> — the player sees estimated ' +
          'damage before committing to an attack, which is what turns the grid from a movement ' +
          'puzzle into a tactical decision.'
        ],
        media: []
      },
      {
        title: 'Battle mechanics',
        tags: ['Grid combat', 'Abilities', 'Animation priority'],
        body: [
          'Pawn movement and combat resolution on the grid, with ability usage supporting both ' +
          'active and passive skills per pawn role.',

          'Battle calculation resolves from the type and role of both attacker and defender ' +
          'rather than a flat damage number. Animations are synchronised to the resolved ' +
          'action with <strong>defined priorities</strong> so simultaneous effects do not ' +
          'fight each other, and sound is contextual down to unique selection cues per pawn ' +
          'role.'
        ],
        media: [
          { type: 'mp4', src: 'assets/alexanderball/battle-mechanics.mp4',
            poster: 'assets/alexanderball/battle-mechanics-poster.png',
            caption: 'Pawn movement and attack resolution on the grid.' },
          { type: 'mp4', src: 'assets/alexanderball/battle-calculations.mp4',
            poster: 'assets/alexanderball/battle-calculations-poster.png',
            caption: 'Battle calculation by attacker/defender role, with animation priority.' }
        ]
      },
      {
        title: 'Pawn and commander progression',
        tags: ['Skill tree', 'Active/passive', 'Role-gated'],
        body: [
          'Level-up for both commanders and pawns, with unique skill sets per commander and ' +
          'pawn abilities categorised by role — melee, ranged, support.',

          'Special pawns get entirely distinct skill trees. Abilities are a mix of active and ' +
          'passive, unlocked against level progression so army composition becomes a ' +
          'medium-term strategic choice rather than a one-off pick.'
        ],
        media: [
          { type: 'gif', src: 'assets/alexanderball/commander-skill-tree.gif', weight: '1.5 MB',
            caption: 'Commander level-up and skill tree upgrades.' },
          { type: 'gif', src: 'assets/alexanderball/pawn-level-up.gif', weight: '4.2 MB',
            caption: 'Pawn level-up with role-gated active and passive abilities.' }
        ]
      },
      {
        title: 'Turn-based system',
        tags: ['State pattern', 'PvP', 'PvE'],
        body: [
          'The turn loop is built on the State pattern, which keeps flow readable as it grows ' +
          'and makes each transition an explicit object rather than a branch in a large method.',

          'Turns alternate between player and opponent — AI or a second human — shifting ' +
          'automatically once all moves are spent, or manually when the player ends the turn ' +
          'early to hold position.'
        ],
        media: [
          { type: 'mp4', src: 'assets/alexanderball/turn-based-system.mp4',
            poster: 'assets/alexanderball/turn-based-system-poster.png',
            caption: 'Turn alternation, move budget, and manual end-turn.' }
        ]
      },
      {
        title: 'Custom animator editor tool',
        tags: ['EditorWindow', 'Automation', '147 animations'],
        body: [
          'The content problem: <strong>21 pawn types with 7 variations each — 147 unique ' +
          'pawn animations</strong> — all needing Animator Controller clips wired by hand, on ' +
          'a three-person team.',

          'So I automated it. The tool assigns animation clips into Animator Controllers based ' +
          'on pawn role, and configures transition intervals, durations and the rest of the ' +
          'Animator settings as it goes.',

          'It removed most of the manual setup work and, more importantly, made the result ' +
          '<strong>consistent</strong> across all 147 — hand-wiring that many controllers ' +
          'guarantees drift, and drift in animation setup is miserable to debug later.'
        ],
        media: [
          { type: 'gif', src: 'assets/alexanderball/animator-editor-tool.gif', weight: '371 KB',
            caption: 'The editor tool assigning animation clips across pawn variations.' }
        ]
      },
      {
        title: 'Game modes and tutorial system',
        tags: ['Campaign', 'Local PvP', 'Data-driven'],
        body: [
          '<strong>Campaign</strong> follows Alexander’s historical conquests. ' +
          '<strong>Local multiplayer</strong> is one-versus-one where players negotiate the ' +
          'terms first — terrain, cavalry count, total pawns, commanders, and the currency ' +
          'each may spend on their army. <strong>Single player</strong> is a challenge mode ' +
          'replaying any campaign battle with an army of your choosing.',

          'The tutorial system is data-driven: it pulls content from the database and plays a ' +
          'video where one is attached, and tutorials also surface contextually the first time ' +
          'a particular troop type is selected — so teaching happens at the moment of use ' +
          'rather than in a wall of text up front.'
        ],
        media: [
          { type: 'gif', src: 'assets/alexanderball/game-modes.gif', weight: '4.4 MB',
            caption: 'Mode selection and local multiplayer army configuration.' },
          { type: 'mp4', src: 'assets/alexanderball/tutorial-system-01.mp4',
            poster: 'assets/alexanderball/tutorial-system-01-poster.png',
            caption: 'Data-driven tutorial with attached video content.' },
          { type: 'mp4', src: 'assets/alexanderball/tutorial-system-02.mp4',
            poster: 'assets/alexanderball/tutorial-system-02-poster.png',
            caption: 'Contextual tutorial triggered on first selection of a troop type.' }
        ]
      },
      {
        title: 'Battle scene UI',
        tags: ['Context-sensitive', 'Real-time feedback'],
        body: [
          'Traversable path drawn directly on the grid, abilities surfaced as buttons that ' +
          'update as the selection changes, and level and unlock state reflected in real time ' +
          'so the player is never guessing what a pawn can currently do.'
        ],
        media: []
      }
    ]
  },

  /* ======================================================================
     4. AR INTERIOR WALLPAPER APP
     ====================================================================== */
  {
    id: 'ar-wallpaper',
    title: 'AR Interior Wallpaper App',
    studio: 'Personal project',
    period: 'Personal',
    status: 'Prototype',
    statusTone: 'violet',
    engine: 'Unity 3D',
    language: 'C#',
    featured: false,

    tagline:
      'Augmented reality tool that previews wallpaper designs on real walls, so the ' +
      'choice is made against the actual room instead of a swatch.',

    about: [
      'An AR app that applies wallpaper designs to real-world walls through the camera, ' +
      'letting someone see how a pattern actually reads in their own space and light ' +
      'before buying it.',

      'The goal was removing guesswork from an expensive, hard-to-reverse decision — and ' +
      'incidentally removing the need for physical sample books, which is the part that ' +
      'made it interesting to retailers rather than only to homeowners.'
    ],

    metrics: [{ label: 'Unity 3D' }, { label: 'AR' }, { label: 'C#' }],
    cardMetrics: ['Unity 3D + AR', 'Real-surface wallpaper preview'],
    stack: ['Unity 3D', 'C#', 'AR', 'Mobile'],

    features: [
      {
        title: 'Demonstration',
        tags: ['AR', 'Surface detection'],
        body: [
          'Applying and swapping wallpaper designs on real walls in real time, with a ' +
          'catalogue interface for moving between options without leaving the AR view.'
        ],
        media: [
          { type: 'youtube', src: 'ew1JnGqf4Vw', caption: 'AR wallpaper preview demonstration.' }
        ]
      },
      {
        title: 'Where it applies',
        tags: ['Retail', 'E-commerce', 'Staging'],
        body: [
          'Interior design consultations — show a client options in their actual room. Retail ' +
          'showrooms — AR demos in store or remote. E-commerce — AR preview attached to an ' +
          'online catalogue. Home renovation planning, and real-estate staging where a space ' +
          'can be virtually decorated for a showing.'
        ],
        media: []
      }
    ]
  },

  /* ======================================================================
     5. BONGERS
     ====================================================================== */
  {
    id: 'bongers',
    title: 'Bongers',
    studio: 'Personal project',
    period: 'Personal',
    status: 'Prototype',
    statusTone: 'violet',
    engine: 'Unity 3D',
    language: 'C#',
    featured: false,

    tagline:
      'Arcade 2D platformer prototype inspired by Bonkheads (1997) — you kill enemies ' +
      'by punching the block out from under them. I also modelled and rigged the boss.',

    about: [
      'Clear every enemy in a level to summon the boss, then beat it to progress. Touching ' +
      'an enemy directly is instant death, so the only offence available is positional: ' +
      'punch the block beneath one and launch it upward.',

      'That single constraint is the whole design — it turns a platformer into a timing and ' +
      'positioning problem, because you can never simply walk into a fight.'
    ],

    metrics: [{ label: 'Unity 3D' }, { label: 'Arcade platformer' }, { label: 'Boss CG by me' }],
    cardMetrics: ['Arcade 2D platformer', 'Boss modelling, rigging, animation'],
    stack: ['Unity 3D', 'C#', 'Blender', 'Rigging', 'Animation'],

    features: [
      {
        title: 'Demonstration',
        tags: ['Prototype', 'Arcade'],
        body: [
          'Core loop: clear the standard enemies by launching them from beneath, then face the ' +
          'boss encounter.'
        ],
        media: [
          { type: 'youtube', src: '1PrL-F1kLw4', caption: 'Bongers prototype gameplay.' },
          { type: 'youtube', src: 'rRFx8Pn0aAI', caption: 'Bonkheads (1997) — the original that inspired it.' }
        ]
      },
      {
        title: 'Boss character art, rigging and animation',
        tags: ['Modelling', 'Rigging', 'Animation'],
        body: [
          'Beyond the gameplay programming, I made the boss character myself — modelling, ' +
          'rigging and animation — to get a visually distinct encounter with a rig that could ' +
          'actually carry an expressive set of actions.',

          'This is the one project where I owned the art pipeline end to end. It is not my ' +
          'discipline, but knowing what a rig makes easy or impossible has made me better at ' +
          'building animation systems for people whose discipline it is.'
        ],
        media: []
      }
    ]
  },

  /* ======================================================================
     6. WHAT FLIES
     ====================================================================== */
  {
    id: 'what-flies',
    title: 'What Flies',
    studio: 'Personal project',
    period: 'Personal',
    status: 'Prototype',
    statusTone: 'violet',
    engine: 'Unity 3D',
    language: 'C#',
    featured: false,

    tagline:
      'Infinite runner about the universal experience of birds ruining a freshly cleaned ' +
      'car. Shoot them down before the dirt meter fills.',

    about: [
      'A quirky endless runner built on one very relatable frustration. Protect your ' +
      'brand-new cars by shooting incoming birds before they strike. No matter how many you ' +
      'take down the sky keeps producing more, and you lose when the dirt meter fills ' +
      'completely.'
    ],

    metrics: [{ label: 'Unity 3D' }, { label: 'Infinite runner' }],
    cardMetrics: ['Infinite runner', 'Escalating spawn pressure'],
    stack: ['Unity 3D', 'C#'],

    features: [
      {
        title: 'Demonstration',
        tags: ['Prototype', 'Endless'],
        body: ['Endless bird waves against a filling dirt meter as the fail state.'],
        media: [
          { type: 'youtube', src: 'o-SxnOoPk84', caption: 'What Flies prototype gameplay.' }
        ]
      }
    ]
  }
];

/* -------------------------------------------------------------------------- */

const SKILLS = [
  {
    group: 'Languages & Engines',
    items: ['C#', 'Unity 3D (6.x, URP 2D)', 'Godot 4', 'Java', 'Dart', 'C++ (Arduino)', 'HLSL', 'Shader Graph']
  },
  {
    group: 'Architecture & Patterns',
    items: ['MVC / MVP', 'SOLID', 'Dependency injection (Zenject)', 'Component-based architecture',
            'Observer / signal bus', 'State pattern', 'Strategy', 'Factory + Registry',
            'Object pooling', 'ScriptableObject-driven data']
  },
  {
    group: 'Algorithms & AI',
    items: ['A* pathfinding', 'Finite state machines', 'Procedural generation',
            'Random-walk growth', 'Erosion / corrosion passes', 'Weighted spawn tables']
  },
  {
    group: 'Performance',
    items: ['Allocation-free hot paths', 'NonAlloc physics queries', 'Object pooling',
            'Off-main-thread generation (UniTask)', 'Per-tick work budgets',
            'Camera-aware culling', 'Async scene loading + shader warmup']
  },
  {
    group: 'Frameworks & Middleware',
    items: ['Zenject / Extenject', 'UniRx', 'UniTask', 'FMOD Studio', 'Unity Input System',
            'Cinemachine', 'DOTween', 'ASP.NET Core', 'Addressables', 'Mirror', 'Netcode', 'Firebase']
  },
  {
    group: 'Tools & Pipeline',
    items: ['Custom EditorWindows', 'Property drawers', 'Config validators', 'Data migration tools',
            'Git / GitHub', 'Blender', 'Photoshop', 'Illustrator', 'Flutter']
  }
];

const EXPERIENCE = [
  {
    company: 'Bad WiFi Interactive',
    role: 'Gameplay Programmer',
    period: 'Sept 2024 — present',
    points: [
      'Top contributor of nine on <strong>Starfallen Prince</strong> — 997 of 2,427 commits across a 78,000-line Unity 6.5 codebase.',
      'Own the weapon stack, cutscene sequencer, player animation and Nexus hub systems, holding 95–100% of the live code in each.',
      'Eliminated GC pressure across the combat hot paths — reused signal instances, NonAlloc physics queries, and cached callbacks in place of per-strike delegate allocation.',
      'Reworked map chunk streaming into resident chunks after measuring the switching cost, and shipped a batch editor tool to migrate the existing scenes.',
      'Delivered cutscene tooling for the wider team: custom property drawers, a config validator, and a parameter migrator that preserved already-authored content through a refactor.'
    ]
  },
  {
    company: 'Red Thorn Interactive',
    role: 'Gameplay Programmer',
    period: 'Dec 2021 — Aug 2024',
    points: [
      'Shipped <strong>AlexanderBall: A Countryball Tale</strong> to Steam with roughly 8,000 sales, on a team of three over 18 months.',
      'Built the mine half of <strong>Museum Keeper</strong> in Godot 4 — 94% of the mine codebase on a 1,421-commit project with five contributors — and continued the work into an ongoing Unity rebuild where I am the sole author of the enemy system.',
      'Implemented A* pathfinding on a ~150-node battle grid driving move-range highlighting, path preview, target validation and pre-attack damage prediction.',
      'Automated Animator Controller setup across 21 pawn types and 7 variations — 147 unique animations — with a custom editor tool.',
      'Contributed to the ASP.NET Core REST backend that served game data to the Godot build.'
    ]
  },
  {
    company: 'Opus Technology Limited',
    role: 'Junior Game Developer',
    period: 'June 2021',
    points: [
      'Worked on an online multiplayer PC game in Unity — where my networking exposure (Mirror, Netcode) comes from.'
    ]
  },
  {
    company: 'Team Reboot',
    role: 'Trainee Game Developer',
    period: 'Earlier',
    points: [
      'Learned Unity fundamentals and implemented the base structure of an infinite runner.'
    ]
  }
];

const EDUCATION = [
  { school: 'BRAC University', award: 'BSc in Computer Science and Engineering', period: '2016 — 2021' },
  { school: 'Bangladesh International School & College', award: 'Higher School Certificate, Science', period: '2015' },
  { school: 'Bangladesh International School', award: 'Secondary School Certificate, Science', period: '2013' }
];

const ACHIEVEMENTS = [
  {
    title: 'Published research — 8th IEEE CSDE, Brisbane',
    detail: 'Real-world objects augmentation in a virtual 3D environment: RealSense SDK, deep learning and game engine.',
    url: 'https://www.researchgate.net/publication/358953787_Real_world_objects_augmentation_in_virtual_3D_environment_RealSense_SDK_Deep_Learning_and_Game_Engine'
  },
  {
    title: 'Assistant Trainer — Capacity Building for Mobile Game Development',
    detail: 'Programme organised by the ICT Ministry of Bangladesh.'
  },
  {
    title: 'Lead Initiator — Shonjibon Blood Donation Community, BRACU',
    detail: 'Former lead initiator of the university blood donation community.'
  },
  {
    title: 'Assistant Director — BRAC University Adventure Club',
    detail: 'Former assistant director.'
  },
  {
    title: 'Bangabandhu Dhaka Marathon',
    detail: 'Completed the 21 km half marathon in 2017.'
  }
];

/* ============================================================================
   NEW_PROJECT_TEMPLATE
   ----------------------------------------------------------------------------
   HOW TO ADD A NEW PROJECT — four steps, no HTML to touch:

     1. Make the media folder:   assets/my-new-game/
        and drop your GIFs / MP4s / posters in it.

     2. Copy the object below (without the comment markers) into the PROJECTS
        array above. WHERE you put it in the array is where it appears on the
        site — position is how you rank your work.

     3. Set `id` to exactly match the folder name. It becomes the page URL:
        project.html?id=my-new-game

     4. Reload. The card shows up on the home page automatically, and in the
        "Other projects" strip at the bottom of every other project page.

   Only `id`, `title` and `tagline` are actually required. Leave anything else
   out and it simply does not render — no placeholder, no error.

   ----------------------------------------------------------------------------
{
  id:       'my-new-game',        // REQUIRED. Must match the assets/ folder name.
  title:    'My New Game',        // REQUIRED.
  titleNote: 'working title',     // optional, shown in brackets after the title
  studio:   'Studio name',        // or 'Personal project'
  period:   '2026 — present',
  status:   'In development',     // free text on the badge
  statusTone: 'amber',            // 'accent' = shipped (green)
                                  // 'amber'  = in development
                                  // 'violet' = prototype / coming soon
  engine:   'Unity 6.5',
  language: 'C#',
  featured: true,                 // true adds the accent bar down the card edge

  tagline: 'One sentence. Used on the card AND under the page title.',   // REQUIRED

  about: [
    'One string per paragraph. This is the "About the project" section.',
    'Add as many as you like.'
  ],

  metrics: [                      // the monospace strip under the page title
    { label: '12,000 lines' },
    { label: 'Team of 4' }
  ],

  cardMetrics: [                  // short bullets on the home-page card
    '12,000 lines',
    'Team of 4'
  ],

  stack: ['Unity', 'C#', 'Zenject'],           // small chips in a "Stack" section

  links: [                                     // buttons under the page title
    { label: 'View on Steam', url: 'https://store.steampowered.com/app/...' }
  ],

  roles: [                                     // the "My contribution" list
    { name: 'Gameplay Programmer', detail: 'What you actually did.' },
    { name: 'Tool Developer',      detail: 'And here.' }
  ],

  mediaNote: 'Optional note printed at the end of the features section.',

  features: [
    {
      title: 'A system you built',
      tags: ['A*', 'Pooling'],                 // small monospace chips
      body: [
        'One string per paragraph. You can use <strong>bold</strong>, ' +
        '<em>italic</em>, <code>Type.Method()</code> and ' +
        '<a href="https://example.com">links</a> in here.'
      ],
      media: [
        // A GIF. Click-to-play: never downloads until the viewer asks.
        { type: 'gif',   src: 'assets/my-new-game/clip.gif',
          weight: '2.4 MB',                    // shown on the play button
          caption: 'What this clip shows.' },

        // A video. preload="none", so it costs nothing until played.
        { type: 'mp4',   src: 'assets/my-new-game/clip.mp4',
          poster: 'assets/my-new-game/clip-poster.png',
          caption: 'What this video shows.' },

        // A YouTube video. `src` is the bare id from the URL, nothing else.
        { type: 'youtube', src: 'dQw4w9WgXcQ',
          caption: 'What this video shows.' },

        // A still image, lazy-loaded.
        { type: 'image', src: 'assets/my-new-game/screenshot.png',
          caption: 'What this shows.' }
      ]
    }
  ]
}
   ============================================================================ */
