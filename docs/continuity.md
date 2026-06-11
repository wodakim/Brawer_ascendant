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

### Pivots clés (ne changent jamais)
| Nœud | pX | pY | Signification |
|------|----|----|---------------|
| torso | 25 | 60 | bas du torse = hanche |
| head | 25 | 45 | bas de la tête = cou |
| armUpper L/R | 10 | 10 | haut bras = épaule |
| armLower L/R | 9 | 10 | haut avant-bras = coude |
| legUpper L/R | 12 | 5 | haut jambe = hanche |
| legLower L/R | 10 | 5 | haut mollet = genou |
| foot L/R | 10 | 5 | haut pied = cheville |
| weaponSocket | 5 | 5 | attaché à armLower_R |

### BASE_RIG mémorisé (18 nœuds)
| Nœud | z | w | h | pX | pY | x | y | parent |
|------|---|---|---|----|----|---|---|--------|
| root | 0 | 10 | 10 | 5 | 5 | 0 | 0 | null |
| hip | 5 | 40 | 30 | 20 | 15 | 0 | -70 | root |
| legUpper_L | 1 | 24 | 45 | 12 | 5 | -10 | 5 | hip |
| legLower_L | 1 | 20 | 50 | 10 | 5 | 0 | 40 | legUpper_L |
| foot_L | 1 | 35 | 15 | 10 | 5 | 5 | 45 | legLower_L |
| armUpper_L | 2 | 20 | 45 | 10 | 10 | -20 | -50 | torso |
| armLower_L | 2 | 18 | 45 | 9 | 10 | 0 | 35 | armUpper_L |
| torso | 4 | 50 | 70 | 25 | 60 | 0 | -10 | hip |
| head | 6 | 50 | 50 | 25 | 45 | 0 | -65 | torso |
| face | 7 | 40 | 40 | 20 | 20 | 5 | -10 | head |
| hair | 8 | 60 | 60 | 30 | 30 | 0 | -15 | head |
| legUpper_R | 9 | 24 | 45 | 12 | 5 | 10 | 5 | hip |
| legLower_R | 9 | 20 | 50 | 10 | 5 | 0 | 40 | legUpper_R |
| foot_R | 9 | 35 | 15 | 10 | 5 | 5 | 45 | legLower_R |
| armUpper_R | 10 | 20 | 45 | 10 | 10 | 20 | -50 | torso |
| armLower_R | 10 | 18 | 45 | 9 | 10 | 0 | 35 | armUpper_R |
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
| 1 | Respiration & Préparation | 3 | ✅ Écrit — validation requise |
| 2 | Locomotion | 7 | ⏳ À faire |
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
| idle_breathing | ✅ Batch 1 écrit | 80f | oui | 1 | ⏳ Validation requise |
| prepare | ✅ Batch 1 écrit | 25f | non | 1 | ⏳ Validation requise |
| focus | ✅ Batch 1 écrit | 40f | non | 1 | ⏳ Validation requise |
| walk_backward | ⏳ À faire | 44f | oui | 2 | ❌ |
| run_forward | ⏳ À faire | 28f | oui | 2 | ❌ |
| run_backward | ⏳ À faire | 32f | oui | 2 | ❌ |
| step_forward | ⏳ À faire | 18f | non | 2 | ❌ |
| step_backward | ⏳ À faire | 18f | non | 2 | ❌ |
| turn_left | ⏳ À faire | 12f | non | 2 | ❌ |
| turn_right | ⏳ À faire | 12f | non | 2 | ❌ |
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

**Compteur** : 7 existantes / 69 à implémenter / 76 total

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
