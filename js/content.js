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

   To add a whole project: copy any object in PROJECTS, change the `id`, and
   make a matching folder under assets/. Nothing else needs touching --
   index.html and project.html both render straight from this array.
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
    'and under a team: enemy AI, pathfinding, procedural generation, combat ' +
    'systems, and the editor tooling other disciplines depend on. Most of what ' +
    'I do is performance-shaped — frame budgets, allocation-free hot paths, ' +
    'and knowing when to delete a system I already built.',

  /* The two numbers that lead the site. Both are straight out of git history. */
  facts: [
    { num: '41%',   label: 'of 2,427 commits on Kingdoms of the Cosmos — top contributor of 11' },
    { num: '98%',   label: 'of commits on Project Jadughor — sole developer and architect' },
    { num: '~8,000', label: 'Steam sales on AlexanderBall, built by a team of 3' },
    { num: '4 yrs',  label: 'professional gameplay programming across Unity and Godot' }
  ]
};

/* -------------------------------------------------------------------------- */

const PROJECTS = [

  /* ======================================================================
     1. KINGDOMS OF THE COSMOS
     ====================================================================== */
  {
    id: 'kingdom-of-the-cosmos',
    title: 'Kingdoms of the Cosmos',
    studio: 'Bad WiFi Interactive',
    period: 'Sept 2024 — present',
    status: 'In development',
    statusTone: 'amber',
    engine: 'Unity 6.5',
    language: 'C#',
    featured: true,

    tagline:
      'Pixel-art 2D isometric bullet-heaven with a story-driven kingdom-building ' +
      'hub. I am the top contributor of eleven on a 78,000-line codebase.',

    about: [
      'A hybrid of two genres: expedition runs are a bullet-heaven where hundreds of ' +
      'enemies converge on the player, and between runs you return to the Nexus hub to ' +
      'build up your kingdom, upgrade permanently, and travel between planets.',

      'The two halves pull in opposite technical directions. The bullet-heaven half is a ' +
      'throughput problem — steering and pathfinding hundreds of agents inside a frame ' +
      'budget. The hub half is a structure problem — interactable buildings, quests, ' +
      'dialogue, cutscenes and persistence that all have to compose cleanly across an ' +
      'eleven-person team. Most of my work sits on both sides of that line.'
    ],

    metrics: [
      { label: '1,205 C# files' },
      { label: '77,978 lines' },
      { label: '997 / 2,427 commits (41%)' },
      { label: 'URP 17.5 2D' },
      { label: 'Zenject + UniRx + UniTask' }
    ],

    cardMetrics: ['77,978 lines / 1,205 files', 'Top contributor of 11', 'Burst/Jobs A* + flow fields'],

    stack: ['Unity 6.5', 'C#', 'URP 2D', 'Zenject', 'UniRx', 'UniTask', 'Burst + Jobs', 'FMOD', 'Compute shaders', 'Cinemachine', 'DOTween'],

    roles: [
      { name: 'Gameplay Programmer', detail: 'Combat, movement, dash, light/heavy attack, weapon throw, damage and status effects.' },
      { name: 'Systems Programmer',  detail: 'Enemy AI and pathfinding, weapons, cutscenes, quests, persistence, input rebinding.' },
      { name: 'Performance',         detail: 'Burst/Jobs pathfinding, frame-budgeted schedulers, allocation elimination on hot paths.' },
      { name: 'Tools',               detail: 'Editor animation previewer, cutscene property drawers, config validator, data migrator.' },
      { name: 'Audio Integration',   detail: 'FMOD adaptive music driven from gameplay signals, layered stems on a VCA.' }
    ],

    mediaNote:
      'Gameplay captures for this project are not published yet. Drop GIFs or MP4s into ' +
      'assets/kingdom-of-the-cosmos/ and add them to the matching feature in js/content.js.',

    features: [
      {
        title: 'Burst/Jobs A* and flow-field horde steering',
        tags: ['Burst', 'Jobs', 'A*', 'Flow field', 'Spatial hash'],
        body: [
          'Pathfinding runs as a <code>[BurstCompile] IJob</code> over <code>NativeArray</code> ' +
          'and <code>NativeHashMap</code>, with per-terrain cost multipliers so agents route ' +
          'around lava rather than through it.',

          'The service that owns it fixes a genuine concurrency bug: the grid was being ' +
          'mutated while jobs were still reading it. Dynamic enemy blocking now writes to a ' +
          'separate array from the terrain markers, so a moving enemy can never clobber ' +
          'static hazard data mid-job.',

          'Alongside it I built a second movement system entirely — flow-field seek plus ' +
          'spatial-hash separation plus collision-slide, using flat-array linked buckets so ' +
          'it allocates nothing per frame after warm-up. It was deliberately built to be ' +
          '<strong>A/B switchable against the old path system in the same scene</strong> from ' +
          'an enemy config, so the comparison could be made on real content instead of ' +
          'argued about.'
        ],
        media: []
      },

      {
        title: 'Frame-budgeted enemy scheduler',
        tags: ['Frame budget', 'Round robin', 'Distance LOD'],
        body: [
          'With hundreds of active enemies, the cost that matters is not any single path ' +
          'query but how many run in one frame. The processor enforces a hard ' +
          '<strong>2 ms per-frame budget</strong> and stops when it is spent.',

          'Work is drained from a round-robin queue so no enemy can starve behind a ' +
          'permanently busy neighbour, and update rate is tiered by distance: enemies within ' +
          '10 units repath every frame, within 20 units every other frame, and beyond that ' +
          'are skipped until they matter.',

          'The budgets are exposed as designer-editable config fields — requests per frame, ' +
          'tiles physics-tested per frame during the startup scan, cells relaxed per frame ' +
          'while rebuilding the flow field — so tuning does not require a programmer.'
        ],
        media: []
      },

      {
        title: 'Allocation elimination on combat hot paths',
        tags: ['GC', 'NonAlloc', 'Profiling'],
        body: [
          'Bullet-heaven combat fires constantly, so anything allocating per swing shows up ' +
          'as GC pressure within seconds. I went through the fire and steering paths and ' +
          'removed it:',

          '<strong>Reused signal instances</strong> instead of constructing a fresh event ' +
          'object per attack. <strong>Physics.OverlapSphereNonAlloc</strong> for targeting ' +
          'queries. <strong>IReadOnlyList handoffs</strong> so sprite lists are passed without ' +
          'copying. An <strong>enum-comparison guard</strong> that keeps the steering path ' +
          'GC-free. Even the FMOD debug overlay reuses its string buffers so OnGUI does not ' +
          'churn garbage every frame.'
        ],
        media: []
      },

      {
        title: 'A streaming system I built, measured, and deleted',
        tags: ['Chunk streaming', 'Measurement', 'Editor tool'],
        body: [
          'The map originally streamed in chunks, activating and deactivating them from ' +
          'player trigger volumes. Measured against real scenes, the toggling cost and its ' +
          'edge cases outweighed what it saved.',

          'So it went. Chunks are now enabled once and stay resident, a single startup ' +
          'obstacle bake replaces per-chunk rescans, off-screen decor animators are culled, ' +
          'and the "which chunk am I in" question moved to a position-based lookup in the ' +
          'player elevation service.',

          'I wrote a batch editor tool to strip the abandoned trigger polygons out of the ' +
          'existing scenes, and left the rationale in the code so the next person does not ' +
          're-introduce it. This is the piece of work I would most want to talk through in ' +
          'an interview — not because the system survived, but because it did not.'
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
          'handlers tick per frame per active action.',

          'The part I am most pleased with is the migration path. When the parameter system ' +
          'was refactored into typed classes, I shipped a <strong>parameter migrator</strong> ' +
          'and a <strong>config validator</strong> alongside it, so the refactor carried the ' +
          'already-authored cutscenes across instead of asking the team to redo them.'
        ],
        media: []
      },

      {
        title: 'Weapons, abilities and progression',
        tags: ['Interface segregation', 'Factory', 'Object pool', 'Procedural'],
        body: [
          'Seven weapon categories behind segregated contracts — auto-attack, heavy attack, ' +
          'light attack and levelable are separate interfaces, so a weapon only implements ' +
          'what it actually has. Heavy attacks resolve through dedicated geometry ' +
          'calculators for cone and projectile-area shapes.',

          'A <strong>procedural weapon generator</strong> rolls stats against a budget and ' +
          'clones its source data on create, so generated weapons can never mutate the ' +
          'shared database.',

          'On top of that: a weapon-aspect modifier framework (ricochet, recall, magnetic, ' +
          'deluge), a level-up skill-card draft, elemental status effects (fire, wet, freeze, ' +
          'mist) resolved through a spatial hash grid, and <strong>27 enemy archetypes ' +
          'including 4 bosses</strong>, each with pooled views and its own factory.'
        ],
        media: []
      },

      {
        title: 'Architecture across an eleven-person team',
        tags: ['Zenject', 'MVC', 'UniRx', 'Signals'],
        body: [
          'Strict model/view/controller separation across roughly fifteen systems, wired ' +
          'through <strong>41 Zenject installers</strong> and about <strong>197 signal ' +
          'types</strong>, with 127 interfaces and 122 ScriptableObject types behind the data.',

          'Continuous work runs on Zenject <code>ITickable</code> rather than scattered ' +
          '<code>Update</code> methods, which keeps execution order explicit instead of ' +
          'accidental. Reactive state is real rather than decorative: 199 files use UniRx, ' +
          'with 397 reactive properties and 82 composite disposables for teardown. Async ' +
          'work is UniTask-first — 102 files against only 16 still using coroutines.'
        ],
        media: []
      },

      {
        title: 'Tooling, audio, input and loading',
        tags: ['EditorWindow', 'FMOD', 'Input System', 'Shader warmup'],
        body: [
          '<strong>Editor animation previewer:</strong> a full EditorWindow for stepping ' +
          'sprite animations — category and clip dropdowns, play/pause, speed multiplier, ' +
          'frame stepping — which restores the target renderer’s original sprite when ' +
          'closed so it cannot corrupt a scene. Plus an FMOD test harness with custom ' +
          'editors and in-editor map generation buttons.',

          '<strong>FMOD adaptive music:</strong> stems swap off gameplay signals — wave ' +
          'start, boss spawn, boss closing in, boss death, player death — layered over the ' +
          'running soundtrack through a VCA so the player’s volume settings still apply, ' +
          'with exactly-once stop semantics.',

          '<strong>Input:</strong> a full rebinding stack over Unity’s Input System — ' +
          'action-map context switching, hold tracking, JSON binding-override persistence, ' +
          'and automatic keyboard/gamepad scheme detection.',

          '<strong>Loading:</strong> additive async scene loading with ' +
          '<code>ShaderVariantCollection</code> warmup to kill first-frame shader-compile ' +
          'hitches, plus four URP quality tiers wired to the options menu.'
        ],
        media: []
      },

      {
        title: 'Shaders and visual effects',
        tags: ['Compute', 'Shader Graph', 'HLSL', 'VFX Graph'],
        body: [
          'Seventeen project-authored shader files including <strong>three compute ' +
          'shaders</strong> — among them a GPU A* variant explored on its own branch as an ' +
          'alternative to the Burst path.',

          'Hand-written HLSL for hit flash, dappled forest light, water waves, projectile ' +
          'aura and sprite transparency; Shader Graph for attack previews, the shaman ring ' +
          'and weapon alpha cutoff; a circle-fade UI transition. Seven VFX Graph assets back ' +
          'the elemental status effects, driven from a per-element ScriptableObject shader ' +
          'data layer.'
        ],
        media: []
      }
    ]
  },

  /* ======================================================================
     2. PROJECT JADUGHOR
     ====================================================================== */
  {
    id: 'project-jadughor',
    title: 'Jadughor',
    titleNote: 'working title',
    studio: 'Bad WiFi Interactive',
    period: 'Mar 2026 — present',
    status: 'In development',
    statusTone: 'amber',
    engine: 'Unity 6.3',
    language: 'C#',
    featured: true,

    tagline:
      '2D mining and archaeology game where I am the sole developer — 98 of 100 ' +
      'commits, 40,700 lines, and the architecture standard the codebase is held to.',

    about: [
      'You descend into a procedurally generated mine against a seven in-game-day clock, ' +
      'break wall cells, place tools — dynamite in three sizes, an elevator, a pile ' +
      'driver, torches — collect resources and historical artifacts, survive whatever ' +
      'lives down there, and carry your finds back up. "Jadughor" is Bengali for museum.',

      'I built essentially all of it: mine generation, enemy AI, pathfinding, the pause ' +
      'system, inventory, the toolbar and placeables, the boss lair, and the lighting. ' +
      'What I would point at first, though, is not a feature. It is that I wrote the ' +
      'engineering standard this codebase is held to, and the codebase actually holds to it.'
    ],

    metrics: [
      { label: '477 C# files' },
      { label: '~40,700 lines' },
      { label: '98 / 100 commits' },
      { label: 'URP 17.3 2D' },
      { label: 'Zenject + UniRx + UniTask' }
    ],

    cardMetrics: ['40,700 lines / 477 files', 'Sole developer', 'Zero Update() in 477 files'],

    stack: ['Unity 6.3', 'C#', 'URP 2D', 'Zenject', 'UniRx', 'UniTask', 'Input System', 'Cinemachine 3', 'DOTween', 'Tilemaps'],

    roles: [
      { name: 'Sole Developer',   detail: 'Every shipped system in the project, from mine generation to boss lair.' },
      { name: 'Architect',        detail: 'Authored the engineering standard and the enemy-system spec, then enforced both.' },
      { name: 'AI Programmer',    detail: 'Three enemy species with full state machines, A* pathfinding, spawn and relocation.' },
      { name: 'Systems Designer', detail: 'Procedural generation, inventory, toolbar, placeables, day/time, pause.' },
      { name: 'Technical Artist',  detail: 'URP Light2D depth darkening, dynamic light sources, tilemap shadow and crack passes.' }
    ],

    mediaNote:
      'Gameplay captures for this project are not published yet. Drop GIFs or MP4s into ' +
      'assets/project-jadughor/ and add them to the matching feature in js/content.js.',

    features: [
      {
        title: 'I wrote the architecture standard, and the code provably holds to it',
        tags: ['SOLID', 'Zenject', 'IDisposable', 'Enforcement'],
        body: [
          'The project carries two engineering guides I authored — a 336-line standard for ' +
          'the whole codebase and a 397-line specification for the enemy system. They set a ' +
          'canonical folder layout per feature, define what each layer may and may not do, ' +
          'require idempotent <code>IDisposable</code> on every behaviour-bearing controller ' +
          'and model, and ban service locators and hidden singletons outright.',

          'The strictest rule is a <strong>hard ban on <code>Update</code>, ' +
          '<code>FixedUpdate</code>, <code>LateUpdate</code> and coroutines</strong>, in ' +
          'favour of Zenject tickables bound at controller level with explicit ordering.',

          'Anyone can write a standard. What matters is whether it survived contact with ' +
          '40,000 lines, so here is the audit: <strong>zero</strong> ' +
          '<code>Update</code>/<code>FixedUpdate</code>/<code>LateUpdate</code> and ' +
          '<strong>zero</strong> coroutines across all 477 files. Exactly ' +
          '<strong>six</strong> tickables in the entire project. Only <strong>26 ' +
          'MonoBehaviours</strong> — about 5% of files — with the rest plain C# objects ' +
          'constructed by the container. Every enemy AI in the game runs from a single ' +
          'fixed-tick fan-out rather than per-enemy update methods.'
        ],
        media: []
      },

      {
        title: 'Enemy AI: three species, three movement models',
        tags: ['State machine', 'A*', 'Cancellation', 'Composition'],
        body: [
          'Three shipped enemies — a grounded slime, a flying bat, a crawling rattlesnake — ' +
          'each built from the same eight-piece composition (config, model, view, state ' +
          'machine, pool entry, pool, factory, controller) with state machines running ' +
          '1,700, 1,560 and 1,940 lines respectively.',

          'Pathfinding is a hand-written A* over a rebuildable navigation snapshot: Manhattan ' +
          'heuristic, multi-destination search for "get to any of these cells", asymmetric ' +
          'edge costs so a drop is priced differently from a step, and <strong>cooperative ' +
          'cancellation polled every 64 node expansions</strong> so a long search can be ' +
          'abandoned mid-flight rather than blocking.',

          'Terrain changes constantly in a mining game, so the service keeps a ' +
          '<strong>navigation revision counter</strong> and an observable of changed cells — ' +
          'enemies react to the mine being dug rather than re-polling it. Path results are ' +
          'generation-stamped so a result that arrives after the world moved on is discarded ' +
          'instead of applied. Failed routes are cached against the revision that failed, so ' +
          'an unreachable target is not retried every tick.'
        ],
        media: []
      },

      {
        title: 'Named bug classes, and the fixes',
        tags: ['Debugging', 'Rigidbody2D', 'State machines'],
        body: [
          'Three AI failure modes I tracked down, fixed, and then wrote up in the spec so ' +
          'they would not come back:',

          '<strong>The bat wobble collider bug.</strong> Bats fly with a sinusoidal wobble, ' +
          'and the wobble was being mixed into the rigidbody position — which meant the ' +
          'physics body was constantly being shoved into geometry and getting stuck. The fix ' +
          'was to make the wobble <em>visual only</em>, applied as a sprite offset, leaving ' +
          'the collider on a clean interpolated path.',

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
        tags: ['Perf', 'Lifetime', 'Config validation'],
        body: [
          'Without this, every spawned enemy ticks full AI for the entire mine session ' +
          'regardless of where the player is — an unbounded cost that grows with how long ' +
          'you have been digging.',

          'The leash accumulates per-enemy dwell time for "the player has been further than ' +
          'X tiles for Y seconds", then hands off. It deliberately does not despawn anything ' +
          'itself — it decides <em>whether</em> an enemy should relocate, never how, so ' +
          'there is no dependency cycle with the manager that owns spawning.',

          'Rather than simply culling, relocation reuses the real despawn path and respawns ' +
          'the enemy near the player but <strong>outside the camera viewport</strong>, so ' +
          'encounter density stays constant while cost does not grow. The config validates ' +
          'that maximum spawn distance is less than relocation distance — otherwise a ' +
          'respawn lands out of range and immediately re-relocates, which is a loop I would ' +
          'rather catch at author time than in a profiler.'
        ],
        media: []
      },

      {
        title: 'Procedural mine generation, entirely off the main thread',
        tags: ['UniTask', 'Thread pool', 'Erosion', 'Random walk'],
        body: [
          'A seven-stage pipeline — cells, boss cave, caves, vines, backdrops, artifacts, ' +
          'resources — where <strong>every stage opens by switching to the thread pool</strong> ' +
          'and only returns to the main thread to commit its results. Generation cannot hitch ' +
          'the frame because it is not on the frame. Everything uses ' +
          '<code>System.Random</code> rather than Unity’s, precisely because it runs ' +
          'off-thread.',

          'The algorithms are hand-rolled rather than noise-based. Caves are drawn from a ' +
          'preset table of allowed rectangles, distributed over a 3x3 slot grid with the ' +
          'centre-bottom slot reserved for the boss area, then made organic in two passes: ' +
          '<strong>edge erosion</strong> eats an irregular number of cells off the boundary, ' +
          'and <strong>interior corrosion</strong> punches small holes to read as worn rock. ' +
          'Stalagmites and stalactites are then placed along the floor and ceiling rows.',

          'Resource deposits grow by <strong>random walk</strong> — pick a root cell, extend ' +
          'to a random valid neighbour, stop at a dead end — with occupancy tracked in a ' +
          'hash set for O(1) lookups and the inner adjacency loop using a stack array to stay ' +
          'off the heap. Generation is kept strictly separate from presentation: a 1,373-line ' +
          'visualizer layer turns the generated data into eleven tilemap passes.'
        ],
        media: []
      },

      {
        title: 'Fungal vegetation: an amortised growth queue',
        tags: ['Amortised O(n)', 'Zero alloc', 'Camera aware'],
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
          'in front of you. Blocked candidates keep their roll and retry once the camera ' +
          'moves away, so nothing is lost — just deferred. Hard budgets cap it at 12 growths ' +
          'and 96 candidate scans per tick, 250 total.'
        ],
        media: []
      },

      {
        title: 'Reference-counted pause with an awaitable gate',
        tags: ['Ref counting', 'UniTask', 'State snapshots'],
        body: [
          'Pause is usually where a codebase quietly breaks, because two things can pause at ' +
          'once and one of them resumes first. Here every pauser carries an identity and the ' +
          'controller <strong>reference-counts</strong> them — pause fires when the set goes ' +
          'from empty to non-empty, resume only when it fully drains — so an inventory ' +
          'screen opened during a cutscene nests safely.',

          'The async half is a <strong>pause gate</strong> built on a UniTask completion ' +
          'source. In-flight async sequences <em>park</em> at the gate and continue afterwards ' +
          'instead of being cancelled and restarted, which is what makes pausing mid-transition ' +
          'safe.',

          'Rather than freezing timescale, each entity type <strong>snapshots</strong> exactly ' +
          'what it needs — velocity, angular velocity, whether the body was simulated, ' +
          'animator speed, whether damage was enabled — and restores it on unpause. ' +
          'Registration goes through the signal bus, so a new pausable system does not require ' +
          'touching the pause controller.'
        ],
        media: []
      },

      {
        title: 'Boss lair as a rolled, separate arena',
        tags: ['Weighted table', 'Cinemachine', 'Prefab tooling'],
        body: [
          'When a mine generates, a weighted spawn table rolls for whether a boss gate exists ' +
          'at all — and no boss is the normal case, not a failure. If one is rolled, a ' +
          'placement service finds a valid gate cell in the generated mine.',

          'The lair itself is a <strong>separate prefab arena</strong>, not part of the mine: ' +
          'entering and exiting are async transitions that retarget the Cinemachine confiner, ' +
          'restrict player abilities inside, and guarantee a valid game state on death or ' +
          'teardown. Decor is built once with no per-tick cost. The system also documents a ' +
          'deliberate absence — nothing registers a tick, because nothing in the lair needs ' +
          'per-frame work yet.',

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
        title: 'Lighting, tools and feel',
        tags: ['Light2D', 'Strategy pattern', 'Screen shake'],
        body: [
          '<strong>Depth-driven darkening.</strong> Mine ambience is driven by player depth ' +
          'through the URP global Light2D intensity. Because lights sharing a blend style ' +
          'accumulate additively before the style applies, a torch near the player adds on top ' +
          'of the low ambient and restores normal brightness locally. This replaced an unlit ' +
          'shader quad that no 2D light could cut through — and I left the old quad in the ' +
          'scene <em>disabled rather than deleted</em>, so the previous look stays one ' +
          'checkbox away for comparison.',

          '<strong>Toolbar and placeables.</strong> An 89-file system: a hotbar plus item ' +
          'action handlers as swappable strategies (tool, weapon, placeable, consumable, ' +
          'animated), and placeable machines that each run their own state machine — ' +
          'elevator, pile driver, dynamite in three sizes, torch.',

          '<strong>Feel.</strong> Directional Cinemachine 3 screen shake with graded ' +
          'intensity levels and full pause awareness; progressive directional crack sprites ' +
          'that update on the pickaxe impact frame rather than on swing start; pooled ' +
          'explosion smoke.',

          '<strong>Debugging.</strong> An AI state tracer where every method is ' +
          '<code>[Conditional]</code>, so both the calls and their argument expressions ' +
          'compile out of release builds — because a raw log on the fixed-update path ' +
          'allocates. Plus a live grid-coordinate overlay, and <code>Validate()</code> ' +
          'contracts on configs and views so authoring mistakes fail at init with a readable ' +
          'message.'
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
          'action with <strong>defined priorities</strong> so simultaneous effects do not fight ' +
          'each other, and sound is contextual down to unique selection cues per pawn role.'
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
     4. MUSEUM KEEPER
     ====================================================================== */
  {
    id: 'museum-keeper',
    title: 'Museum Keeper',
    studio: 'Red Thorn Interactive',
    period: 'Dec 2021 — Aug 2024',
    status: 'Coming soon on Steam',
    statusTone: 'violet',
    engine: 'Godot 4',
    language: 'C#',
    featured: false,

    tagline:
      '2D side-scroller where you dig a procedurally generated mine for artifacts, then ' +
      'exhibit them in an isometric museum. Built in Godot 4.',

    about: [
      'Two connected games. Underground, you explore a procedurally generated mine full of ' +
      'artifacts, minerals, traps and enemies — digging through terrain, fighting AI, and ' +
      'using tools like dynamite and torches that genuinely affect the environment. ' +
      'Artifacts you unearth can only be claimed by clearing a randomised mini-game; fail ' +
      'and you lose the find.',

      'Above ground, claimed artifacts become exhibitions in a separate isometric museum ' +
      'scene, drawing visitors and generating the currency you reinvest in expanding it.',

      'This was also my Godot project — most of my other work is Unity, and building a ' +
      'full game in a second engine forced me to separate what I actually understood about ' +
      'architecture from what was just Unity habit.'
    ],

    metrics: [
      { label: 'Godot 4' },
      { label: 'JSON-driven generation' },
      { label: 'FSM enemy AI' },
      { label: 'Save/load reconstruction' }
    ],

    cardMetrics: ['Godot 4 + C#', 'Procedural mine + FSM AI', 'JSON-driven save/load'],

    stack: ['Godot 4', 'C#', 'Component-based architecture', 'Finite state machines', 'Tilemaps', 'JSON'],

    links: [
      { label: 'View on Steam', url: 'https://store.steampowered.com/app/2708780/Museum_Keeper/' }
    ],

    roles: [
      { name: 'Gameplay Programmer', detail: 'Procedural world generation, digging, combat, enemy AI, item use, player control.' },
      { name: 'Systems Designer',    detail: 'Mine generation, inventory and toolbar logic, item-environment interaction, timed events.' },
      { name: 'UI/UX Developer',     detail: 'Inventory, toolbar, ability interface, and time tracking.' },
      { name: 'Technical Designer',  detail: 'Prototyped AI behaviour, item logic, mini-game mechanics.' },
      { name: 'Audio Integrator',    detail: 'Contextual SFX and ambient music for movement, digging, combat and item use.' },
      { name: 'Code Architect',      detail: 'Component-based design and FSM patterns for a scalable structure.' }
    ],

    features: [
      {
        title: 'Procedural mine generation with reconstructive save/load',
        tags: ['Procedural', 'JSON config', 'Tilemap'],
        body: [
          'A 2D world built from scratch — caves, minerals, traps and artifacts placed ' +
          'dynamically, with the whole generation driven by configurable data held in JSON ' +
          'rather than hard-coded, so designers could retune a mine without a rebuild.',

          'Enemies spawn into valid areas of the mine according to difficulty level and player ' +
          'progress, rather than at fixed points.',

          'The save system reuses that same generated JSON to <strong>visually reconstruct the ' +
          'exact last state</strong> of the mine through Godot’s 2D tilemap system — the ' +
          'save format and the generation format being the same thing is what makes that ' +
          'cheap rather than a second serialisation problem.'
        ],
        media: [
          { type: 'gif', src: 'assets/museum-keeper/procedural-mine-generation.gif', weight: '6.0 MB',
            caption: 'Procedural mine generation with caves, minerals, traps and artifacts.' }
        ]
      },
      {
        title: 'Enemy AI',
        tags: ['FSM', 'Component-based', 'Phases'],
        body: [
          'Enemy behaviour is a finite state machine over a component-based architecture, with ' +
          'behaviour sets varying by enemy type — patrol, rest, explore, attack.',

          'Enemies move through phases that trigger specific actions once their conditions are ' +
          'met, so encounters escalate rather than presenting one fixed behaviour until death.'
        ],
        media: [
          { type: 'gif', src: 'assets/museum-keeper/enemy-ai-fsm-01.gif', weight: '4.3 MB',
            caption: 'FSM-driven enemy behaviour: patrol, aggro and attack phases.' },
          { type: 'gif', src: 'assets/museum-keeper/enemy-ai-fsm-02.gif', weight: '2.8 MB',
            caption: 'Enemy type variation and phase transitions in combat.' }
        ]
      },
      {
        title: 'Inventory system',
        tags: ['Stacking', 'Three-mode selection'],
        body: [
          'Stack-based storage with per-slot quantities, built around three distinct ' +
          'interactions so item handling stays fast without a modifier key:',

          '<strong>Lot select</strong> — left click takes the entire stack in that slot into ' +
          'hand. <strong>Single select</strong> — right click takes one unit, and repeated ' +
          'right clicks on the same item accumulate more into hand. <strong>Swap ' +
          'select</strong> — left clicking an item while already holding a different one ' +
          'exchanges the two.'
        ],
        media: [
          { type: 'gif', src: 'assets/museum-keeper/inventory-system.gif', weight: '428 KB',
            caption: 'Lot, single and swap selection with per-slot quantities.' }
        ]
      },
      {
        title: 'Toolbar with contextual tool behaviour',
        tags: ['Inventory-integrated', 'Contextual actions'],
        body: [
          'A scrollable toolbar integrated with the inventory — the top row of the three-row ' +
          'inventory <em>is</em> the toolbar, so assigning a tool is a normal inventory move ' +
          'rather than a separate binding step.',

          'A controller then <strong>changes the player’s available actions based on the ' +
          'selected item</strong>. The pickaxe breaks mine walls but does nothing to enemies; ' +
          'the sword is the reverse. Visual feedback marks valid and invalid placement, so ' +
          'the rules are legible before you swing.'
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
        tags: ['Rigidbody', 'Knockback', 'Destructible terrain'],
        body: [
          'Responsive directional movement with attack and interact, gravity applied and ' +
          'defied per entity as needed, and knockback on impact for both players and enemies ' +
          'so trades in combat carry weight.',

          'Terrain is destructible — players break and remove wall tiles to explore or carve ' +
          'their own routes. Items act on the world rather than just on actors: ' +
          '<strong>dynamite explodes and breaks walls</strong>, and a <strong>fire torch ' +
          'ignites flammable objects and lights the area</strong>.'
        ],
        media: []
      },
      {
        title: 'Mini-games, time system and audio',
        tags: ['Randomised', 'Timed events', 'Contextual SFX'],
        body: [
          '<strong>Mini-games</strong> gate artifact collection: digging one out throws a ' +
          'random mini-game at you, and only clearing it itemises the artifact into your ' +
          'inventory. Failing loses the find — which makes an artifact a risk rather than a ' +
          'pickup.',

          '<strong>Time system</strong> tracks how long you have been underground and deploys ' +
          'events off it. Stay until midnight and the player passes out.',

          '<strong>Audio</strong> covers ambient music plus contextual SFX for walking, ' +
          'attacking, taking damage, digging and item use, so the mine reads as responsive ' +
          'rather than silent.'
        ],
        media: []
      }
    ]
  },

  /* ======================================================================
     5. AR INTERIOR WALLPAPER APP
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
          'Applying and swapping wallpaper designs on real walls in real time, with a catalogue ' +
          'interface for moving between options without leaving the AR view.'
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
     6. BONGERS
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
     7. WHAT FLIES
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
    items: ['C#', 'Unity 3D (6.x, URP 2D)', 'Godot 4', 'Java', 'Dart', 'C++ (Arduino)', 'HLSL / Compute shaders']
  },
  {
    group: 'Architecture & Patterns',
    items: ['MVC / MVP', 'SOLID', 'Dependency injection (Zenject)', 'Component-based architecture',
            'Observer / signal bus', 'State pattern', 'Factory', 'Object pooling', 'Strategy',
            'Repository / Unit of Work', 'ScriptableObject-driven data']
  },
  {
    group: 'Algorithms & AI',
    items: ['A* pathfinding', 'Flow-field steering', 'Finite state machines', 'Procedural generation',
            'Spatial hashing', 'Random-walk growth', 'Erosion / corrosion passes']
  },
  {
    group: 'Performance',
    items: ['Burst + Jobs', 'NativeArray / NativeHashMap', 'Frame budgeting', 'Distance-tiered LOD',
            'Allocation-free hot paths', 'Object pooling', 'Off-main-thread generation (UniTask)',
            'Shader variant warmup', '2D occlusion culling']
  },
  {
    group: 'Frameworks & Middleware',
    items: ['Zenject / Extenject', 'UniRx', 'UniTask', 'FMOD Studio', 'Unity Input System',
            'Cinemachine', 'DOTween', 'Addressables', 'Mirror', 'Netcode', 'Firebase']
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
      'Top contributor of eleven on <strong>Kingdoms of the Cosmos</strong> — 997 of 2,427 commits across a 78,000-line Unity 6.5 codebase.',
      'Sole developer and architect of <strong>Jadughor</strong> — 98 of 100 commits across 477 files, including the engineering standard the codebase is held to.',
      'Built Burst/Jobs A* pathfinding, flow-field horde steering, and a 2 ms-per-frame enemy scheduler with distance-tiered update rates.',
      'Delivered editor tooling for other disciplines: animation previewer, cutscene property drawers, config validators, and a data migrator that preserved authored content through a refactor.'
    ]
  },
  {
    company: 'Red Thorn Interactive',
    role: 'Gameplay Programmer',
    period: 'Dec 2021 — Aug 2024',
    points: [
      'Shipped <strong>AlexanderBall: A Countryball Tale</strong> to Steam with roughly 8,000 sales, on a team of three over 18 months.',
      'Built <strong>Museum Keeper</strong> in Godot 4 — procedural mine generation, FSM enemy AI, inventory and toolbar systems, and JSON-driven save/load.',
      'Automated Animator Controller setup across 21 pawn types and 7 variations — 147 unique animations — with a custom editor tool.',
      'Combat systems, turn-based logic, skill trees, campaign and local multiplayer, plus audio integration and QA across both titles.'
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
