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
     'mp4'     - with a `poster`, shows the video with preload="none".
                 WITHOUT a poster, gets a click-to-play placeholder instead
                 (a poster-less preload="none" video paints a black box).
     'youtube' - click-to-load facade; `src` is the bare video id.
     'image'   - a plain lazy-loaded still.

   Feature text: keep `body` to one short intro line, then use `bullets` for the
   actual points. Deck-style. Long prose does not get read.

   To add a whole project: see the fully-commented NEW_PROJECT_TEMPLATE at the
   very bottom of this file. Copy it, change the `id`, done.
   ============================================================================ */

const SITE = {
    name: 'Samiul Islam',
    role: 'Gameplay Programmer',
    location: 'Dhaka, Bangladesh',
    availability: 'Open to remote work and relocation',
    email: 'samiulislamshad@gmail.com',
    phone: '+880 1521 333415',
    linkedin: 'https://www.linkedin.com/in/samiulislamshad',
    resume: 'resume/Samiul_Islam_Resume.pdf',
    updated: 'August 2026',

    blurb:
        'Gameplay and systems programmer with four years building shipped Unity and ' +
        'Godot titles. I build enemy AI, procedural generation, combat and animation ' +
        'systems, and the editor tooling other disciplines depend on.',

    /* Headline facts. Lead with things a visitor can go and check. */
    facts: [
        {num: '0', label: 'Update() calls or coroutines anywhere in Museum Keeper’s Unity rebuild — enforced project-wide, not aspirational'},
        {num: '~8,000', label: 'Steam sales on AlexanderBall, shipped by a team of three'},
        {num: 'Playable', label: 'Dhaka Survivor runs free in the browser — exhibited at Cartoons for Equality'},
        {num: '4 yrs', label: 'professional gameplay programming across Unity and Godot'}
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
        status: 'Coming soon on Steam',
        statusTone: 'amber',
        engine: 'Unity 6.5',
        language: 'C#',
        featured: true,

        tagline:
            'Survive as Belden, a lost prince driven from his home by an unknown threat. ' +
            'Forced to flee, he and his people must rebuild their kingdom on a mysterious ' +
            'space anomaly. Grow stronger through a unique bullet-heaven roguelite set in ' +
            'a feudal sci-fi world.',

        about: [
            'Pixel-art 2D isometric bullet-heaven with a story-driven kingdom-building ' +
            'hub, where expedition runs pit the player against hundreds of converging ' +
            'enemies. Between runs, you return to the Nexus hub to build your kingdom, ' +
            'purchase permanent upgrades, and travel between planets.',

            'On a three-developer team, I work across the combat and presentation layers, covering weapons, ' +
            'player systems, animation, cutscenes, the hub, audio, and data systems.'
        ],

        metrics: [
            {label: '1,205 C# files'},
            {label: '77,978 lines'},
            {label: 'Principal author: weapons, cutscenes, animation'},
            {label: 'URP 17.5 2D'}
        ],

        cardMetrics: ['Weapons, cutscenes, animation', '77,978-line codebase', 'Nine-developer team'],

        stack: ['Unity 6.5', 'C#', 'URP 2D', 'Zenject', 'UniRx', 'UniTask', 'FMOD', 'Cinemachine', 'DOTween', 'Shader Graph', 'VFX Graph'],

        roles: [
            {
                name: 'Gameplay Programmer',
                detail: 'Combat, movement, dash, light and heavy attack, weapon throw, damage calculation.'
            },
            {
                name: 'Systems Programmer',
                detail: 'Weapon stack, weapon aspects, skill cards, cutscene sequencer, Nexus hub, data layer.'
            },
            {name: 'Animation', detail: 'Split-body player animation, enemy view layer and VFX.'},
            {name: 'Performance', detail: 'Allocation-free combat hot paths, chunk-system rework, hit-effect lag fix.'},
            {name: 'Tools', detail: 'Cutscene property drawers, config validator, and a parameter migrator.'},
            {name: 'Audio Integration', detail: 'FMOD adaptive music driven from gameplay signals.'}
        ],

        features: [
            {
                title: 'Weapon system',
                tags: ['7 weapon categories', 'Light & heavy attacks', 'Elemental effects', 'Aspects'],
                body: ['Seven weapon categories, each with its own attacks, elemental effects, and modifiers that change how a weapon is actually played.'],
                bullets: [
                    '<strong>Weapon variety.</strong> Seven weapon categories to choose from, including close-range options like the Sword and the Shield & Spear, and ranged options like the Bow & Arrow',
                    'Each weapon category has multiple variants with different stats, so choosing a variant changes how the weapon plays, not just how it looks',
                    'Weapons can be equipped, unequipped, swapped, or dropped at any point during a run — your loadout is a decision you can revisit constantly, not something locked in at the start',
                    '<strong>Light and heavy attacks.</strong> Every weapon category has its own light attack and its own heavy attack, rather than sharing one attack animation reused across all of them',
                    'These attacks differ in range, damage, and the effect they cause — a heavy attack from a close-range weapon might sweep a wide arc in front of the player, while a heavy attack from a ranged weapon might fire a single shot that pierces straight through a line of enemies',
                    'Switching weapons changes how the game actually plays moment to moment, not just the numbers behind the scenes',
                    '<strong>Elemental effects.</strong> Weapons can be imbued with elemental effects — fire, water, air, and nature — that add a secondary effect on top of a hit\'s normal damage',
                    'Elements can also combine: hitting an already-wet enemy with a fire effect creates mist, a distinct effect from either fire or water on its own',
                    '<strong>Aspects.</strong> Weapons can also carry an aspect — a modifier that changes how a weapon is played, not just its stats',
                    '<strong>Recall</strong> lets the player throw a weapon at an enemy and call it back into their hand, briefly turning a melee weapon into a ranged one',
                    '<strong>Ricochet</strong> lets a hit bounce from one enemy to another, so a single attack can chain across a crowd',
                    'Any weapon can carry any aspect, so the same sword can ricochet or recall just as easily as any other weapon — multiplying the number of ways a single weapon can be played'
                ],
                media: [
                    {
                        type: 'mp4', src: 'assets/starfallen-prince/WeaponSystem.mp4', weight: '17.3 MB',
                        caption: 'Weapon swapping, per-weapon light and heavy attacks, and aspects applied across weapons.'
                    }
                ]
            },

            {
                title: 'Player combat and movement',
                tags: ['8-directional movement', 'Attack modes', 'Charge-based heavy attacks', 'Dodge roll'],
                body: ['How the player moves, attacks, and gets out of trouble — with a real choice built into each one.'],
                bullets: [
                    '<strong>Eight-directional movement.</strong> Most 2D bullet-heaven games move the player on two or four directions; this one moves on eight, which reads as noticeably smoother and gives finer control when weaving through a packed screen of enemies',
                    '<strong>Three attack modes.</strong> The player chooses how much control they want over targeting and timing, from fully automatic to fully manual',
                    '<strong>Assisted</strong> attacks continuously and automatically aims at the nearest enemy, so the player can focus entirely on movement and positioning',
                    '<strong>Auto</strong> keeps attacking on its own once triggered, but the player chooses which direction it fires',
                    '<strong>Manual</strong> hands the player full control over both when and where every attack lands',
                    '<strong>Light and heavy attacks.</strong> Every hit with a light attack builds toward a heavy attack, stored as a set of charge bars',
                    'Triggering a heavy attack spends that stored charge — how much damage it does depends on the weapon in hand and how many charge bars were filled when it goes off, so holding out for a fuller charge is a real risk-reward decision, not just a bigger number',
                    '<strong>Dodge roll.</strong> The dodge plays out in two phases, a dive into a roll, and the player is invincible for both — enough to cut straight through a crowd of enemies or an attack that would otherwise be fatal',
                    '<strong>Weapon throw.</strong> The same action either discards the weapon in hand, or, if that weapon carries a throw-based aspect such as Recall, triggers that aspect instead — so throwing a weapon can mean losing it or briefly turning it into a ranged attack, depending on what it is imbued with'
                ],
                media: []
            },

            {
                title: 'Character animation system',
                tags: ['Split-body', 'Index-driven', 'ScriptableObject'],
                body: ['The player animates as three coordinated layers instead of one animator state machine.'],
                bullets: [
                    'Separate upper-body, lower-body and full-body override controllers, so aiming and movement play independently',
                    'Clips resolved from ScriptableObject animation data <strong>by sprite index</strong> rather than animator parameters',
                    'Adding a weapon or enemy does not mean authoring a new set of animator clips',
                    'Weapon effects step through a per-category sprite list driven by one animation event per frame',
                    'Driven entirely by signals, so no system polls animation state'
                ],
                media: [
                    {
                        type: 'mp4', src: 'assets/starfallen-prince/EnemyAnimations.mp4', weight: '13.8 MB',
                        caption: 'Enemy animation set driven from the shared index-based animation data.'
                    }
                ]
            },

            {
                title: 'Cutscene system',
                tags: ['Data-driven', 'Property drawers', 'Migration tool'],
                body: ['A 75-file sequencer where cutscenes are authored as data, not written in code.'],
                bullets: [
                    'Eleven typed parameter classes — camera, movement, animation, narrative, music, SFX, VFX, screen fade, pop-up, wait, custom',
                    'Each has a handler behind a common interface, kept cheap because handlers run per frame per active action',
                    'Custom <strong>property drawers</strong> make the action graph authorable directly in the inspector',
                    '<strong>Config validator</strong> catches broken cutscene assets before they reach a scene',
                    '<strong>Parameter migrator</strong> carried already-authored cutscenes through the refactor, so the team did not have to redo them'
                ],
                media: []
            },

            {
                title: 'Nexus hub and kingdom building',
                tags: ['MVC', 'Zenject', 'Planet travel'],
                body: ['The hub world between expedition runs, where the kingdom-building happens.'],
                bullets: [
                    'Every building is a full model/view/controller triple: forge, permanent upgrades, storage, expedition portal, world portal',
                    '<strong>Navigation building</strong> cycles between planets and drives the world portal',
                    'NPCs, dialogue triggers and story objects, with its own hub player and camera',
                    'Implements the pause contract so hub canvases can open safely mid-interaction',
                    'Data layer loads JSON into ScriptableObjects, with reactive run state observable without a static singleton'
                ],
                media: []
            },

            {
                title: 'Enemy presentation, VFX and pooling',
                tags: ['Object pooling', 'VFX', 'Spatialised audio'],
                body: ['The enemy view layer — how they look, animate, and get recycled.'],
                bullets: [
                    'Base enemy view plus twelve per-archetype view classes',
                    'Forward and backward movement animation, submerged effect, shaman ring, unlit variants',
                    'Projectile shaders and ranged attack previews',
                    'Separate pools for melee, shielded-melee, ranged, flying and shaman enemies, plus a projectile-preview pool',
                    'Elevation and positioning services that place enemies correctly in isometric space',
                    'Spatialised enemy SFX'
                ],
                media: []
            },

            {
                title: 'Performance and optimisation',
                tags: ['GC', 'NonAlloc', 'Measurement'],
                body: ['Bullet-heaven combat fires constantly, so anything allocating per shot becomes GC pressure within seconds.'],
                bullets: [
                    '<strong>Reused signal instances</strong> — the strike path writes into a pre-allocated signal rather than constructing one per swing',
                    'Automatic-weapon fire became a plain loop with no allocations, replacing a per-tick signal dispatch',
                    'NonAlloc physics queries instead of <code>OverlapCircleAll</code>, which allocates a fresh array every call',
                    'Cached callbacks instead of method groups, which allocate a delegate per strike',
                    'Sprite lists handed over as read-only interfaces so there is no copy',
                    '<strong>Rebuilt map chunk streaming into resident chunks</strong> — there was a visible hitch on every chunk switch, and once measured the activate/deactivate cost outweighed what streaming saved. Shipped a batch editor tool to migrate the existing scenes',
                    'Fixed a lag spike caused by creating and destroying the hit-effect shader material on every enemy hit',
                    'Additive async scene loading with shader-variant warmup to remove first-frame compile hitches',
                    'Four URP quality tiers wired to the graphics options menu'
                ],
                media: []
            },

            {
                title: 'Adaptive music and audio',
                tags: ['FMOD', 'Signals', 'VCA'],
                body: ['Music responds to what is actually happening in a run.'],
                bullets: [
                    'Stems swap off gameplay signals: wave start, boss spawn, boss closing in, boss death, player death',
                    'Separate intro-loop and no-intro-loop variants so a transition never restarts a phrase awkwardly',
                    'A layered track plays over the running soundtrack with exactly-once stop semantics',
                    'Routed through a VCA so player volume settings still apply',
                    'Per-scene controllers for the hub, main menu and expedition planets'
                ],
                media: []
            },

            {
                title: 'Shaders and visual effects',
                tags: ['HLSL', 'Shader Graph', 'VFX Graph'],
                body: ['Hit feedback, environment effects and UI transitions.'],
                bullets: [
                    'Hit flash, dappled forest light, water waves, projectile aura and sprite transparency',
                    'Weapon alpha cutoff and a circle-fade UI transition',
                    'Per-element weapon shader data held as ScriptableObjects',
                    'Fixed a screen-shake shader bug'
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
        period: 'Godot 2023–2024 · Unity rebuild 2026–present',
        status: 'Coming soon on Steam',
        statusTone: 'violet',
        engine: 'Godot 4 → Unity',
        language: 'C#',
        featured: true,

        tagline:
            'Dig a procedurally generated mine for artifacts, then exhibit them in a museum. ' +
            'Built in Godot 4, now being rebuilt in Unity — with zero Update() calls or coroutines anywhere in the new codebase.',

        about: [
            'Two connected games. Underground you explore a procedurally generated mine full of ' +
            'artifacts, minerals, traps and enemies, digging through terrain and using tools that ' +
            'change the environment. Artifacts are only claimed by clearing a randomised ' +
            'mini-game — fail and you lose the find. Above ground they become exhibitions in an ' +
            'isometric museum that draws visitors and earns the currency you reinvest.',

            'The team splits the way the game does: <strong>I own the mine, a colleague owns the ' +
            'museum</strong>, across both engines. The rebuild is a real rewrite — artifact data ' +
            'and sprites carried over, but every line of code was written from scratch.'
        ],

        metrics: [
            {label: 'One shared framework runs every enemy type'},
            {label: 'Zero Update() calls or coroutines anywhere in the project'},
            {label: 'A* pathfinding that reacts to the mine changing, instead of polling it'}
        ],

        cardMetrics: ['Zero Update() calls anywhere', 'One framework, every enemy type', 'A* that reacts, not polls'],

        stack: ['Godot 4', 'Unity', 'C#', 'URP 2D', 'Zenject', 'UniRx', 'UniTask', 'ASP.NET Core', 'A* pathfinding', 'Finite state machines', 'Tilemaps', 'Light2D', 'Cinemachine 3', 'DOTween'],

        links: [
            {label: 'View on Steam', url: 'https://store.steampowered.com/app/2708780/Museum_Keeper/'}
        ],

        roles: [
            {
                name: 'Gameplay Programmer',
                detail: 'Mine generation, digging, combat, item usage and player control — in both engines.'
            },
            {
                name: 'AI Programmer',
                detail: 'Three enemy species with full state machines, A* pathfinding, spawning and relocation.'
            },
            {
                name: 'Systems Designer',
                detail: 'Procedural generation, inventory, toolbar and placeables, day/time, collectables.'
            },
            {
                name: 'Technical Artist',
                detail: 'Light2D mine darkening, dynamic light sources, tilemap shadow and crack passes.'
            },
            {
                name: 'Audio Integrator',
                detail: 'Contextual SFX and ambient music for movement, digging, combat and item use.'
            },
            {
                name: 'Backend',
                detail: 'Contributed to the ASP.NET Core REST service that served game data in the Godot build.'
            }
        ],

        mediaNote: 'The clips on this page are from the Godot original.',

        features: [
            {
                title: 'Procedural mine generation system',
                tags: ['Procedural', 'Erosion', 'Random walk', 'Save/load'],
                body: ['A 2D mine world built from scratch, generated fresh every run — and rebuilt from the ground up for Unity.'],
                bullets: [
                    'Dynamically placed caves, minerals, traps and artifacts, all driven by configurable JSON rather than hard-coded values',
                    'Enemies spawn into valid areas based on difficulty level and player progress',
                    '<strong>Save/load reuses the generated data</strong> to visually reconstruct the exact last state of the mine',
                    'Caves drawn from a preset shape table, distributed over a slot grid with the boss area reserved',
                    '<strong>Edge erosion</strong> eats away the cave boundary and <strong>interior corrosion</strong> punches holes, so caves read as organic rather than rectangular',
                    'Resource deposits grow by <strong>random walk</strong> from a root cell until they hit a dead end',
                    'Stalagmites and stalactites placed along floor and ceiling rows',
                    'In Unity, the entire seven-stage pipeline runs <strong>off the main thread</strong>, so generation can never hitch the frame',
                    'Mine surfaces slowly grow fungal vegetation over time using a maturation queue rather than rescanning every broken cell each tick, and growth is deliberately suppressed inside the camera view — the code\'s own comment notes the reverse order would quietly bias growth toward wherever the player lingers'
                ],
                media: [
                    {
                        type: 'gif', src: 'assets/museum-keeper/procedural-mine-generation.gif', weight: '6.0 MB',
                        caption: 'Procedural mine generation with caves, minerals, traps and artifacts.'
                    }
                ]
            },

            {
                title: 'Enemy AI and pathfinding',
                tags: ['A*', 'State machines', 'Object pooling'],
                body: ['Three enemy species — grounded, flying, crawling — share one architecture, all built on the same A* pathfinder.'],
                bullets: [
                    '<strong>One 102-file, ~12,800-line framework</strong> drives all three species — config, pooling, factories, pathfinding, and spawn placement are all species-agnostic, with each enemy\'s personality confined to its own state machine and data',
                    'Pathfinding is <strong>A*</strong> over a cached navigation snapshot — a fall step costs more than a walked step, cancellation is checked every 64 node expansions so a long search never blocks a frame, and a navigation-revision counter lets enemies react to the mine changing instead of polling it',
                    'Every enemy is <strong>pooled, not instantiated and destroyed</strong> — released instances are reparented and deactivated rather than destroyed, and placement, occupancy and camera-visibility checks are handled once by a shared spawn-location service instead of being reimplemented per species',
                    'A <strong>relocation leash</strong> can respawn an enemy that has drifted far from the player back in near them, off-camera, holding encounter density constant without AI cost growing over a session — a framework capability currently enabled on the RattleSnake',
                    'The <strong>Slime</strong> uses one teleport mechanic for two jobs at once — an offensive gap-closer and a last-resort unstick — gated behind a one-shot aggro telegraph so the player gets a warning beat before an engagement\'s first hit',
                    'The <strong>RattleSnake</strong>, the largest of the three state machines, recovers from being stuck more quietly — a silent reposition that escalates into the shared relocation system, built around a set of edge-case fixes specific to crawling across uneven, breakable ground',
                    'The <strong>Bat</strong> paths through open air with no floor requirement and no fall cost, spreads out from other bats in formation instead of clustering on the same route, and reroutes live if a stalactite it was avoiding falls and re-lodges elsewhere'
                ],
                media: [
                    {
                        type: 'mp4', src: 'assets/museum-keeper/EnemyAi_Bat.mp4', weight: '9.6 MB',
                        caption: 'The Bat exploring and chasing in flight.'
                    },
                    {
                        type: 'mp4', src: 'assets/museum-keeper/EnemyAi_bat2.mp4', weight: '7.9 MB',
                        caption: 'The Bat navigating and avoiding obstacles mid-flight.'
                    },
                    {
                        type: 'mp4', src: 'assets/museum-keeper/EnemyAi_Slime.mp4', weight: '5.4 MB',
                        caption: 'The Slime\'s teleport and aggro behaviour in the mine.'
                    },
                    {
                        type: 'mp4', src: 'assets/museum-keeper/EnemyAI_SlimeAndSnake.mp4', weight: '8.8 MB',
                        caption: 'The Slime and RattleSnake together in the mine.'
                    },
                    {
                        type: 'gif', src: 'assets/museum-keeper/enemy-ai-fsm-01.gif', weight: '4.3 MB',
                        caption: 'FSM-driven enemy behaviour: patrol, aggro and attack phases.'
                    },
                    {
                        type: 'gif', src: 'assets/museum-keeper/enemy-ai-fsm-02.gif', weight: '2.8 MB',
                        caption: 'Enemy type variation and phase transitions in combat.'
                    }
                ]
            },

            {
                title: 'Character animation systems',
                tags: ['Data-driven', 'Animation events', 'Pooling reset'],
                body: ['All character animation in the mine — player, enemies and placeables.'],
                bullets: [
                    'Animation IDs resolve to clips through a ScriptableObject library, not animator-parameter soup',
                    'Animation events drive gameplay: damage lands on the attack impact frame, not on state entry',
                    'Generation counters discard stale animation callbacks, so a despawned enemy cannot fire an event',
                    'Per-species animation controllers for slime, bat and snake, each with their own state set',
                    'Full animation state reset on pool release, so a reused enemy never inherits the last one’s pose',
                    'Player climb, fall, mine and attack animations coordinated with the movement services'
                ],
                media: []
            },

            {
                title: 'Inventory and toolbar system',
                tags: ['Stacking', 'Three-mode selection', 'Scrollable'],
                body: ['Stack-based storage with three distinct interactions, so item handling stays fast without a modifier key.'],
                bullets: [
                    '<strong>Lot select</strong> — left click takes the whole stack in that slot into hand',
                    '<strong>Single select</strong> — right click takes one unit; clicking again accumulates more',
                    '<strong>Swap select</strong> — left clicking while holding a different item exchanges the two',
                    'Per-slot quantity display',
                    'The top row of the three-row inventory <em>is</em> the toolbar, so assigning a tool is a normal inventory move rather than a separate binding step',
                    'Scrollable slot selection with visual feedback for valid and invalid placement',
                    'Unity rebuild adds artifact and item models, collection visualisers and magnet-style pickup'
                ],
                media: [
                    {
                        type: 'gif', src: 'assets/museum-keeper/inventory-system.gif', weight: '428 KB',
                        caption: 'Lot, single and swap selection with per-slot quantities.'
                    },
                    {
                        type: 'gif', src: 'assets/museum-keeper/toolbar-system.gif', weight: '323 KB',
                        caption: 'Scrollable toolbar with slot assignment from the inventory.'
                    }
                ]
            },

            {
                title: 'Item and tool handling',
                tags: ['Strategy pattern', 'Placeables', 'Destructible terrain'],
                body: ['What the selected item is determines what the player can do — and items act on the world, not just on actors.'],
                bullets: [
                    'A controller <strong>changes the player’s available actions based on the selected item</strong>',
                    'The pickaxe breaks mine walls but does nothing to enemies; the sword is the reverse',
                    '<strong>Dynamite</strong> explodes and destroys walls; a <strong>fire torch</strong> ignites flammable objects and lights the area',
                    'Terrain is destructible — players break wall tiles to explore or carve their own routes',
                    'Unity rebuild handles item actions as <strong>swappable strategies</strong>: tool, weapon, placeable, consumable, animated',
                    'Placeable machines each run their own state machine — dynamite in three sizes, elevator, pile driver, torch',
                    'Progressive <strong>directional crack sprites</strong> update on the pickaxe impact frame as a wall takes damage',
                    'Directional screen shake with graded intensity, and pooled explosion smoke',
                    'Cell and object damage queries reuse a single pre-sized collision-results buffer instead of allocating a new list on every hit, keeping the digging and combat loop free of garbage-collection pressure'
                ],
                media: [
                    {
                        type: 'gif', src: 'assets/museum-keeper/toolbar-contextual-tools.gif', weight: '5.0 MB',
                        caption: 'Contextual tool behaviour: pickaxe for walls, sword for enemies.'
                    }
                ]
            },

            {
                title: 'Boss architecture',
                tags: ['Weighted roll', 'Procedural arena', 'Async transitions'],
                body: ['A fully built encounter framework — the arena, the gate, the transitions — with the boss\'s own combat behaviour designed but not yet implemented.'],
                bullets: [
                    '<strong>Whether a boss exists at all is a weighted roll</strong> — most runs are deliberately boss-free, and a gate only appears if a spawn-table roll and a valid cave/floor location both succeed',
                    'Gate placement rejects any candidate cell that already has a stalactite or stalagmite formation on it, or lacks solid ground underneath, so a gate never spawns somewhere it would immediately look or behave wrong',
                    'The boss lair is a <strong>separate arena, not part of the mine</strong> — sealed at runtime with its own generated backdrop and seeded decor, and the mine below is automatically raised out of camera view if it would otherwise be visible',
                    'Entering and exiting run as <strong>cancellable async transitions</strong>: walk to the gate, wake the arena, cut the camera, teleport the player, and reverse the same sequence on the way out — including a forced early exit if the player dies mid-encounter, since there is deliberately no respawn flow to fall back on',
                    'The camera re-targets itself to the arena using the actual pixel-perfect visible area rather than the stock camera size property, so framing stays correct even when the arena is smaller than a normal mine room',
                    'A small lifecycle state machine (<strong>idle, entering, active, exiting</strong>) drives the whole encounter and is pause-aware, so a modal screen can suspend a transition safely',
                    'The arena hierarchy is generated by a one-click editor tool rather than hand-authored, because a hand-built wall tilemap was the main source of "player falls through the floor" bugs — the tool fails loudly with an explicit message instead of producing a broken asset',
                    '<strong>The boss\'s own combat behaviour is the next piece to build.</strong> The numbers are fully designed and validated — attack timing, a separate charge attack with its own wind-up and cooldown, and a phase system driven by remaining health — but the state machine that turns those numbers into actual behaviour has not landed yet'
                ],
                media: []
            },

            {
                title: 'Shaders, 2D lighting and mine darkening',
                tags: ['Light2D', 'Colour ramp', 'Tilemap shadows'],
                body: ['Making a mine actually feel dark, and letting a single torch matter.'],
                bullets: [
                    'Mine ambience driven by <strong>player depth</strong> through the global 2D light intensity — the deeper you go, the darker it gets',
                    'Because lights on a shared blend style accumulate, a torch near the player <strong>restores normal brightness locally</strong>',
                    'Light sources register dynamically, so torches and placed items light the world as they appear',
                    'Replaced an unlit shader quad that no 2D light could ever cut through',
                    'Colour-ramp and colour-swap shader materials for wall shadows and UI darkening',
                    'Fake wall shadows rendered as a dedicated offset tilemap layer',
                    'A redundant-write guard skips light updates that would not change anything'
                ],
                media: []
            },

            {
                title: 'Game mechanics and physics',
                tags: ['Movement', 'Gravity', 'Knockback'],
                body: ['The moment-to-moment feel of moving and fighting underground.'],
                bullets: [
                    'Smooth directional movement with attack, interact and climb',
                    'Gravity applied and defied per entity as needed — player, enemies, physics objects',
                    'Knockback on impact for both players and enemies, so trades in combat carry weight',
                    'Invincibility frames after taking damage',
                    'Unity rebuild splits player behaviour across focused services — movement, climb, fall, grounding, damage, interaction, death'
                ],
                media: []
            },

            {
                title: 'Mini-games, time system and audio',
                tags: ['Randomised', 'Timed events', 'Contextual SFX'],
                body: ['The systems that turn an artifact into a risk and a mine trip into a deadline.'],
                bullets: [
                    '<strong>Mini-games</strong> gate artifact collection — digging one out throws a random mini-game at you, and only clearing it adds the artifact to your inventory',
                    'Failing loses the find, which makes an artifact a gamble rather than a pickup',
                    '<strong>Time system</strong> tracks how long you have been underground and fires events off it — stay until midnight and the player passes out',
                    'The Unity rebuild formalises this into a seven in-game-day run structure',
                    'Ambient music plus contextual SFX for walking, attacking, taking damage, digging and item use',
                    'Notification bar, health and stamina HUD, and camp-to-mine transitions'
                ],
                media: []
            },

            {
                title: 'Architecture and engineering standard',
                tags: ['SOLID', 'Zenject', 'Audited'],
                body: ['Scattered <code>Update</code> calls made execution order accidental and caused ordering bugs, so ticking was centralised — and I wrote down the standard that came out of it.'],
                bullets: [
                    'Continuous work runs on dependency-injected tickables with <strong>explicit ordering</strong>, instead of per-object <code>Update</code> methods running in whatever order Unity picks',
                    'Canonical folder layout per feature, with explicit rules for what each layer may and may not do',
                    'Mandatory disposal on every behaviour-bearing controller and model',
                    'No service locators, no hidden singletons',
                    'The standard held under audit: <strong>zero</strong> <code>Update</code>, <code>FixedUpdate</code> or <code>LateUpdate</code> methods anywhere, <strong>zero</strong> coroutines, exactly six tickables, and only 5% of files derive from MonoBehaviour',
                    'Typed event bus constrained to structs, so signal payloads never allocate',
                    '<strong>Reference-counted pause system</strong> — nested pausers compose safely, and in-flight async sequences park at a gate rather than being cancelled',
                    'The entire pause system — including retrofitting every other system that needed to react to it — went in as <strong>one single commit</strong>, designed complete rather than bolted on piece by piece, down to details like the day/time clock capturing its exact leftover tick fraction on pause so time never drifts or jumps on resume',
                    'AI state tracer that compiles out of release builds entirely',
                    'Validation contracts on configs and views, so authoring mistakes fail at startup with a readable message'
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
            'You ascend to the Macedonian throne and relive Alexander’s conquests — recruiting ' +
            'ball types into your army, fighting alongside quirky commanders, and founding an ' +
            'unreasonable number of cities named Alexandria.',

            'I built the battle layer: grid pathfinding, combat resolution, the turn system, ' +
            'abilities and skill trees, the battle UI, and the editor tooling that made 147 pawn ' +
            'animations tractable for three people.'
        ],

        metrics: [
            {label: '~8,000 Steam sales'},
            {label: 'Team of 3'},
            {label: '18 months'},
            {label: '147 pawn animations'}
        ],

        cardMetrics: ['~8,000 Steam sales', 'Team of 3, 18 months', 'A* + editor tooling'],

        stack: ['Unity', 'C#', 'A* pathfinding', 'State pattern', 'Custom editor tools'],

        links: [
            {
                label: 'View on Steam',
                url: 'https://store.steampowered.com/app/1944660/AlexanderBall_A_Countryball_Tale/'
            }
        ],

        roles: [
            {
                name: 'Gameplay Programmer',
                detail: 'Battle mechanics, combat logic, pawn abilities, turn-based systems.'
            },
            {name: 'Systems Designer', detail: 'Levelling, skill trees, and the three game modes.'},
            {name: 'UI/UX Developer', detail: 'Context-sensitive battle interfaces and the tutorial system.'},
            {name: 'Tool Developer', detail: 'Editor automation for Animator Controller setup across 147 animations.'},
            {name: 'Content Integrator', detail: 'Campaign and local multiplayer, kept coherent across modes.'},
            {name: 'Audio Integrator', detail: 'Music and per-role contextual sound effects.'}
        ],

        features: [
            {
                title: 'Pathfinding system',
                tags: ['A*', 'Grid', 'Damage prediction'],
                body: ['A* shortest-path over a roughly 150-node battle grid, doing more than just moving pawns.'],
                bullets: [
                    'Obstacle detection prevents movement through restricted nodes',
                    '<strong>Dynamic node highlighting</strong> shows where a pawn can move this turn',
                    '<strong>Path preview</strong> visualises the exact route a pawn will take',
                    'Valid attack targets identified by range',
                    '<strong>Damage prediction</strong> estimates the outcome before the player commits to an attack'
                ],
                media: []
            },
            {
                title: 'Battle mechanics',
                tags: ['Grid combat', 'Abilities', 'Animation priority'],
                body: ['Movement and combat resolution on a grid battlefield.'],
                bullets: [
                    'Pawn movement and attacks within the grid',
                    'Ability usage supporting both active and passive skills per pawn role',
                    'Battle calculation driven by the type and role of both attacker and defender, not flat damage',
                    'Animations synchronised to the resolved action with <strong>defined priorities</strong>, so simultaneous effects do not fight each other',
                    'Contextual sound down to unique selection cues per pawn role'
                ],
                media: [
                    {
                        type: 'mp4', src: 'assets/alexanderball/battle-mechanics.mp4',
                        poster: 'assets/alexanderball/battle-mechanics-poster.png',
                        caption: 'Pawn movement and attack resolution on the grid.'
                    },
                    {
                        type: 'mp4', src: 'assets/alexanderball/battle-calculations.mp4',
                        poster: 'assets/alexanderball/battle-calculations-poster.png',
                        caption: 'Battle calculation by attacker/defender role, with animation priority.'
                    }
                ]
            },
            {
                title: 'Pawn level up and skills',
                tags: ['Skill tree', 'Active/passive', 'Role-gated'],
                body: ['Progression for both commanders and pawns.'],
                bullets: [
                    'Level-up and skill tree upgrades for commanders, each with a unique skill set',
                    'Pawn abilities categorised by role — melee, ranged, support',
                    'Special pawns get entirely distinct skill trees',
                    'Both active and passive abilities that influence battle outcomes',
                    'Ability unlocks tied to level progression, so army composition is a medium-term strategic choice'
                ],
                media: [
                    {
                        type: 'gif', src: 'assets/alexanderball/commander-skill-tree.gif', weight: '1.5 MB',
                        caption: 'Commander level-up and skill tree upgrades.'
                    },
                    {
                        type: 'gif', src: 'assets/alexanderball/pawn-level-up.gif', weight: '4.2 MB',
                        caption: 'Pawn level-up with role-gated active and passive abilities.'
                    }
                ]
            },
            {
                title: 'Turn based system',
                tags: ['State pattern', 'PvP', 'PvE'],
                body: ['The turn loop, built on the State pattern to keep flow readable as it grew.'],
                bullets: [
                    'Turns alternate between player and opponent — AI or a second human',
                    'Turn shifts automatically once all moves are spent',
                    'Or manually, when the player ends the turn early to hold position',
                    'Each transition is an explicit object rather than a branch in one large method'
                ],
                media: [
                    {
                        type: 'mp4', src: 'assets/alexanderball/turn-based-system.mp4',
                        poster: 'assets/alexanderball/turn-based-system-poster.png',
                        caption: 'Turn alternation, move budget, and manual end-turn.'
                    }
                ]
            },
            {
                title: 'Animation and animator controllers',
                tags: ['EditorWindow', 'Automation', '147 animations'],
                body: ['<strong>21 pawn types × 7 variations = 147 unique animations</strong>, all needing Animator Controllers wired by hand — on a team of three. So I automated it.'],
                bullets: [
                    'Custom editor tool assigns animation clips into Animator Controllers based on pawn role',
                    'Automatically configures transition intervals, durations and other Animator settings',
                    'Removed most of the manual setup work',
                    'More importantly, made the result <strong>consistent</strong> across all 147 — hand-wiring that many controllers guarantees drift, and drift in animation setup is miserable to debug later'
                ],
                media: [
                    {
                        type: 'gif', src: 'assets/alexanderball/animator-editor-tool.gif', weight: '371 KB',
                        caption: 'The editor tool assigning animation clips across pawn variations.'
                    }
                ]
            },
            {
                title: 'Game modes',
                tags: ['Campaign', 'Local PvP', 'Challenge'],
                body: ['Three ways to play, sharing one battle system.'],
                bullets: [
                    '<strong>Campaign</strong> follows the main storyline of Alexander’s conquests, triggered on a new game',
                    '<strong>Local multiplayer</strong> is one-versus-one where players negotiate the terms first — terrain, cavalry count, total pawns, commanders, and the currency each may spend on their army',
                    '<strong>Single player</strong> is a challenge mode replaying any campaign battle with an army of your choosing'
                ],
                media: [
                    {
                        type: 'gif', src: 'assets/alexanderball/game-modes.gif', weight: '4.4 MB',
                        caption: 'Mode selection and local multiplayer army configuration.'
                    }
                ]
            },
            {
                title: 'Tutorial system',
                tags: ['Data-driven', 'Contextual', 'Video'],
                body: ['Teaching that happens at the moment of use rather than in a wall of text up front.'],
                bullets: [
                    'Pulls tutorial content from the database rather than hard-coding it',
                    'Plays a video where one is attached to that tutorial entry',
                    'Tutorials also surface contextually the first time a particular troop type is selected'
                ],
                media: [
                    {
                        type: 'mp4', src: 'assets/alexanderball/tutorial-system-01.mp4',
                        poster: 'assets/alexanderball/tutorial-system-01-poster.png',
                        caption: 'Data-driven tutorial with attached video content.'
                    },
                    {
                        type: 'mp4', src: 'assets/alexanderball/tutorial-system-02.mp4',
                        poster: 'assets/alexanderball/tutorial-system-02-poster.png',
                        caption: 'Contextual tutorial triggered on first selection of a troop type.'
                    }
                ]
            },
            {
                title: 'Battle scene UI',
                tags: ['Context-sensitive', 'Real-time'],
                body: ['Context-sensitive controls, so the player is never guessing what a pawn can currently do.'],
                bullets: [
                    'Traversable path drawn directly on the grid for the selected pawn',
                    'Abilities shown as buttons in the lower-middle of the screen',
                    'Ability list updates dynamically as the selection changes',
                    'Reflects the pawn’s level and unlocked abilities in real time'
                ],
                media: []
            },
            {
                title: 'Music and SFX',
                tags: ['Contextual', 'Per-role'],
                body: ['Background music plus sound effects tied to specific actions.'],
                bullets: [
                    'Distinct audio for melee attacks, long-ranged attacks, damage and abilities',
                    'Different selection sounds per pawn role',
                    'Audio cues matched to animation timing'
                ],
                media: []
            }
        ]
    },

    /* ======================================================================
       4. DHAKA SURVIVOR
       ====================================================================== */
    {
        id: 'dhaka-survivor',
        title: 'Dhaka Survivor',
        studio: 'The Second Studio',
        period: '2025 — 2026',
        status: 'Playable now — free',
        statusTone: 'accent',
        engine: 'Unity 6 · WebGL',
        language: 'C#',
        featured: true,

        tagline:
            'Endless runner built for the browser in 7 days. One build that adapts to keyboard, ' +
            'gamepad or touch on the fly, with an online leaderboard.',

        about: [
            'An endless runner is a familiar shape. What makes this one interesting is where it ' +
            'had to run: a public exhibition, in a browser, on whatever hardware happened to be ' +
            'in front of the player.',

            'So the game ships as a single WebGL build that detects how you are playing and ' +
            'reconfigures itself — keyboard and mouse, a gamepad, or a touchscreen — and swaps ' +
            'its controls mid-session if you change your mind. Scores go to an online ' +
            'leaderboard so visitors could compete against everyone who had played before them.',

            'It was featured as a free-to-play title in the recreation corner of the ' +
            '<strong>Cartoons for Equality</strong> art exhibition, sponsored by the Canadian ' +
            'Embassy.'
        ],

        metrics: [
            {label: 'Built in 7 days'},
            {label: '134 C# files · 8,717 lines'},
            {label: '12 systems'},
            {label: 'WebGL · URP 2D'},
            {label: 'Exhibited publicly'}
        ],

        cardMetrics: ['Playable free in the browser', 'Keyboard, gamepad and touch', 'Built in 7 days'],

        stack: ['Unity 6', 'C#', 'WebGL', 'URP 2D', 'Zenject', 'UniRx', 'UniTask', 'PlayFab', 'Unity Input System', '2D Animation', 'Aseprite Importer'],

        links: [
            {
                label: 'Play it on itch.io',
                url: 'https://the-second-studio.itch.io/dhaka-survivor?secret=eCKIpmAoZvj1IgcvnymPcuXHc'
            }
        ],
        repo: 'https://github.com/samiulislamshad/Dhaka-Survivor',

        roles: [
            {name: 'Solo Developer', detail: 'Every system in the game, built in a 7-day window.'},
            {name: 'Gameplay Programmer', detail: 'Runner loop, player control, enemy spawning, scoring, pause.'},
            {
                name: 'Systems Programmer',
                detail: 'Cross-device input detection, leaderboard integration, loading and scene flow.'
            },
            {name: 'Backend Integration', detail: 'PlayFab-backed online leaderboard with user registration.'}
        ],

        features: [
            {
                title: 'One build, three ways to play',
                tags: ['Keyboard', 'Gamepad', 'Touchscreen', 'WebGL'],
                body: ['The game works out how you are playing and reconfigures itself — and it keeps checking.'],
                bullets: [
                    'A single WebGL build supports <strong>keyboard and mouse, gamepad, and touchscreen</strong> — no separate mobile version',
                    'Input mode is detected from <strong>whichever device produced the most recent action</strong>, not from what platform the browser reports — so it is right even when the browser is wrong',
                    'Put the keyboard down and pick up a controller and the UI <strong>switches mid-session</strong>, without a restart or a settings menu',
                    'On-screen touch controls appear automatically when the player is on a touchscreen',
                    'A <strong>virtual keyboard</strong> lets touch and gamepad players enter their leaderboard name — otherwise anyone without a physical keyboard simply could not submit a score',
                    'Input state is exposed reactively, so any UI can respond to a device change without polling'
                ],
                media: []
            },

            {
                title: 'Online leaderboard',
                tags: ['PlayFab', 'Backend', 'Competitive'],
                body: ['Scores are global, so exhibition visitors compete against everyone who played before them.'],
                bullets: [
                    'Backed by <strong>PlayFab</strong>, with score submission and ranked retrieval',
                    'New players register a name on first play; returning players keep their entry',
                    'The leaderboard is its own scene with a scrollable ranked table',
                    'Scroll navigation is signal-driven so it is browsable on a gamepad and by touch, not just by mouse wheel'
                ],
                media: []
            },

            {
                title: 'Built for a public exhibition',
                tags: ['WebGL', 'Kiosk', '7-day build'],
                body: ['Featured in the recreation corner of the Cartoons for Equality exhibition, sponsored by the Canadian Embassy.'],
                bullets: [
                    'Shipped to <strong>WebGL</strong> so it runs on whatever the venue has, with nothing to install',
                    'Free to play, aimed at visitors with no gaming background and no time to learn controls',
                    'An inactivity detector warns and then resets an abandoned session, so an unattended machine returns itself to a playable state',
                    'Whole game designed, built and shipped in a <strong>7-day window</strong>'
                ],
                media: []
            },

            {
                title: 'The runner itself',
                tags: ['Parallax', 'Zenject', 'Modular'],
                body: ['Twelve systems, each installed through dependency injection and independently testable.'],
                bullets: [
                    'Parallax scrolling backgrounds for depth',
                    'Enemy spawning with escalating difficulty',
                    'Score tracking feeding the leaderboard submission',
                    'Pause, audio, loading screen and main menu systems',
                    'Same architecture discipline as my commercial work — MVC separation, Zenject installers, reactive state via UniRx, async via UniTask'
                ],
                media: []
            }
        ]
    },

    /* ======================================================================
       5. MULTIPLAYER FIGHTING GAME PROTOTYPE
       ====================================================================== */
    {
        id: 'multiplayer-fighting-prototype',
        title: 'Multiplayer Fighting Game Prototype',
        studio: 'Personal project',
        period: 'January 2026',
        status: 'Prototype',
        statusTone: 'violet',
        engine: 'Unity 6 · 3D',
        language: 'C#',
        featured: false,

        tagline:
            'A 3-day challenge: build a working peer-to-peer multiplayer fighting prototype ' +
            'from nothing, using Photon PUN 2.',

        about: [
            'I set myself a three-day challenge — get two players connected over the network, ' +
            'fighting each other with a shared animation set, from an empty project to a ' +
            'complete playable loop.',

            'The result runs the whole round trip: connect, find a match, spawn both players, ' +
            'trade punches and kicks with synced health, declare a winner, and return everyone ' +
            'to the menu.'
        ],

        metrics: [
            {label: 'Built in 3 days'},
            {label: 'Photon PUN 2'},
            {label: 'Peer-to-peer'},
            {label: '2-player matches'}
        ],

        cardMetrics: ['3-day challenge', 'Photon PUN 2 networking', 'Full connect-to-victory loop'],

        stack: ['Unity 6', 'C#', 'Photon PUN 2', 'Zenject', 'UniRx', 'Unity Input System'],

        repo: 'https://github.com/samiulislamshad/MultiplayerFightingGamePrototype',

        roles: [
            {name: 'Solo Developer', detail: 'Networking, gameplay, UI and architecture, in three days.'}
        ],

        features: [
            {
                title: 'Peer-to-peer multiplayer',
                tags: ['Photon PUN 2', 'Lobby', 'RPCs'],
                body: ['The full session lifecycle, not just a connection test.'],
                bullets: [
                    'Connect to the master server, join a lobby, then <strong>create a named room or join a random one</strong>',
                    'Rooms cap at two players; once full, the host loads the match scene and brings the other client with it',
                    'Both players spawn over the network at opposing positions, each facing the other',
                    '<strong>Ownership-gated control</strong> — you drive your own character and only your own',
                    'Combat is <strong>RPC-driven</strong>: punch, kick, flying kick, damage, health sync and the victory screen all propagate across the network',
                    'Clean teardown — the match resolves a winner, shows a victory screen, and returns both players to the menu'
                ],
                media: []
            },

            {
                title: 'Stack and integration',
                tags: ['Zenject', 'UniRx', 'Input System'],
                body: ['Built on the same toolset I use professionally, which is most of why it came together in three days.'],
                bullets: [
                    '<strong>Photon PUN 2</strong> for networking, over Photon\'s relay',
                    '<strong>Zenject</strong> for dependency injection, <strong>UniRx</strong> for reactive state, <strong>Unity Input System</strong> for input',
                    'Photon callbacks wrapped as observable streams, so game systems subscribe to network events instead of inheriting from Photon base classes',
                    'One integration problem worth noting: Photon instantiates the player prefab itself, so the DI container never sees it — solved by resolving the scene context and injecting the instance manually',
                    'Character animations are Mixamo assets; the work here is the networking and the systems around it',
                    'Scope note: this is a relay-based prototype with standard transform and animator sync — no client-side prediction or server-authoritative validation'
                ],
                media: []
            }
        ]
    },

    /* ======================================================================
       6. AR INTERIOR WALLPAPER APP  (earlier work)
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
        earlier: true,

        tagline:
            'Augmented reality tool that previews wallpaper designs on real walls, so the ' +
            'choice is made against the actual room instead of a swatch.',

        about: [
            'An AR app that applies wallpaper designs to real walls through the camera, so you ' +
            'can see how a pattern reads in your own space and light before buying it — and ' +
            'without a book of physical samples.'
        ],

        metrics: [{label: 'Unity 3D'}, {label: 'AR'}, {label: 'C#'}],
        cardMetrics: ['Unity 3D + AR', 'Real-surface wallpaper preview'],
        stack: ['Unity 3D', 'C#', 'AR', 'Mobile'],

        features: [
            {
                title: 'Demonstration',
                tags: ['AR', 'Surface detection'],
                body: ['Applying and swapping wallpaper designs on real walls in real time.'],
                bullets: [
                    'Realistic AR preview before purchase, removing the guesswork from an expensive decision',
                    'Catalogue interface for moving between options without leaving the AR view',
                    'Use cases: design consultations, retail showrooms, e-commerce, renovation planning, real-estate staging'
                ],
                media: [
                    {type: 'youtube', src: 'ew1JnGqf4Vw', caption: 'AR wallpaper preview demonstration.'}
                ]
            }
        ]
    },

    /* ======================================================================
       7. BONGERS  (earlier work)
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
        earlier: true,

        tagline:
            'Arcade 2D platformer prototype inspired by Bonkheads (1997) — you kill enemies ' +
            'by punching the block out from under them. I also modelled and rigged the boss.',

        about: [
            'Clear every enemy in a level to summon the boss, then beat it to progress. Touching ' +
            'an enemy is instant death, so the only offence available is positional: punch the ' +
            'block beneath one and launch it upward. That single constraint is the whole design.'
        ],

        metrics: [{label: 'Unity 3D'}, {label: 'Arcade platformer'}, {label: 'Boss CG by me'}],
        cardMetrics: ['Arcade 2D platformer', 'Boss modelling, rigging, animation'],
        stack: ['Unity 3D', 'C#', 'Blender', 'Rigging', 'Animation'],

        features: [
            {
                title: 'Gameplay and demonstration',
                tags: ['Prototype', 'Arcade'],
                body: ['Timing and positioning rather than direct combat.'],
                bullets: [
                    'Eliminate enemies by launching them upward from beneath',
                    'Direct contact with an enemy is instant death',
                    'Clearing all standard enemies summons the boss',
                    'Mastery is about timing, positioning and environmental interaction'
                ],
                media: [
                    {type: 'youtube', src: '1PrL-F1kLw4', caption: 'Bongers prototype gameplay.'},
                    {type: 'youtube', src: 'rRFx8Pn0aAI', caption: 'Bonkheads (1997) — the original that inspired it.'}
                ]
            },
            {
                title: 'Boss character art, rigging and animation',
                tags: ['Modelling', 'Rigging', 'Animation'],
                body: ['Beyond the gameplay programming, I made the boss character myself.'],
                bullets: [
                    'Modelling, rigging and animation for a visually distinct boss',
                    'Rig built to carry an expressive set of actions for the encounter',
                    'The one project where I owned the art pipeline end to end — knowing what a rig makes easy or impossible has made me better at building animation systems for people whose discipline it actually is'
                ],
                media: []
            }
        ]
    },

    /* ======================================================================
       8. WHAT FLIES  (earlier work)
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
        earlier: true,

        tagline:
            'Infinite runner about the universal experience of birds ruining a freshly cleaned ' +
            'car. Shoot them down before the dirt meter fills.',

        about: [
            'A quirky endless runner built on one very relatable frustration. Protect your ' +
            'brand-new cars by shooting incoming birds before they strike. However many you take ' +
            'down, the sky keeps producing more.'
        ],

        metrics: [{label: 'Unity 3D'}, {label: 'Infinite runner'}],
        cardMetrics: ['Infinite runner', 'Escalating spawn pressure'],
        stack: ['Unity 3D', 'C#'],

        features: [
            {
                title: 'Gameplay and demonstration',
                tags: ['Prototype', 'Endless'],
                body: ['Endless bird waves against a filling dirt meter as the fail state.'],
                bullets: [
                    'Shoot incoming birds before they hit the cars',
                    'Escalating spawn pressure with no win condition — only survival',
                    'The run ends when the dirt meter fills completely'
                ],
                media: [
                    {type: 'youtube', src: 'o-SxnOoPk84', caption: 'What Flies prototype gameplay.'}
                ]
            }
        ]
    }
];

/* -------------------------------------------------------------------------- */

const SKILLS = [
    {
        group: 'Languages & Engines',
        items: ['C#', 'Unity 3D (6.x, URP 2D)', 'Godot 4', 'WebGL', 'HLSL', 'Shader Graph']
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
        items: ['Zenject / Extenject', 'UniRx', 'UniTask', 'FMOD Studio', 'Photon PUN 2',
            'PlayFab', 'Unity Input System', 'Cinemachine', 'DOTween', 'Addressables',
            'ASP.NET Core']
    },
    {
        group: 'Tools & Pipeline',
        items: ['Custom EditorWindows', 'Property drawers', 'Config validators',
            'Data migration tools', 'Git / GitHub', 'Blender']
    }
];

const EXPERIENCE = [
    {
        company: 'Bad WiFi Interactive',
        role: 'Gameplay Programmer',
        period: 'Sept 2024 — present',
        points: [
            'Principal author of the weapon, cutscene, player-animation and Nexus hub systems on <strong>Starfallen Prince</strong>, a 78,000-line Unity 6.5 project built by nine developers.',
            'Eliminated GC pressure across the combat hot paths — reused signal instances, NonAlloc physics queries, and cached callbacks in place of per-strike delegate allocation.',
            'Reworked map chunk streaming into resident chunks after a visible per-switch hitch, and shipped a batch editor tool to migrate the existing scenes.',
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
            'Worked on an online multiplayer PC game in Unity.'
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
    {school: 'BRAC University', award: 'BSc in Computer Science and Engineering', period: '2016 — 2021'},
    {school: 'Bangladesh International School & College', award: 'Higher School Certificate, Science', period: '2015'},
    {school: 'Bangladesh International School', award: 'Secondary School Certificate, Science', period: '2013'}
];

const ACHIEVEMENTS = [
    {
        title: 'Dhaka Survivor exhibited at Cartoons for Equality',
        detail: 'Featured as a free-to-play title in the recreation corner of the exhibition, sponsored by the Canadian Embassy.'
    },
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

   STYLE NOTE: keep `body` to one short intro line and put the real content in
   `bullets`. Short bullets get read; long paragraphs do not.

   ----------------------------------------------------------------------------
{
  id:       'my-new-game',        // REQUIRED. Must match the assets/ folder name.
  title:    'My New Game',        // REQUIRED.
  titleNote: 'working title',     // optional, shown in brackets after the title
  studio:   'Studio name',        // or 'Personal project'
  period:   '2026 — present',
  status:   'In development',     // free text on the badge
  statusTone: 'amber',            // 'accent' = shipped / playable (green)
                                  // 'amber'  = in development
                                  // 'violet' = prototype / coming soon
  engine:   'Unity 6.5',
  language: 'C#',
  featured: true,                 // true adds the accent bar down the card edge
  earlier:  false,                // true moves it to the "Earlier work" section
                                  // at the bottom of the home page

  tagline: 'One sentence. Used on the card AND under the page title.',   // REQUIRED

  about: [
    'One string per paragraph. This is the "About the project" section.',
    'Keep it to two short paragraphs.'
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

  links: [                                     // primary buttons under the title
    { label: 'Play it on itch.io', url: 'https://...' }
  ],
  repo: 'https://github.com/you/my-new-game',  // adds a "View source" button

  roles: [                                     // the "My contribution" list
    { name: 'Gameplay Programmer', detail: 'What you actually did.' },
    { name: 'Tool Developer',      detail: 'And here.' }
  ],

  mediaNote: 'Optional note printed at the end of the features section.',

  features: [
    {
      title: 'A system you built',
      tags: ['A*', 'Pooling'],                 // small monospace chips
      body: ['One short intro line. Keep it to one.'],
      bullets: [                               // the actual content goes here
        'A short point about what you built.',
        'Another. You can use <strong>bold</strong>, <em>italic</em>, ' +
        '<code>Type.Method()</code> and <a href="https://example.com">links</a>.'
      ],
      media: [
        // A GIF. Click-to-play: never downloads until the viewer asks.
        { type: 'gif',   src: 'assets/my-new-game/clip.gif',
          weight: '2.4 MB',                    // shown on the play button
          caption: 'What this clip shows.' },

        // A video WITH a poster: shows the frame, downloads on play.
        { type: 'mp4',   src: 'assets/my-new-game/clip.mp4',
          poster: 'assets/my-new-game/clip-poster.png',
          caption: 'What this video shows.' },

        // A video WITHOUT a poster: gets a click-to-play button instead.
        { type: 'mp4',   src: 'assets/my-new-game/other.mp4',
          weight: '8.0 MB',
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
