# CONTINUITY — BRAWLER ASCENDANT
> Journal de traçabilité complet. Mis à jour en continu par Antigravity.
> Toute action, décision, erreur et correction est consignée ici.

---

## CONTEXTE DU PROJET

- **Nom** : Brawler Ascendant — Moteur d'animation de combat 2D
- **Inspiration** : La Brute
- **Cible** : Export APK Android via WebView
- **Tech** : Canvas 2D pur (aucune dépendance externe, aucun WebGL)
- **Racine** : `D:\Brawler_ascendant_clear\engine\`
- **Fichier principal** : `engine\moteur_de_combat_et_rigging.html` *(nom réel — sans __3_)*
- **À IGNORER** : `D:\Brawler_ascendant_clear\Mockup\`

---

## RÈGLES FONDAMENTALES (extrait du prompt maître)

### Système de coordonnées
| Axe | Sens |
|-----|------|
| X | Positif = droite |
| Y | Positif = bas (Canvas) |
| Rotation | Positif = horaire |
| ScaleX root | `1` = face droite, `-1` = retourné (fighter B) |

### Pivots clés
| Nœud | pX | pY | Signification |
|------|----|----|---------------|
| torso | 25 | 60 | bas du torse = hanche |
| head | 25 | 45 | bas de la tête = cou |
| armUpper_L | 10 | 10 | haut bras = épaule |
| armUpper_R | 4 | 0 | haut bras = épaule *(recalibré Session 6, était 10/10)* |
| armLower L/R | 9 | 10 | haut avant-bras = coude |
| hand L/R | 11 | 5 | poignet |
| legUpper L/R | 12 | 5 | haut jambe = hanche |
| legLower L/R | 10 | 5 | haut mollet = genou |
| foot L/R | 10 | 5 | haut pied = cheville (scaleY 1.5) |
| weaponSocket | 5 | 5 | attaché à armLower_R |

### BASE_RIG mémorisé (20 nœuds — calibration Session 6 appliquée)
| Nœud | z | w | h | pX | pY | x | y | parent |
|------|---|---|---|----|----|---|---|--------|
| root | 0 | 10 | 10 | 5 | 5 | 0 | 0 | null |
| hip | 5 | 40 | 30 | 20 | 15 | 0 | -70 | root |
| legUpper_L | 1 | 24 | 45 | 12 | 5 | -4 | 5 | hip |
| legLower_L | 1 | 20 | 50 | 10 | 5 | 0 | 40 | legUpper_L |
| foot_L | 1 | 35 | 15 | 10 | 5 | -3 | 48 | legLower_L *(scaleY 1.5)* |
| armUpper_L | 0 | 20 | 45 | 10 | 10 | -20 | -50 | torso |
| armLower_L | 0 | 18 | 45 | 9 | 10 | 0 | 37 | armUpper_L |
| hand_L | 0 | 22 | 18 | 11 | 5 | 0 | 35 | armLower_L |
| torso | 4 | 50 | 70 | 25 | 60 | 0 | -10 | hip |
| head | 6 | 50 | 50 | 25 | 45 | 0 | -65 | torso |
| face | 7 | 40 | 40 | 20 | 20 | 5 | -10 | head |
| hair | 8 | 60 | 60 | 30 | 30 | 0 | -15 | head |
| legUpper_R | 9 | 24 | 45 | 12 | 5 | 1 | 5 | hip |
| legLower_R | 9 | 20 | 50 | 10 | 5 | 0 | 40 | legUpper_R |
| foot_R | 9 | 35 | 15 | 10 | 5 | -1 | 49 | legLower_R *(scaleY 1.5)* |
| armUpper_R | 10 | 20 | 45 | 4 | 0 | -1 | -48 | torso |
| armLower_R | 10 | 18 | 45 | 9 | 10 | 13 | 48 | armUpper_R |
| hand_R | 10 | 22 | 18 | 11 | 5 | 0 | 35 | armLower_R |
| weaponSocket | 11 | 10 | 10 | 5 | 5 | 0 | 35 | armLower_R |
| weapon | 12 | 100 | 20 | 20 | 10 | 0 | 0 | weaponSocket |

### Easings disponibles dans le moteur
- `linear`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`, `easeOutElastic`

### Règles qualité absolues
- ❌ Genou > +70° / Coude > +120°
- ❌ Cheville flottante
- ❌ Tête > ±90° (sauf KO)
- ❌ Os inanimés (tout os doit avoir micro-réaction)
- ❌ < 3 keyframes par nœud principal actif
- ❌ Interpolation linéaire sur impacts
- ❌ ScaleX/Y hors [0.6, 1.6] sauf comique
- ✅ Squash & Stretch sur tout impact
- ✅ Anticipation avant attaque
- ✅ Follow-through après action
- ✅ Secondary motion (décalage 3-5 frames)

### Système de déplacement lié aux animations (`moveX`) — ajouté Session 8
- Propriété optionnelle sur une entrée de `ANIMATIONS_LIB` : `moveX` = déplacement en px/frame, dans le sens `dir` du fighter (positif = vers l'adversaire = "avance", négatif = recul/"backward").
- Appliquée dans `Fighter.update()` uniquement quand `autoCombat` est OFF (mode prévisualisation manuelle via boutons PLAY) — évite le double comptage avec `updateAutoCombat()` qui gère déjà ses propres déplacements en combat.
- Valeurs actuelles : `walk_forward.moveX = 3`, `walk_backward.moveX = -2` (magnitude réduite = pas raccourcis, cohérent avec l'amplitude de jambes réduite).
- "Reset Fight" remet `x` à sa valeur initiale → tests répétables sans risque.
- **À ajouter pour chaque future animation de locomotion** (`run_forward`, `run_backward`, `step_forward/backward`, etc.) avec une magnitude cohérente (run > walk).

### Ancrage dynamique au sol pour les animations `moveX` — ajouté Session 9
- **Problème** : l'ancien `Skeleton.update()` calculait la position des pieds une seule fois en pose de repos (`getFootOffsetY()`, rotations = 0) et figeait `root.y`. Pour de petites rotations de jambes (walk_forward ±20-30°) l'écart est négligeable, mais pour de grandes rotations (run_forward ±45°, genou plié à 65°) les jambes "raccourcissent" visuellement bien plus → le personnage flotte au-dessus du sol.
- **Correctif** : `Skeleton.update(globalX, globalY, dynamicGround)` — si `dynamicGround` est `true`, le moteur fait une 1ère passe avec `root.y = 0` pour propager la pose animée courante via cinématique directe (`getDynamicFootOffsetY()`, basé sur `globalMatrix.transformPoint`), puis ancre le `root` pour que le pied le plus bas touche `globalY`. Si `false`, comportement statique inchangé (`getFootOffsetY()`).
- **`Fighter.update()`** passe `dynamicGround = true` automatiquement dès que l'animation en cours a une propriété `moveX` (locomotion). Pour toutes les autres animations (combat, KO, idle...), comportement statique conservé à l'identique — vérifié non-régressif sur `ko_back`.
- **Conséquence pour les futures animations** : toute animation de locomotion (`moveX` défini) sera automatiquement ancrée au sol, peu importe l'amplitude du rebond du bassin ou des flexions de jambes — pas d'action supplémentaire requise au-delà de définir `moveX`.

### Pivot / retournement (`turn_left`/`turn_right`) — propriété `root.flipX` — ajouté Session 9
- **Problème** : le spec demande d'animer `scaleX` du `root` (1 → -1) pour créer l'effet de "spin" 2D au pivot, mais `Skeleton.update()` écrasait systématiquement `root.scaleX = this.dir` (flip gauche/droite du fighter), ce qui aurait annulé toute piste d'animation sur `root.scaleX`.
- **Correctif** : nouvelle propriété `Node.flipX` (multiplicateur, défaut `1`), remise à `1` par `resetPose()` à chaque `Animator.play()`. `Skeleton.update()` calcule désormais `root.scaleX = this.dir * this.root.flipX`. Pour les 88-2 animations sans piste `root.flipX`, comportement strictement identique à avant (`flipX` reste à `1`).
- **`turn_left`/`turn_right`** définissent `tracks.root.flipX = [{f:0,v:1},{f:6,v:0},{f:12,v:-1}]` : le personnage devient une fine "tranche" au point de pivot (f6, avec squash du torse `scaleY: 0.85`), puis apparaît retourné (~f10-11). Comme `resetPose()` remet `flipX=1` au démarrage de l'animation suivante (`idle`), le personnage revient automatiquement à son orientation normale après le pivot — pas de flip permanent qui surprendrait les animations futures.
- **Conséquence pour les futures animations** : aucune action requise sauf besoin explicite d'un effet de pivot/retournement similaire (réutiliser `tracks.root.flipX`).

### Code couleur des boutons "PLAY" (panneau gauche, ~ligne 1496 du HTML)
- 🟩 Vert (`#2e7d32`) : animation validée par l'utilisateur → ajouter le nom à `validatedAnims`
- 🟥 Rouge (`#c62828`) : animation en cours de travail (pas encore validée) → ajouter le nom à `inProgressAnims`
- Par défaut (bleu) : pas encore commencée
- **Mettre à jour ces deux listes à chaque début de travail / validation d'une animation** — c'est le suivi visuel d'avancement demandé par l'utilisateur.

---

## JOURNAL DES SESSIONS

---

### SESSION 1 — 2026-06-11 08:14 (heure locale)

**Agent** : Antigravity (Claude Sonnet 4.6 Thinking)
**Action** : Initialisation du journal de continuité

#### Ce qui s'est passé
- Lecture du fichier `docs/ANTIGRAVITY_PROMPT_COMPLET.md` (610 lignes, 24 646 bytes)
- Lecture du fichier `docs/continuity.md` (vide — 0 bytes)
- Création de ce journal de continuité avec tout le contexte extrait du prompt maître

---

### SESSION 2 — 2026-06-11 08:15 (heure locale)

**Agent** : Antigravity (Claude Sonnet 4.6 Thinking)
**Déclencheur** : Utilisateur dit "Tu peux commencer"
**Action** : ÉTAPE 0 — Audit initial du fichier HTML

#### Erreur détectée et corrigée
- ❌ **Tentative** : Lecture de `engine/moteur_de_combat_et_rigging__3_.html` (nom du prompt)
- ❌ **Résultat** : Fichier non trouvé (erreur FileNotFound)
- ✅ **Correction** : Exploration du dossier `engine/` → fichier réel = `moteur_de_combat_et_rigging.html`
- ✅ **Décision** : Utiliser le nom réel du fichier pour toutes les opérations futures

#### Audit Initial Complet
```
=== AUDIT INITIAL ===
Fichier : engine/moteur_de_combat_et_rigging.html (1098 lignes, 43 018 bytes)

Nœuds du rig : 18 nœuds
  root, hip, legUpper_L, legLower_L, foot_L, armUpper_L, armLower_L,
  torso, head, face, hair, legUpper_R, legLower_R, foot_R,
  armUpper_R, armLower_R, weaponSocket, weapon

Animations avec keyframes réels : 7
  - idle           (60f, loop:true)
  - walk_forward   (40f, loop:true)
  - punch_right    (30f, loop:false)
  - hit_light      (25f, loop:false)
  - hit_heavy      (40f, loop:false)
  - ko_back        (60f, loop:false)
  - dodge_backward (30f, loop:false) ← BONUS, pas dans ANIMATION_NAMES

Animations vides à implémenter : 69 animations (tracks:{})

Structure des dossiers :
  d:\Brawler_ascendant_clear\
  ├── docs\         (2 fichiers)
  ├── engine\       (1 seul fichier HTML)
  └── mockup\       (ignoré)
  MANQUANT : assets/, fighters/, data/ → création requise en Étape 1
=== FIN AUDIT ===
```

#### État Étape 0 : ✅ TERMINÉ — Audit affiché

#### Étape 1 : ✅ TERMINÉ — Structure de dossiers créée
- ✅ `engine/assets/` → 10 SVG placeholders (head, face, hair, torso, arm_upper, arm_lower, leg_upper, leg_lower, feet, weapon)
- ✅ `engine/fighters/fighterA/` → 10 SVG
- ✅ `engine/fighters/fighterB/` → 10 SVG
- ✅ `engine/data/` → rig.json, animations.json, hitboxes.json (stubs)

#### BATCH 1 : ✅ TERMINÉ (en attente validation visuelle utilisateur)
- ✅ `idle_breathing` — ligne 400 du HTML (80f, loop:true)
  - Nœuds : torso, head, hip, armUpper_L, armLower_L, armUpper_R, armLower_R
  - Valeurs rotation : armUpper_L [8°…16°], head [-4°…3°], torso scaleY [0.94…1.03]
  - Secondary motion : tête décalée de 5f sur le torse
- ✅ `prepare` — ligne 497 du HTML (25f, loop:false)
  - Nœuds : hip, torso, head, legUpper_L/R, legLower_L/R, armUpper_L/R, armLower_L/R
  - Anticipation à f:8 (torse recule -8°), impact à f:18 (+12°)
  - Squash torse: scaleY 0.93 à f:12, genoux max 30°/28° (<70° ok)
  - Secondary motion : bras décalés de 5f après hip
- ✅ `focus` — ligne 600 du HTML (40f, loop:false)
  - Nœuds : torso, head, hip, tous les bras, toutes les jambes
  - Micro-tremblements : head.y oscille [-65…-66], bras ±2° toutes les 5f
  - Garde resserrée finale : armUpper_L=-38°, armUpper_R=-52°

---

### SESSION 3 — 2026-06-11 08:39 (heure locale)

**Agent** : Antigravity (Claude Sonnet 4.6 Thinking)
**Déclencheur** : Utilisateur signale 2 bugs

#### Bug 1 — SVG structure incorrecte
- ❌ **Problème** : J'avais créé des SVG plats dans `assets/` au lieu d'une architecture de 12 personnages par dossier
- ✅ **Correction** : Création de `assets/characters/char_00/` à `char_11/` avec 10 SVG chacun
- ✅ **Système seed** : Fonction `getCharacterIndex(playerName)` hash djb2 déterministe → index 0-11
- ✅ **Fonction** : `getCharacterParts(playerName)` retourne le bon dossier de SVG selon le nom

#### Bug 2 — Panneaux gauche/droite invisibles dans Chrome
- ❌ **Problème** : `.panel` n'avait pas `flex-shrink: 0` et `min-width`, le canvas prenait tout l'espace
- ✅ **Correction** : Ajout de `min-width: 260px; flex-shrink: 0; min-height: 0;` au CSS `.panel`

#### Changements architecturaux
- `PARTS` (objet statique) → `getCharacterParts(playerName)` (fonction dynamique par seed)
- `Node` : ajout méthode `setPart(imagePath)` pour injection des SVG après construction
- `Skeleton.build(parts)` : injecte les parts dans les nodes via `setPart()`
- `Skeleton.constructor(dir, parts)` et `Fighter.constructor(id, x, dir, playerName)`
- `resetFight()` : passe `"Fighter A"` / `"Fighter B"` comme noms (seeds)
- `renderFighter()` : affiche `char_NN ("nomJoueur")` sous la barre HP, avec couleur HP dynamique

#### 12 personnages créés
| Index | Nom | Skin | Outfit |
|-------|-----|------|--------|
| char_00 | NOBLE | #e8c49a | #2563eb (bleu) |
| char_01 | WARRIOR | #c68642 | #dc2626 (rouge) |
| char_02 | RANGER | #8d5524 | #16a34a (vert) |
| char_03 | MAGE | #fde8d0 | #7c3aed (violet) |
| char_04 | MONK | #deb887 | #0f766e (teal) |
| char_05 | BERSERKER | #a0785a | #be123c (rose fonce) |
| char_06 | PALADIN | #f5cba7 | #1e40af (bleu nuit) |
| char_07 | ROGUE | #c4a882 | #78350f (marron) |
| char_08 | ASSASSIN | #b07850 | #064e3b (vert nuit) |
| char_09 | DRAGON | #fbd5b0 | #991b1b (rouge sang) |
| char_10 | SHADOW | #9a7557 | #1c1917 (noir) |
| char_11 | LEGEND | #e8b88a | #b45309 (or) |

#### Structure finale assets
```
engine/assets/
├── characters/
│   ├── char_00/ (NOBLE — 10 SVG)
│   ├── char_01/ (WARRIOR — 10 SVG)
│   ├── char_02/ (RANGER — 10 SVG)
│   ├── char_03/ (MAGE — 10 SVG)
│   ├── char_04/ (MONK — 10 SVG)
│   ├── char_05/ (BERSERKER — 10 SVG)
│   ├── char_06/ (PALADIN — 10 SVG)
│   ├── char_07/ (ROGUE — 10 SVG)
│   ├── char_08/ (ASSASSIN — 10 SVG)
│   ├── char_09/ (DRAGON — 10 SVG)
│   ├── char_10/ (SHADOW — 10 SVG)
│   └── char_11/ (LEGEND — 10 SVG)
(anciens SVG plats gardés mais non utilisés)
```

#### En attente
- Validation visuelle du BATCH 1 (idle_breathing, prepare, focus)
- Validation que les panneaux sont maintenant visibles
- Validation que les SVG se chargent bien (CORS local possible avec Chrome sur file://)

---


| Batch | Thème | Nb Anims | Statut |
|-------|-------|----------|--------|
| 1 | Respiration & Préparation | 3 | ✅ Validé visuellement (Session 7) |
| 2 | Locomotion | 7 | ✅ 7/7 — `walk_backward`, `run_forward`, `run_backward`, `step_forward`, `step_backward`, `turn_left`, `turn_right` validés (Sessions 8-9) |
| 3 | Poings | 3 | ⏳ À faire |
| 4 | Kicks | 3 | ⏳ À faire |
| 5 | Combo Chain | 5 | ⏳ À faire |
| 6 | Arme États | 2 | ⏳ À faire |
| 7 | Arme Attaques | 5 | ⏳ À faire |
| 8 | Perte d'arme | 5 | ⏳ À faire |
| 9 | Lancer d'arme | 4 | ⏳ À faire |
| 10 | Défense & Contre | 5 | ⏳ À faire |
| 11 | Esquives | 6 | ⏳ À faire |
| 12 | Réactions légères | 3 | ⏳ À faire |
| 13 | Réactions lourdes | 4 | ⏳ À faire |
| 14 | KO | 3 | ⏳ À faire |
| 15 | Relevé | 2 | ⏳ À faire |
| 16 | Critiques | 3 | ⏳ À faire |
| 17 | Spéciaux | 3 | ⏳ À faire |
| 18 | Animaux | 5 | ⏳ À faire |
| 19 | Victoire | 4 | ⏳ À faire |
| 20 | Défaite & Utilitaires | 7 | ⏳ À faire |

---

## ERREURS & CORRECTIONS

| Date | Erreur | Correction |
|------|--------|------------|
| 2026-06-11 08:15 | Chemin `moteur_de_combat_et_rigging__3_.html` non trouvé | Chemin réel : `moteur_de_combat_et_rigging.html` |
| 2026-06-11 08:39 | SVG créés en plat (assets/) au lieu de 12 dossiers de personnages | Architecture `assets/characters/char_NN/` créée |
| 2026-06-11 08:39 | Panneaux UI invisibles dans Chrome | CSS : ajout `flex-shrink:0; min-width:260px; min-height:0` |
| 2026-06-11 08:50 | Architecture `assets/characters/char_NN/` à l'intérieur de engine/ — mauvais emplacement, mauvais format | Supprimé. Architecture correcte : `../characters/{partie}/{N}.svg` pointant vers le dossier créé par l'utilisateur |
| 2026-06-11 08:50 | Mapping nœuds faux : face, hair, weapon inclus dans getCharacterParts alors qu'ils n'ont pas de SVG dédié | Retirés. Seuls les 12 nœuds visuels du rig sont mappés |
| 2026-06-11 08:50 | Placeholder gris sur les nœuds structurels (face, hair, hip, weaponSocket) | renderNode : seuls les nœuds avec `imagePath` défini affichent un placeholder |
| 2026-06-11 09:45 | Panneaux gauche/droite inversés | Inversé la position des divs dans le HTML |
| 2026-06-11 09:45 | Mains gauche/droite manquantes dans le Rig | Ajouté les nœuds hand_L (z=0) et hand_R (z=10) dans BASE_RIG, getCharacterParts et SKIN_COUNTS |
| 2026-06-11 09:45 | Bras gauche passe au-dessus de la jambe gauche | Modifié le z-order d'armUpper_L et armLower_L de z=2 à z=0 |
| 2026-06-11 09:53 | Menu d'animation sur le panneau de droite | Déplacé la section Play Animation vers le panneau de gauche. Ajouté min-width: 0 sur le canvas pour garantir la visibilité du panneau droit. |

---

## DÉCISIONS TECHNIQUES

| Date | Décision | Raison |
|------|----------|--------|
| 2026-06-11 08:15 | Utiliser le nom réel du fichier HTML (sans __3_) | Nom dans prompt ≠ nom réel sur disque |
| 2026-06-11 08:39 | Architecture `assets/characters/char_NN/` avec 12 designs | Annulée — mauvais emplacement |
| 2026-06-11 08:54 | **Architecture finale** : `../characters/{partie}/{N}.svg` | Pointe vers le dossier créé par l'utilisateur hors de engine/ |
| 2026-06-11 08:54 | Hash djb2 avec `skinCount` par partie | Chaque partie peut avoir un nombre de variantes différent |
| 2026-06-11 08:54 | `SKIN_COUNTS` comme constante globale | Mise à jour triviale quand on ajoute des SVG |
| 2026-06-11 08:54 | Armes dans `../weapons/{type}/{N}.svg` séparé de la seed | Les armes sont liées au gameplay, pas au skin |

---

### SESSION 4 — 2026-06-11 08:50 (heure locale)

**Agent** : Antigravity (Claude Sonnet 4.6 Thinking)
**Déclencheur** : Utilisateur rejette Session 3 — architecture toujours mauvaise

#### Problèmes identifiés et corrigés

1. **Dossier `characters/` existait déjà** à la racine du projet, créé par l'utilisateur avec la vraie structure professionnelle :
   - 14 sous-dossiers par partie anatomique
   - Chaque dossier contient `0.svg` (futur : `1.svg`, `2.svg`...)
   - J'aurais dû le lire dès le début

2. **`engine/assets/` et `engine/fighters/` supprimés** — c'était le bordel que j'avais créé

3. **Mapping corrigé** : 12 nœuds visuels seulement (pas face, hair, weapon, hip, root, weaponSocket)

4. **`renderNode` corrigé** : nœuds sans `imagePath` = invisibles par design (pas de placeholder gris)

#### Structure finale du projet
```
D:\Brawler_ascendant_clear\
├── characters\          ← SVG skin (seed du nom du joueur)
│   ├── head\0.svg
│   ├── torso\0.svg
│   ├── arm_left_up\0.svg
│   ├── arm_left_down\0.svg
│   ├── arm_right_up\0.svg
│   ├── arm_right_down\0.svg
│   ├── leg_left\0.svg
│   ├── leg_down_left\0.svg
│   ├── leg_right\0.svg
│   ├── leg_down_right\0.svg
│   ├── feet_left\0.svg
│   ├── feet_right\0.svg
│   └── (hand_left, hand_right — pas de nœud dans le rig, ignorés)
├── weapons\             ← SVG armes (progression joueur, PAS la seed)
│   ├── sword\0.svg
│   ├── axe\0.svg
│   ├── club\0.svg
│   ├── spear\0.svg
│   ├── dagger\0.svg
│   └── unarmed\0.svg
├── engine\
│   ├── moteur_de_combat_et_rigging.html
│   └── data\ (animations.json, rig.json, hitboxes.json)
├── docs\
└── mockup\ (ignoré)
```

#### Mapping nœud → fichier SVG (définitif)
| Nœud BASE_RIG | Chemin SVG |
|---|---|
| head | `../characters/head/{N}.svg` |
| torso | `../characters/torso/{N}.svg` |
| armUpper_L | `../characters/arm_left_up/{N}.svg` |
| armLower_L | `../characters/arm_left_down/{N}.svg` |
| armUpper_R | `../characters/arm_right_up/{N}.svg` |
| armLower_R | `../characters/arm_right_down/{N}.svg` |
| legUpper_L | `../characters/leg_left/{N}.svg` |
| legLower_L | `../characters/leg_down_left/{N}.svg` |
| legUpper_R | `../characters/leg_right/{N}.svg` |
| legLower_R | `../characters/leg_down_right/{N}.svg` |
| foot_L | `../characters/feet_left/{N}.svg` |
| foot_R | `../characters/feet_right/{N}.svg` |
| face, hair | inclus dans head.svg — pas de nœud séparé |
| hip, root, weaponSocket | structurels, pas visuels |
| weapon | `../weapons/{type}/{N}.svg` — système séparé |

#### Note Chrome / CORS
Si les SVG ne s'affichent pas (reste placeholder) sur `file://`, c'est une restriction CORS Chrome.
Solution : lancer un serveur local : `python -m http.server 8080` dans `D:\Brawler_ascendant_clear\`
Puis ouvrir : `http://localhost:8080/engine/moteur_de_combat_et_rigging.html`

---

## ÉTAT DES ANIMATIONS

| Animation | Statut | Durée | Loop | Batch | Validé |
|-----------|--------|-------|------|-------|--------|
| idle | ✅ Existant | 60f | oui | — | — |
| walk_forward | ✅ Existant | 40f | oui | — | — |
| punch_right | ✅ Existant | 30f | non | — | — |
| hit_light | ✅ Existant | 25f | non | — | — |
| hit_heavy | ✅ Existant | 40f | non | — | — |
| ko_back | ✅ Existant | 60f | non | — | — |
| dodge_backward | ✅ Bonus (non listé) | 30f | non | — | — |
| idle_breathing | ✅ Batch 1 écrit | 80f | oui | 1 | ✅ Validé (Session 7) |
| prepare | ✅ Batch 1 écrit | 25f | non | 1 | ✅ Validé (Session 7) |
| focus | ✅ Batch 1 écrit | 40f | non | 1 | ✅ Validé (Session 7) |
| walk_backward | ✅ Batch 2 écrit | 44f | oui | 2 | ✅ Validé (Session 8) |
| run_forward | ✅ Batch 2 écrit | 28f | oui | 2 | ✅ Validé (Session 9) |
| run_backward | ✅ Batch 2 écrit | 32f | oui | 2 | ✅ Validé (Session 9) |
| step_forward | ✅ Batch 2 écrit | 18f | non | 2 | ✅ Validé (Session 9) |
| step_backward | ✅ Batch 2 écrit | 18f | non | 2 | ✅ Validé (Session 9) |
| turn_left | ✅ Batch 2 écrit | 12f | non | 2 | ✅ Validé (Session 9) |
| turn_right | ✅ Batch 2 écrit | 12f | non | 2 | ✅ Validé (Session 9) |
| punch_left | ⏳ À faire | 30f | non | 3 | ❌ |
| double_punch | ⏳ À faire | 45f | non | 3 | ❌ |
| headbutt | ⏳ À faire | 28f | non | 3 | ❌ |
| kick_right | ⏳ À faire | 35f | non | 4 | ❌ |
| kick_left | ⏳ À faire | 35f | non | 4 | ❌ |
| heavy_kick | ⏳ À faire | 45f | non | 4 | ❌ |
| combo_1 | ⏳ À faire | 22f | non | 5 | ❌ |
| combo_2 | ⏳ À faire | 22f | non | 5 | ❌ |
| combo_3 | ⏳ À faire | 22f | non | 5 | ❌ |
| combo_4 | ⏳ À faire | 22f | non | 5 | ❌ |
| combo_finisher | ⏳ À faire | 50f | non | 5 | ❌ |
| weapon_draw | ⏳ À faire | 35f | non | 6 | ❌ |
| weapon_idle | ⏳ À faire | 50f | oui | 6 | ❌ |
| weapon_attack_light | ⏳ À faire | 28f | non | 7 | ❌ |
| weapon_attack_medium | ⏳ À faire | 35f | non | 7 | ❌ |
| weapon_attack_heavy | ⏳ À faire | 50f | non | 7 | ❌ |
| weapon_combo | ⏳ À faire | 40f | non | 7 | ❌ |
| weapon_critical | ⏳ À faire | 60f | non | 7 | ❌ |
| disarm_attack | ⏳ À faire | 30f | non | 8 | ❌ |
| weapon_break | ⏳ À faire | 20f | non | 8 | ❌ |
| weapon_drop | ⏳ À faire | 15f | non | 8 | ❌ |
| weapon_lost | ⏳ À faire | 25f | non | 8 | ❌ |
| weapon_fall | ⏳ À faire | 20f | non | 8 | ❌ |
| throw_prepare | ⏳ À faire | 20f | non | 9 | ❌ |
| throw_weapon | ⏳ À faire | 15f | non | 9 | ❌ |
| throw_followthrough | ⏳ À faire | 20f | non | 9 | ❌ |
| catch_weapon | ⏳ À faire | 18f | non | 9 | ❌ |
| block | ⏳ À faire | 15f | non | 10 | ❌ |
| shield_block | ⏳ À faire | 12f | non | 10 | ❌ |
| parry | ⏳ À faire | 20f | non | 10 | ❌ |
| counter_stance | ⏳ À faire | 18f | non | 10 | ❌ |
| counter_attack | ⏳ À faire | 30f | non | 10 | ❌ |
| dodge_left | ⏳ À faire | 25f | non | 11 | ❌ |
| dodge_right | ⏳ À faire | 25f | non | 11 | ❌ |
| sidestep | ⏳ À faire | 18f | non | 11 | ❌ |
| duck | ⏳ À faire | 20f | non | 11 | ❌ |
| jump_evade | ⏳ À faire | 35f | non | 11 | ❌ |
| backflip | ⏳ À faire | 45f | non | 11 | ❌ |
| hit_medium | ⏳ À faire | 30f | non | 12 | ❌ |
| stagger | ⏳ À faire | 40f | non | 12 | ❌ |
| knockback | ⏳ À faire | 35f | non | 12 | ❌ |
| fall_front | ⏳ À faire | 45f | non | 13 | ❌ |
| fall_back | ⏳ À faire | 45f | non | 13 | ❌ |
| trip | ⏳ À faire | 35f | non | 13 | ❌ |
| knockdown | ⏳ À faire | 50f | non | 13 | ❌ |
| ko_front | ⏳ À faire | 60f | non | 14 | ❌ |
| ko_spin | ⏳ À faire | 55f | non | 14 | ❌ |
| ko_airborne | ⏳ À faire | 70f | non | 14 | ❌ |
| stand_up | ⏳ À faire | 50f | non | 15 | ❌ |
| recover | ⏳ À faire | 30f | non | 15 | ❌ |
| critical_prepare | ⏳ À faire | 30f | non | 16 | ❌ |
| critical_attack | ⏳ À faire | 40f | non | 16 | ❌ |
| critical_finish | ⏳ À faire | 35f | non | 16 | ❌ |
| special_skill | ⏳ À faire | 40f | non | 17 | ❌ |
| special_cast | ⏳ À faire | 35f | non | 17 | ❌ |
| special_release | ⏳ À faire | 30f | non | 17 | ❌ |
| pet_spawn | ⏳ À faire | 30f | non | 18 | ❌ |
| pet_entry | ⏳ À faire | 25f | non | 18 | ❌ |
| pet_attack | ⏳ À faire | 28f | non | 18 | ❌ |
| pet_hit | ⏳ À faire | 20f | non | 18 | ❌ |
| pet_death | ⏳ À faire | 40f | non | 18 | ❌ |
| victory | ⏳ À faire | 60f | oui | 19 | ❌ |
| victory_weapon | ⏳ À faire | 70f | oui | 19 | ❌ |
| victory_taunt | ⏳ À faire | 50f | non | 19 | ❌ |
| victory_celebration | ⏳ À faire | 80f | oui | 19 | ❌ |
| defeat_idle | ⏳ À faire | 60f | oui | 20 | ❌ |
| defeat_fall | ⏳ À faire | 45f | non | 20 | ❌ |
| spawn | ⏳ À faire | 30f | non | 20 | ❌ |
| despawn | ⏳ À faire | 25f | non | 20 | ❌ |
| enter_arena | ⏳ À faire | 50f | non | 20 | ❌ |
| exit_arena | ⏳ À faire | 40f | non | 20 | ❌ |
| taunt | ⏳ À faire | 55f | non | 20 | ❌ |

**Compteur** : 16 validées (idle, walk_forward, punch_right, hit_light, hit_heavy, ko_back, idle_breathing, prepare, focus, walk_backward, run_forward, run_backward, step_forward, step_backward, turn_left, turn_right) / 72 à implémenter / 88 total (`ANIMATION_NAMES`)
*(+ `dodge_backward` : bonus déjà codé avec keyframes mais absent de `ANIMATION_NAMES`, hors compteur officiel)*

---

### SESSION 5 — 2026-06-11 09:45-09:55 (heure locale)

**Agent** : Antigravity (Gemini 3.5 Flash)
**Déclencheur** : Demande de correction sur la position du menu d'animation, la visibilité des panneaux et la propreté générale du projet.

#### Ce qui a été corrigé (Session 4 & 5) :
1. **Z-order du bras gauche** : `armUpper_L` et `armLower_L` sont passés de `z=2` à `z=0`. Ils passent désormais correctement derrière la jambe gauche (`z=1`).
2. **Intégration des mains** : Ajout de `hand_L` (`z=0`) et `hand_R` (`z=10`) au squelette `BASE_RIG` et au mapping SVG `getCharacterParts` (dossiers `hand_left` et `hand_right`).
3. **Inversion des panneaux** : L'éditeur de Rig est correctement positionné sur le panneau de gauche, et la Sandbox de combat sur le panneau de droite.
4. **Déplacement du menu d'animation** : La section "Play Animation" a été déplacée du panneau droit vers le panneau gauche (au-dessus d'export).
5. **Visibilité & Flexbox** : Ajout de `min-width: 0;` sur le `canvas` pour forcer le conteneur flex à ne pas déborder et garantir que le panneau droit soit visible sur tous les écrans sans scroll horizontal.

---

*Dernière mise à jour : 2026-06-11 09:55 — Session 5 — Menu d'animation déplacé à gauche + Z-order bras gauche + Intégration mains gauche/droite + Fix visibilité panneau droit.*

---

### SESSION 6 — 2026-06-11 10:10-10:28 (heure locale)

**Agent** : Antigravity (Gemini 3.5 Flash)
**Déclencheur** : Transmission par l'utilisateur de nouvelles valeurs de calibration pour le Rig de base (BASE_RIG).

#### Ce qui a été modifié :
1. **Calibration de BASE_RIG** : Application des nouvelles coordonnées et pivots pour les 7 nœuds clés. L'échelle `scaleY: 1.5` a été appliquée **uniquement sur les pieds** (`foot_L` et `foot_R`), conformément à votre intention initiale. (Les autres nœuds comme `armUpper_R` ou `legUpper_L` restent à `1.0` ; la valeur de `1.5` présente dans leur copie provenait en réalité du bug de l'UI qui ne rafraîchissait pas les sliders de sélection de nœuds).
   - `armUpper_R` : pivot corrigé en `(4, 0)`, position en `(-1, -48)`, échelle standard `1.0`.
   - `armLower_R` : position en `(13, 48)`, échelle standard `1.0`.
   - `armLower_L` : position en `(0, 37)`, échelle standard `1.0`.
   - `foot_R` : position en `(-1, 49)`, échelle verticale `scaleY: 1.5`.
   - `foot_L` : position en `(-3, 48)`, échelle verticale `scaleY: 1.5`.
   - `legUpper_L` : position en `(-4, 5)`, échelle standard `1.0`.
   - `legUpper_R` : position en `(1, 5)`, échelle standard `1.0`.
2. **Correctif Technique - Initialisation du Scale** : Modification du constructeur de `Node` pour qu'il lise `scaleX` et `scaleY` à partir de la configuration fournie dans `BASE_RIG`.
3. **Correctif UI - Mise à jour des Sliders** : L'écouteur d'événement sur la sélection du nœud (`nodeSelect`) synchronise désormais également les sliders et champs numériques de Scale X / Scale Y avec les valeurs réelles du nœud sélectionné.
4. **Alignement Dynamique au Sol (Ground Offset)** : Ajout d'une méthode `getFootOffsetY()` dans `Skeleton` qui calcule la hauteur du bas des pieds au repos par rapport au root, et ajustement automatique de `root.y` dans `Skeleton.update()` afin que le point le plus bas des pieds soit pixel-perfect au niveau du sol (`globalY = 500`), évitant que le squelette ne flotte ou ne s'enfonce dans le sol.

---

*Dernière mise à jour : 2026-06-11 10:28 — Session 6 — Calibration du Rig avec scaleY: 1.5 uniquement sur les pieds, correctif UI sur les sliders et alignement automatique et dynamique des pieds sur le sol.*

---

### SESSION 7 — 2026-06-11 (heure locale)

**Agent** : Claude Code (Sonnet 4.6)
**Déclencheur** : Mise en place d'un workflow professionnel (versioning) + vérification visuelle de l'impact de la recalibration Session 6.

#### 1. Mise en place du dépôt Git
- `git init` à la racine `D:\Brawler_ascendant_clear\`
- `.gitignore` créé (`.claude/settings.local.json`, `Thumbs.db`, `.DS_Store`)
- Identité locale (repo uniquement) : `wodakim` / `montano.mickael@gmail.com`
- Commit initial `625fe8d` (27 fichiers, 3193 insertions)
- Remote ajouté et push effectué : `https://github.com/wodakim/Brawer_ascendant.git`, branche `main`
- **Objectif** : pouvoir diff/rollback entre sessions multi-agents (Antigravity ↔ Claude Code) sans perdre de travail.

#### 2. Vérification visuelle — impact de la recalibration Session 6
**Question** : les changements `armUpper_R` (pivot `(10,10)→(4,0)`) et `armLower_R` (position `(0,35)→(13,48)`) ont-ils cassé une des 8 animations existantes ?

**Méthode** :
- Serveur HTTP local (`python -m http.server --directory D:\Brawler_ascendant_clear`) pour contourner le CORS sur les SVG
- Navigateur headless Playwright/Chromium
- Pause + "Frame +1" du moteur (contrôles debug existants) pour capturer des frames précises
- Captures zoomées sur Fighter A, bones+pivots affichés, hitboxes/labels masqués pour la lisibilité
- Animations testées : `idle`, `idle_breathing`, `punch_right` (f0/f5/f10/f15/f18/f20/f22/f25/f30), `hit_light`, `hit_heavy`, `ko_back`, `prepare`, `focus`

**Résultat : ✅ AUCUNE RÉGRESSION**
- La chaîne épaule (`armUpper_R`) → coude (`armLower_R`) → poignet (`hand_R`) reste continue et anatomiquement cohérente sur toutes les frames testées, y compris aux rotations extrêmes (`-100°` à `+110°`).
- `punch_right` : anticipation (poing remonte près de l'épaule, f10) → impact (bras tendu vers l'adversaire, f15-22) → retour idle (f25-30) — tout s'enchaîne correctement.
- `hit_light` / `hit_heavy` / `ko_back` : poses extrêmes (corps qui part en arrière/se plie en deux) sont **voulues par les keyframes** (rotations torso/head/hip très fortes dès f4), pas un artefact du rig.
- **Conclusion** : Batch 1 (`idle_breathing`, `prepare`, `focus`) validé visuellement. La recalibration Session 6 est saine, on peut continuer sereinement sur les batchs suivants.

#### 3. Point élucidé — "sabre diagonal" en idle
Le nœud `weapon` (100×20, enfant de `weaponSocket`) n'a **aucun sprite SVG associé** (arme non équipée). Avec les hitboxes affichées, son rectangle de hitbox apparaît en vert et suit la rotation du bras → impression de "sabre" qui dépasse à un angle. Avec les hitboxes masquées, on ne voit que son point pivot isolé relié par une ligne bleue à `weaponSocket`. **Comportement normal d'un slot d'arme vide, pas un bug.**

#### 4. Point secondaire (cosmétique debug, à surveiller)
Un point pivot isolé (relié par une ligne bleue) apparaît parfois loin du pied (`foot_R`/`foot_L`) dans les poses extrêmes (`ko_back`, `hit_light`). Probablement lié au `scaleY: 1.5` des pieds (item de calibration déjà identifié Session 6). N'affecte pas le rendu du sprite — uniquement l'affichage debug du pivot. À surveiller mais non bloquant.

#### Prochaine étape
Reprise du workflow batch-par-batch du prompt maître : **BATCH 2 — Locomotion**, en commençant par `walk_backward` (miroir direct de `walk_forward`, déjà validé), une animation à la fois avec validation utilisateur entre chaque.

---

*Dernière mise à jour : 2026-06-11 — Session 7 — Repo Git initialisé et poussé sur GitHub, vérification visuelle complète post-Session 6 (aucune régression), Batch 1 validé.*

---

### SESSION 8 — 2026-06-11 (heure locale)

**Agent** : Claude Code (Sonnet 4.6)
**Déclencheur** : Continuation du BATCH 2 — implémentation de `walk_backward`, une animation à la fois avec validation utilisateur (cf. consigne explicite : ne jamais enchaîner sans validation).

#### 1. Implémentation initiale de `walk_backward`
- 44f, loop:true. Repris la structure de `walk_forward` avec : torse penché en arrière en continu (`-10°…-2°` au lieu de l'oscillation `+5°/-5°`), amplitudes de jambes/bras réduites (~20° vs 30°, flexion genou/coude max ~35-38° vs 50°) pour "pas raccourcis", tête en contre-mouvement secondaire (±2°, déphasé).
- Vérification visuelle Playwright (frames 0/6/11/17/22/28/33/39/44) : poses plausibles, bouclage f0≈f44 cohérent.

#### 2. Question utilisateur — le sens "backward" est-il correct ?
L'utilisateur a remarqué que l'animation "donnait l'impression d'avancer", et a demandé si le personnage devait être retourné avant de marcher en arrière.

**Vérifications dans le code** :
- `updateAutoCombat()` (ligne ~1184-1188) recalcule `dir`/`root.scaleX` à chaque frame pour que le perso fasse **toujours face à l'adversaire** → pas de retournement à gérer dans l'animation elle-même.
- La spec du prompt maître dit "`walk_backward` = `walk_forward` **miroir**" → interprété comme une inversion temporelle des pistes asymétriques (`legLower_L/R`, flexion du genou), les pistes symétriques (`legUpper`, bras) étant inchangées par construction sous inversion temporelle.

**Correction appliquée** : échange des timings de flexion entre `legLower_L` (bend f11→f33) et `legLower_R` (bend f33→f11) — chaque genou plie désormais pendant la phase de "ramené arrière" du cycle au lieu de la phase d'avancée.

#### 3. Retour utilisateur après test live — le vrai problème
En testant en direct, l'utilisateur a constaté que `walk_backward` donnait juste l'impression d'"avancer plus doucement que `run_forward`" — le cycle de jambes en lui-même est ambigu sur la direction dans un rig 2D *sur place* (sans translation, sans contact pied-sol simulé). Proposition de l'utilisateur : **lier le déplacement du personnage au pas de l'animation**, en s'appuyant sur "Reset Fight" qui réinitialise les positions sans risque.

#### 4. Système `moveX` (déplacement lié à l'animation) — voir RÈGLES FONDAMENTALES
- `walk_forward.moveX = 3` (avance vers `dir`), `walk_backward.moveX = -2` (recul, magnitude réduite).
- `Fighter.update()` : applique `x += moveX * dir` quand `autoCombat` est OFF (mode boutons PLAY), sans toucher à la logique `updateAutoCombat()` existante.
- Vérifié par Playwright en temps réel non-pausé : `x` passe de `348 → 226 → 106` sur 2s (≈ -2px/frame, stable après le bouclage de l'animation à 44f) ; `walk_forward` avance bien à +3px/frame ; "Reset Fight" remet `x` à 348.

#### 5. Code couleur des boutons "PLAY" — voir RÈGLES FONDAMENTALES
- 🟩 Vert (`#2e7d32`) sur les 9 animations déjà validées + `walk_backward` (10 au total après validation de cette session).
- 🟥 Rouge (`#c62828`) sur l'animation en cours de travail (aucune au moment du commit — sera utilisé pour la prochaine, ex. `run_forward`).
- Remplace l'ancien highlight statique `importantAnims` (orange).
- Vérifié par capture d'écran du panneau de boutons (10 boutons verts dont `WALK BACKWARD`, le reste en bleu par défaut).

#### 6. Validation utilisateur
`walk_backward` validé ("c'est parfait pour le moment") avec le système `moveX` actif.

#### 7. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `walk_backward` (corrigé), système `moveX`, code couleur des boutons, mise à jour de ce journal.

#### Prochaine étape
**BATCH 2, animation 2/7** : `run_forward` (28f, loop:true) — "Oscillation hip plus prononcée (+15px), bras pliés à 90° qui pompent énergiquement, légère inclinaison du torse vers l'avant", + `moveX` cohérent (> `walk_forward.moveX = 3`). Une animation à la fois, validation utilisateur avant de continuer.

---

*Dernière mise à jour : 2026-06-11 — Session 8 — `walk_backward` corrigé (miroir temporel réel) et validé, système `moveX` (déplacement lié aux animations) ajouté, code couleur des boutons PLAY (vert=validé/rouge=en cours), poussé sur GitHub.*

---

### SESSION 9 — 2026-06-11 (heure locale)

**Agent** : Claude Code (Sonnet 4.6)
**Déclencheur** : Continuation du BATCH 2 — implémentation de `run_forward`, une animation à la fois avec validation utilisateur.

#### 1. Implémentation de `run_forward`
- 28f, loop:true, `moveX: 6` (≈2x `walk_forward`).
- Bassin : rebond accentué Δ15px (`-70 → -85 → -70 → -85 → -70`, 2 appuis/cycle) vs Δ3px en walk_forward.
- Torse : inclinaison avant permanente (`+10°…+14°`) vs oscillation autour de 0° en walk_forward.
- Tête : contre-mouvement secondaire léger (±3°).
- Jambes : foulée plus ample (±45° vs ±30°), genou plié à 65° pendant le ramené avant (même logique de phase que walk_forward).
- Bras : coude plié ~90° en permanence (`armLower ≈ -80°/-95°`), épaules à ±50° (vs ±30°).
- Vérification visuelle Playwright (caméra suiveuse, frames 0/4/7/10/14/17/21/24/28) : bouclage f0≈f28 cohérent, genou max 65°<70°, coude max 95°<120°, aucun os mort.

#### 2. Retour utilisateur — flottement au sol
"Presque parfait" mais le personnage **flotte au-dessus du sol** pendant la course. Consigne : corriger pour toutes les futures animations de ce type ("respecte le root").

**Diagnostic** : `Skeleton.update()` utilisait `getFootOffsetY()` — calcul **statique**, basé sur `BASE_RIG` en pose de repos (rotations = 0), figeant `root.y`. Pour `walk_forward` (rotations ±20-30°) l'écart entre pose de repos et pose animée est faible, mais pour `run_forward` (rotations ±45°, genou à 65°) les jambes "raccourcissent" verticalement de façon importante par rapport à la pose de repos → `root.y` reste trop haut → le pied réel n'atteint plus le sol → flottement.

#### 3. Correctif — ancrage dynamique au sol (voir RÈGLES FONDAMENTALES)
- Nouvelle méthode `getDynamicFootOffsetY()` : calcule via cinématique directe (`globalMatrix.transformPoint`) la position Y réelle du bas de chaque pied dans la pose **animée** courante (root.y = 0), puis prend le pied le plus bas.
- `Skeleton.update(globalX, globalY, dynamicGround)` : si `dynamicGround`, fait une 2e passe pour ancrer ce pied le plus bas sur `globalY` (le sol). Si `false`, comportement statique inchangé (`getFootOffsetY()` conservé tel quel).
- `Fighter.update()` : passe `dynamicGround = true` automatiquement dès que l'animation en cours a `moveX` (= locomotion). Toutes les animations sans `moveX` (combat, KO, idle...) gardent l'ancien comportement.
- **Régression vérifiée par Playwright** : `ko_back` (chute/sol) — `root.y` reste constant comme avant, poses f0/f25/f60 identiques à la version pré-correctif. `walk_forward` — toujours bien ancré, légère variation de `root.y` (±13px max) imperceptible.
- `run_forward` re-vérifié : pied le plus bas systématiquement aligné sur le sol pour les 9 frames du cycle (f0→f28), plus aucun flottement visible.

#### 4. Validation utilisateur
`run_forward` validé après correctif (animation 2/7 du Batch 2). `validatedAnims` mis à jour (11 animations), `inProgressAnims` vidé.

#### 5. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `run_forward`, ancrage dynamique au sol (`dynamicGround`/`moveX`), code couleur des boutons, mise à jour de ce journal.

#### 6. Implémentation de `run_backward`
- 32f, loop:true, `moveX: -4` (recul rapide ; ratio -4/6 ≈ -0.67, cohérent avec le ratio `walk_backward`/`walk_forward` = -2/3 ≈ -0.67).
- **Miroir temporel** appliqué exactement comme pour `walk_backward` : phases de flexion du genou échangées entre `legLower_L` (flexion 1ère moitié → 2e moitié) et `legLower_R` (2e moitié → 1ère moitié).
- Amplitudes de jambes/bras réduites ×0.667 (foulée ±30° vs ±45°, genou max 45° vs 65°, bras ±34° vs ±50°, coude amplitude d'oscillation réduite ~10° vs 15°) — "pas raccourcis en arrière", même logique que `walk_backward`.
- Bassin : rebond identique à `run_forward` (Δ15px), frames mis à l'échelle (28f→32f, ratio 8/7).
- Torse penché vers l'**arrière** en permanence (signe opposé à `run_forward`, qui penche vers l'avant).
- Bénéficie automatiquement de l'ancrage dynamique au sol (a `moveX`).
- Vérification Playwright (caméra suiveuse, frames 0/4/8/12/16/20/24/28/32) : bouclage f0≈f32 cohérent, `x` recule de 4px/frame, ancrage au sol correct, aucune erreur console/page.

#### 7. Validation utilisateur
`run_backward` validé directement ("ça me convient parfaitement, on peut avancer, tu as fait du bon travail") — animation 3/7 du Batch 2. `validatedAnims` mis à jour (12 animations), `inProgressAnims` vidé.

#### 8. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `run_backward`, code couleur des boutons, mise à jour de ce journal.

#### 9. Implémentation de `step_forward`
- 18f, loop:false, `moveX: 5` (entre `walk_forward`=3 et `run_forward`=6, cohérent avec "pas rapide").
- Part de la pose `idle` (jambes/bras au repos) et y revient (f0 == f18) pour un enchaînement propre vers `idle` via le callback `onComplete` du bouton PLAY.
- Structure en un seul pas : f0-f6 anticipation (jambe avant R recule légèrement, genou plié à 35°), f6-f14 la jambe R balance vers l'avant et se pose au sol (genou se redresse à 5°), jambe arrière L pousse vers l'arrière (-12°) puis revient ; f14-f18 retour à la position neutre.
- Bassin : creux unique (un seul appui, pas de cycle) `-70 → -74 → -70`. Torse : légère anticipation avant `0° → 8° → 0°`. Bras : balancement opposé aux jambes depuis la garde idle.
- Bénéficie automatiquement de l'ancrage dynamique au sol (a `moveX`).
- Vérification Playwright (frames 0-20, transition vers `idle` à f18) : `x` avance de 5px/frame (90px total sur 18f), `rootY` varie en douceur (461 → 467 → 461) pour compenser le creux du bassin, transition vers `idle` sans saut de pose, aucune erreur console/page.

#### 10. Validation utilisateur
`step_forward` validé directement ("je valide") — animation 4/7 du Batch 2. `validatedAnims` mis à jour (13 animations), `inProgressAnims` vidé.

#### 11. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `step_forward`, code couleur des boutons, mise à jour de ce journal.

#### 12. Implémentation de `step_backward`, `turn_left`, `turn_right` (lot de 3)
Suite à une question de l'utilisateur sur l'efficacité du rythme de travail, accord pour traiter ces 3 dernières animations du Batch 2 ensemble puis valider en bloc (au lieu d'une par une).

- **`step_backward`** (18f, loop:false, `moveX: -3`) : dérivée de `step_forward` par inversion des rôles gauche/droite + inversion du signe des rotations directionnelles (torse, legUpper, armUpper) ; `legLower`/`armLower` (flexion genou/coude, convention positive/négative indépendante du côté) gardent la même forme de delta. f0 == f18 == pose idle. Ratio `moveX` -3/5 = -0.6, cohérent avec le ratio walk/run backward (~-0.6 à -0.67, "pas raccourcis en arrière").
- **`turn_left` / `turn_right`** (12f chacun, loop:false, **pas de `moveX`** — pivot sur place, ancrage statique `getFootOffsetY()` inchangé) : pivot court façon "spin 2D". Nouvelle propriété moteur `root.flipX` (voir RÈGLES FONDAMENTALES, "Pivot / retournement") : `tracks.root.flipX = [{f:0,v:1},{f:6,v:0},{f:12,v:-1}]`, combinée à `torso.scaleY: 1→0.85→1` (squash au point de pivot, conforme au spec) et `hip.y` qui descend légèrement (-70→-73→-70). Chorégraphie des jambes/torse/tête en miroir entre les deux (jambe G ou D qui croise devant). `resetPose()` remet `flipX=1` au démarrage de l'animation suivante → le personnage revient automatiquement à son orientation normale après le pivot, sans flip permanent ni régression sur les 13 animations déjà validées.
- Vérification Playwright : `step_backward` (frames 0-20, `x` recule de 3px/frame, ancrage dynamique correct, transition idle propre) ; `turn_left`/`turn_right` (frames 0-12, `root.scaleX` interpole proprement 1→0→-0.667 puis revient à 1 via `idle`, squash du torse visible à f6/f7, aucune erreur console/page).

#### 13. Validation utilisateur
`step_backward`, `turn_left` et `turn_right` validés en bloc ("je les valide !") — **Batch 2 complet (7/7)**. `validatedAnims` mis à jour (16 animations), `inProgressAnims` vidé.

#### 14. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `step_backward`, `turn_left`, `turn_right`, mécanisme `root.flipX`, code couleur des boutons, mise à jour de ce journal.

#### Prochaine étape
**BATCH 3 — Poings (3 animations)** : premier batch d'attaques. Une animation à la fois (ou par petits lots validés, comme convenu pour la fin du Batch 2), validation utilisateur avant de continuer. Consulter `docs/ANTIGRAVITY_PROMPT_COMPLET.md` pour le détail des 3 animations du Batch 3.

---

*Dernière mise à jour : 2026-06-11 — Session 9 — Batch 2 (Locomotion) terminé et validé (7/7) : `run_forward`, `run_backward`, `step_forward`, `step_backward`, `turn_left`, `turn_right`. Correctifs moteur : ancrage dynamique au sol pour `moveX` (corrige le flottement) et `root.flipX` pour les pivots, tous deux non-régressifs. Poussé sur GitHub.*
