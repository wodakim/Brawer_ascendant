/**
 * ==========================================
 * MOTEUR DE RENDU GRAPHIQUE (CANVAS 2D)
 * ==========================================
 */

export function renderNode(node, ctx, engineOptions) {
    if (node.visible === false) return; // Ne dessine pas si masqué (ex: arme déséquipée)
    
    ctx.save();
    
    // Apply Global Matrix (World Space)
    const m = node.globalMatrix;
    ctx.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);

    // Apply Pivot translation for rendering graphics
    ctx.translate(-node.pX, -node.pY);

    // 1. Render Graphic
    if(node.image && node.image.complete && node.image.naturalWidth > 0) {
        // SVG chargé et prêt
        ctx.drawImage(node.image, 0, 0, node.w, node.h);
    } else if(node.imagePath) {
        // imagePath défini mais SVG pas encore chargé → placeholder de chargement
        ctx.fillStyle = "rgba(80, 80, 80, 0.6)";
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 1;
        ctx.fillRect(0, 0, node.w, node.h);
        ctx.strokeRect(0, 0, node.w, node.h);
        if(engineOptions.showLabels) {
            ctx.fillStyle = "#aaa";
            ctx.font = "9px Arial";
            ctx.fillText(node.id, 2, 12);
        }
    }
    // Pas de imagePath = nœud structurel (root, hip, face, hair, weaponSocket)
    // → rien à dessiner, invisible par design

    // 2. Debug Hitbox (Vert, Rouge si touchée par la hitbox réactive)
    if(engineOptions.showHitboxes) {
        const isReactiveHit = engineOptions.showReactiveHitbox && node.reactiveHit;
        ctx.strokeStyle = isReactiveHit ? "rgba(255, 0, 80, 0.9)" : "rgba(0, 255, 0, 0.6)";
        ctx.lineWidth = isReactiveHit ? 3 : 2;
        ctx.strokeRect(0, 0, node.w, node.h);

        // Special colored hitboxes
        if(node.id === "torso") {
             ctx.fillStyle = isReactiveHit ? "rgba(255, 0, 80, 0.15)" : "rgba(0, 255, 0, 0.1)";
             ctx.fillRect(0, 0, node.w, node.h);
        }
        if(node.id === "weaponSocket") {
            ctx.strokeStyle = "rgba(255, 165, 0, 0.8)"; // Orange
            ctx.strokeRect(-5, -5, node.w+10, node.h+10);
        }
    }

    ctx.restore();

    // 3. Debug Bones & Pivots (World Space lines)
    if(engineOptions.showBones && node.parent) {
        const p1 = node.parent.getGlobalPos();
        const p2 = node.getGlobalPos();
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0); // Identity
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(0, 150, 255, 0.8)"; // Bleu
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    if(engineOptions.showPivots) {
        const p = node.getGlobalPos();
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255, 0, 0, 0.8)"; // Rouge
        ctx.fill();
        ctx.restore();
    }
}

export function renderFighter(fighter, ctx, engineOptions) {
    const nodes = fighter.skeleton.getFlatList();
    for(const node of nodes) {
        renderNode(node, ctx, engineOptions);
    }
    
    // Dessiner le BLOC DÉTECTEUR (Visualisation de la portée d'engagement)
    if(engineOptions.showHitboxes) {
        const startX = fighter.dir === 1 ? fighter.x : fighter.x - fighter.attackRange;

        if(fighter.state !== "ko") {
            ctx.save();
            ctx.setTransform(1,0,0,1,0,0);

            // Déterminer si la cible est à portée valide (ni trop loin, ni trop près)
            const dist = Math.abs(fighter.x - (fighter.target ? fighter.target.x : 0));
            const inRange = dist <= fighter.attackRange && dist >= 40 && fighter.target?.state !== "ko";

            // Le bloc devient rouge quand le détecteur capte une cible prête à être frappée
            ctx.fillStyle = inRange ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 255, 0, 0.15)";
            ctx.strokeStyle = inRange ? "rgba(255, 0, 0, 0.8)" : "rgba(255, 255, 0, 0.8)";

            ctx.fillRect(startX, fighter.y - 70, fighter.attackRange, 30);
            ctx.strokeRect(startX, fighter.y - 70, fighter.attackRange, 30);

            ctx.fillStyle = "white";
            ctx.font = "9px Arial";
            ctx.fillText("SENSOR", startX + (fighter.attackRange/2) - 20, fighter.y - 75);
            ctx.restore();
        }

        // Feedback visuel HIT/MISS (cf. checkHit()/lastImpact)
        if(fighter.lastImpact) {
            ctx.save();
            ctx.setTransform(1,0,0,1,0,0);
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = fighter.lastImpact.hit ? "#ff4040" : "#999999";
            ctx.fillText(fighter.lastImpact.label, startX + fighter.attackRange / 2, fighter.y - 90);
            ctx.restore();
        }
    }

    // Hitbox réactive (debug)
    if(engineOptions.showReactiveHitbox && fighter.reactiveHitbox) {
        const { tips, touching } = fighter.reactiveHitbox;
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);

        for(const tip of tips) {
            ctx.beginPath();
            ctx.arc(tip.p.x, tip.p.y, tip.touching ? 9 : 5, 0, Math.PI*2);
            ctx.fillStyle = tip.touching ? "rgba(255, 0, 80, 0.95)" : "rgba(0, 230, 255, 0.85)";
            ctx.fill();
            if(tip.touching) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#fff";
                ctx.stroke();
            }
        }

        if(touching) {
            ctx.font = "bold 11px Arial";
            ctx.fillStyle = "#ff0050";
            ctx.textAlign = "center";
            ctx.fillText("TOUCH", tips[0].p.x, tips[0].p.y - 14);
            ctx.textAlign = "left";
        }
        ctx.restore();
    }

    // Draw HUD : nom du joueur + compteur de hits + barre HP
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    const hudX = fighter.x - 50;

    // Nom du joueur (blanc, bien lisible)
    ctx.font = "bold 13px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(fighter.playerName, hudX, fighter.y - 230);

    // Compteur de hits (cyan, sous le nom)
    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "#00e5ff";
    ctx.fillText(`Hits: ${fighter.hitCount}`, hudX, fighter.y - 216);

    // HP numérique
    ctx.font = "bold 13px Arial";
    ctx.fillStyle = fighter.hp > 50 ? "#4caf50" : fighter.hp > 25 ? "#ff9800" : "#f44336";
    ctx.fillText(`HP: ${fighter.hp}`, hudX, fighter.y - 202);

    // Barre HP
    ctx.fillStyle = "#333";
    ctx.fillRect(hudX, fighter.y - 198, 100, 7);
    ctx.fillStyle = fighter.hp > 50 ? "#4caf50" : fighter.hp > 25 ? "#ff9800" : "#f44336";
    ctx.fillRect(hudX, fighter.y - 198, Math.max(0, fighter.hp), 7);

    // Identifiant debug (petit, gris)
    ctx.font = "9px Arial";
    ctx.fillStyle = "#666";
    ctx.fillText(`char_${String(fighter.characterIndex).padStart(2,'0')}`, hudX, fighter.y - 188);
    ctx.restore();
}
