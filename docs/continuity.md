# CONTINUITY — BRAWLER ASCENDANT
> **DIRECTIVE DE COHÉRENCE (PRIORITÉ MAXIMALE)** : Ce journal et [Map.md](file:///d:/Brawler_ascendant_clear/docs/Map.md) constituent les sources de vérité absolues du projet. Ils doivent être consultés avant toute intervention et impérativement mis à jour lors de chaque validation d'étape.
> Journal de traçabilité complet. Mis à jour en continu par Antigravity.


---

## CONTEXTE DU PROJET

- **Nom** : Brawler Ascendant — Moteur d'animation de combat 2D
- **Inspiration** : La Brute
- **Cible** : Export APK Android via WebView
- **Architecture Cible** : **ES Modules natifs** (JS pur dans le navigateur, sans bundler/build tool).
- **Point d'entrée** : [moteur_de_combat_et_rigging.html](file:///d:/Brawler_ascendant_clear/engine/moteur_de_combat_et_rigging.html) (HTML épuré, n'inclut que [style.css](file:///d:/Brawler_ascendant_clear/engine/css/style.css) et le module [main.js](file:///d:/Brawler_ascendant_clear/engine/src/main.js)).
- **Règle d'Or de Développement** : **Interdiction absolue d'ajouter du code JS ou CSS directement dans le fichier HTML.** Toute logique, configuration ou keyframe d'animation doit être implémentée dans son module respectif sous [engine/src/](file:///d:/Brawler_ascendant_clear/engine/src/).
- **À IGNORER** : `D:\Brawler_ascendant_clear\Mockup\`
- **Carte de navigation** : [Map.md](file:///d:/Brawler_ascendant_clear/docs/Map.md) — Index complet cartographiant la structure des modules, classes, constantes et fichiers thématiques d'animations. À lire impérativement avant toute action pour cibler le bon module.


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
- ❌ Sens de rotation d'une articulation (genou/coude) non vérifié contre une animation déjà validée AVANT d'écrire la valeur — pas de branche IK "à tester" présentée sans vérification de convention de signe (cf. [[feedback-rotation-direction-check]])
- ❌ Genou > +70° / Coude > +120°
- ❌ Cheville flottante
- ❌ Tête > ±90° (sauf KO)
- ❌ Os inanimés (tout os doit avoir micro-réaction)
- ❌ < 3 keyframes par nœud principal actif
- ❌ Interpolation linéaire sur impacts
- ❌ ScaleX/Y hors [0.6, 1.6] sauf comique
- ❌ **Recycler la chorégraphie (forme/squash/timing) d'une animation déjà implémentée pour un événement narratif différent** — même si le prompt suggère des valeurs similaires. **AVANT de concevoir les keyframes**, identifier en une phrase : (1) la CAUSE du mouvement (impact / perte d'équilibre / gravité / glissement de prise / action volontaire), (2) quel(s) nœud(s) doivent PILOTER ce mouvement en conséquence. Si la chorégraphie suggérée reproduit la forme d'une animation sœur du même batch (mêmes pistes + squash), redessiner depuis la bonne mécanique au lieu de copier les chiffres. Voir [[feedback-animation-narrative-distinctness]] — coûte un cycle complet implémentation+test+capture si découvert après coup.
- ✅ Squash & Stretch sur tout impact (et UNIQUEMENT sur impact — pas sur perte d'équilibre/glissement)
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

### Mirroring (animations `_left`/`_right` ou `_backward`/`_forward`) — précisé Session 9
Pour dériver une animation miroir d'une animation déjà validée (ex. `punch_left` ⟵ `punch_right`, ou un futur `kick_left` ⟵ `kick_right`), appliquer ces règles **par piste**, et non un sign-flip global :
- **`torso.rotation`, `head.rotation`, `legUpper_*.rotation`** (twist/lean du buste, baseline 0) → **sign-flip** (inverser le signe de chaque valeur).
- **`armUpper_*.rotation`** (bras qui frappe/swing vers l'adversaire) → **PAS de sign-flip** : appliquer la **même forme de delta** (différences relatives aux keyframes) à la nouvelle baseline (`armUpper_L` baseline = +10, `armUpper_R` baseline = -10). Convention : "plus négatif = vers l'avant/l'adversaire", valable pour les DEUX bras (le bras gauche ne suit pas une convention inversée).
- **`armLower_*.rotation` / `legLower_*.rotation`** (flexion coude/genou, convention "toujours un seul signe" — `armLower_L`≈-20, `armLower_R`≈-30, `legLower_*`≈0..+) → **PAS de sign-flip** : même forme de delta appliquée à la nouvelle baseline.
- **`hip.x`** (impulsion/lunge vers l'avant) → **inchangé** (même direction pour les deux côtés).
- **Vérification recommandée** : comparer une capture d'écran à la frame d'impact du miroir avec celle de l'original — le membre actif doit pointer vers la zone "SENSOR"/avant dans les deux cas.
- **Erreur déjà rencontrée** : sign-flip naïf de `armUpper` (par analogie avec `torso`) → le bras frappe en arrière (loin de l'adversaire). Voir Session 9, section 15-16 du journal.

#### Cas particulier des coups de pied (`kick_left` ⟵ `kick_right`) — précisé Session 9 (Batch 4)
Pour les animations de jambes, `torso.rotation`/`head.rotation`/`hip` ne représentent pas un *twist* (qui inverserait de sens entre G/D) mais un **lean d'équilibre global**, identique quelle que soit la jambe qui frappe. Règle complète pour ce cas :
- `torso.rotation`, `head.rotation`, `hip` (toutes pistes), `legUpper_*.rotation` et `legLower_*.rotation` (baseline 0 pour les deux jambes) → **valeurs littéralement identiques**, simple ré-étiquetage G↔D (pas de sign-flip, pas de re-delta).
- `armUpper_*.rotation` / `armLower_*.rotation` → inchangé par rapport à la règle générale ci-dessus (PAS de sign-flip, même forme de delta rebasée sur la nouvelle baseline).
- Vérifié visuellement par capture d'écran à la frame d'impact (f15) : la jambe active (legUpper_L/legLower_L pour `kick_left`) s'étend bien vers la zone "SENSOR", de façon cohérente avec `kick_right`.

### Système de tenue d'arme dynamique (`weaponStyle` / `WEAPON_HOLD_STYLES` / `WEAPON_REACH`) — ajouté Session 10 (Batch 6)
**Contexte** : ce projet est un *moteur* pour un jeu où l'arme en main peut changer à tout moment en plein combat (équipement, perte, vol). Plutôt que des animations séparées par type d'arme, le choix retenu (validé par l'utilisateur) est une **surcouche dynamique appliquée en temps réel** par-dessus l'animation de base.

- **`Fighter.weaponStyle`** : `'unarmed' | 'melee' | 'ranged' | 'thrown'` (défaut `'melee'`). `Fighter.setWeaponStyle(style)` met à jour `weaponStyle` ET appelle `equipWeapon(style !== 'unarmed')` (cache/affiche le node `weapon`).
- **UI** : panneau droit, `<select id="weapon-style-select">` (Unarmed/Melee/Ranged/Thrown) — remplace l'ancien bouton `btn-toggle-weapon`. Pilote `fighterA.setWeaponStyle()` au `change`.
- **`WEAPON_HOLD_STYLES`** : table `{ unarmed, melee, ranged, thrown }`, chaque entrée = `{ nodeId: { prop: (frame, duration) => delta } }`. Appliquée **additivement** par `Animator.update()`, APRÈS l'interpolation des pistes de base, sur toute animation flaguée `weaponStyleOverlay: true` (actuellement : `weapon_idle` uniquement). Relue à CHAQUE FRAME sur `fighter.weaponStyle` → un changement de style en plein milieu d'une boucle s'applique instantanément, sans relancer `play()`.
- **`WEAPON_HOLD_OVERLAY_TARGETS`** : union (calculée une fois au chargement) de tous les `(nodeId, prop)` apparaissant dans au moins un style de `WEAPON_HOLD_STYLES`. Pour chaque cible, si l'animation courante n'a PAS de piste de base pour cette prop, `Animator.update()` la réinitialise à sa valeur de repos (`base<Prop>`/0) avant d'appliquer le delta du style courant (ou rien si le style courant ne définit pas cette cible). **Indispensable** pour `unarmed` (qui ne définissait au départ aucune cible) : sans ce mécanisme, `weaponSocket.rotation` restait figé à la dernière valeur d'un style précédent (ex. `thrown`) au lieu de revenir à 0.
- **`unarmed` = garde de boxeur** (PAS une table vide) : `armUpper_L/armLower_L/armUpper_R/armLower_R` reçoivent des deltas constants (`-57.5/-67.5/-32.5/-57.5`) qui recentrent l'oscillation de respiration de `weapon_idle` sur une cible ABSOLUE symétrique `armUpper_*=-45°, armLower_*=-90°`, **calculée directement depuis la géométrie du rig** (longueurs des segments `armUpper_*`/`armLower_*` dans `BASE_RIG`) : coude replié contre le torse à hauteur de poitrine, poing levé devant le buste à hauteur d'épaule/menton. Évite la sensation "tient une arme invisible" à mains nues — poings levés, weapon caché (`visible=false` via `equipWeapon(false)`). **Piège déjà rencontré (Session 10)** : une première version recopiait la pose finale de `prepare` (`armUpper_L=-30, armLower_L=45, armUpper_R=-45, armLower_R=55`) — mêmes angles, mais `prepare` a des pistes torse/hanche/tête différentes de `weapon_idle`, donc les mêmes angles y produisaient une pose différente (coude devant le visage, main au niveau de la hanche). **Ne jamais recopier des angles bras d'une animation à l'autre sans vérifier `getGlobalPos()`** — toujours dériver/vérifier via la géométrie du rig.
- **`WEAPON_REACH`** : `{ unarmed:0, melee:80, ranged:40, thrown:50 }` (px). `Fighter.attackRange` (= largeur du SENSOR, cf. rendu + `checkHit`/`updateAutoCombat`) ajoute `WEAPON_REACH[weaponStyle]` quand `hasWeapon`. **Valeurs PLACEHOLDER** (un seul node "weapon" générique, pas encore de stats par arme réelle issues de `weapons/axe|club|dagger|spear|sword`) — mais le SENSOR est déjà branché sur `weaponStyle`/`hasWeapon`, donc affiner ces valeurs (ou les rendre par-arme) ne nécessitera pas de changement d'architecture.
- **Transition `weapon_draw` → `weapon_idle`** (pas `idle`) : cas spécial dans le handler des boutons PLAY (`anim === 'weapon_draw' ? 'weapon_idle' : 'idle'`) — seul `weapon_draw` est concerné, les 28 autres animations retombent toujours sur `idle`. Garantit que l'arme reste "sortie" et que la pose `weapon_idle` qui suit correspond bien au `weaponStyle` équipé (jamais la pose d'un autre type d'arme).
- **Conséquence pour les futures animations** : toute nouvelle animation dont la pose doit dépendre de l'arme tenue → flaguer `weaponStyleOverlay: true` et ajouter les cibles nécessaires dans `WEAPON_HOLD_STYLES` (en pensant à `WEAPON_HOLD_OVERLAY_TARGETS`, calculé automatiquement). Toute animation qui doit laisser l'arme "sortie" après coup → cibler `weapon_idle` en fin de `play()`, comme `weapon_draw`.

### IDÉES FUTURES (hors séquence batch actuelle)
- **Animations de combat dépendantes de l'arme** (`punch_right`, `punch_left`, `double_punch`, combos, hits, etc.) : retour utilisateur Session 10 — ces animations devraient elles aussi s'adapter selon `unarmed`/`melee`/`ranged`/`thrown` (ex. un coup de poing avec une épée en main devrait être un coup d'épée, pas un poing nu). Décision : **ne PAS retoucher les 27 animations déjà validées maintenant** (risque de re-validation massif) — à traiter comme un **batch dédié futur**, en réutilisant le même pattern `weaponStyleOverlay`/`WEAPON_HOLD_STYLES` (ou une table équivalente `WEAPON_ATTACK_STYLES`) plutôt que des variantes nommées séparées, cohérent avec le choix d'architecture dynamique de Batch 6. À scoper précisément quand on y arrivera.

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
| 3 | Poings | 3 | ✅ 3/3 — `punch_left`, `double_punch`, `headbutt` validés (Session 9) |
| 4 | Kicks | 3 | ✅ 3/3 — `kick_right`, `kick_left`, `heavy_kick` validés (Session 9) |
| 5 | Combo Chain | 5 | ✅ 5/5 — `combo_1`, `combo_2`, `combo_3`, `combo_4`, `combo_finisher` validés (Session 9) |
| 6 | Arme États | 2 | ✅ 2/2 — `weapon_draw`, `weapon_idle` validés (Session 10) |
| 7 | Arme Attaques | 5 | 🟡 4/5 — `weapon_attack_light`, `weapon_attack_medium` (Session 11), `weapon_attack_heavy` (Session 12), `weapon_critical` (Session 13) validés. `weapon_combo`, `weapon_combo_crit` à faire |
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
| punch_left | ✅ Batch 3 écrit | 30f | non | 3 | ✅ Validé (Session 9) |
| double_punch | ✅ Batch 3 écrit | 45f | non | 3 | ✅ Validé (Session 9) |
| headbutt | ✅ Batch 3 écrit | 28f | non | 3 | ✅ Validé (Session 9) |
| kick_right | ✅ Batch 4 écrit | 35f | non | 4 | ✅ Validé (Session 9) |
| kick_left | ✅ Batch 4 écrit | 35f | non | 4 | ✅ Validé (Session 9) |
| heavy_kick | ✅ Batch 4 écrit | 45f | non | 4 | ✅ Validé (Session 9) |
| combo_1 | ✅ Batch 5 écrit | 22f | non | 5 | ✅ Validé (Session 9) |
| combo_2 | ✅ Batch 5 écrit | 22f | non | 5 | ✅ Validé (Session 9) |
| combo_3 | ✅ Batch 5 écrit | 22f | non | 5 | ✅ Validé (Session 9) |
| combo_4 | ✅ Batch 5 écrit | 22f | non | 5 | ✅ Validé (Session 9) |
| combo_finisher | ✅ Batch 5 écrit | 50f | non | 5 | ✅ Validé (Session 9) |
| weapon_draw | ✅ Batch 6 écrit | 35f | non | 6 | ✅ Validé (Session 10) |
| weapon_idle | ✅ Batch 6 écrit | 50f | oui | 6 | ✅ Validé (Session 10) |
| weapon_attack_light | ✅ Batch 7 écrit | 28f | non | 7 | ✅ Validé (Session 11) |
| weapon_attack_medium | ✅ Batch 7 écrit | 35f | non | 7 | ✅ Validé (Session 11) |
| weapon_attack_heavy | ✅ Batch 7 écrit | 50f | non | 7 | ✅ Validé (Session 12) |
| weapon_combo | ✅ Batch 7 écrit | 40f | non | 7 | ✅ Validé (Session 14) |
| weapon_critical | ✅ Batch 7 écrit | 60f | non | 7 | ✅ Validé (Session 13) |
| weapon_combo_crit | ✅ Batch 7 écrit | 63f | non | 7 | ✅ Validé (Session 14) |
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

**Compteur** : 35 validées (idle, walk_forward, punch_right, hit_light, hit_heavy, ko_back, idle_breathing, prepare, focus, walk_backward, run_forward, run_backward, step_forward, step_backward, turn_left, turn_right, punch_left, double_punch, headbutt, kick_right, kick_left, heavy_kick, combo_1, combo_2, combo_3, combo_4, combo_finisher, weapon_draw, weapon_idle, weapon_attack_light, weapon_attack_medium, weapon_attack_heavy, weapon_critical, weapon_combo, weapon_combo_crit) / 54 à implémenter / 89 total (`ANIMATION_NAMES`)
*(+ `dodge_backward` : bonus déjà codé avec keyframes mais absent de `ANIMATION_NAMES`, hors compteur officiel)*
**Batch 7 (Arme : Attaques) complet — 6/6 validées.**

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

#### 15. Implémentation de `punch_left`, `double_punch`, `headbutt` (Batch 3, lot de 3)
Suite au feedback positif sur le rythme par lots de 3 (Batch 2), même approche pour le premier batch d'attaques.

- **`punch_left`** (30f, loop:false) : miroir de `punch_right`. `torso`/`head`/`legUpper` (twist/lean, baseline 0) sign-flip ; `armUpper`/`armLower` gardent la **même forme de delta** appliquée à la nouvelle baseline (PAS de sign-flip — convention "négatif = vers l'avant/l'adversaire" valable pour les deux bras) ; `hip.x/y` (impulsion avant + bob) inchangés.
- **`double_punch`** (45f, loop:false) : `punch_right` (frames 0-18, compressé ×0.6) → `punch_left` (frames 18-45, compressé ×0.9), torse oscillant entre les deux appuis (-15°→+25°→0→+15°→-25°→0°). Continuité vérifiée sur toutes les pistes à la jonction f18.
- **`headbutt`** (28f, loop:false) : anticipation (léger recul du torse à f3), puis le torse se penche brusquement en avant (+40° à f8, easeOutQuad), la tête suit avec retard et dépasse (+60° à f12, easeOutQuad), puis retour avec follow-through/overshoot (f18) jusqu'à idle (f28). Léger squash/stretch du torse (`scaleY` 0.95→1.05) + lunge avant via `hip.x`.
- **Bug de mirroring détecté et corrigé** : la première version de `punch_left`/`double_punch` faisait un sign-flip de `armUpper_L`/`armUpper_R` (par analogie avec `torso`), ce qui faisait frapper le bras **en arrière** (loin de l'adversaire). Détecté par comparaison de captures d'écran `double_punch` f9 (impact droit) vs f32 (impact gauche) : à f32 le bras pointait dans la mauvaise direction. Corrigé en appliquant la même forme de delta que `armLower` (pas de sign-flip) — voir règle ajoutée ci-dessous.
- Vérification Playwright (après correction) : les 3 animations transitionnent proprement vers `idle`, aucune erreur console/page, f0 == fin == pose idle sur toutes les pistes, valeurs d'interpolation vérifiées mathématiquement (easing easeIn/Out cohérents).

#### 16. Nouvelle règle de mirroring (RÈGLES FONDAMENTALES)
Ajout d'une règle précise pour dériver une animation miroir (`_left`/`_right` ou `_backward`/`_forward`) :
- `torso.rotation`, `head.rotation`, `legUpper_*.rotation` (twist/lean, baseline 0) → **sign-flip**.
- `armUpper_*.rotation` (le bras qui frappe/swing vers l'adversaire) → **PAS de sign-flip**, même forme de delta appliquée à la nouvelle baseline (convention "plus négatif = vers l'avant" pour les deux côtés).
- `armLower_*.rotation` / `legLower_*.rotation` (flexion coude/genou, "toujours un seul signe") → **PAS de sign-flip**, même forme de delta.
- `hip.x` (impulsion avant) → **inchangé**.

#### 17. Validation utilisateur
`punch_left`, `double_punch` et `headbutt` validés en bloc : *"Je valide clairement tu fais des mouvements très fluide, tu as compris le feeling je te félicite, tu peux continuer"* — **Batch 3 complet (3/3)**. `validatedAnims` mis à jour (19 animations), `inProgressAnims` vidé.

#### 18. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `punch_left`, `double_punch`, `headbutt`, nouvelle règle de mirroring (RÈGLES FONDAMENTALES), code couleur des boutons, mise à jour de ce journal.

#### 19. Implémentation de `kick_right`, `kick_left`, `heavy_kick` (Batch 4, lot de 3)
Suite à la validation du Batch 3, poursuite avec le Batch 4 (Kicks) selon le même rythme par lots de 3.

- **`kick_right`** (35f, loop:false) : anticipation (jambe arrière, genou plié = "chambré", `legUpper_R`+20°/`legLower_R`+65°), extension rapide vers l'avant (`legUpper_R`-95°, `legLower_R`-12°), follow-through (-40°), retour. `hip.y` monte légèrement à l'impact (-76 vs -70). `armUpper_L` se lève pour l'équilibre (jusqu'à 110°), `armUpper_R` fait contre-balancier. Jambe d'appui (`legUpper_L`/`legLower_L`) ajuste légèrement pour absorber.
- **`kick_left`** (35f, loop:false) : dérivée de `kick_right` via la nouvelle règle de mirroring pour les kicks (voir section 20) — `torso`/`head`/`hip`/`legUpper_*`/`legLower_*` (baseline 0) gardent des **valeurs littéralement identiques** (simple ré-étiquetage G↔D, la jambe gauche prend le rôle de jambe qui frappe), `armUpper`/`armLower` rebasés sur la nouvelle baseline via la même forme de delta (`armUpper_R` se lève pour l'équilibre, `armUpper_L` fait contre-balancier).
- **`heavy_kick`** (45f, loop:false) : anticipation plus marquée (`legUpper_R`+35°, torse pivote en arrière à +12° pour charger), grand arc de jambe (`legUpper_R` jusqu'à -100°, conforme au spec "+/-100°"), squash latéral du torse à l'impact (`scaleX` 1→0.8 + `scaleY` complémentaire 1→1.15, conservation de volume), puis repositionnement plus lent (25f de retour après impact vs 20f de montée).
- Vérification Playwright (captures caméra-suiveuse à chaque frame-clé + lecture des données de pose) : les 3 animations transitionnent proprement vers `idle`, aucune erreur console/page, `f0 == fin == pose idle` sur toutes les pistes, valeurs d'interpolation vérifiées mathématiquement (easing easeIn/Out cohérents avec la convention de décalage d'1 frame du harnais de test).

#### 20. Nouvelle règle de mirroring pour les kicks (RÈGLES FONDAMENTALES)
Extension de la règle de mirroring (section 16) pour le cas des coups de pied : `torso`/`head`/`hip` représentent un **lean d'équilibre global** (indépendant de la jambe qui frappe), pas un twist. Donc pour `kick_left` ⟵ `kick_right` : `torso.rotation`, `head.rotation`, `hip` (toutes pistes), `legUpper_*.rotation` et `legLower_*.rotation` (baseline 0 pour les deux jambes) gardent des **valeurs littéralement identiques** (simple ré-étiquetage G↔D) ; `armUpper_*`/`armLower_*` suivent la règle générale (pas de sign-flip, même forme de delta rebasée). Vérifié visuellement : la jambe active de `kick_left` (legUpper_L/legLower_L) s'étend bien vers "SENSOR" à la frame d'impact, comme `kick_right`.

#### 21. Validation utilisateur
`kick_right`, `kick_left` et `heavy_kick` validés en bloc : *"C'est parfait, continue je valide"* — **Batch 4 complet (3/3)**. `validatedAnims` mis à jour (22 animations), `inProgressAnims` vidé.

#### 22. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `kick_right`, `kick_left`, `heavy_kick`, nouvelle règle de mirroring pour les kicks (RÈGLES FONDAMENTALES), code couleur des boutons, mise à jour de ce journal.

#### 23. Implémentation de `combo_1`, `combo_2`, `combo_3` (Batch 5, sous-lot 1/2)
Suite à la validation du Batch 4, poursuite avec le Batch 5 (Combo Chain), traité en deux sous-lots de ~2-3 (rythme confirmé par l'utilisateur).

- **Interprétation de la "règle des combos"** (spec : "chaque combo commence là où le précédent se termine ; la pose de départ de combo_2 = la pose de fin de combo_1") : conformément au workflow établi (transition propre vers `idle`, validation individuelle par bouton PLAY), chaque `combo_N` a `f0 == f_end == pose idle`. La règle de chaînage est donc satisfaite par construction (idle == idle), tout en gardant chaque animation testable isolément.
- **`combo_1`** (22f, loop:false) : jab droit — peu d'anticipation (f4), extension quasi-droite et rapide du bras (f9 = impact, `armUpper_R`→-95°, `armLower_R`→+5° = bras presque tendu), retour rapide (f22 = idle).
- **`combo_2`** (22f, loop:false) : cross gauche — miroir direct de `combo_1` via la règle de mirroring (Batch 3/4) : `torso`/`head`/`legUpper_*` sign-flip + permutation G/D, `armUpper_*`/`armLower_*` même forme de delta rebasée sur la nouvelle baseline (pas de sign-flip), `hip` inchangé.
- **`combo_3`** (22f, loop:false) : crochet droit (hook) — pour varier par rapport au jab/cross (bras qui se tend), le coude reste plié (~70-90°, `armLower_R` reste autour de -50/-75°) tout du long et balaie dans un grand arc (`armUpper_R` de +60° à -95°, `torso` pivote jusqu'à +30° à l'impact avec un léger overshoot/follow-through à f14 avant retour à idle).
- Vérification Playwright (captures caméra-suiveuse aux frames-clés + lecture des données de pose) : les 3 animations transitionnent proprement vers `idle`, aucune erreur console/page, `f0 == f22 == pose idle` sur toutes les pistes, valeurs d'interpolation vérifiées mathématiquement (cohérentes avec la convention de décalage d'1 frame). Captures à l'impact confirment le bras actif pointant vers "SENSOR" pour les 3 coups, avec une silhouette bien différenciée pour le hook (arc large, coude plié) vs jab/cross (extension droite).

#### 24. Validation utilisateur
`combo_1`, `combo_2` et `combo_3` validés en bloc : *"Je valide, continue"* — **Batch 5 sous-lot 1/2 (3/5)**. `validatedAnims` mis à jour (25 animations), `inProgressAnims` vidé.

#### 25. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `combo_1`, `combo_2`, `combo_3`, code couleur des boutons, mise à jour de ce journal.

#### 26. Implémentation de `combo_4`, `combo_finisher` (Batch 5, sous-lot 2/2)
- **`combo_4`** (22f, loop:false) : coup de pied droit "snap" — version compressée de `kick_right` (ratio ~0.63 = 22f/35f, mêmes formes de courbes rebasées sur 5 keyframes f0/f4/f8/f14/f22). Conclut l'alternance droite/gauche/droite/kick.
- **`combo_finisher`** (50f, loop:false) : coup de grâce — grande anticipation (f8 : torse pivote en arrière -25° avec léger squash de "chargement" `scaleY`0.88/`scaleX`1.15), snap explosif (f18 : torse +35°, **squash & stretch exagéré** `scaleY`1.3/`scaleX`0.75 à l'impact, conservation de volume), **hip-push** marqué (`hip.x`+35) simulant le recul de l'adversaire, récupération lente (24f, f26→f50).
- Vérification Playwright : les 2 animations transitionnent proprement vers `idle`, aucune erreur console/page, `f0 == f_end == pose idle` sur toutes les pistes, valeurs d'interpolation vérifiées mathématiquement (torso.scaleX/scaleY/rotation et hip.x à l'impact f18 cohérents avec easeOutQuad/easeInQuad et le décalage d'1 frame). Captures à l'impact confirment la jambe du kick vers SENSOR et un étirement diagonal très marqué du torse vers SENSOR pour le finisher.

#### 27. Validation utilisateur
`combo_4` et `combo_finisher` validés en bloc : *"Je valide, continue"* — **Batch 5 complet (5/5)**. `validatedAnims` mis à jour (27 animations), `inProgressAnims` vidé.

#### 28. Git
- Commit + push sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) incluant : `combo_4`, `combo_finisher`, code couleur des boutons, mise à jour de ce journal.

#### Prochaine étape
**BATCH 6 — Arme : Dégainer & États (2 animations)** : `weapon_draw` (35f, le bras droit va chercher l'arme à la ceinture/dans le dos via `hip`, l'arme apparaît dans `weaponSocket` à mi-chemin) et `weapon_idle` (50f, loop:true, idle avec arme tenue + légère oscillation du poignet `armLower_R` + balancement `weaponSocket.rotation` ±5°). **Nouveau** : nécessite d'animer explicitement `weaponSocket`/`weapon` — vérifier d'abord la structure de ces nodes dans `BASE_RIG`/le rendu avant de concevoir les keyframes. Voir `docs/ANTIGRAVITY_PROMPT_COMPLET.md` BATCH 6.

---

### SESSION 10 — 2026-06-12 (heure locale)

#### 1. Implémentation de `weapon_draw` et `weapon_idle` (Batch 6, 2/2) + architecture de tenue d'arme dynamique
- **`weapon_draw`** (35f, loop:false) : le bras droit va chercher l'arme (`hip`, f8→f18), l'arme "apparaît" dans `weaponSocket` via un pop `scaleX`/`scaleY` 0→1 au frame 18, puis le bras ramène l'arme vers une posture prête (f27→f35, retour à la pose `weapon_idle`).
- **`weapon_idle`** (50f, loop:true) : reprend l'oscillation de respiration de `idle`/`idle_breathing` (torse/tête/bras), flaguée `weaponStyleOverlay: true`.
- **Architecture `weaponStyle` / `WEAPON_HOLD_STYLES` / `WEAPON_HOLD_OVERLAY_TARGETS` / `WEAPON_REACH`** : voir section "RÈGLES FONDAMENTALES" ci-dessus pour le détail complet. Choix validé par l'utilisateur : une surcouche dynamique appliquée en temps réel par-dessus `weapon_idle`, plutôt que des animations séparées par type d'arme, car l'arme en main peut changer en plein combat (équipement/perte/vol).

#### 2. Retour utilisateur — coude "cassé" sur `weapon_draw` en Unarmed
L'utilisateur signale qu'en style `unarmed`, le bras droit de `weapon_draw` a le coude "dans le mauvais sens" (effet bras cassé). Cause : la piste originale `armLower_R` montait jusqu'à -115° au pic (f18), hors de la plage naturelle de flexion du coude. **Correctif** : nouvelles courbes `armUpper_R` (-10→-70→-95→-40→-10) et `armLower_R` (-30→-15→10→-20→-30) — le bras tend vers l'avant (f8) puis se replie en travers du torse pour "tirer" l'arme (pic f18), avant de redescendre en garde (f27→f35). Vérifié par capture d'écran : plus de coude désarticulé.
*(Cette version — "Candidat A" — a finalement été abandonnée au profit de la version originale, à la demande explicite de l'utilisateur : voir point 7.)*

#### 3. Retour utilisateur — bug persistant : coude devant le visage, main devant la hanche
Second retour : le problème persiste, coude quasi devant le visage et main juste devant la hanche. **Erreur de lecture** : ce second retour décrivait en réalité la pose `unarmed` de **`weapon_idle`** (lancée juste après `weapon_draw`), pas `weapon_draw` lui-même — confusion qui a conduit à une tentative de correctif erronée sur `weapon_draw` (cassant la version du point 2, pourtant correcte), rapidement identifiée et annulée par l'utilisateur ("tu viens de casser la belle animation weapon draw"). **Leçon retenue** : bien lire/distinguer à QUELLE animation se rapporte chaque retour utilisateur quand plusieurs sont mentionnés en succession ; pas de "rustines" numériques non vérifiées sur un fichier moteur destiné à être injecté dans un projet de jeu.

#### 4. Cause réelle et correctif définitif — `weapon_idle.unarmed`
La table `WEAPON_HOLD_STYLES.unarmed` recopiait les angles de bras absolus de la pose finale de `prepare` (`armUpper_L=-30, armLower_L=45, armUpper_R=-45, armLower_R=55`). Or `prepare` a des pistes torse/hanche/tête différentes de `weapon_idle` : les mêmes angles y produisent une pose différente (`hand_R≈(224,393)`≈hauteur de hanche ; coude gauche `≈(186.5,364)`≈devant le visage, vérifié via `getGlobalPos()`).
**Correctif** : nouvelles valeurs dérivées directement de la géométrie du rig (`elbow_offset = R(armUpper)·(13,48 ou 0,37)`, `hand = elbow + R(armUpper+armLower)·(0,35)`), cible absolue symétrique `armUpper_L=armUpper_R=-45°`, `armLower_L=armLower_R=-90°` → deltas `armUpper_L=-57.5, armLower_L=-67.5, armUpper_R=-32.5, armLower_R=-57.5`.
Vérifié (aucune erreur console/page) :
- `hand_R≈(255,333-337)`, `hand_L≈(218-220,331-338)` — ~55-60px au-dessus de `hip.y=391` (plus "main à la hanche").
- `armLower_R≈(229-232,358-361)`, `armLower_L≈(193-195,356-361)` — hauteur poitrine, ~38-44px sous `head.y` (plus "coude devant le visage").
- Identique via `weapon_draw → weapon_idle` ET via clic direct "PLAY WEAPON IDLE", sur tout le cycle de 50f.
- Régression : poses `melee`/`ranged`/`thrown` de `weapon_idle` strictement inchangées.

#### 5. Validation utilisateur (partielle — revue au point 7)
- *"je valide le weapon idle en ce sens"* — nouvelle garde `unarmed` validée (définitif).
- Pour `weapon_draw`, une question de clarification a d'abord fait conclure (à tort) que la version du point 2 ("Candidat A") devait être conservée. **Lecture incorrecte** : le message suivant de l'utilisateur a immédiatement précisé qu'il n'avait validé ni cette version ni le commit qui en découlait — voir point 7 pour la résolution finale.

#### 6. Git (commit initial, corrigé au point 7)
- Un premier commit (`bf501f8`) a été poussé sur `https://github.com/wodakim/Brawer_ascendant.git` (branche `main`) en présentant à tort `weapon_draw` (Candidat A) comme validé, en plus de `weapon_idle`, l'architecture `weaponStyle`/`WEAPON_HOLD_STYLES`/`WEAPON_HOLD_OVERLAY_TARGETS`/`WEAPON_REACH` et le code couleur des boutons (ces derniers éléments restent corrects). Un commit correctif a suivi (point 7), **sans amender** `bf501f8`.

#### 7. Retour utilisateur définitif — retour à la version originale de `weapon_draw`
L'utilisateur précise : il veut la version de `weapon_draw` d'AVANT le correctif du point 2 (Candidat A) — celle qui donne l'impression que le personnage "cherche l'arme dans sa poche/ceinture et la sort" — et confirme qu'en `unarmed`, `weapon_draw` doit quand même se jouer intégralement avant de basculer sur la garde `weapon_idle.unarmed` (point 4).

**Restauration** : pistes `armUpper_R`/`armLower_R` de `weapon_draw` remises aux valeurs originales (pic f18 : `armUpper_R=75°`, `armLower_R=-115°`), conformes au commentaire de bloc jamais modifié (lignes ~766-776) qui décrivait déjà ce design ("le bras droit plonge vers la hanche/ceinture pour saisir l'arme").

Vérifié (aucune erreur console/page, captures d'écran sans overlays debug) :
- f18 : `hand_R≈(162,396)` ≈ `hip≈(180,395)` — la main atteint la hanche au moment exact où l'arme apparaît (pop `weapon.scaleX/scaleY: 0→1` au f19) → confirme visuellement "il sort l'arme de la ceinture/poche".
- Pistes `armUpper_R`/`armLower_R` identiques sur les 4 `weaponStyle` à f18 (`hand_R≈(162.16,396.32)`, rot=-109.3) — `weapon_draw` reste bien indépendant du style équipé.
- Transition `weapon_draw → weapon_idle` revérifiée : garde `unarmed` du point 4 inchangée ; régression `melee`/`ranged`/`thrown` (`_into_idle`) identiques aux valeurs déjà validées.
- Architecture déjà conforme au point (b) demandé par l'utilisateur : le handler PLAY enchaîne toujours `weapon_draw → weapon_idle` quel que soit `weaponStyle` (`anim === 'weapon_draw' ? 'weapon_idle' : 'idle'`) — aucun code supplémentaire requis.

**Validation utilisateur** : *"parfait, je valide"*. **Batch 6 réellement complet et validé (2/2)** : `weapon_idle` (garde `unarmed` du point 4) + `weapon_draw` (version originale restaurée, point 7). `validatedAnims` mis à jour (29 animations dont `weapon_draw`), `inProgressAnims` vidé. Nouveau commit correctif poussé sur `https://github.com/wodakim/Brawer_ascendant.git` (sans amender `bf501f8`).

#### Prochaine étape
**BATCH 7 — Arme : Attaques (5 animations)** : `weapon_attack_light` (28f), `weapon_attack_medium` (35f), `weapon_attack_heavy` (50f), `weapon_combo` (40f), `weapon_critical` (60f) — toutes non-loop. Voir "IDÉES FUTURES" ci-dessus pour la question en suspens des animations de combat dépendantes de l'arme (`punch_right`, etc.) — **hors scope de Batch 7**, à traiter comme un batch dédié ultérieur.

---

### SESSION 11 — 2026-06-12 19:00 (heure locale)

**Agent** : Antigravity (Claude Sonnet 4.6 Thinking)
**Déclencheur** : Prise de conscience complète du projet + validation des animations Batch 7 codées par Claude Code + amélioration HUD

#### 1. Audit et prise de conscience du projet
- Lecture complète de `continuity.md` et `ANTIGRAVITY_PROMPT_COMPLET.md`
- État réel détecté : `weapon_attack_light` et `weapon_attack_medium` étaient codés (boutons rouges) mais non validés
- Architecture `weaponAttackOverlay` / `WEAPON_ATTACK_UNARMED_OVERLAY` déjà en place (faite par Claude Code)
- Système hitbox `impactFrame` : générique et complet — **il suffit d'ajouter `impactFrame: N` sur toute animation d'attaque**, `checkHit()` se déclenche automatiquement

#### 2. Décisions prises en équipe (questions/réponses utilisateur)
- **`weapon_attack_light`/`medium`** : validés "sous caution" — variantes `ranged`/`thrown` à traiter dans un futur batch dédié
- **`bash`** : ce n'est PAS une animation à créer, c'était une référence à une étape de workflow. **Ne pas créer de `bash` animation.**
- **`weapon_attack_heavy`** : frappe la plus impressionnante visuellement (coup à deux mains ou overhead selon l'arme tenue), avec hitbox active via `impactFrame`
- **`weapon_combo`** (standard) + **`weapon_combo_crit`** (critique) : **deux animations séparées** — le jeu choisit laquelle jouer selon la probabilité. `weapon_combo_crit` sera ajouté à `ANIMATION_NAMES` lors de son implémentation
- **`weapon_critical`** : coup droit ultra-chargé, anticipation lente (f0→f20), impact ultrarapide 1-2f (f20-f21), squash maximal du torse, retrait lent (f22→f60)

#### 3. Amélioration HUD (`renderFighter`)
- **Nom du joueur** : affiché en blanc gras au-dessus du personnage (y-230)
- **Compteur de hits** (`fighter.hitCount`) : affiché en cyan (`#00e5ff`) sous le nom (y-216) — incrémenté dans `checkHit()` à chaque coup confirmé (pas les MISS), réinitialisé à 0 par `resetFight()` via le constructeur
- **HP numérique** (couleur dynamique : vert/orange/rouge) + barre HP
- **Identifiant debug** `char_NN` gris discret en bas
- Ancienne ligne `"Fighter A HP: 100"` supprimée (redondante avec le nouveau HUD)

#### 4. Validation `weapon_attack_light` et `weapon_attack_medium`
- Test frame par frame dans le navigateur (Pause + Frame+1)
- f0 : pose idle/weapon_idle — f5 : anticipation (bras recule) — f11 : impact (bras tendu, arme vers l'adversaire) — f17 : follow-through — f28 : retour idle— propre
- `impactFrame: 11` / `impactFrame: 14` : `checkHit()` bien déclenché, "MISS" affiché (combattants trop éloignés)
- `weaponSocket.rotation` dans la limite ±30° sur les deux animations
- `validatedAnims` mis à jour (31 animations), `inProgressAnims` vidé
- Boutons passés en vert dans l'UI

#### Prochaine étape
**`weapon_attack_heavy` (50f)** — première animation à coder de cette session. Frappe lourde : anticipation lente + impact explosif + squash maximal. Validation utilisateur requise avant `weapon_combo`.

---

### SESSION 12 — 2026-06-12 (heure locale)

**Agent** : Claude Code (Claude Sonnet 4.6)
**Déclencheur** : Suite de Session 11 — validation de `weapon_attack_heavy` (déjà codé par Antigravity) + demande explicite de l'utilisateur pour un outil de test visuel "hitbox réactive" (frame par frame, signal de touche quand l'arme/les poings touchent une hitbox cible)

#### 1. Validation `weapon_attack_heavy` (Batch 7, 3/5)
- Test frame par frame (Pause + Frame+1) : pose vérifiée contre les contraintes de design
  - f18 (anticipation) : `armUpper_R=-155°`, `armLower_R=+90°`, torso lean `-28°`, hip `-15px` ✅
  - f24 (impact) : `armUpper_R=-30°`, `torso.scaleX=0.72`/`scaleY=1.38` (squash maximal) ✅
  - `weaponSocket.rotation` reste dans la limite `±30°` ✅
  - f0 == f49 == pose `idle`/`weapon_idle`, transition propre vers `weapon_idle` ✅
- `impactFrame: 24` déclenche bien `checkHit()` (`weaponAttackOverlay: true`)
- Zéro erreur console/page sur l'ensemble du test

#### 2. Nouvel outil permanent "Hitbox Réactive" (debug visuel)
- Demande utilisateur : pouvoir tester *visuellement*, frame par frame, qu'une hitbox cible réagit (signal de touche) quand l'arme (ou les poings si `unarmed`) entre en contact avec elle
- Implémentation dans le moteur (`moteur_de_combat_et_rigging.html`) :
  - Nouvelle checkbox **"Hitbox Réactive (Cyan/Rouge)"** (`dbg-reactive-hitbox`), liée à `engineOptions.showReactiveHitbox` (activée par défaut)
  - `Fighter.updateReactiveHitbox()` : calcule le(s) point(s) "tip" — bout de l'arme (`hasWeapon && weaponStyle !== 'unarmed'`) ou bouts des deux poings `hand_R`/`hand_L` (sinon) — et teste chaque point contre les AABB world-space `torso`/`head` de l'adversaire via `nodeWorldAABB()`/`pointInAABB()`
  - Marqueurs cyan dessinés aux points "tip" (passent au rouge + agrandis + contour blanc en cas de contact, avec label "TOUCH")
  - Les hitbox `torso`/`head` de la cible passent directement du vert au rouge (`node.reactiveHit === true`) au lieu d'un rectangle rouge superposé — **corrigé après retour utilisateur** ("la hitbox passe au rouge mais on voit aussi cette même hitbox restée verte, ça peut porter à confusion")
- Validation croisée à 140px d'écart (`fighterB` en `unarmed`) : f24 → tête de B passe au rouge (TOUCH), f25 → torse de B passe au rouge (TOUCH) + `lastImpact={hit:true, label:"HIT -10"}`, `fighterB.hp` passe à 90 — cohérent avec `impactFrame: 24`

#### 3. Validation utilisateur
*"Oui je valide weapon_attack_heavy, mets à jour continuity.md et la mémoire"* — **Batch 7 passe à 3/5**. `validatedAnims` mis à jour (32 animations), `inProgressAnims` vidé.

#### Prochaine étape
Batch 7 reste (2/3 restants, par lot de 2-3 avec validation groupée) : `weapon_combo` (40f), `weapon_combo_crit` (nouvelle animation, à ajouter dans `ANIMATION_NAMES` lors de son implémentation), `weapon_critical` (60f). Utiliser la nouvelle Hitbox Réactive pour les tests frame par frame de chaque animation.

---

*Dernière mise à jour : 2026-06-12 — Session 12 — `weapon_attack_heavy` validé (32/88, Batch 7 = 3/5) + nouvel outil de debug permanent "Hitbox Réactive" (vert→rouge sur contact géométrique torso/head, marqueurs tip arme/poings).*

---

### SESSION 13 — 2026-06-12 (heure locale)

**Agent** : Claude Code (Claude Sonnet 4.6)
**Déclencheur** : Suite de Session 12 — implémentation de `weapon_critical` (60f, dernier point du spec arme défini Session 11), puis 3 retours process de l'utilisateur avant validation finale.

#### 1. Implémentation `weapon_critical` (Batch 7, B7.5)
- 60f, `impactFrame: 21`, `weaponAttackOverlay: true`, ajouté à `WEAPON_DRAWN_ANIMS`
- Anticipation lente f0→f20 : torso `-35°`, `armUpper_R +50°`/`armLower_R -100°`, `weaponSocket +25°`, hip `(-20,-76)`
- Impact ultrarapide f20→f21 : torso snap `+40°` avec squash maximal (`scaleX=0.65`/`scaleY=1.5`, conservation de volume ≈0.975), `armUpper_R -65°`/`armLower_R +15°`, `weaponSocket 0°` (arme alignée dans l'axe du bras à l'impact)
- Retrait lent f22→f60, `f0 == f60 ==` pose `idle`/`weapon_idle`

#### 2. Corrections en cours de route
- `WEAPON_DRAWN_ANIMS` ne contenait pas `weapon_critical` → transition cassée vers `idle` au lieu de `weapon_idle`. Corrigé (cf. §B7 RÈGLES FONDAMENTALES).
- Première pose d'impact (`armUpper_R=-105°`, `weaponSocket=-25°`) plaçait systématiquement le bout de l'arme au-dessus de la hitbox tête adverse (sweep d'écart 80-240px testé) → `checkHit()` fonctionnait (distance) mais la hitbox réactive ne touchait jamais. Diagnostiqué via sweeps `node.updateMatrix()` sur `weaponSocket`/`armUpper_R`/`armLower_R` à la frame d'impact. Corrigé en réalignant l'arme dans l'axe du bras à l'impact (`armUpper_R: -105°→-65°`, `weaponSocket: -25°→0°`, ajustements en cascade sur le retrait f30/f45).

#### 3. Validation frame par frame (170px, `fighterB` en `unarmed`)
- Poses f20 (anticipation) et f21 (impact) conformes au design
- Hitbox réactive : `torsoHit=true`/`touching=true` exactement à la frame capturée 22 (= `impactFrame`+1), `lastImpact={hit:true, label:"HIT -10"}`, `fB.hp` 100→90
- Transition propre `weapon_critical` → `weapon_idle`
- Zéro erreur console/page

#### 4. Trois retours process de l'utilisateur (avant validation)
Après une première présentation des résultats ci-dessus, l'utilisateur a demandé 3 choses avant de valider :
1. **Lire la mémoire attentivement** (priorité maximale, pas un survol de l'index `MEMORY.md`) → nouvelle mémoire [[feedback-read-memory-carefully]]
2. **Vérifier la réaction directe de l'adversaire** : une animation d'attaque doit aussi faire que la cible "prenne un coup à bonne distance", pas seulement déclencher `checkHit()`/la hitbox réactive côté attaquant. Vérifié : à l'impact (frame capturée 22), `fighterB.state` passe `idle`→`hit_light` (son animator redémarre à f1), à `dist`=170-175px (dans `attackRange=172`/seuil `checkHit` ≈197) → nouvelle mémoire [[feedback-attack-validation-target-reaction]], et `feature-reactive-hitbox` mis à jour avec ce 4ᵉ critère de validation
3. **Travailler chirurgicalement / moins de tokens** : création de `docs/Map.md` (index des lignes clés du HTML par batch/classe/fonction + sections de ce journal + fichiers mémoire + scripts `.tmp_*.cjs`), référencé en tête de ce fichier avec obligation de mise à jour

#### 5. Validation utilisateur
*"Je valide weapon_critical"* — **Batch 7 passe à 4/5** (33/88). `validatedAnims` mis à jour (33 animations), `inProgressAnims` vidé.

#### Prochaine étape
Batch 7 : derniers restants `weapon_combo` (40f) et `weapon_combo_crit` (nouvelle animation, à ajouter dans `ANIMATION_NAMES`) — design à clarifier avec l'utilisateur (nombre de coups, ce qui différencie la version "_crit") avant codage, par lot de 2-3 avec validation groupée ([[feedback-animation-workflow]]). Lire `docs/Map.md` avant toute action.

---

*Dernière mise à jour : 2026-06-12 — Session 13 — `weapon_critical` validé (33/88, Batch 7 = 4/5) + `docs/Map.md` créé + 2 nouvelles règles de validation mémorisées (lecture mémoire attentive, réaction directe de la cible).*

---

### SESSION 14 — 2026-06-12 (heure locale)

**Agent** : Claude Code (Claude Sonnet 4.6)
**Déclencheur** : Suite de Session 13 — design + implémentation de `weapon_combo` et `weapon_combo_crit` (derniers points du Batch 7), clarification utilisateur sur le "facteur de coup critique".

#### 1. Clarification design (avant codage)
L'utilisateur a précisé le fonctionnement du combo : `weapon_combo` = 2 coups "aller-retour" (frappe + retour), `weapon_combo_crit` = mêmes 2 coups + un 3e coup CRITIQUE ajouté. Le choix entre les deux dépendra plus tard de l'agilité/des skills du joueur ("facteur de coup critique"), placeholder = une chance sur deux pour l'instant. Question posée à l'utilisateur sur la portée de ce placeholder → réponse : **ajouter le mécanisme 50/50 dans le moteur** (option B), pas seulement deux animations indépendantes sans connexion.

#### 2. Implémentation
- `weapon_combo_crit` ajouté à `ANIMATION_NAMES` (89 noms) et `WEAPON_DRAWN_ANIMS` (avec `weapon_combo`)
- `ANIMATIONS_LIB["weapon_combo"]` (40f, `impactFrame:[11,29]`, `weaponAttackOverlay:true`) : coup 1 = extension (cocking f5 → impact f11), coup 2 = revers (windup f23 → impact f29, torse pivote dans l'autre sens)
- `ANIMATIONS_LIB["weapon_combo_crit"]` (63f, `impactFrame:[11,29,39]`) : f0-29 identiques à `weapon_combo`, prolongé par un 3e coup critique (f38 grand enroulement, f39 impact avec squash maximal `scaleX=0.65`/`scaleY=1.5`, cf. `weapon_critical`)
- Nouveau `case "combo":` dans `changeState` (placeholder 50/50 `Math.random() < 0.5 ? "weapon_combo" : "weapon_combo_crit"`, TODO remplacer par une formule agilité/skills)

#### 3. Correction géométrique des poses d'impact (itératif)
Premier test (150px) : `checkHit()`/`takeDamage()`/réaction `hit_light`/`hit_heavy` fonctionnaient pour les 3 coups, mais la hitbox réactive géométrique (`touch`) échouait sur les coups 1 et 2 — le bout de l'arme n'atteignait pas l'AABB torse/tête de la cible (manque de 70-106px). Diagnostiqué via script Playwright dédié (réglage direct des rotations + `skeleton.update()` + lecture `nodeWorldAABB`), conformément à [[feedback-pose-derivation]] :
- **Coup 1 (f11)** : pose redessinée en extension — `armUpper_R:-98°→-70°`, `armLower_R:-78°→+10°`, `weaponSocket:-24°→-15°`, `hip.x:18→25` (enchaînement cocking f5 → extension f11)
- **Coup 2 (f29)** : pose "revers" — `torso:-26°→-30°`, `armUpper_R:+68°→-45°`, `armLower_R:-50°→+30°`, `weaponSocket:+26°→+20°`, `hip.x:16→35` (lunge renforcé pour compenser le recul cumulé de la cible)
- Correction du stall résultant sur `armUpper_R` à f23 (windup2 : `-45°→+20°`)
- Coup 3 critique (f39) déjà conforme, inchangé

#### 4. Validation frame par frame (150px, 2 runs avec rolls de dégâts différents)
- Run 1 (rolls -25/-25/-25) : f12 `touch=true`/`hit_heavy`(hp75), f30 `touch=true`/`hit_heavy`(hp50), f40-41 `touch=true`/`hit_heavy`(hp40)
- Run 2 (rolls -10/-25/-10) : f12 `touch=true`/`hit_light`(hp90), f29-30 `touch=true`/`hit_heavy`(hp65), f40-41 `touch=true`/`hit_light`(hp70)
- Les 3 frames d'impact passent les 2 critères ([[feature-reactive-hitbox]] + [[feedback-attack-validation-target-reaction]]) sur deux tirages aléatoires différents → robuste au recul cumulé
- Zéro erreur console/page sur les deux animations

#### 5. Validation utilisateur
*"Je valide, passe au bookkeeping"* — **Batch 7 complet, 6/6** (35/89). `validatedAnims` mis à jour (35 animations), `inProgressAnims` vidé.

#### Prochaine étape
Batch 7 (Arme : Attaques) terminé. Prochain batch à définir avec l'utilisateur — Batch 8 (`disarm_attack`, `weapon_break`, `weapon_drop`, `weapon_lost`, `weapon_fall`) est le suivant dans l'ordre de `continuity.md`. Lire `docs/Map.md` avant toute action.

---

### SESSION 15 — 2026-06-12 (heure locale)

**Agent** : Antigravity (Gemini 1.5 Pro)
**Déclencheur** : Lancement du refactoring modulaire par étapes (ES Modules).
**Action** : Validation des Étapes 0 à 4 par l'utilisateur, puis réalisation de l'Étape 5.

#### 1. Réalisation de l'Étape 5 (Segmentation des animations)
- Création de [index.js](file:///d:/Brawler_ascendant_clear/engine/src/data/animations/index.js) qui re-exporte proprement les 8 fichiers de batchs d'animations thématiques.
- Création de [animations.js](file:///d:/Brawler_ascendant_clear/engine/src/data/animations.js) qui importe toutes les animations via `index.js` et les fusionne dynamiquement dans l'objet global `ANIMATIONS_LIB`.
- Raccordement global et allègement (Étape 6) : déplacement de toute la logique globale (boucle de jeu, gestion de l'UI, etc.) dans `engine/src/main.js` et allègement complet de `engine/moteur_de_combat_et_rigging.html`.
- Mise à jour de [Map.md](file:///d:/Brawler_ascendant_clear/docs/Map.md) pour refléter la nouvelle architecture modulaire au lieu de l'indexation par numéros de lignes du monolithe.

#### 2. Alignements et Résolution des Divergences (Étape 7)
- Première exécution du script Playwright de validation géométrique `.tmp_refactor_validation.cjs compare` révélant 5,503 divergences principalement localisées sur trois animations : `combo_finisher`, `weapon_draw` et `weapon_attack_heavy`.
- **Alignements appliqués** :
  1. **`combo_finisher`** : Alignement de toutes les pistes d'animation (rotation et scale) sur la version originale issue de HEAD. Correction de la propriété `impactFrame` de 22 à 18 (l'impact se produit visuellement et physiquement au frame 18 de l'animation).
  2. **`weapon_draw`** : Alignement des rotations/scales sur la version originale validée (restauration de la portée du bras droit et calage du pop de l'arme au frame 18).
  3. **`weapon_attack_heavy`** : Alignement de la piste `legLower_R.rotation` qui comportait une interpolation incorrecte par rapport au référentiel (`easeInOutQuad` au lieu des segments linéaires interpolés d'origine).
- Ré-exécution de la validation géométrique : **0 divergence détectée** sur l'ensemble des 35 animations, validant la non-régression absolue à 0.001 pixel près pour les deux combattants.

---

*Dernière mise à jour : 2026-06-12 — Session 15 — Refactoring modulaire complet et validé à 100% avec 0 divergence détectée sur les 35 animations.*

---

### SESSION 16 — 2026-06-13 (heure locale)

**Agent** : Antigravity (Gemini 1.5 Pro)
**Déclencheur** : Rejet de la première itération de `disarm_attack` par l'utilisateur (ressemblait trop à un punch horizontal, manque de tests multi-frames et ciblage insuffisant du bras/de la main adverse).

#### 1. Conception d'un coup descendant "Overhead Slash"
- **Correction esthétique** : Abandon de la trajectoire directe (punch horizontal). La nouvelle chorégraphie est un mouvement de coupe vertical/diagonal descendant :
  - **Anticipation (f0 → f6)** : Wind-up ample dans le sens inverse des aiguilles d'une montre pour lever le bras et l'arme haut au-dessus de la tête (`armUpper_R = -130°`, `armLower_R = -90°`, `weaponSocket = -30°` à son maximum f6). Cela dégage entièrement l'espace avant et évite tout contact ou clipping prématuré.
  - **Impact (f12)** : Frappe diagonale descendante percutante avec bras tendu vers le bas-avant (`armUpper_R = -20°`, `armLower_R = 0°`, `weaponSocket = 5°`), ciblant géométriquement la main droite de l'adversaire (`hand_R` à `(352.02, 403.13)`).
  - **Follow-Through (f13 → f18)** : Course descendante de l'arme qui balaie le bras inférieur adverse (`TouchArm` = true).
  - **Retour (f18 → f30)** : Repositionnement fluide en garde `weapon_idle`.

#### 2. Correction du script de test & Alignement géométrique
- **Correction des Pivots AABB** : Le script de test `.tmp_disarm_test_run.cjs` redéfinissait `nodeWorldAABB` et `pointInAABB` sans tenir compte des pivots des nœuds (`pX`, `pY`), causant de faux calculs de collision. Alignement sur les formules réelles de `Node.js` (`[-node.pX, -node.pY]`, etc.).
- **Désactivation des réactions pour test pur** : Simulation sans recul physique ni transition d'animation de Fighter B pour obtenir une mesure propre sur les 30 frames de l'animation.
- **Rapport de collision multi-frame** :
  - **Frames 0 à 11** : Zéro collision avec les parties de Fighter B (`TouchHand`, `TouchArm`, `TouchTorso`, `TouchHead` = false) ✅
  - **Frame 12 (Impact)** : `TouchHand` = **true** (ciblage parfait de la main droite de B) ✅, les autres parties du corps ne sont pas touchées.
  - **Frame 13** : `TouchArm` = **true** (follow-through qui balaie le bras inférieur) ✅.

#### 3. Amélioration de l'infrastructure de test Sandbox
- Ajout et exposition des fonctions `draw()` et `updateGame()` sur l'objet global `window` dans `main.js` afin de permettre le contrôle et le rendu manuel frame par frame pour nos tests automatisés.

#### 4. Captures visuelles
- Génération et enregistrement de trois captures d'écran de validation dans l'archive des artefacts :
  - `disarm_attack_f6.png` : Pose de préparation (arme levée au ciel).
  - `disarm_attack_f12.png` : Instant de l'impact (contact précis sur la main droite).
  - `disarm_attack_f18.png` : Follow-through descendant.
- Mise à jour de [walkthrough.md](file:///C:/Users/monta.DESKTOP-Q5SLGN1/.gemini/antigravity/brain/6c3db914-b9a3-4a5c-8303-eead4ea7faab/walkthrough.md) avec le carrousel visuel.

#### 5. Validation utilisateur
*"Okai cette animation me convient. Je valide."* — **`disarm_attack` validé (Étape 8 ✅)**. `validatedAnims` mis à jour (36 animations), `inProgressAnims` vidé.

#### Prochaine étape
**Étape 9** : `weapon_break` (20f) — animation du bris de l'arme de l'adversaire sous l'impact du désarmement.

---

*Dernière mise à jour : 2026-06-13 — Session 16 — `disarm_attack` validé (Batch 8 = 1/5) — frappe descendante overhead targeting `hand_R` adverse avec 0 collision prématurée frames 0-11.*

---

### SESSION 17 — 2026-06-13 (heure locale)

**Agent** : Claude Sonnet 4.6 (Thinking)
**Déclencheur** : Validation de `disarm_attack` par l'utilisateur → implémentation de `weapon_break` (Étape 9).

#### 1. Implémentation `weapon_break` (20f, loop:false)
Réaction du combattant qui **reçoit** le désarmement — son bras armé tressaille violemment, l'arme vibre et se tord avant de tomber.

**Chorégraphie** :
- **Choc initial (f0 → f3)** : `armUpper_R` part brutalement vers le haut (+30°, easeOutQuad), `armLower_R` s'effondre en arrière (-80°), `weaponSocket` fait un rebond à -30°. `weaponSocket.scaleX` passe à **-1** au frame 3 (arme momentanément retournée → effet de torsion/bris de prise).
- **Rebond (f3 → f8)** : Le bras repart dans l'autre sens (armUpper_R → -30°), le socket revient à +28° (f6) puis à 0°. scaleX revenu à +1 dès f6.
- **Oscillation amortie (f8 → f13)** : Deuxième oscillation réduite (armUpper_R → +5°, armLower_R → -40°, weaponSocket → -1.2°).
- **Bras retombant (f13 → f20)** : Settle naturel vers une posture bras faible (armUpper_R → -15°, armLower_R → -50°), prêt à enchaîner sur `weapon_lost`.
- **Réaction de corps** : Torse penche brusquement en arrière (f3: -20°) avec squash (scaleX=1.1/scaleY=0.92), puis revient. Tête suit avec retard (f3: -25°). Bras gauche sert d'équilibre.

#### 2. Vérification frame par frame (Playwright)
```
f0 : armUpper_R=-10° (idle), wsX=+1
f3 : armUpper_R=+30° (PIC CHOC), weaponSocket=-30°, wsX=-1 ← BRIS ✅
f6 : weaponSocket=+28° (rebond), wsX=+1 ← retour normal ✅
f8 : armLower_R=+20° (bras désarticulé) ✅
f19: armUpper_R=-14°, armLower_R=-50° (bras retombant) ✅
```
Aucune erreur console/page. Bouton rouge dans l'UI.

#### 3. Correctif — passage en mode Unarmed à la fin
Question utilisateur : "pourquoi elle ne mène pas à l'état Unarmed ?"
- Ajout de `disarmsOnComplete: true` sur l'objet animation `weapon_break`.
- Handler du bouton PLAY dans `main.js` mis à jour : si `ANIMATIONS_LIB[anim].disarmsOnComplete`, alors `setWeaponStyle('unarmed')` est appelé avant l'enchaînement sur `idle`.
- Vérifié : après 22 frames d'update, `weaponStyle === 'unarmed'` et `hasWeapon === false` ✅

#### 4. Correctif systémique — Panneau droit réactif à l'état du Fighter
Question utilisateur : "le panneau latéral droit doit être réactif à ces changements d'état, pas seulement pour cette animation mais toutes, précédente ou future."
- Ajout de `syncUI()` dans `main.js` appelée à chaque frame par `draw()`.
- `syncUI()` lit `fighterA.weaponStyle` et met à jour le `<select id="weapon-style-select">` uniquement si sa valeur diffère (pas de DOM write inutile).
- Couvre **tous les cas** sans wiring par animation : fin de callback d'animation, logique autoCombat future, `resetFight()`, etc.
- Vérifié : `setWeaponStyle('ranged')` → select passe de `"melee"` à `"ranged"` dès la frame suivante ✅. `resetFight()` → select revient à `"melee"` ✅.

#### 5. Validation utilisateur
*"Okai je valide"* — **`weapon_break` validé (Étape 9 ✅)**. `disarm_attack` + `weapon_break` = 2/5 animations Batch 8 validées.

#### Prochaine étape
**Étape 10** : `weapon_drop` (15f) — le combattant lâche son arme (bras qui s'ouvre, relâchement du weaponSocket).
**Étape 11** : `weapon_lost` (25f) — bras désarticulé, poignet ouvert, weaponSocket retombe.
**Étape 12** : `weapon_fall` (20f) — chute/rebond de l'arme au sol.

---

*Dernière mise à jour : 2026-06-13 — Session 17 — `weapon_break` validé (Batch 8 = 2/5) — tressaillement bras armé 20f, `disarmsOnComplete:true`, `syncUI()` réactif toutes frames.*

---

### SESSION 18 — 2026-06-13 (heure locale)

**Agent** : Claude Sonnet 4.6 (Thinking)
**Déclencheur** : Validation de `weapon_break` par l'utilisateur → implémentation de `weapon_drop` (Étape 10).

#### 1. Implémentation `weapon_drop` (15f, loop:false, disarmsOnComplete:true)
Suite directe de `weapon_break` : le combattant lâche volontairement son arme. `f0` reprend la pose de fin de `weapon_break` (`armUpper_R=-15°`, `armLower_R=-50°`, `weaponSocket=0°`/`scaleX=1`).

**Chorégraphie** :
- **f0 → f5** : le bras armé s'ouvre (`armUpper_R` -15°→20°, `armLower_R` -50°→-90°, `easeOutQuad`), torse part en arrière (-10°).
- **f5 → f8** : `weaponSocket` bascule 0°→85° (`easeInQuad`, effet "gravité") — l'arme glisse hors de la main. Torse continue de s'ouvrir (-15°).
- **f8 → f15** : bras retombe inerte (`armUpper_R`→30°, `armLower_R`→-100°), torse revient à 0° (`easeOutQuad`), tête a une secondary motion (pic +7° à f12 puis retour), bras gauche réagit en équilibre, légers transferts de poids sur `legUpper_L/R` et `hip.x`.

#### 2. Vérification frame par frame (Playwright)
```
f00 : aUR=-15°  aLR=-50°  ws=0°   wsX=1  (pose de fin weapon_break)
f05 : aUR=20°   aLR=-90°  ws=0°   torso=-10°
f08 : aUR=24°   aLR=-95°  ws=85°  torso=-15° (arme glisse, horizontale)
f14 : aUR≈30°   aLR≈-100° ws≈100° torso≈0°  (arme pointe vers le sol)
```
Aucun `NaN`, aucun saut > 90°/frame, `weaponSocket.scaleX` reste à 1 toute l'animation. Captures aux f0/f5/f8/f14 confirment la lecture narrative : arme pointée vers le haut (héritage `weapon_break`) → bascule à l'horizontale (f8, "elle glisse") → pointe vers le sol juste avant de disparaître (f14).

Test `disarmsOnComplete` via le vrai bouton PLAY WEAPON DROP (15 frames) : `weaponStyle: 'unarmed'`, `hasWeapon: false`, panneau droit (`syncUI()`) → "Unarmed" ✅.

#### 3. Correctif systémique — bug de liaison post-désarmement (ranged/thrown/unarmed)
Retour utilisateur : après `weapon_drop`, repasser en `ranged`/`thrown`/`unarmed` via le panneau droit est buggé — l'arme apparaît/disparaît (`hasWeapon` correct) mais le bras/`weaponSocket` reste figé sur la pose `idle` ; il fallait jouer une `weapon_attack_*` pour "réparer" l'état.

**Cause** : `weapon_drop`/`weapon_break` (toute anim `disarmsOnComplete`) enchaînaient sur `'idle'`, qui n'a pas `weaponStyleOverlay: true`. Seul `weapon_idle` relit `fighter.weaponStyle` à chaque frame pour appliquer `WEAPON_HOLD_STYLES` (overlay additif sur `armUpper_R`/`armLower_R`/`weaponSocket`/etc.).

**Fix** (`main.js`, handler du bouton PLAY) :
```js
const nextAnim = (WEAPON_DRAWN_ANIMS.includes(anim) || (animDef && animDef.disarmsOnComplete))
    ? 'weapon_idle' : 'idle';
```
Toute anim `disarmsOnComplete` enchaîne désormais sur `weapon_idle` (overlay actif en permanence) au lieu de `idle`.

**Tests de régression (Playwright)** :
- `weapon_drop` → fin = `weapon_idle`/`unarmed`/`hasWeapon=false`. Switch `ranged` → `armUpper_R≈-40°`, `armLower_R≈-80°`, `weaponSocket≈-20°`, arme réapparaît en pose ranged correcte (capture vérifiée). Switch `thrown` puis retour `unarmed` → conformes à `WEAPON_HOLD_STYLES`.
- `weapon_break` (keyframes non modifiées) → bénéficie du même fix : fin = `weapon_idle`/`unarmed`/`hasWeapon=false` (avant : `idle`, même bug latent non détecté à l'époque).
- `weapon_attack_light` (non-régression) → fin = `weapon_idle`/`melee`/`hasWeapon=true`, comportement inchangé.
- Aucune erreur console sur les 4 scénarios.

#### 4. Validation utilisateur
*"Oui ça règle le problème, je valide."* — **`weapon_drop` validé (Étape 10 ✅)**. `disarm_attack` + `weapon_break` + `weapon_drop` = 3/5 animations Batch 8 validées. `validatedAnims`/`inProgressAnims` mis à jour (`weapon_drop` → vert, `weapon_lost` → rouge).

#### Prochaine étape
**Étape 11** : `weapon_lost` (25f) — réaction de désorientation complète (choc, récupération, settle vers posture unarmed idle).
**Étape 12** : `weapon_fall` (20f) — chute/rebond de l'arme, regard du combattant vers le sol.

---

### SESSION 19 — 2026-06-13 (heure locale)

**Agent** : Claude Sonnet 4.6 (Thinking)
**Déclencheur** : Validation de `weapon_drop` (Session 18) → implémentation de `weapon_lost` (Étape 11).

#### 1. Première tentative `weapon_lost` (REJETÉE)
Implémentation initiale en suivant littéralement la chorégraphie "Choc" suggérée par `PROMPT_CLAUDE_CODE_BATCH8_SUITE.md` (torso -25° + squash scaleX=1.15/scaleY=0.88, head -30°, hip.y -72 à f6). Vérifications Playwright numériques toutes passées (pas de NaN, saut max 12.22°, end-state correct).

**Rejet utilisateur** : *"Je ne valide pas, normalement weapon lost n'est pas forcement a cause d'un coup mais serait plutot car le personage a tribucher en arriere ou l'arme lui a glisser des mains, là tu viens seulement de copier l'animation weapon break, interdiction de copier une animation car tu depenses des tokens pour rien, met ta memoire a jour ainsi qu'un tips a lire dans les priorité dans le continuity et recommence"*

**Cause du rejet** : la chorégraphie "Choc" reproduisait exactement la forme de `weapon_break` (torso+head snap-back + squash sur torso) — même mécanisme (impact) que `weapon_break`, alors que `weapon_lost` représente une perte d'équilibre (trébuchement), pas un nouvel impact.

**Actions correctives** :
- Nouvelle règle ❌ ajoutée dans "Règles qualité absolues" (ci-dessus, § RÈGLES FONDAMENTALES) : interdiction de recycler la forme/squash/timing d'une animation déjà implémentée pour un événement narratif différent — identifier CAUSE + nœud(s) pilote(s) AVANT de dessiner les keyframes.
- Règle ✅ squash amendée : squash & stretch réservé EXCLUSIVEMENT à l'impact.
- Nouvelle mémoire [[feedback-animation-narrative-distinctness]] créée.

#### 2. Redesign `weapon_lost` v2 — trébuchement arrière (25f, loop:false, disarmsOnComplete:true)
**Cause identifiée** : perte d'équilibre (pas d'impact) — privé du contrepoids de l'arme après `weapon_drop`, le combattant trébuche en arrière.
**Nœuds pilotes** : `hip.x` (transfert de poids), `legUpper_R/L` (pas de rattrapage + repositionnement), `armUpper_R/L`+`armLower_R/L` (moulinet symétrique pour l'équilibre). **Aucun squash/stretch** (scaleX/scaleY restent à 1 toute l'animation — contrairement à `weapon_break`).

`f0` reprend la pose de fin de `weapon_drop` (`armUpper_R=30°`, `armLower_R=-100°`, `armUpper_L=10°`, `armLower_L=-20°`, `weaponSocket=100°`).

**Chorégraphie** :
- **f0 → f9 (déséquilibre)** : `hip.x` 0→-18 (`easeOutQuad`), `torso` 0→-12° (bascule progressive, pas de snap), `legUpper_R` 0→-35° (grand pas de rattrapage arrière), `legUpper_L` 0→+20° (contrepoids), les deux bras moulinent symétriquement vers l'arrière (`armUpper_R` 30°→-60°, `armUpper_L` 10°→-50°).
- **f9 → f17 (rattrapage)** : le corps repart vers l'avant avec léger overshoot (`torso` -12°→+6°, `hip.x` -18→+8), jambes se replantent, bras redescendent.
- **f17 → f25 (settle)** : micro-oscillation, `head` en différé ~3f (secondary motion), `weaponSocket` ease vers 0°, posture finale relâchée "unarmed".

#### 3. Vérification frame par frame (Playwright)
```
f00 : torso=0  head=0  hipX=0   hipY=-70  legUpR=0   legUpL=0   | aUR=30  aLR=-100 aUL=10  aLL=-20 | ws=100  (continuité weapon_drop)
f09 : torso=-12 head=-7.5 hipX=-18 hipY=-67 legUpR=-35 legUpL=20 | aUR=-60 aLR=-30  aUL=-50 aLL=-30 | ws=40
f17 : torso=6  head≈0   hipX=8   hipY=-71  legUpR=8   legUpL=-6  | aUR=-5  aLR=-25  aUL=5   aLL=-25 | ws=10
f24 : torso≈0  head≈0   hipX≈0   hipY≈-70  legUpR≈0   legUpL≈0   | aUR≈-10 aLR≈-20  aUL≈10  aLL≈-20 | ws≈0   (playing=false)
```
Aucun `NaN`, saut max inter-frame = 18.89° (< 90°), `scaleX`/`scaleY` = 1 partout (pas de squash).

Test `disarmsOnComplete` via le vrai bouton PLAY WEAPON LOST (25 frames) : `weaponStyle: 'unarmed'`, `hasWeapon: false`, `currentAnim: 'weapon_idle'` ✅. Switch vers `ranged` après coup → `armUpper_R≈-40.4°`, `armLower_R≈-80.15°`, `weaponSocket≈-19.5°`, `weaponVisible: true` (fix Session 18 toujours opérationnel). Aucune erreur console.

Captures aux f0/f6/f14/f18/f24/end_state confirment la lecture narrative : déséquilibre arrière avec bras en moulinet (f6) → rattrapage (f14) → settle quasi-idle (f18/f24), sans aucune sensation d'impact.

#### 4. Validation utilisateur
*"je valide"* — **`weapon_lost` validé (Étape 11 ✅)**. `disarm_attack` + `weapon_break` + `weapon_drop` + `weapon_lost` = 4/5 animations Batch 8 validées. `validatedAnims`/`inProgressAnims` mis à jour (`weapon_lost` → vert, `weapon_fall` → rouge).

#### Prochaine étape
**Étape 12** : `weapon_fall` (20f) — chute/rebond de l'arme au sol, regard du combattant vers le sol. Avant de dessiner les keyframes, appliquer [[feedback-animation-narrative-distinctness]] : identifier la CAUSE (gravité sur l'arme tombée, pas le combattant) et les nœuds pilotes (probablement `weaponSocket`/arme + tête/regard du combattant qui suit l'arme), sans recycler la forme de `weapon_lost`/`weapon_drop`.

---

*Dernière mise à jour : 2026-06-13 — Session 19 — `weapon_lost` validé (Batch 8 = 4/5) — trébuchement arrière (perte d'équilibre, PAS un impact) : transfert de poids hip.x + pas de rattrapage + moulinet symétrique des bras, sans squash ; nouvelle règle qualité ajoutée contre le recyclage de chorégraphie entre animations narrativement distinctes.*

---

### SESSION 20 — 2026-06-13 (heure locale)

**Agent** : Claude Code (Claude Sonnet 4.6)
**Déclencheur** : Directive critique de l'utilisateur — certaines animations ne reflètent pas l'état EN LIVE de l'arme équipée (ex: `step_forward` en `unarmed` ne repasse pas par la pose unarmed). Audit complet demandé, animation par animation, depuis `idle`. Les skills ne sont pas implémentés ici (gérés côté jeu) → placeholders prévus dans les scripts le cas échéant.

#### 1. Mécanisme (rappel, inchangé) + placeholder skills (nouveau)
`Animator.update()` applique additivement `WEAPON_HOLD_STYLES[fighter.weaponStyle]` (table `WEAPON_HOLD_OVERLAY_TARGETS`) à CHAQUE FRAME, sur toute animation flaguée `weaponStyleOverlay: true`. Avant cette session, seul `weapon_idle` portait ce flag — toute autre animation gardait l'arme figée dans sa pose `idle` au moment du dernier `weapon_idle`.

**Placeholder skills (nouveau, Session 20)** : même mécanisme additif ajouté dans `Animator.update()`, relu sur `fighter.skillStyle` via `SKILL_HOLD_STYLES`/`SKILL_HOLD_OVERLAY_TARGETS` (`constants.js`). Les skills ne sont pas implémentés dans ce moteur (gérés côté jeu) → `SKILL_HOLD_STYLES = { none: {} }`, `SKILL_HOLD_OVERLAY_TARGETS = []`, donc cette 2e passe est un no-op tant que le jeu n'y ajoute pas d'entrées. Prêt à fonctionner sans modification du moteur.

#### 2. Groupe 1 — Idle/Locomotion (8/10 validé)
Flag `weaponStyleOverlay: true` ajouté (config seule, aucun changement moteur) à : `idle`, `idle_breathing`, `walk_forward`, `walk_backward`, `step_forward`, `step_backward`, `turn_left`, `turn_right` — **validé par l'utilisateur**.

**Exclus (décision validée)** : `run_forward` / `run_backward` — ces deux animations animent déjà fortement les bras (swing jusqu'à ±50°/-95° pour l'équilibre du sprint) ; superposer l'overlay statique de tenue d'arme créerait un conflit visuel. Le port d'arme en sprint reste un point hors scope de cette passe.

**Hors scope (catégorie distincte)** : `dodge_backward` — n'anime que `hip`/`torso`, aucune piste bras/arme ; non concerné par cette passe.

#### 3. Groupe 2 — `prepare` / `focus` (validé, avec refonte complète)
Flag `weaponStyleOverlay: true` ajouté aux deux (`batch1_prep.js`). En testant l'overlay, la chorégraphie d'origine s'est révélée incohérente ("zombie qui tombe") → refonte complète sur demande explicite de l'utilisateur ("Refaire les deux selon l'intention d'origine").

- **Bras (validé)** : escalade de flexion de garde idle→prepare→focus. `prepare` : `armUpper_L: 10→-2→0` (f0/15/25), `armLower_L: -20→-37→-35` ; `armUpper_R: -10→-22→-20`, `armLower_R: -30→-47→-45`. `focus` : poursuite de la flexion jusqu'à `armUpper_L≈-38°`/`armLower_L≈-45°`, `armUpper_R≈-52°`/`armLower_R≈-55°` (maintenu f15-f40).
- **Jambes (validé "pour le moment", après 2 itérations rejetées)** : posture de garde quasi-statique, pieds quasi fixes. `prepare` : `legUpper_L=legUpper_R: 0→-36°→-30°` (f12/f25), `legLower_L=legLower_R: 0→+57°→+49°`. `focus` : `legUpper=-26°`, `legLower=+42°` (maintenu f15-f40). Valeurs dérivées par IK 2D complet (formules `FX/FY` du pied, cf. `.tmp_ik_solve.cjs`) pour garder le bas du pied quasi fixe en X et Y pendant que `hip.y` descend, **en respectant le sens de flexion naturel du genou** (cf. règle qualité ci-dessous).
- Test Playwright (`.tmp_group2_legs_test.cjs`, 4 styles d'arme × `prepare`/`focus`) : 0 issue, genou max 57° (< 70°), coude max ~113° avec overlay (< 120°), déplacement 2D du pied max 1.2px.

#### 4. Nouvelle règle qualité (issue de 2 rejets consécutifs sur le Groupe 2)
Avant d'écrire toute rotation de membre (genou/coude), vérifier le SENS contre une animation déjà validée exerçant la même articulation dans la même direction anatomique — ex: `step_forward`/`step_backward` utilisent tous deux `legLower=+35°` pour la flexion correcte du genou (peu importe le signe de `legUpper`). Une branche IK à deux solutions doit être choisie via cette convention AVANT tout test/screenshot, pas présentée "pour avis". Ajouté à `docs/continuity.md` §Règles qualité absolues + nouvelle mémoire [[feedback-rotation-direction-check]].

#### 5. Groupe 3 — Attaques mains nues + Combos (12 anims, exclues — validé, 0 edit)
`punch_left`, `punch_right`, `double_punch`, `kick_left`, `kick_right`, `heavy_kick`, `headbutt`, `combo_1..4`, `combo_finisher` : toutes animent `armUpper_R`/`armLower_R` sur leur amplitude complète (ex: `punch_right` -10°→-100°→-10°) — exactement les nœuds ciblés par `WEAPON_HOLD_STYLES`. Le style `unarmed` (cas par défaut) impose un décalage CONSTANT de -32.5°/-57.5° sur ces nœuds : appliquer `weaponStyleOverlay` décalerait tout le swing du coup (ex: pic du punch -100°→-132.5°), cassant la chorégraphie déjà validée ; `thrown` serait pire (+47.5°/+37.5°). **Exclues**, même raisonnement que `run_forward`/`run_backward` (Groupe 1).

#### 6. Groupe 4 — weapon_attack_*/réactions (validé, 0 edit)
- `weapon_attack_light/medium/heavy`, `weapon_critical`, `weapon_combo`, `weapon_combo_crit`, `disarm_attack` (7 anims) : ont déjà `weaponAttackOverlay: true`, mécanisme séparé qui recentre vers la garde "boxeur mains nues" (`WEAPON_ATTACK_UNARMED_OVERLAY`) quand `weaponStyle==='unarmed'` — déjà conscient de l'état en live. RAS.
- `weapon_draw`, `weapon_break`, `weapon_drop`, `weapon_lost` (4 anims déjà validés) : chorégraphient explicitement `weaponSocket` pendant la transition/perte, enchaînent sur `weapon_idle` (fix Session 18). RAS.
- `hit_light`, `hit_heavy`, `ko_back` (seules réactions implémentées ; `hit_medium`/`stagger`/`knockback`/`knockdown`/`ko_front`/etc. pas encore implémentées) : swing `armUpper_R`/`armLower_R` sur toute l'amplitude (mécanisme même de la réaction, ex `ko_back` 0°→110°→-120°) — même conflit que le Groupe 3. **Exclues.**

#### Conclusion de l'audit "état en live de l'arme"
Audit **terminé** pour les 39 animations implémentées : Groupes 1+2 (10 anims, overlay ajouté+validé) + placeholder skills (§1) + Groupe 3 (12 anims exclues) + Groupe 4 (3 réactions exclues, 11 anims armes déjà correctes). Aucune autre catégorie implémentée ne reste à vérifier.

#### 7. `weapon_fall` (Étape 12, Batch 8 = 5/5 ✅) — clôture du Batch 8

**Cause identifiée** (cf. [[feedback-animation-narrative-distinctness]]) : gravité agissant sur l'ARME tombée, pas sur le combattant — ALTERNATIVE narrative à `weapon_lost` (même point de branchement, histoire différente : `weapon_lost` = le combattant trébuche ; `weapon_fall` = le combattant reste stable et regarde son arme tomber au sol).

`f0` reprend la pose de fin de `weapon_drop` (`armUpper_R=30°`, `armLower_R=-100°`, `armUpper_L=10°`, `armLower_L=-20°`, `weaponSocket=100°`, `torso=head=0`, `hip=(0,-70)`) — même point de départ que `weapon_lost`, mais l'issue diverge totalement.

**Convention de rotation vérifiée géométriquement** (cf. [[feedback-rotation-direction-check]]) : l'orientation de l'arme (vecteur hilt→tip, tip = point local (80,0) du node `weapon`, via `globalMatrix.transformPoint`) = somme cumulée `torso + armUpper_R + armLower_R + weaponSocket` (θ), direction monde = `(cos θ, sin θ)`, θ=90° pointant droit vers le bas. Référence `weapon_idle` f0 : θ=-40° → arme pointée haut-avant (garde), vérifié exact contre le vecteur tip-hilt mesuré. `weapon_fall` f0 : θ=30° (héritage `weapon_drop`, arme déjà basculée vers le bas-avant).

Une première tentative (`armLower_R` -100°→+20° en 8f, en plus de `weaponSocket` 100°→180°) donnait θ≈250° en f8 → arme remontant jusqu'à hauteur de tête (tipY=307.7 vs hip≈388), **sens opposé à "l'arme tombe au sol"** — détecté via `getGlobalPos`/géométrie AVANT tout screenshot, puis confirmé visuellement (capture f8 : arme disparaissant vers le coin haut-gauche). **Redesign** : `weaponSocket` devient seul pilote de la chute pendant f0-f10 (100°→154°→165°, θ: 30°→96°→103°), bras quasi figé (`armUpper_R` 30→34°, `armLower_R` -100→-94°), puis "flop" inerte f10-f20 vers le settle de `weapon_lost` (`armUpper_R`→-10°, `armLower_R`→-20°) une fois l'arme au sol, `weaponSocket` 165°→145°→130° (θ reste ~93-104°).

**Chorégraphie validée** :
- **f0 → f8** : `weaponSocket` 100°→154° (`easeInQuad`, accélération de gravité) — θ passe de 30° à 96° (arme quasi verticale, pointe proche du sol). `torso` 0→5°, `head` 0→15° (regard vers l'arme qui tombe, léger décalage temporel sur le pic), `hip.y` -70→-73 (affaissement léger), micro-réactions `legUpper_R/L` (±3°) et bras gauche (`armUpper_L` 10→5°, `armLower_L` -20→-25°), bras droit quasi figé (`armUpper_R` 30→33°, `armLower_R` -100→-96°).
- **f8 → f14** : impact/rebond de l'ARME contre le sol — `weaponSocket.scaleY` 1→0.7 (f10, compression) →1.2 (f13, rebond) →1 (f20), squash localisé sur `weaponSocket` (PAS sur le torse, car le choc concerne l'arme, pas le combattant). `weaponSocket.rotation` 154°→165°→145° (léger overshoot puis retour, θ oscille 96°→103°→103.6°). `torso` 5°→-2°, `head` 15°→5° (retour progressif).
- **f14 → f20** : bras droit retombe inerte (`armUpper_R` 15°→-10°, `armLower_R` -55°→-20°, valeurs cohérentes avec le settle de `weapon_lost`), `weaponSocket`→130° (θ≈100°, arme posée au sol), `head`/`torso`/`hip`/jambes reviennent au neutre (`easeInOutQuad`).

**Vérification géométrique** (distance tip-arme / sol, `foot_R.y≈485`) : f0=52px au-dessus du sol → f2:40 → f4:25 → f6:12 → f8:8 → f10:10 (rebond, léger remonté) → f12:4 → f14/17/20 : -1.8/-3.2/-1.9 (pénétration négligeable de 1-3px sur un segment de 80px ; sans conséquence visuelle car l'arme disparaît à la fin de l'animation via `disarmsOnComplete`).

**Tests Playwright** :
- `.tmp_batch8_weapon_fall.cjs` (table frame-par-frame) : 0 `NaN`, 0 saut > 90°/frame, `weaponSocket.scaleX` stable = 1.
- `.tmp_batch8_weapon_fall_disarm.cjs` (clic réel sur le bouton PLAY WEAPON FALL, 20 frames) : `weaponStyle: 'unarmed'`, `hasWeapon: false`, `currentAnim` = `weapon_idle` (50f, loop, `weaponStyleOverlay:true`), select panneau droit → "Unarmed" ✅ (fix Session 18 toujours opérationnel). Aucune erreur console.
- `.tmp_batch8_weapon_fall_shots.cjs` (captures f0/f8/f10/f12/f14/f20) : confirment la lecture narrative — l'arme bascule d'une inclinaison avant peu marquée (f0) à une orientation quasi verticale pointant vers le sol avec un léger rebond (f8-f14), nettement distincte du trébuchement arrière de `weapon_lost`.

#### Validation utilisateur
*"oui c'est validé"* — **`weapon_fall` validé (Étape 12 ✅)**. Batch 8 = **5/5 validé (40/88)**. `validatedAnims`/`inProgressAnims` mis à jour (`weapon_fall` → vert ajouté en fin de liste, `inProgressAnims` vidé — Batch 9 non encore défini).

#### Prochaine étape
Batch 8 ("Perte d'arme") **terminé** (40/88 animations validées). Batch 9 n'est pas encore spécifié dans les documents de référence — à définir avec l'utilisateur avant de poursuivre l'implémentation.

---

*Dernière mise à jour : 2026-06-13 — Session 20 — Audit "état en live de l'arme" TERMINÉ (39/39 anims implémentées) : Groupe 1 (8/10 idle/locomotion) + Groupe 2 (`prepare`/`focus`, refonte bras+jambes) + placeholder skills, validés ; Groupes 3 (12 anims) et 4-réactions (3 anims) exclus avec justification ; Groupe 4-armes (11 anims) déjà correct. Nouvelles règles : sens de rotation vérifié AVANT edit, investissement amont sur la conception, Map/continuity comme référentiels exhaustifs. Puis `weapon_fall` validé (Étape 12 ✅) — chute/rebond de l'arme piloté par `weaponSocket` (θ cumulé torso+armUpper_R+armLower_R+weaponSocket), bras droit passif, squash localisé sur l'arme. **Batch 8 terminé : 5/5 (40/88)**. Batch 9 à définir.*
