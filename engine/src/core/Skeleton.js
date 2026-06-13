import { BASE_RIG } from '../config/baseRig.js';
import { Node } from './Node.js';

export class Skeleton {
    constructor(dir = 1, parts = {}) {
        this.nodes = {};
        this.root = null;
        this.dir = dir; // 1 = right, -1 = left
        this.x = 0;
        this.y = 0;
        this.build(parts);
    }

    build(parts = {}) {
        // Instantiate nodes
        for (const [id, data] of Object.entries(BASE_RIG)) {
            this.nodes[id] = new Node(id, data);
        }
        // Link hierarchy
        for (const [id, data] of Object.entries(BASE_RIG)) {
            if (data.parent && this.nodes[data.parent]) {
                this.nodes[data.parent].addChild(this.nodes[id]);
            } else if (!data.parent) {
                this.root = this.nodes[id];
            }
        }
        // Inject parts (SVG images) into nodes
        for (const [nodeId, path] of Object.entries(parts)) {
            if (this.nodes[nodeId]) {
                this.nodes[nodeId].setPart(path);
            }
        }
    }

    resetPose() {
        for (const id in this.nodes) {
            const n = this.nodes[id];
            n.x = n.baseX; n.y = n.baseY;
            n.rotation = n.baseRot;
            n.scaleX = n.baseScaleX; n.scaleY = n.baseScaleY;
            n.flipX = 1;
        }
    }

    getFootOffsetY() {
        // Calcule le Y du bas du pied par rapport au root en pose de repos (rotations = 0)
        // Pied Gauche
        const yL = (BASE_RIG.hip.y || 0) + (BASE_RIG.legUpper_L.y || 0) + (BASE_RIG.legLower_L.y || 0) + (BASE_RIG.foot_L.y || 0) +
                   ((BASE_RIG.foot_L.h || 15) - (BASE_RIG.foot_L.pY || 5)) * (BASE_RIG.foot_L.scaleY !== undefined ? BASE_RIG.foot_L.scaleY : 1);
        // Pied Droit
        const yR = (BASE_RIG.hip.y || 0) + (BASE_RIG.legUpper_R.y || 0) + (BASE_RIG.legLower_R.y || 0) + (BASE_RIG.foot_R.y || 0) +
                   ((BASE_RIG.foot_R.h || 15) - (BASE_RIG.foot_R.pY || 5)) * (BASE_RIG.foot_R.scaleY !== undefined ? BASE_RIG.foot_R.scaleY : 1);
        return Math.max(yL, yR);
    }

    getDynamicFootOffsetY() {
        // Calcule le Y (monde, root.y = 0) du point le plus bas entre les deux pieds,
        // dans la pose ANIMÉE courante, via cinématique directe (globalMatrix).
        const footL = this.nodes.foot_L;
        const footR = this.nodes.foot_R;
        const bottomL = footL.globalMatrix.transformPoint(new DOMPoint(footL.w / 2 - footL.pX, footL.h - footL.pY));
        const bottomR = footR.globalMatrix.transformPoint(new DOMPoint(footR.w / 2 - footR.pX, footR.h - footR.pY));
        return Math.max(bottomL.y, bottomR.y);
    }

    update(globalX, globalY, dynamicGround = false) {
        if(this.root) {
            this.root.x = globalX;
            // this.root.flipX : multiplicateur [-1..1] piloté par une éventuelle piste
            // root.flipX (turn_left/turn_right), remis à 1 par resetPose() pour toute
            // autre animation — comportement strictement identique à `this.dir` sinon.
            this.root.scaleX = this.dir * this.root.flipX;

            if(dynamicGround) {
                // Animations de locomotion (moveX) : ancrage du pied le plus bas au sol
                // via cinématique directe, quelle que soit l'amplitude du rebond du
                // bassin ou des rotations de jambes (cf. docs/continuity.md "moveX")

                // 1ère passe (root.y = 0) : propage la pose animée courante pour mesurer
                // la position réelle des pieds
                this.root.y = 0;
                this.root.updateMatrix();

                // 2nde passe : ancre le pied le plus bas au sol (globalY)
                this.root.y = globalY - this.getDynamicFootOffsetY();
                this.root.updateMatrix();
            } else {
                // Animations non-locomotion (combat, KO, idle...) : alignement statique
                // sur la pose de repos, comme avant — root.y constant
                this.root.y = globalY - this.getFootOffsetY();
                this.root.updateMatrix();
            }
        }
    }

    getFlatList() {
        const list = Object.values(this.nodes);
        return list.sort((a, b) => a.z - b.z);
    }
}
