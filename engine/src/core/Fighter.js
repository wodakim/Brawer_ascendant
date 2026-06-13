import { Skeleton } from './Skeleton.js';
import { Animator } from './Animator.js';
import { nodeWorldAABB, pointInAABB } from './Node.js';
import { getCharacterIndex, getCharacterParts } from './skinUtils.js';
import { SKIN_COUNTS, WEAPON_REACH } from '../config/constants.js';

export class Fighter {
    constructor(id, x, dir, playerName = 'default') {
        this.id = id;
        this.playerName = playerName;
        this.characterIndex = getCharacterIndex(playerName);
        this.x = x;
        this.y = 500; // Ground level
        this.dir = dir;
        
        // Chargement des parts SVG selon le nom du joueur
        const parts = getCharacterParts(playerName, SKIN_COUNTS);
        this.skeleton = new Skeleton(dir, parts);
        this.animator = new Animator(this.skeleton);
        this.animator.fighter = this; // Permet à Animator de lire ce fighter
        this.state = "idle";
        this.hp = 100;
        this.hitCount = 0; // Nombre de coups qui ont touché la cible
        this.target = null;
        this.lastImpact = null; // {hit, label, life}
        this.reactiveHitbox = null; // {tips, targetBox, touching}

        // Stats sandbox
        this.speed = 3;
        this.hasWeapon = true; // Gère l'équipement en cours
        this.weaponStyle = 'melee'; // 'unarmed' | 'melee' | 'ranged' | 'thrown'
        this.skillStyle = 'none'; // Placeholder : compétence active, gérée par le jeu (cf. SKILL_HOLD_STYLES)

        this.changeState("idle");
    }

    // Calcul en TEMPS RÉEL de l'allonge (Bras + Arme)
    get attackRange() {
        let baseReach = 20; // Demi-largeur du torse (distance de l'épaule au centre)
        
        // Longueur du bras (Upper + Lower) - estimée à 80% d'extension max
        const armUpper = this.skeleton.nodes["armUpper_R"];
        const armLower = this.skeleton.nodes["armLower_R"];
        if (armUpper) baseReach += armUpper.h * 0.8;
        if (armLower) baseReach += armLower.h * 0.8; 
        
        // Allonge de l'arme selon le style tenu en main
        if (this.hasWeapon) {
            baseReach += WEAPON_REACH[this.weaponStyle] ?? 0;
        }
        
        return Math.floor(baseReach);
    }

    equipWeapon(equipped) {
        this.hasWeapon = equipped;
        if (this.skeleton.nodes["weapon"]) {
            this.skeleton.nodes["weapon"].visible = equipped;
        }
    }

    // Change le style de tenue d'arme, appliqué en temps réel par Animator.update()
    setWeaponStyle(style) {
        this.weaponStyle = style;
        this.equipWeapon(style !== 'unarmed');
    }

    // Placeholder : change la compétence active, appliquée en temps réel par
    // Animator.update() (cf. SKILL_HOLD_STYLES — non peuplé dans ce moteur, prêt
    // pour que le jeu y branche ses poses de compétence)
    setSkillStyle(style) {
        this.skillStyle = style;
    }

    changeState(newState) {
        this.state = newState;
        switch(newState) {
            case "idle": this.animator.play("idle"); break;
            case "walk": this.animator.play("walk_forward"); break;
            case "attack":
                this.animator.play("punch_right", () => {
                    this.changeState("idle");
                });
                break;
            case "combo":
                const comboAnim = Math.random() < 0.5 ? "weapon_combo" : "weapon_combo_crit";
                this.animator.play(comboAnim, () => {
                    this.changeState("idle");
                });
                break;
            case "hit_light":
                this.animator.play("hit_light", () => this.changeState("idle"));
                break;
            case "hit_heavy":
                this.animator.play("hit_heavy", () => this.changeState("idle"));
                break;
            case "ko":
                this.animator.play("ko_back", () => {
                    // Reste à terre
                });
                break;
        }
    }

    checkHit() {
        if(!this.target || this.target.state === "ko") {
            this.lastImpact = { hit: false, label: "MISS", life: 40 };
            return;
        }

        const dist = Math.abs(this.x - this.target.x);

        if(dist <= this.attackRange + 25) {
            const damage = Math.random() > 0.5 ? 10 : 25;
            this.target.takeDamage(damage);
            this.hitCount++;
            this.lastImpact = { hit: true, label: `HIT -${damage}`, life: 40 };
        } else {
            this.lastImpact = { hit: false, label: "MISS", life: 40 };
        }
    }

    // Hitbox réactive (debug)
    updateReactiveHitbox() {
        if (!this.target) { this.reactiveHitbox = null; return; }
        const sk = this.skeleton.nodes;
        const tsk = this.target.skeleton.nodes;

        let tips;
        if (this.hasWeapon && this.weaponStyle !== 'unarmed') {
            const w = sk.weapon;
            tips = [{ tag: 'weapon', p: w.globalMatrix.transformPoint(new DOMPoint(w.w - w.pX, w.h / 2 - w.pY)) }];
        } else {
            const hR = sk.hand_R, hL = sk.hand_L;
            tips = [
                { tag: 'hand_R', p: hR.globalMatrix.transformPoint(new DOMPoint(hR.w / 2 - hR.pX, hR.h - hR.pY)) },
                { tag: 'hand_L', p: hL.globalMatrix.transformPoint(new DOMPoint(hL.w / 2 - hL.pX, hL.h - hL.pY)) }
            ];
        }

        tips.forEach(t => t.touching = false);
        const targetParts = { torso: tsk.torso, head: tsk.head };
        let touching = false;
        for (const key in targetParts) {
            const node = targetParts[key];
            const box = nodeWorldAABB(node);
            const hit = tips.some(t => pointInAABB(t.p, box));
            node.reactiveHit = hit;
            if (hit) touching = true;
            tips.forEach(t => { if (pointInAABB(t.p, box)) t.touching = true; });
        }

        this.reactiveHitbox = { tips, touching };
    }

    takeDamage(amount) {
        if(this.state === "ko") return;
        this.hp -= amount;
        
        // Pousser physiquement le combattant en arrière
        this.x -= (amount * 0.5) * this.dir; 

        if(this.hp <= 0) {
            this.hp = 0;
            this.changeState("ko");
        } else {
            if (amount >= 20) {
                this.changeState("hit_heavy");
            } else {
                this.changeState("hit_light");
            }
        }
    }

    updateAutoCombat() {
        if(this.state === "ko" || !this.target || this.target.state === "ko") {
            if(this.state !== "ko" && this.state !== "idle") this.changeState("idle");
            return;
        }

        // Gérer la direction dynamique
        const dx = this.target.x - this.x;
        if (Math.abs(dx) > 5) {
            this.dir = dx > 0 ? 1 : -1;
            this.skeleton.dir = this.dir;
        }

        const dist = Math.abs(dx);
        const maxRange = this.attackRange; 
        const minRange = 40;

        if(this.state === "idle" || this.state === "walk") {
            if(dist > maxRange) {
                this.x += this.speed * this.dir;
                if(this.state !== "walk") this.changeState("walk");
            } else if (dist < minRange) {
                this.x -= this.speed * this.dir;
                if(this.state !== "walk") this.changeState("walk"); 
            } else {
                if(this.state === "walk") this.changeState("idle");
                if(Math.random() > 0.05) { 
                    this.changeState("attack");
                }
            }
        }
    }

    update(autoCombat) {
        const currentAnim = this.animator.currentAnim;
        const isLocomotion = !!(currentAnim && currentAnim.moveX);

        if(autoCombat) {
            this.updateAutoCombat();
        } else if(this.animator.isPlaying && isLocomotion) {
            // Déplacement cohérent avec le pas de l'animation
            this.x += currentAnim.moveX * this.dir;
        }

        this.animator.update();
        this.skeleton.update(this.x, this.y, isLocomotion);

        if(this.lastImpact) {
            this.lastImpact.life--;
            if(this.lastImpact.life <= 0) this.lastImpact = null;
        }
    }
}
