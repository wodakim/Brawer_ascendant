# MISSION : MOTEUR D'ANIMATION BRAWL ASCENDANT
## Prompt complet pour Antigravity — à coller tel quel en premier message

---

## CONTEXTE

Tu travailles sur un moteur de combat 2D inspiré de La Brute, destiné à être exporté en APK Android via WebView.
Le fichier principal est un moteur Canvas 2D pur (aucune dépendance externe, aucun WebGL).

**Chemin racine du projet :**
```
D:\Brawler_ascendant_clear\engine\
```

**Fichier existant :**
```
D:\Brawler_ascendant_clear\engine\moteur_de_combat_et_rigging__3_.html
```

**À IGNORER ABSOLUMENT :**
```
D:\Brawler_ascendant_clear\Mockup\
```

---

## ÉTAPE 0 — AUDIT D'INITIALISATION (OBLIGATOIRE EN PREMIER)

Avant toute action, tu dois :

1. **Lire le fichier HTML existant dans son intégralité** via MCP filesystem.
2. **Extraire et mémoriser** les structures suivantes :
   - `BASE_RIG` (tous les nœuds, leurs dimensions `w`, `h`, pivots `pX`, `pY`, positions `x`, `y`, parent)
   - `ANIMATIONS_LIB` (liste des animations déjà codées avec leurs keyframes réels)
   - `ANIMATION_NAMES` (la liste complète des noms déclarés)
3. **Lister les animations vides** (`tracks: {}`) vs les animations avec keyframes réels.
4. **M'afficher un rapport d'audit** au format suivant avant de commencer quoi que ce soit :

```
=== AUDIT INITIAL ===
Nœuds du rig : [liste]
Animations avec keyframes : [liste]
Animations vides à implémenter : [liste]
Structure des dossiers existante : [liste]
=== FIN AUDIT ===
```

**N'écris pas une seule ligne de code avant que cet audit soit affiché et validé par moi.**

---

## ÉTAPE 1 — CRÉATION DE LA STRUCTURE DE DOSSIERS

Après validation de l'audit, crée la structure suivante via MCP filesystem :

```
D:\Brawler_ascendant_clear\engine\
├── assets\
│   ├── head.svg          ← placeholder vide (sera remplacé)
│   ├── face.svg
│   ├── hair.svg
│   ├── torso.svg
│   ├── arm_upper.svg
│   ├── arm_lower.svg
│   ├── leg_upper.svg
│   ├── leg_lower.svg
│   ├── feet.svg
│   └── weapon.svg
├── fighters\
│   ├── fighterA\
│   │   ├── head.svg
│   │   ├── face.svg
│   │   ├── hair.svg
│   │   ├── torso.svg
│   │   ├── arm_upper.svg
│   │   ├── arm_lower.svg
│   │   ├── leg_upper.svg
│   │   ├── leg_lower.svg
│   │   ├── feet.svg
│   │   └── weapon.svg
│   └── fighterB\
│       ├── (mêmes fichiers)
├── data\
│   ├── animations.json   ← sera généré/mis à jour à chaque batch
│   ├── rig.json
│   └── hitboxes.json
└── moteur_de_combat_et_rigging__3_.html (existant, NE PAS supprimer)
```

**Les SVG placeholders doivent être des SVG valides et minimalistes** :
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
  <rect width="50" height="50" fill="#555" stroke="#fff" stroke-width="1"/>
  <text x="5" y="15" fill="white" font-size="8">SLOT</text>
</svg>
```

Confirme la création de la structure avec un `list_directory` MCP avant de passer à l'étape suivante.

---

## ÉTAPE 2 — RÈGLES D'OR DES ANIMATIONS (LIS AVANT DE CODER LA MOINDRE ANIMATION)

### 2.1 — Système de coordonnées du rig

Le moteur utilise **Canvas 2D avec DOMMatrix hiérarchique**. Les règles sont :

| Axe | Sens |
|-----|------|
| X | Positif = droite |
| Y | Positif = bas (Canvas) |
| Rotation | Positif = horaire (clockwise) |
| ScaleX du root | `1` = face droite, `-1` = retourné (fighter B) |

**Pivots des nœuds (mémorise ces valeurs, elles ne changent jamais) :**

| Nœud | Pivot | Ce que ça signifie |
|------|-------|---------------------|
| torso | pY=60 | pivot en BAS du torse = articulation hanche |
| head | pY=45 | pivot en BAS de la tête = cou |
| armUpper_L/R | pY=10 | pivot en HAUT du bras = épaule |
| armLower_L/R | pY=10 | pivot en HAUT de l'avant-bras = coude |
| legUpper_L/R | pY=5 | pivot en HAUT de la jambe = hanche |
| legLower_L/R | pY=5 | pivot en HAUT du mollet = genou |
| foot_L/R | pY=5 | pivot en HAUT du pied = cheville |
| weaponSocket | — | attaché à armLower_R, suit le poignet |

**Rotations de repos (pose T) :**
- Tous les membres = `rotation: 0` = pointent vers le bas
- Pour un personnage face droite :
  - Bras étendu vers l'avant = `armUpper_R rotation ≈ -90`
  - Bras étendu vers l'arrière = `armUpper_R rotation ≈ +90`
  - Jambe levée vers l'avant = `legUpper rotation négatif (≈ -45)`
  - Jambe levée vers l'arrière = `legUpper rotation positif`
  - Torse penché avant = `rotation positif`
  - Torse penché arrière = `rotation négatif`

### 2.2 — Règles de qualité absolues (violations = refus)

**INTERDIT :**
- ❌ Rotation d'un genou au-delà de `+70°` (hyperextension impossible)
- ❌ Rotation d'un coude au-delà de `+120°` (idem)
- ❌ Une cheville qui "flotte" (foot doit toujours suivre le mollet)
- ❌ La tête qui tourne au-delà de `±90°` sauf KO ou chute
- ❌ Des os qui ne participent PAS à l'animation (tout membre doit au minimum avoir une micro-réaction de secondary motion, même 2-3° de rotation)
- ❌ Une animation avec moins de 3 keyframes par nœud principal actif (sauf utilitaires)
- ❌ Interpolation linéaire sur les impacts (tout impact = easing `easeOutQuad` ou `easeOutElastic`)
- ❌ ScaleX ou ScaleY en dehors de `[0.6, 1.6]` sauf effet comique intentionnel (combo finisher)

**OBLIGATOIRE :**
- ✅ Squash & Stretch sur tout impact (torse se comprime sur les coups reçus)
- ✅ Anticipation avant chaque attaque (retrait du membre avant l'impact)
- ✅ Follow-through après chaque action (le membre dépasse légèrement la position finale puis revient)
- ✅ Secondary motion : quand le torse bouge, les bras suivent avec retard (décalage de 3-5 frames)
- ✅ Les jambes accompagnent toujours le poids du corps
- ✅ La tête suit toujours le torse avec retard (2-3 frames de décalage)

### 2.3 — Format des keyframes (NE PAS dévier de ce format)

```javascript
ANIMATIONS_LIB["nom_animation"] = {
    duration: N,   // Nombre de frames total (60fps target)
    loop: false,   // true uniquement pour idle, walk, run
    tracks: {
        "nomDuNoeud": {
            "propriete": [
                { f: 0,  v: 0,    e: "easeInOutQuad" },
                { f: 10, v: -90,  e: "easeOutQuad"   },
                { f: 20, v: -85,  e: "easeOutElastic" },
                { f: 30, v: 0                         }
                //   ↑ frame   ↑ valeur  ↑ easing optionnel
            ]
        }
    }
};
```

**Propriétés animables :** `x`, `y`, `rotation`, `scaleX`, `scaleY`

**Easings disponibles dans le moteur :**
- `linear`
- `easeInQuad`
- `easeOutQuad`
- `easeInOutQuad`
- `easeOutElastic`

---

## ÉTAPE 3 — WORKFLOW D'IMPLÉMENTATION PAR BATCH

### RÈGLE FONDAMENTALE DU WORKFLOW

```
Pour chaque batch :
  1. Annonce le batch et les animations qu'il contient
  2. Code TOUTES les animations du batch dans le HTML (via MCP write)
  3. Relis le fichier via MCP read pour vérifier la syntaxe
  4. Affiche un résumé des keyframes implémentés (durée, nœuds animés, valeurs min/max)
  5. Demande : "BATCH [N] terminé. Valides-tu visuellement ce batch avant de continuer ?"
  6. ATTENDS MA RÉPONSE avant de passer au batch suivant
  7. Si je dis "OK" → batch suivant
  8. Si je dis "corrige X" → applique la correction, re-audit MCP, redemande validation
  9. Si je dis "passe" → note le batch comme à revoir plus tard, continue
```

**NE JAMAIS enchaîner deux batchs sans validation intermédiaire.**

---

## ÉTAPE 4 — LES BATCHS D'ANIMATIONS

Les animations marquées ✅ ont DÉJÀ des keyframes dans le fichier. **Ne pas les réécrire**, sauf si je demande une correction.

---

### BATCH 1 — Respiration & Préparation
*Lien : toutes dérivées de `idle`. Commencer par lire idle pour en hériter le rythme.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `idle` | ✅ | 60f | ✅ |
| `idle_breathing` | ✅ | 80f | ❌ |
| `prepare` | ❌ | 25f | ❌ |
| `focus` | ❌ | 40f | ❌ |

**`idle_breathing`** : Amplification de l'idle. Torse monte/descend plus, épaules s'élèvent, tête bascule légèrement en arrière au sommet de l'inspiration.  
**`prepare`** : Transition depuis idle vers la garde. Légère flexion des genoux, torse incliné vers l'avant, bras se lèvent en garde.  
**`focus`** : Personnage se concentre. Torse se stabilise, légère inclinaison de la tête, bras resserrent la garde. Micro-tremblements.

---

### BATCH 2 — Locomotion Avant/Arrière
*Lien : `walk_forward` déjà fait. Dériver les variantes directement.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `walk_forward` | ✅ | 40f | ✅ |
| `walk_backward` | ✅ | 44f | ❌ |
| `run_forward` | ✅ | 28f | ❌ |
| `run_backward` | ✅ | 32f | ❌ |
| `step_forward` | ❌ | 18f | ❌ |
| `step_backward` | ❌ | 18f | ❌ |
| `turn_left` | ❌ | 12f | ❌ |
| `turn_right` | ❌ | 12f | ❌ |

**`walk_backward`** : Walk_forward miroir avec inclinaison du torse légèrement vers l'arrière, pas raccourcis.  
**`run_forward`** : Oscillation hip plus prononcée (+15px), bras pliés à 90° qui pompent énergiquement, légère inclinaison du torse vers l'avant.  
**`step_forward/backward`** : Un seul pas rapide sans cycle complet. Utile pour ajuster la distance en combat.  
**`turn_left/right`** : Pivot court, scaleX du root interpolé de 1 à -1 (ou inverse) sur 12 frames avec une légère compression du torse au milieu (squash au point de pivot).

---

### BATCH 3 — Coups de poing
*Lien : `punch_right` déjà fait. En dériver les variantes.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `punch_right` | ❌ | 30f | ✅ |
| `punch_left` | ❌ | 30f | ❌ |
| `double_punch` | ❌ | 45f | ❌ |
| `headbutt` | ❌ | 28f | ❌ |

**`punch_left`** : Miroir de punch_right (bras opposé, rotation torse inversée).  
**`double_punch`** : punch_right (frames 0-18) → punch_left (frames 18-40). Le torse oscille entre les deux.  
**`headbutt`** : Torse se penche en avant rapidement (+40°), tête suit avec retard (+20° supplémentaire), puis retour avec follow-through.

---

### BATCH 4 — Kicks
*Lien : même dynamique hanche que walk, mais amplifiée.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `kick_right` | ❌ | 35f | ❌ |
| `kick_left` | ❌ | 35f | ❌ |
| `heavy_kick` | ❌ | 45f | ❌ |

**`kick_right`** : Anticipation (legUpper_R vers l'arrière, +20°), extension rapide vers l'avant (-80°), follow-through (-95°), retour. Le hip monte légèrement, le bras opposé se lève pour l'équilibre.  
**`kick_left`** : Miroir.  
**`heavy_kick`** : Rotation complète du hip, jambe étendue en arc (+/-100°), impact avec scaleX du torse comprimé (squash latéral), suivi d'un repositionnement plus lent.

---

### BATCH 5 — Combo Chain
*Lien : animations qui s'enchaînent. Les coder dans l'ordre de la chaîne pour garder la cohérence.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `combo_1` | ❌ | 22f | ❌ |
| `combo_2` | ❌ | 22f | ❌ |
| `combo_3` | ❌ | 22f | ❌ |
| `combo_4` | ❌ | 22f | ❌ |
| `combo_finisher` | ❌ | 50f | ❌ |

**Règle des combos** : Chaque combo commence là où le précédent se termine. La pose de départ de `combo_2` = la pose de fin de `combo_1`.  
Alterner droite/gauche/droite/kick pour varier. Le `combo_finisher` est un coup lourd avec squash & stretch exagéré (scaleY 1.3 au moment de l'impact), recul de l'adversaire simulé par un hip-push vers l'avant.

---

### BATCH 6 — Arme : Dégainer & États
*Lien : weaponSocket et weapon nodes doivent être explicitement animés.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `weapon_draw` | ❌ | 35f | ❌ |
| `weapon_idle` | ✅ | 50f | ❌ |

**`weapon_draw`** : Le bras droit va chercher l'arme (derrière le dos ou à la ceinture via hip). Mouvement fluide, l'arme apparaît dans weaponSocket à mi-chemin.  
**`weapon_idle`** : Idle avec l'arme tenue. Légère oscillation du poignet (armLower_R), arme qui se balance doucement (weaponSocket rotation ±5°).

---

### BATCH 7 — Arme : Attaques
*Lien : dériver des keyframes du bras armé. L'arme suit le poignet.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `weapon_attack_light` | ❌ | 28f | ❌ |
| `weapon_attack_medium` | ❌ | 35f | ❌ |
| `weapon_attack_heavy` | ❌ | 50f | ❌ |
| `weapon_combo` | ❌ | 40f | ❌ |
| `weapon_critical` | ❌ | 60f | ❌ |

**Règle** : L'arme amplifie le bras mais ne dépasse pas `weaponSocket rotation: ±30°` (elle ne se retourne pas).  
**`weapon_critical`** : Mise en scène complète — anticipation lente (frames 0-20), pause d'un frame, impact ultrarapide (1-2 frames), onde de choc (scaleX du torse comprimé), suivi d'un retrait lent.

---

### BATCH 8 — Perte d'arme
*Lien : séquence naturelle après weapon_break ou disarm.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `disarm_attack` | ❌ | 30f | ❌ |
| `weapon_break` | ❌ | 20f | ❌ |
| `weapon_drop` | ❌ | 15f | ❌ |
| `weapon_lost` | ❌ | 25f | ❌ |
| `weapon_fall` | ❌ | 20f | ❌ |

**`disarm_attack`** : Coup qui cible le poignet adverse. Bras part latéralement, mouvement rapide.  
**`weapon_break`** : Tressaillement violent du bras armé (rotation rapide ±30° en 3 frames). Weapon node peut avoir un scaleX négatif bref.  
**`weapon_lost`** : Bras désarticulé, poignet ouvert, weaponSocket retombe.

---

### BATCH 9 — Lancer d'arme
*Lien : préparation → lancer → suivi (séquence linéaire).*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `throw_prepare` | ❌ | 20f | ❌ |
| `throw_weapon` | ❌ | 15f | ❌ |
| `throw_followthrough` | ❌ | 20f | ❌ |
| `catch_weapon` | ❌ | 18f | ❌ |

**`throw_prepare`** : Bras armé tire vers l'arrière, torse se tord, jambe avant se stabilise.  
**`throw_weapon`** : Libération explosive. Bras part vers l'avant (-110°), weaponSocket suit avec `easeOutElastic`. L'arme devient invisible à mi-animation (elle est "lancée").  
**`catch_weapon`** : Bras tendu vers l'avant, légère flexion du genou à la réception, arme réapparaît dans weaponSocket.

---

### BATCH 10 — Défense & Contre
*Lien : animations qui partagent une posture de garde.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `block` | ❌ | 15f | ❌ |
| `shield_block` | ❌ | 12f | ❌ |
| `parry` | ❌ | 20f | ❌ |
| `counter_stance` | ❌ | 18f | ❌ |
| `counter_attack` | ❌ | 30f | ❌ |

**`block`** : Bras se croisent devant le torse, légère flexion des genoux, torse incliné.  
**`parry`** : Un seul bras intercepte — rotation rapide de armUpper_R + armLower_R vers l'extérieur puis retour.  
**`counter_stance`** : Pose intermédiaire — légère rotation du torse, bras en position de riposte.  
**`counter_attack`** : Enchaîne depuis counter_stance. Coup rapide et puissant.

---

### BATCH 11 — Esquives
*Lien : toutes les esquives modifient la hip position et le torse.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `dodge_left` | ❌ | 25f | ❌ |
| `dodge_right` | ❌ | 25f | ❌ |
| `sidestep` | ❌ | 18f | ❌ |
| `duck` | ❌ | 20f | ❌ |
| `jump_evade` | ❌ | 35f | ❌ |
| `backflip` | ❌ | 45f | ❌ |

**`dodge_left/right`** : Hip x bouge de ±60px en arc. Torse s'incline dans la direction. Jambes accompagnent.  
**`duck`** : Hip y descend de -40px (personnage s'accroupit). Torse se penche en avant. Genoux fléchissent.  
**`jump_evade`** : Hip y monte de -100px (saut), rotation légère du torse en l'air, atterrissage avec squash (scaleY torse = 0.85 à l'impact), rebond vers la hauteur normale.  
**`backflip`** : Hip recule (-80x) ET monte (-120y), torse tourne à -360° en 35 frames, atterrissage propre.

---

### BATCH 12 — Réactions légères
*Lien : `hit_light` déjà fait. Dériver hit_medium et variantes.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `hit_light` | ❌ | 25f | ✅ |
| `hit_medium` | ❌ | 30f | ❌ |
| `stagger` | ❌ | 40f | ❌ |
| `knockback` | ❌ | 35f | ❌ |

**`hit_medium`** : Plus de recul que hit_light. Hip recule de -25px. Torse se plie à -45°. Tête claque à -60°.  
**`stagger`** : Série de micro-tressaillements du torse (±15° en zigzag sur 5 frames × 4), jambes instables.  
**`knockback`** : Gros recul. Hip recule de -50px sur 8 frames. Torse presque horizontal (-70°). Jambe avant se lève.

---

### BATCH 13 — Réactions lourdes & Chutes
*Lien : `hit_heavy` déjà fait. Enchaîner vers les chutes.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `hit_heavy` | ❌ | 40f | ✅ |
| `fall_front` | ❌ | 45f | ❌ |
| `fall_back` | ❌ | 45f | ❌ |
| `trip` | ❌ | 35f | ❌ |
| `knockdown` | ❌ | 50f | ❌ |

**`fall_front`** : Torse bascule vers l'avant (+90° final), genoux lâchent, personnage s'écrase face en avant. Rebond bref à l'impact.  
**`fall_back`** : Miroir de fall_front. Torse part en arrière (-90°).  
**`trip`** : Un pied accroche, jambe avant part en avant trop loin, personnage part de côté. Moins spectaculaire que fall.  
**`knockdown`** : Chute contrôlée avec rotation complète du corps. Le hip descend à `y: 0` (sol = position hip initiale).

---

### BATCH 14 — KO
*Lien : `ko_back` déjà fait. Coder les variantes.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `ko_back` | ❌ | 60f | ✅ |
| `ko_front` | ❌ | 60f | ❌ |
| `ko_spin` | ❌ | 55f | ❌ |
| `ko_airborne` | ❌ | 70f | ❌ |

**`ko_front`** : KO vers l'avant. Torse +90° final. Tête claque en dernier.  
**`ko_spin`** : Coup qui fait tourner. Hip x recule fortement, torse fait une rotation de -180° sur 30 frames, puis chute normale.  
**`ko_airborne`** : Le personnage est projeté en l'air (hip y monte à -200px), fait un demi-tour en l'air, atterrit violemment avec rebond.

---

### BATCH 15 — Relevé
*Lien : séquence naturelle après KO.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `stand_up` | ❌ | 50f | ❌ |
| `recover` | ❌ | 30f | ❌ |

**`stand_up`** : Depuis la position au sol (torse ≈ -90°), le personnage se relève progressivement. Genoux se plient d'abord, torse se redresse, bras s'appuient. Doit enchaîner naturellement depuis ko_back.  
**`recover`** : Shake rapide du personnage qui reprend sa garde. Micro-tressaillements, puis stabilisation.

---

### BATCH 16 — Coups Critiques
*Lien : mise en scène spéciale, La Brute-style.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `critical_prepare` | ❌ | 30f | ❌ |
| `critical_attack` | ❌ | 40f | ❌ |
| `critical_finish` | ❌ | 35f | ❌ |

**Style** : Mouvement intentionnellement exagéré. La phase de préparation est visible et menaçante (torse qui se contracte, scaleY = 0.9). L'impact est ultrarapide (1-2 frames au max). La finition montre le personnage qui revient en position avec style.

---

### BATCH 17 — Compétences Spéciales
*Lien : animations génériques utilisées pour les skills.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `special_skill` | ❌ | 40f | ❌ |
| `special_cast` | ❌ | 35f | ❌ |
| `special_release` | ❌ | 30f | ❌ |

**`special_skill`** : Posture de déclenchement. Torse se contracte, bras se tendent légèrement vers l'avant.  
**`special_cast`** : Chargement. Bras se lèvent progressivement, torse s'incline, légère vibration.  
**`special_release`** : Libération explosive. Mouvement de push vers l'avant, suivi d'un repositionnement.

---

### BATCH 18 — Animaux / Invocations
*Lien : séquence d'apparition → combat → mort de l'animal.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `pet_spawn` | ❌ | 30f | ❌ |
| `pet_entry` | ❌ | 25f | ❌ |
| `pet_attack` | ❌ | 28f | ❌ |
| `pet_hit` | ❌ | 20f | ❌ |
| `pet_death` | ❌ | 40f | ❌ |

**Note** : Ces animations appartiennent au maître (le fighter). `pet_spawn` = le personnage fait un geste d'invocation. Le pet lui-même sera géré séparément. L'accent est sur la réaction du fighter, pas sur le pet.

---

### BATCH 19 — Victoire
*Lien : animations festives, loop courte.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `victory` | ✅ | 60f | ❌ |
| `victory_weapon` | ✅ | 70f | ❌ |
| `victory_taunt` | ❌ | 50f | ❌ |
| `victory_celebration` | ✅ | 80f | ❌ |

**Style** : Énergie positive, personnage vivant et expressif. Sauts optionnels (hip y), bras levés, tête qui se balance.

---

### BATCH 20 — Défaite & Utilitaires
*Lien : animations finales de session.*

| Animation | Loop | Durée cible | Déjà fait |
|-----------|------|-------------|-----------|
| `defeat_idle` | ✅ | 60f | ❌ |
| `defeat_fall` | ❌ | 45f | ❌ |
| `spawn` | ❌ | 30f | ❌ |
| `despawn` | ❌ | 25f | ❌ |
| `enter_arena` | ❌ | 50f | ❌ |
| `exit_arena` | ❌ | 40f | ❌ |
| `taunt` | ❌ | 55f | ❌ |

**`enter_arena`** : Personnage arrive avec swagger. Hip qui oscille légèrement, bras décontractés, tête assurée.  
**`taunt`** : Provocation. Geste de la main vers soi, torse penché en arrière, expression body-language arrogante.

---

## ÉTAPE 5 — MISE À JOUR DU HTML APRÈS CHAQUE BATCH

Pour chaque batch, la procédure MCP est :

```
1. MCP read_file → moteur_de_combat_et_rigging__3_.html
2. Localiser le bloc ANIMATIONS_LIB dans le fichier
3. Remplacer les entrées vides { duration: 30, loop: false, tracks: {} }
   par les nouvelles définitions avec keyframes
4. MCP write_file → même fichier
5. MCP read_file à nouveau → vérifier que les keyframes sont bien écrits
6. Extraire et afficher : liste des nœuds animés, durées, valeurs min/max de rotation
7. Écrire aussi dans D:\Brawler_ascendant_clear\engine\data\animations.json
   la version JSON standalone du batch
```

**NE JAMAIS réécrire le fichier en entier.** Uniquement patch chirurgical des entrées concernées.

---

## ÉTAPE 6 — VALIDATION FINALE GLOBALE

Après le dernier batch validé :

1. MCP read_file → fichier HTML
2. Vérifier que TOUTES les entrées de `ANIMATION_NAMES` ont des `tracks` non vides
3. Générer un rapport :

```
=== AUDIT FINAL ===
Animations complètes (tracks non vides) : X/70
Animations restantes vides : [liste]
Durée totale de toutes les animations (en frames) : X
Nœuds les plus utilisés : [liste avec nombre d'occurrences]
Animations loop : [liste]
Animations one-shot : [liste]
=== FIN AUDIT FINAL ===
```

4. Export du `animations.json` final dans `D:\Brawler_ascendant_clear\engine\data\`

---

## RÉSUMÉ DE LA SÉQUENCE COMPLÈTE

```
[AUDIT INITIAL] → validation
[CRÉATION DOSSIERS] → confirmation MCP
[BATCH 1 : Respiration] → validation visuelle
[BATCH 2 : Locomotion] → validation visuelle
[BATCH 3 : Poings] → validation visuelle
[BATCH 4 : Kicks] → validation visuelle
[BATCH 5 : Combos] → validation visuelle
[BATCH 6 : Arme états] → validation visuelle
[BATCH 7 : Arme attaques] → validation visuelle
[BATCH 8 : Perte arme] → validation visuelle
[BATCH 9 : Lancer] → validation visuelle
[BATCH 10 : Défense] → validation visuelle
[BATCH 11 : Esquives] → validation visuelle
[BATCH 12 : Réactions légères] → validation visuelle
[BATCH 13 : Réactions lourdes] → validation visuelle
[BATCH 14 : KO] → validation visuelle
[BATCH 15 : Relevé] → validation visuelle
[BATCH 16 : Critiques] → validation visuelle
[BATCH 17 : Spéciaux] → validation visuelle
[BATCH 18 : Animaux] → validation visuelle
[BATCH 19 : Victoire] → validation visuelle
[BATCH 20 : Défaite & Utilitaires] → validation visuelle
[AUDIT FINAL] → rapport complet
```

**La vie de ce projet dépend de ne jamais sauter une validation.**
