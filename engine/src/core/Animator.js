import { ANIMATIONS_LIB } from '../data/animations.js';
import { Easing, WEAPON_HOLD_STYLES, WEAPON_HOLD_OVERLAY_TARGETS, WEAPON_ATTACK_UNARMED_OVERLAY, SKILL_HOLD_STYLES, SKILL_HOLD_OVERLAY_TARGETS } from '../config/constants.js';

export class Animator {
    constructor(skeleton) {
        this.skeleton = skeleton;
        this.currentAnim = null;
        this.frame = 0;
        this.isPlaying = false;
        this.onComplete = null;
        this.fighter = null; // Lié par Fighter (cf. constructor) — utilisé par WEAPON_HOLD_STYLES
    }

    play(animName, onComplete) {
        const anim = ANIMATIONS_LIB[animName];
        if(!anim) return;
        this.currentAnim = anim;
        this.frame = 0;
        this.isPlaying = true;
        this.skeleton.resetPose();
        this.onComplete = onComplete;
    }

    update() {
        if(!this.isPlaying || !this.currentAnim) return;

        // Apply tracks
        for(const [nodeId, track] of Object.entries(this.currentAnim.tracks)) {
            const node = this.skeleton.nodes[nodeId];
            if(!node) continue;

            for(const [prop, keyframes] of Object.entries(track)) {
                node[prop] = this.interpolate(keyframes, this.frame, node[`base${prop.charAt(0).toUpperCase() + prop.slice(1)}`] || 0);
            }
        }

        // Surcouche dynamique de tenue d'arme (cf. WEAPON_HOLD_STYLES) : relue à
        // chaque frame sur fighter.weaponStyle, donc réagit immédiatement à un
        // changement d'arme en cours d'animation, sans relancer play().
        if(this.currentAnim.weaponStyleOverlay && this.fighter) {
            const style = WEAPON_HOLD_STYLES[this.fighter.weaponStyle] || WEAPON_HOLD_STYLES.unarmed;
            for(const [nodeId, prop] of WEAPON_HOLD_OVERLAY_TARGETS) {
                const node = this.skeleton.nodes[nodeId];
                if(!node) continue;
                const baseTrack = this.currentAnim.tracks[nodeId];
                if(!baseTrack || !baseTrack[prop]) {
                    // Pas de piste de base pour cette prop (ex: weaponSocket.rotation) :
                    // repartir de sa valeur de repos. Indispensable aussi pour 'unarmed'
                    // (table vide) afin d'effacer la surcouche d'un style précédent.
                    const baseKey = `base${prop.charAt(0).toUpperCase() + prop.slice(1)}`;
                    node[prop] = node[baseKey] !== undefined ? node[baseKey] : 0;
                }
                const fn = style[nodeId] && style[nodeId][prop];
                if(fn) node[prop] += fn(this.frame, this.currentAnim.duration);
            }

            // Surcouche "skill" (placeholder, cf. SKILL_HOLD_STYLES) : même
            // mécanisme additif, relu sur fighter.skillStyle. SKILL_HOLD_STYLES
            // n'est pas peuplé dans ce moteur (les compétences sont gérées par
            // le jeu) donc SKILL_HOLD_OVERLAY_TARGETS est vide et cette passe
            // est un no-op — prête à fonctionner dès que le jeu y ajoute des entrées.
            const skill = SKILL_HOLD_STYLES[this.fighter.skillStyle] || SKILL_HOLD_STYLES.none;
            for(const [nodeId, prop] of SKILL_HOLD_OVERLAY_TARGETS) {
                const node = this.skeleton.nodes[nodeId];
                if(!node) continue;
                const fn = skill[nodeId] && skill[nodeId][prop];
                if(fn) node[prop] += fn(this.frame, this.currentAnim.duration);
            }
        }

        // Surcouche "unarmed" pour les animations d'attaque à l'arme (cf.
        // WEAPON_ATTACK_UNARMED_OVERLAY) : recentre le swing sur la garde boxeur
        // et coupe le balancement de weaponSocket quand fighter.weaponStyle
        // === 'unarmed'. Autres styles (melee/ranged/thrown) : aucun changement.
        if(this.currentAnim.weaponAttackOverlay && this.fighter && this.fighter.weaponStyle === 'unarmed') {
            for(const [nodeId, delta] of Object.entries(WEAPON_ATTACK_UNARMED_OVERLAY)) {
                const node = this.skeleton.nodes[nodeId];
                if(node) node.rotation += delta;
            }
            const socket = this.skeleton.nodes['weaponSocket'];
            if(socket) socket.rotation = 0;
        }

        // Détection d'impact : si l'animation définit `impactFrame` (un nombre,
        // ou un tableau pour les animations à impacts multiples comme
        // double_punch), déclenche checkHit() au(x) frame(s) correspondant(s).
        const impact = this.currentAnim.impactFrame;
        if(impact !== undefined && this.fighter) {
            const impactFrames = Array.isArray(impact) ? impact : [impact];
            if(impactFrames.includes(this.frame)) this.fighter.checkHit();
        }

        this.frame++;
        if(this.frame >= this.currentAnim.duration) {
            if(this.currentAnim.loop) {
                this.frame = 0;
            } else {
                this.isPlaying = false;
                if(this.onComplete) this.onComplete();
            }
        }
    }

    interpolate(keys, currentFrame, baseValue) {
        if(!keys || keys.length === 0) return baseValue;
        if(keys.length === 1) return keys[0].v;
        if(currentFrame <= keys[0].f) return keys[0].v;
        if(currentFrame >= keys[keys.length-1].f) return keys[keys.length-1].v;

        // Find segments
        let k1 = keys[0], k2 = keys[1];
        for(let i=0; i<keys.length-1; i++) {
            if(currentFrame >= keys[i].f && currentFrame < keys[i+1].f) {
                k1 = keys[i];
                k2 = keys[i+1];
                break;
            }
        }

        const progress = (currentFrame - k1.f) / (k2.f - k1.f);
        let eased = progress;
        if(k2.e && Easing[k2.e]) eased = Easing[k2.e](progress);

        return k1.v + (k2.v - k1.v) * eased;
    }
}
