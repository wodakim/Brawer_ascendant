# PROMPT CLAUDE CODE — BATCH 8 SUITE : weapon_drop / weapon_lost / weapon_fall

---

## 1. CONTEXTE DU PROJET

**Brawler Ascendant** — moteur d'animation de combat 2D Canvas, vanilla JS (ES Modules natifs, aucun framework, aucun bundler).
Cible finale : export APK Android via WebView.
Inspiration : La Brute.

**Workspace** : `D:\Brawler_ascendant_clear\`
**Point d'entrée** : `engine/moteur_de_combat_et_rigging.html` — uniquement du HTML épuré qui charge `src/main.js` en module. **Règle d'or : interdiction absolue d'ajouter du code JS ou CSS directement dans le fichier HTML.**
**Sandbox** : `http://localhost:8321/engine/moteur_de_combat_et_rigging.html`

---

## 2. SOURCES DE VÉRITÉ — À LIRE EN PREMIER (PRIORITÉ ABSOLUE)

Avant toute action, lire impérativement :
- `d:\Brawler_ascendant_clear\docs\continuity.md` — journal complet de traçabilité (1100+ lignes)
- `d:\Brawler_ascendant_clear\docs\Map.md` — index de l'architecture modulaire

Ces deux fichiers **doivent être mis à jour à chaque validation d'étape**. C'est une règle non-négociable établie avec l'utilisateur.

---

## 3. HISTORIQUE — LE REFACTORING MODULAIRE (SESSION 15)

Le projet a démarré comme un **fichier HTML monolithique de ~2800 lignes** mélangeant UI, moteur, rendu et données d'animations. Ce design rendait impossible le travail d'un LLM (saturation de contexte après quelques échanges).

### Ce qui a été fait (Session 15)
En Session 15, l'ensemble du projet a été **refactorisé en ES Modules** selon l'architecture suivante :

```
engine/src/
├── main.js                    ← Orchestration, boucle de jeu, UI debug
├── config/
│   ├── baseRig.js             ← Définition du squelette (BASE_RIG, 20 nœuds)
│   └── constants.js           ← ANIMATION_NAMES (89), Easing, WEAPON_HOLD_STYLES, WEAPON_DRAWN_ANIMS
├── core/
│   ├── Node.js                ← Matrices hiérarchiques, AABB, pivots
│   ├── Skeleton.js            ← Cinématique directe, ancrage sol dynamique
│   ├── Animator.js            ← Interpolation keyframes, overlays d'armes, impactFrame
│   ├── Fighter.js             ← États, HP, IA combat, checkHit, setWeaponStyle
│   └── skinUtils.js           ← SVG deterministes
├── render/
│   └── canvasRender.js        ← Rendu canvas, HUD, hitboxes réactives
└── data/
    ├── animations.js          ← Agrégateur (fusionne tous les batchs en ANIMATIONS_LIB)
    └── animations/
        ├── index.js           ← Re-export de tous les batchs
        ├── baseAnims.js       ← idle, walk_forward, punch_right, hit_light, hit_heavy, ko_back
        ├── batch1_prep.js     ← idle_breathing, prepare, focus
        ├── batch2_locomotion.js
        ├── batch3_punches.js
        ├── batch4_kicks.js
        ├── batch5_combos.js
        ├── batch6_weapon_states.js
        ├── batch7_weapon_attacks.js
        └── batch8_disarm.js   ← ← ← FICHIER À COMPLÉTER
```

### Résultat de la validation (0 régression)
Après le refactoring, un script Playwright de validation géométrique a comparé les 35 animations existantes avant/après, **nœud par nœud, frame par frame, sur les 2 combattants** → **0 divergence détectée** (précision 0.001 pixel). Le refactoring est donc transparent et stable.

### Pourquoi c'est important pour toi
- Tu n'as **jamais besoin d'ouvrir le fichier HTML** ni les fichiers `core/`. Tout ton travail se fait dans **`batch8_disarm.js`** (données d'animations) et **`main.js`** (listes de couleurs des boutons).
- Pour ajouter une nouvelle animation, il suffit de l'ajouter dans l'objet `export const batch8 = { ... }` dans `batch8_disarm.js`. Elle est automatiquement importée dans `ANIMATIONS_LIB` via `index.js` → `animations.js`.

---

## 4. MÉTHODOLOGIE DE TRAVAIL (RÈGLES NON-NÉGOCIABLES)

Ces règles ont été **établies et validées explicitement avec l'utilisateur** au fil des sessions. Les violer entraînera un rejet immédiat.

### 4.1 Une animation à la fois
- Coder une animation → tester → présenter → attendre la validation explicite de l'utilisateur → passer à la suivante.
- **Ne jamais livrer plusieurs animations d'un coup sans validation intermédiaire.**

### 4.2 Mise à jour obligatoire après chaque validation
Après chaque "je valide" de l'utilisateur :
1. Mettre à jour `docs/continuity.md` (session, ce qui a été fait, validation, prochaine étape)
2. Mettre à jour `docs/Map.md` (statut de l'animation : ✅ ou 🔴)
3. Mettre à jour `main.js` : déplacer l'animation de `inProgressAnims` (rouge) vers `validatedAnims` (vert), et mettre la suivante en rouge

### 4.3 Code couleur des boutons PLAY
Dans `main.js`, ligne ~177 :
```js
const validatedAnims = [..., "disarm_attack", "weapon_break"]; // vert
const inProgressAnims = ["weapon_drop"]; // rouge = en cours
```
- **Vert** (`#2e7d32`) = validé par l'utilisateur
- **Rouge** (`#c62828`) = en cours de travail
- **Bleu** (défaut) = pas encore commencé

### 4.4 Tests multi-frames obligatoires
L'utilisateur a **rejeté** une première version de `disarm_attack` car elle ressemblait à un "simple punch" sans tests sur plusieurs frames. Toujours :
- Tester frame par frame les poses-clés dans le navigateur via Playwright
- Vérifier la lisibilité narrative de l'animation (pas un mouvement générique)
- Présenter les valeurs numériques des nœuds aux frames clés

### 4.5 Ne jamais modifier les animations déjà validées
`disarm_attack` et `weapon_break` sont validés. Ne pas y toucher.

---

## 5. ÉTAT ACTUEL — BATCH 8

Fichier : `d:\Brawler_ascendant_clear\engine\src\data\animations\batch8_disarm.js`

| Animation | Statut | Détails |
|-----------|--------|---------|
| `disarm_attack` | ✅ validé | 30f, `weaponAttackOverlay:true`, `impactFrame:12`. Frappe overhead descendante ciblant `hand_R` adverse. 0 collision prématurée f0-f11 |
| `weapon_break` | ✅ validé | 20f, `disarmsOnComplete:true`. Tressaillement violent du bras armé (±30° en 3f), `weaponSocket.scaleX=-1` au pic (f3), oscillation amortie, bras retombant. Panel droit `syncUI()` réactif |
| `weapon_drop` | 🔴 à faire | 15f |
| `weapon_lost` | 🔴 à faire | 25f |
| `weapon_fall` | 🔴 à faire | 20f |

---

## 6. ARCHITECTURE DU SYSTÈME D'ANIMATION

### Format des keyframes
```js
animationName: {
    duration: <frames>,    // Durée totale
    loop: <boolean>,
    disarmsOnComplete: true, // OPTIONNEL — déclenche setWeaponStyle('unarmed') à la fin via main.js
    weaponAttackOverlay: true, // OPTIONNEL — active l'overlay d'arme + checkHit() à impactFrame
    impactFrame: <frame>,  // OPTIONNEL — frame où checkHit() est appelé (si weaponAttackOverlay)
    tracks: {
        <nodeName>: {
            rotation: [{f: <frame>, v: <degrés>, e: '<easing>'}],
            x:        [...],  // offset en px
            y:        [...],
            scaleX:   [...],
            scaleY:   [...]
        }
    }
}
```

### Noeuds disponibles (ordre hiérarchique)
```
root → hip → torso → head, face, hair
             hip  → legUpper_L/R → legLower_L/R → foot_L/R
             torso → armUpper_L/R → armLower_L/R → hand_L/R
                     armLower_R → weaponSocket → weapon
```

### Pivots clés (origine de rotation de chaque nœud)
| Nœud | pX | pY | Signification |
|------|----|----|---------------|
| torso | 25 | 60 | bas du torse = hanche |
| head | 25 | 45 | bas = cou |
| armUpper_L/R | 10/4 | 10/0 | haut = épaule |
| armLower_L/R | 9 | 10 | haut = coude |
| weaponSocket | 5 | 5 | attaché à armLower_R |

### Valeurs de référence (pose idle/weapon_idle, style melee)
- `hip.y = -70` (bassin au-dessus du sol)
- `armUpper_R rotation ≈ -10°`, `armLower_R ≈ -30°`
- `armUpper_L rotation ≈ +10°`, `armLower_L ≈ -20°`
- `weaponSocket.scaleX = 1` normalement

### Easings disponibles
`'linear'`, `'easeInQuad'`, `'easeOutQuad'`, `'easeInOutQuad'`, `'easeInCubic'`, `'easeOutCubic'`, `'easeInOutCubic'`, `'easeOutElastic'`, `'easeOutBounce'`

### Règles de qualité absolues
- ❌ `< 3` keyframes par nœud principal actif
- ❌ Interpolation linéaire sur un impact/choc
- ❌ ScaleX/Y hors `[0.6, 1.6]` sauf effet comique
- ❌ Os inanimés — tout os doit avoir une micro-réaction
- ✅ Squash & Stretch sur tout impact
- ✅ Anticipation avant action principale
- ✅ Follow-through après action
- ✅ Secondary motion (décalage 3-5f entre membres)

---

## 7. ACQUIS TECHNIQUES DU PROJET

### `disarmsOnComplete`
Propriété définie sur l'objet animation dans `batch8_disarm.js`. Dans `main.js`, le handler du bouton PLAY vérifie :
```js
if (ANIMATIONS_LIB[anim] && ANIMATIONS_LIB[anim].disarmsOnComplete) {
    fighterA.setWeaponStyle('unarmed');
}
```
`weapon_drop`, `weapon_lost` et `weapon_fall` doivent **toutes** avoir `disarmsOnComplete: true`.

### `syncUI()` — panneau droit réactif
`main.js` appelle `syncUI()` à chaque frame dans `draw()`. Cette fonction lit `fighterA.weaponStyle` et met à jour le `<select id="weapon-style-select">` du panneau droit si la valeur diffère. Résultat : **tout changement d'état programmatique (fin d'animation, reset, logique de combat) se reflète automatiquement dans le panneau** — aucun wiring manuel nécessaire.

### `WEAPON_DRAWN_ANIMS` (dans `constants.js`)
Liste des animations qui nécessitent une arme en main ET qui enchaînent sur `weapon_idle` (pas `idle`) à la fin. `weapon_drop`, `weapon_lost` et `weapon_fall` **ne sont PAS** dans cette liste (le combattant n'a plus d'arme après).

### `Fighter.setWeaponStyle(style)`
`'unarmed' | 'melee' | 'ranged' | 'thrown'`. Met à jour `weaponStyle` ET appelle `equipWeapon(style !== 'unarmed')` (cache/affiche le nœud `weapon`).

### Expositions globales pour les tests
`main.js` expose sur `window` : `fighterA`, `fighterB`, `ANIMATIONS_LIB`, `resetFight()`, `engineOptions` (dont `engineOptions.paused`). Utilisables directement dans la console browser ou via Playwright.

### Hitbox réactive
`engineOptions.showReactiveHitbox` — activé par défaut. Marque les bouts de l'arme/poings en cyan et les AABB torse/tête de la cible en rouge si contact. Utile pour valider que les animations d'attaque (pas concerné ici, mais bon à savoir).

---

## 8. SPECS DES ANIMATIONS À IMPLÉMENTER

### Étape 10 : `weapon_drop` (15f, loop:false, disarmsOnComplete:true)
**Scénario** : Après `weapon_break`, le combattant lâche volontairement son arme. Le bras s'ouvre, le weaponSocket pivote vers le bas libérant l'arme.

**Chorégraphie suggérée** :
- **f0 → f5** : Bras armé (droit) descend lentement (armUpper_R de -15° → +20°, easeOutQuad), avant-bras s'effondre (armLower_R de -50° → -90°). Légère inclinaison du torse en arrière (-10°).
- **f5 → f8** : `weaponSocket` tombe vers le bas (+60° à +90°, easeInQuad) — l'arme glisse hors de la main. Torse continue de s'ouvrir (-15°).
- **f8 → f15** : Bras retombe inerte (armUpper_R → +30°, armLower_R → -100°). Torse reprend la verticalité (retour à 0°, easeOutQuad). Settle doux, secondary motion sur la tête (+5° puis retour). Bras gauche réagit en équilibre.

---

### Étape 11 : `weapon_lost` (25f, loop:false, disarmsOnComplete:true)
**Scénario** : Réaction de désorientation complète après la perte d'arme — bras désarticulé, chancelant, le combattant reprend son équilibre sans arme.

**Chorégraphie suggérée** :
- **f0 → f6** : Choc — torse s'incline fortement en arrière (-25°, squash scaleX=1.15/scaleY=0.88). Bras droit complètement écartelé (armUpper_R → +45°). Tête part en arrière (-30°). Hip descend légèrement (-72).
- **f6 → f14** : Tentative de récupération — torse remonte progressivement. Bras droit commence à redescendre (armUpper_R → 0°). Bras gauche s'écarte pour l'équilibre (+30°). Genoux fléchissent légèrement (legUpper_L +10°, legUpper_R -10°).
- **f14 → f25** : Settle vers posture "unarmed idle" — bras ballants des deux côtés, torse droit, micro-oscillation finale (torse ±5°, tête ±3°) avant le repos. armUpper_R → -10°, armUpper_L → +10°.

---

### Étape 12 : `weapon_fall` (20f, loop:false, disarmsOnComplete:true)
**Scénario** : La chute/rebond de l'arme (weaponSocket tombe avec le bras). Corps toujours en mode "vide" — le combattant regarde son arme tomber.

**Chorégraphie suggérée** :
- **f0 → f8** : weaponSocket rotation accélère de 0° → +180° (easeInQuad — gravité). Bras droit suit passivement (armUpper_R → +45°, armLower_R → +20°). Hip descend légèrement (-73). Tête s'incline vers le bas (head +15°, regard vers l'arme).
- **f8 → f10** : Impact au sol — weaponSocket.scaleY comprimé (0.7, 2f), puis rebond (scaleY → 1.2, puis 1.0). weaponSocket.rotation stoppée à ~185°.
- **f10 → f20** : Bras retombe inerte. Petite oscillation du socket (185° → 175° → 180°, easeOutBounce). Corps retrouve l'équilibre (torse 0°, head 5° → 0°, hip -70). armUpper_R settle à -10°.

---

## 9. PATTERN DE TEST PLAYWRIGHT (FRAME PAR FRAME)

Pour chaque animation, après l'avoir codée :

```js
// Dans la console browser (ou via Playwright evaluate)
resetFight();
fighterA.setWeaponStyle('melee'); // Démarre avec l'arme en main
engineOptions.paused = true;
fighterA.animator.play('weapon_drop'); // Remplacer par l'animation testée

// Avancer frame par frame et inspecter
const results = [];
for (let f = 0; f < 16; f++) {  // Adapter à la durée
    fighterA.update(false);
    const n = fighterA.skeleton.nodes;
    results.push({
        f,
        aUR: Number(n.armUpper_R.rotation.toFixed(1)),
        aLR: Number(n.armLower_R.rotation.toFixed(1)),
        ws: Number(n.weaponSocket.rotation.toFixed(1)),
        wsX: Number(n.weaponSocket.scaleX.toFixed(2)),
        torso: Number(n.torso.rotation.toFixed(1))
    });
}
console.table(results);
```

### Critères de validation à vérifier
1. ✅ Aucun `NaN` dans les valeurs
2. ✅ Pas de saut brutal (> 90° entre deux frames consécutives sans easing)
3. ✅ `weaponSocket.scaleX` revient à `1` avant la dernière frame si modifié
4. ✅ Après callback de fin : `fighterA.weaponStyle === 'unarmed'` et `fighterA.hasWeapon === false`
5. ✅ Le `<select id="weapon-style-select">` du panneau droit affiche "Unarmed" (via `syncUI()`)
6. ✅ Lisibilité narrative : l'animation raconte clairement ce qui se passe (pas un geste générique)

---

## 10. FICHIERS À MODIFIER

| Fichier | Action |
|---------|--------|
| `engine/src/data/animations/batch8_disarm.js` | Ajouter les 3 animations dans l'objet `batch8` |
| `engine/src/main.js` | Mettre à jour `validatedAnims` et `inProgressAnims` (lignes ~177-186) |
| `docs/continuity.md` | Documenter chaque session + validation |
| `docs/Map.md` | Mettre à jour le statut des animations dans `batch8_disarm.js` (✅/🔴) |

**Ne jamais modifier** : `core/`, `config/`, HTML, CSS, les animations déjà validées.

---

## 11. RAPPELS IMPORTANTS

- `weapon_drop`, `weapon_lost` et `weapon_fall` sont jouées **côté combattant qui perd l'arme** (Fighter B en contexte de combat réel, Fighter A en mode prévisualisation sandbox).
- Le `weaponSocket` est enfant de `armLower_R` (pas de `hand_R`) — son origine est au bas de l'avant-bras droit.
- Le moteur n'a **pas de physique indépendante** pour l'arme — tout passe par les keyframes du `weaponSocket`.
- L'arme disparaît visuellement via `equipWeapon(false)` (appelé par `setWeaponStyle('unarmed')`) — pas besoin de l'animer à `opacity:0`.
- **`weapon_fall` peut paraître identique à `weapon_lost`** — la différence doit être lisible : `weapon_lost` = le combattant chancelle/se rebalance, `weapon_fall` = il regarde son arme tomber (regard vers le bas, bras passivement suivi par gravité, accent sur le rebond du socket).
