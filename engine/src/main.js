import { BASE_RIG } from './config/baseRig.js';
import {
    ANIMATION_NAMES,
    WEAPON_DRAWN_ANIMS,
    WEAPON_HOLD_STYLES,
    WEAPON_HOLD_OVERLAY_TARGETS,
    WEAPON_ATTACK_UNARMED_OVERLAY,
    WEAPON_REACH
} from './config/constants.js';
import { Fighter } from './core/Fighter.js';
import { ANIMATIONS_LIB } from './data/animations.js';
import { renderFighter } from './render/canvasRender.js';

let canvas;
let ctx;
let fighterA;
let fighterB;

const engineOptions = {
    showBones: true,
    showPivots: true,
    showHitboxes: true,
    showLabels: true,
    showReactiveHitbox: true,
    autoCombat: false,
    paused: false,
    slowMo: false
};

function initEngine() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    
    resize();
    window.addEventListener('resize', resize);
    
    resetFight();
    initUI();
    
    requestAnimationFrame(loop);
}

function resize() {
    if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

function resetFight() {
    if (canvas) {
        // Les noms de joueurs déterminent leur design (seed via hash du nom)
        fighterA = new Fighter("Fighter A", canvas.width / 2 - 150, 1, "Fighter A");
        fighterB = new Fighter("Fighter B", canvas.width / 2 + 150, -1, "Fighter B");
        fighterA.target = fighterB;
        fighterB.target = fighterA;
        
        // S'assurer que les variables window sont mises à jour après un reset
        window.fighterA = fighterA;
        window.fighterB = fighterB;
    }
}

let lastTime = 0;
let accumulator = 0;
const frameRate = 1000 / 60;

function loop(time) {
    requestAnimationFrame(loop);
    
    if (engineOptions.paused) return;

    const dt = time - lastTime;
    lastTime = time;
    
    accumulator += dt;
    const step = engineOptions.slowMo ? frameRate * 3 : frameRate;

    while (accumulator >= step) {
        updateGame();
        accumulator -= step;
    }
    
    draw();
}

function updateGame() {
    fighterA.update(engineOptions.autoCombat);
    fighterB.update(engineOptions.autoCombat);
    fighterA.updateReactiveHitbox();
    fighterB.updateReactiveHitbox();
}

function draw() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ground
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 500, canvas.width, canvas.height - 500);
    ctx.strokeStyle = "#444";
    ctx.beginPath(); ctx.moveTo(0, 500); ctx.lineTo(canvas.width, 500); ctx.stroke();

    renderFighter(fighterA, ctx, engineOptions);
    renderFighter(fighterB, ctx, engineOptions);

    syncUI();
}

// Synchronise le panneau droit avec l'état RÉEL de fighterA.
// Appelée à chaque frame de draw() — couvre tous les changements d'état
// (fin d'animation, logique de combat, reset, etc.) sans wiring manuel.
function syncUI() {
    // Select weapon-style
    const sel = document.getElementById('weapon-style-select');
    if (sel && sel.value !== fighterA.weaponStyle) {
        sel.value = fighterA.weaponStyle;
    }
}

function initUI() {
    // Toggles
    const bindToggle = (id, prop) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', e => {
                engineOptions[prop] = e.target.checked;
            });
        }
    };
    bindToggle('dbg-bones', 'showBones');
    bindToggle('dbg-pivots', 'showPivots');
    bindToggle('dbg-hitboxes', 'showHitboxes');
    bindToggle('dbg-labels', 'showLabels');
    bindToggle('dbg-reactive-hitbox', 'showReactiveHitbox');

    // Boutons de contrôle
    const btnAuto = document.getElementById('btn-autocombat');
    if (btnAuto) {
        btnAuto.addEventListener('click', () => {
            engineOptions.autoCombat = !engineOptions.autoCombat;
            btnAuto.innerText = "AUTO COMBAT : " + (engineOptions.autoCombat ? "ON" : "OFF");
            btnAuto.className = engineOptions.autoCombat ? "active" : "";
        });
    }

    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', resetFight);
    }
    
    const btnPause = document.getElementById('btn-pause');
    if (btnPause) {
        btnPause.addEventListener('click', () => {
            engineOptions.paused = !engineOptions.paused;
            btnPause.innerText = engineOptions.paused ? "Resume" : "Pause";
            btnPause.className = engineOptions.paused ? "active" : "";
        });
    }

    const btnSlowMo = document.getElementById('btn-slowmo');
    if (btnSlowMo) {
        btnSlowMo.addEventListener('click', () => {
            engineOptions.slowMo = !engineOptions.slowMo;
            btnSlowMo.className = engineOptions.slowMo ? "active" : "";
        });
    }

    const btnFrame = document.getElementById('btn-frame');
    if (btnFrame) {
        btnFrame.addEventListener('click', () => {
            if (engineOptions.paused) {
                updateGame(); draw();
            }
        });
    }

    // Style de tenue d'arme (cf. WEAPON_HOLD_STYLES)
    const weaponStyleSelect = document.getElementById('weapon-style-select');
    if (weaponStyleSelect) {
        weaponStyleSelect.addEventListener('change', (e) => {
            fighterA.setWeaponStyle(e.target.value);
        });
        fighterA.setWeaponStyle(weaponStyleSelect.value); // Synchronise l'état initial
    }

    // Génération des boutons d'animations
    const animContainer = document.getElementById('anim-buttons-container');
    if (animContainer) {
        const validatedAnims = [
            "idle", "walk_forward", "punch_right", "hit_light", "hit_heavy", "ko_back",
            "idle_breathing", "prepare", "focus", "walk_backward", "run_forward", "run_backward",
            "step_forward", "step_backward", "turn_left", "turn_right", "punch_left", "double_punch",
            "headbutt", "kick_right", "kick_left", "heavy_kick", "combo_1", "combo_2", "combo_3",
            "combo_4", "combo_finisher", "weapon_idle", "weapon_draw", "weapon_attack_light",
            "weapon_attack_medium", "weapon_attack_heavy", "weapon_critical", "weapon_combo",
            "weapon_combo_crit", "disarm_attack", "weapon_break", "weapon_drop", "weapon_lost",
            "weapon_fall"
        ];
        const inProgressAnims = [];

        ANIMATION_NAMES.forEach(anim => {
            const btn = document.createElement('button');
            btn.innerText = "PLAY " + anim.replace(/_/g, ' ').toUpperCase();
            if (validatedAnims.includes(anim)) {
                btn.style.background = "#2e7d32"; // Vert : validée
            } else if (inProgressAnims.includes(anim)) {
                btn.style.background = "#c62828"; // Rouge : en cours de travail
            }

            btn.addEventListener('click', () => {
                const animDef = ANIMATIONS_LIB[anim];
                // Les animations qui désarment (weapon_break, weapon_drop, ...) doivent
                // enchaîner sur weapon_idle (pas idle) pour garder weaponStyleOverlay actif :
                // sinon un changement ultérieur de style d'arme (ranged/thrown/unarmed) via
                // le panneau droit ne repositionne plus le bras/l'arme.
                const nextAnim = (WEAPON_DRAWN_ANIMS.includes(anim) || (animDef && animDef.disarmsOnComplete)) ? 'weapon_idle' : 'idle';
                fighterA.animator.play(anim, () => {
                    // Si l'animation désarme le combattant à sa fin (ex: weapon_break, weapon_drop),
                    // on retire l'arme avant de revenir à weapon_idle/idle.
                    if (animDef && animDef.disarmsOnComplete) {
                        fighterA.setWeaponStyle('unarmed');
                    }
                    fighterA.animator.play(nextAnim);
                });
            });
            animContainer.appendChild(btn);
        });
    }

    // Éditeur de Rig
    const nodeSelect = document.getElementById('rig-node-select');
    if (nodeSelect) {
        for (const id in BASE_RIG) {
            const opt = document.createElement('option');
            opt.value = id; opt.innerText = id;
            nodeSelect.appendChild(opt);
        }
    }

    const bindRigSlider = (id, prop, isBase = false) => {
        const slider = document.getElementById(`rig-${id}`);
        const valInput = document.getElementById(`rig-${id}-val`);
        
        if (slider && valInput) {
            const updateVal = (val) => {
                valInput.value = val;
                slider.value = val;
                const nodeId = nodeSelect.value;
                // Update BaseRig
                if (isBase) {
                    BASE_RIG[nodeId][prop] = parseFloat(val);
                    // Update active instances
                    fighterA.skeleton.nodes[nodeId][prop] = parseFloat(val);
                    fighterB.skeleton.nodes[nodeId][prop] = parseFloat(val);
                } else {
                    BASE_RIG[nodeId][prop] = parseFloat(val);
                    fighterA.skeleton.nodes[nodeId][`base${prop.charAt(0).toUpperCase() + prop.slice(1)}`] = parseFloat(val);
                    fighterB.skeleton.nodes[nodeId][`base${prop.charAt(0).toUpperCase() + prop.slice(1)}`] = parseFloat(val);
                    fighterA.skeleton.nodes[nodeId][prop] = parseFloat(val);
                    fighterB.skeleton.nodes[nodeId][prop] = parseFloat(val);
                }
                if (engineOptions.paused) draw();
            };

            slider.addEventListener('input', e => updateVal(e.target.value));
            valInput.addEventListener('change', e => updateVal(e.target.value));
        }
    };

    bindRigSlider('x', 'x'); bindRigSlider('y', 'y'); bindRigSlider('rot', 'rotation');
    bindRigSlider('sx', 'scaleX'); bindRigSlider('sy', 'scaleY');
    bindRigSlider('px', 'pX', true); bindRigSlider('py', 'pY', true);

    if (nodeSelect) {
        nodeSelect.addEventListener('change', (e) => {
            const nodeId = e.target.value;
            const data = BASE_RIG[nodeId];
            
            const elX = document.getElementById('rig-x');
            const elXVal = document.getElementById('rig-x-val');
            if (elX && elXVal) { elX.value = data.x || 0; elXVal.value = data.x || 0; }
            
            const elY = document.getElementById('rig-y');
            const elYVal = document.getElementById('rig-y-val');
            if (elY && elYVal) { elY.value = data.y || 0; elYVal.value = data.y || 0; }
            
            const elRot = document.getElementById('rig-rot');
            const elRotVal = document.getElementById('rig-rot-val');
            if (elRot && elRotVal) { elRot.value = data.rotation || 0; elRotVal.value = data.rotation || 0; }
            
            const elSx = document.getElementById('rig-sx');
            const elSxVal = document.getElementById('rig-sx-val');
            if (elSx && elSxVal) {
                elSx.value = data.scaleX !== undefined ? data.scaleX : 1;
                elSxVal.value = data.scaleX !== undefined ? data.scaleX : 1;
            }
            
            const elSy = document.getElementById('rig-sy');
            const elSyVal = document.getElementById('rig-sy-val');
            if (elSy && elSyVal) {
                elSy.value = data.scaleY !== undefined ? data.scaleY : 1;
                elSyVal.value = data.scaleY !== undefined ? data.scaleY : 1;
            }
            
            const elPx = document.getElementById('rig-px');
            const elPxVal = document.getElementById('rig-px-val');
            if (elPx && elPxVal) { elPx.value = data.pX || 0; elPxVal.value = data.pX || 0; }
            
            const elPy = document.getElementById('rig-py');
            const elPyVal = document.getElementById('rig-py-val');
            if (elPy && elPyVal) { elPy.value = data.pY || 0; elPyVal.value = data.pY || 0; }
        });
    }
    
    // Exports
    const triggerDownload = (filename, data) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename; a.click();
    };

    const btnExportRig = document.getElementById('btn-export-rig');
    if (btnExportRig) {
        btnExportRig.addEventListener('click', () => triggerDownload("rig.json", BASE_RIG));
    }
    const btnExportAnim = document.getElementById('btn-export-anim');
    if (btnExportAnim) {
        btnExportAnim.addEventListener('click', () => triggerDownload("animations.json", ANIMATIONS_LIB));
    }
    const btnExportHitbox = document.getElementById('btn-export-hitbox');
    if (btnExportHitbox) {
        btnExportHitbox.addEventListener('click', () => {
            const hitboxes = {};
            for (let id in BASE_RIG) {
                hitboxes[id] = { w: BASE_RIG[id].w, h: BASE_RIG[id].h, z: BASE_RIG[id].z };
            }
            triggerDownload("hitboxes.json", hitboxes);
        });
    }
}

// Exposer sur window pour Playwright et la compatibilité UI globale
window.fighterA = fighterA;
window.fighterB = fighterB;
window.resetFight = resetFight;
window.engineOptions = engineOptions;
window.BASE_RIG = BASE_RIG;
window.ANIMATIONS_LIB = ANIMATIONS_LIB;
window.ANIMATION_NAMES = ANIMATION_NAMES;
window.draw = draw;
window.updateGame = updateGame;

// Démarrage automatique dès le chargement du module
window.onload = initEngine;
