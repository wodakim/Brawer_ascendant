# MAP — BRAWLER ASCENDANT
> **DIRECTIVE DE COHÉRENCE (PRIORITÉ MAXIMALE)** : Ce fichier (Map.md) et [continuity.md](file:///d:/Brawler_ascendant_clear/docs/continuity.md) constituent les sources de vérité absolues du projet. Ils doivent être consultés avant toute intervention et impérativement mis à jour lors de chaque validation d'étape.
> Index de cartographie de l'architecture modulaire (ES Modules).


---

## 1. Structure Modulaire du Projet (ES Modules)

```
D:\Brawler_ascendant_clear\
├── engine\
│   ├── moteur_de_combat_et_rigging.html       ← Point d'entrée (HTML épuré)
│   ├── css\
│   │   └── style.css                          ← Styles UI (CSS externe)
│   └── src\
│       ├── main.js                            ← Point d'entrée applicatif (initialisation, boucle, UI debug). Expose `draw()`, `updateGame()` sur `window`. Contient `syncUI()` appelée à chaque frame pour maintenir le panneau droit synchronisé avec l'état réel du Fighter (weaponStyle, etc.).
│       ├── config\
│       │   ├── baseRig.js                     ← Définition du squelette de base (BASE_RIG)
│       │   └── constants.js                   ← Constantes globales (ANIMATION_NAMES, Easing, overlays)
│       ├── core\
│       │   ├── Node.js                        ← Classe Node, calculs de matrices et AABB
│       │   ├── Skeleton.js                    ← Classe Skeleton, cinématique directe, ancrage sol
│       │   ├── Animator.js                    ← Classe Animator, interpolations, overlays d'armes
│       │   ├── Fighter.js                     ← Classe Fighter, états, HP, logique IA combat
│       │   └── skinUtils.js                   ← Fonctions de hash (djb2) et gestion SVG
│       ├── render\
│       │   └── canvasRender.js                ← Rendu du squelette, HUD, hitboxes et effets
│       └── data\
│           ├── animations.js                  ← Agrégateur d'animations (fusionne ANIMATIONS_LIB)
│           └── animations\
│               ├── index.js                   ← Point de re-export des batchs d'animations
│               ├── baseAnims.js               ← idle, walk_forward, punch_right, hits, ko_back, dodge_backward
│               ├── batch1_prep.js             ← idle_breathing, prepare, focus
│               ├── batch2_locomotion.js       ← walk_backward, run_forward/backward, steps, turns
│               ├── batch3_punches.js          ← punch_left, double_punch, headbutt
│               ├── batch4_kicks.js            ← kick_right/left, heavy_kick
│               ├── batch5_combos.js           ← combo_1 à 4, combo_finisher
│               ├── batch6_weapon_states.js    ← weapon_draw, weapon_idle
│               ├── batch7_weapon_attacks.js   ← weapon_attack_*, weapon_critical, weapon_combo_*
│               └── batch8_disarm.js           ← disarm_attack ✅, weapon_break ✅, weapon_drop ✅, weapon_lost ✅, weapon_fall ✅ (Batch 8 terminé)
├── docs\
│   ├── continuity.md                          ← Journal de traçabilité complet
│   ├── ANTIGRAVITY_PROMPT_COMPLET.md          ← Prompt maître original
│   └── Map.md                                 ← CE FICHIER
└── .tmp_refactor_validation.cjs               ← Script de validation de non-régression (Playwright)
```

---

## 2. Cartographie par Module

### 2.1. Configuration (`src/config/`)
- **[baseRig.js](file:///d:/Brawler_ascendant_clear/engine/src/config/baseRig.js)** : Exporte `BASE_RIG` (20 nœuds structurels et visuels, coordonnées et pivots calibrés).
- **[constants.js](file:///d:/Brawler_ascendant_clear/engine/src/config/constants.js)** : Exporte `ANIMATION_NAMES` (89 noms), `WEAPON_HOLD_STYLES` (overlays d'arme), `Easing` (fonctions d'interpolation mathématiques), `WEAPON_REACH` et `SKIN_COUNTS`.

### 2.2. Logique Fondamentale (`src/core/`)
- **[Node.js](file:///d:/Brawler_ascendant_clear/engine/src/core/Node.js)** : Classe `Node` (`updateMatrix`, `getGlobalPos`, `setPart`). Utilitaires AABB : `nodeWorldAABB` et `pointInAABB`.
- **[Skeleton.js](file:///d:/Brawler_ascendant_clear/engine/src/core/Skeleton.js)** : Classe `Skeleton` (`build`, `update`, `getFootOffsetY`, `getDynamicFootOffsetY`).
- **[Animator.js](file:///d:/Brawler_ascendant_clear/engine/src/core/Animator.js)** : Classe `Animator` (`play`, `update`, `interpolateProperty`).
- **[Fighter.js](file:///d:/Brawler_ascendant_clear/engine/src/core/Fighter.js)** : Classe `Fighter` (`changeState`, `takeDamage`, `checkHit`, `updateAutoCombat`, `update(autoCombat)`).
- **[skinUtils.js](file:///d:/Brawler_ascendant_clear/engine/src/core/skinUtils.js)** : Utilitaires SVG deterministes (`getCharacterIndex`, `getCharacterParts`).

### 2.3. Rendu Graphique (`src/render/`)
- **[canvasRender.js](file:///d:/Brawler_ascendant_clear/engine/src/render/canvasRender.js)** : Fonctions de dessin découplées : `renderNode(node, ctx, engineOptions)` et `renderFighter(fighter, ctx, engineOptions)` (dessin des segments d'os, des hitboxes réactives, du HUD et des sensors).

### 2.4. Segmentation des Animations (`src/data/animations/`)
Chaque fichier contient un ensemble thématique d'animations structurées en tracks clés :
- **[baseAnims.js](file:///d:/Brawler_ascendant_clear/engine/src/data/animations/baseAnims.js)** : Animations de base (durée, loop, keyframes).
- **[batch1_prep.js](file:///d:/Brawler_ascendant_clear/engine/src/data/animations/batch1_prep.js)** à **[batch7_weapon_attacks.js](file:///d:/Brawler_ascendant_clear/engine/src/data/animations/batch7_weapon_attacks.js)** : 35 animations validées ✅.
- **[batch8_disarm.js](file:///d:/Brawler_ascendant_clear/engine/src/data/animations/batch8_disarm.js)** : Batch 8 — Perte d'arme. `disarm_attack` ✅, `weapon_break` ✅, `weapon_drop` ✅, `weapon_lost` ✅, `weapon_fall` ✅ (les cinq `disarmsOnComplete:true`, enchaînent sur `weapon_idle`). `weapon_lost` = trébuchement arrière (perte d'équilibre, PAS un impact — pas de squash, mécanique distincte de `weapon_break`). `weapon_fall` = ALTERNATIVE narrative à `weapon_lost` (combattant stable, regarde son arme tomber au sol, chute pilotée par `weaponSocket`, squash localisé sur l'arme). **Batch 8 terminé (5/5)**.

---

## 3. Documents de Traçabilité
- **[continuity.md](file:///d:/Brawler_ascendant_clear/docs/continuity.md)** : Registre chronologique d'avancement par session.
- **[task.md](file:///C:/Users/monta.DESKTOP-Q5SLGN1/.gemini/antigravity/brain/6c3db914-b9a3-4a5c-8303-eead4ea7faab/task.md)** : Liste des tâches d'implémentation par étapes.
