export class Node {
    constructor(id, data) {
        this.id = id;
        this.parent = null;
        this.children = [];
        
        // Base config
        this.baseX = data.x || 0;
        this.baseY = data.y || 0;
        this.baseRot = data.rotation || 0;
        this.baseScaleX = data.scaleX !== undefined ? data.scaleX : 1;
        this.baseScaleY = data.scaleY !== undefined ? data.scaleY : 1;
        
        // Animated config
        this.x = this.baseX;
        this.y = this.baseY;
        this.rotation = this.baseRot;
        this.scaleX = this.baseScaleX;
        this.scaleY = this.baseScaleY;
        this.flipX = 1; // Multiplicateur de scaleX du root pour les pivots (turn_left/turn_right)
        
        // Dimensions & Pivot
        this.w = data.w || 20;
        this.h = data.h || 20;
        this.pX = data.pX || 0;
        this.pY = data.pY || 0;
        this.z = data.z || 0;
        this.visible = true; // Permet de masquer dynamiquement un noeud (ex: arme)

        // Assets — chargé dynamiquement via parts injecté par le Fighter
        this.imagePath = null;
        this.image = null;
        // Les parts sont injectés après construction via node.setPart(path)
        
        // Matrices
        this.localMatrix = new DOMMatrix();
        this.globalMatrix = new DOMMatrix();
    }

    setPart(imagePath) {
        this.imagePath = imagePath;
        if (imagePath) {
            this.image = new Image();
            this.image.src = imagePath;
        } else {
            this.image = null;
        }
    }

    addChild(node) {
        node.parent = this;
        this.children.push(node);
    }

    updateMatrix() {
        // Reset local
        this.localMatrix = new DOMMatrix();
        this.localMatrix.translateSelf(this.x, this.y);
        this.localMatrix.rotateSelf(this.rotation);
        this.localMatrix.scaleSelf(this.scaleX, this.scaleY);

        // Compute global
        if (this.parent) {
            this.globalMatrix = DOMMatrix.fromMatrix(this.parent.globalMatrix);
            this.globalMatrix.multiplySelf(this.localMatrix);
        } else {
            this.globalMatrix = DOMMatrix.fromMatrix(this.localMatrix);
        }

        for (let child of this.children) {
            child.updateMatrix();
        }
    }

    getGlobalPos() {
        return { x: this.globalMatrix.e, y: this.globalMatrix.f };
    }
}

// --- Hitbox réactive (debug) : AABB monde d'un nœud, à partir des 4 coins de
// son rectangle local (w,h,pX,pY) transformés par sa globalMatrix. ---
export function nodeWorldAABB(node) {
    const corners = [
        [-node.pX, -node.pY],
        [node.w - node.pX, -node.pY],
        [node.w - node.pX, node.h - node.pY],
        [-node.pX, node.h - node.pY]
    ].map(([x, y]) => node.globalMatrix.transformPoint(new DOMPoint(x, y)));
    return {
        minX: Math.min(...corners.map(p => p.x)), maxX: Math.max(...corners.map(p => p.x)),
        minY: Math.min(...corners.map(p => p.y)), maxY: Math.max(...corners.map(p => p.y))
    };
}

export function pointInAABB(p, b) {
    return p.x >= b.minX && p.x <= b.maxX && p.y >= b.minY && p.y <= b.maxY;
}
