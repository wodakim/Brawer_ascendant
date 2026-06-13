export const SKIN_COUNTS = {
    head:          1,
    torso:         1,
    arm_left_up:   1,
    arm_left_down: 1,
    hand_left:     1,
    arm_right_up:  1,
    arm_right_down:1,
    hand_right:    1,
    leg_left:      1,
    leg_down_left: 1,
    leg_right:     1,
    leg_down_right:1,
    feet_left:     1,
    feet_right:    1
};

export const ANIMATION_NAMES = [
    // Locomotion
    "idle", "idle_breathing", "walk_forward", "walk_backward", "run_forward", "run_backward",
    "step_forward", "step_backward", "turn_left", "turn_right",
    // Attaques mains nues
    "punch_left", "punch_right", "double_punch", "kick_left", "kick_right", "heavy_kick", "headbutt",
    // Combos
    "combo_1", "combo_2", "combo_3", "combo_4", "combo_finisher",
    // Armes
    "weapon_draw", "weapon_idle", "weapon_attack_light", "weapon_attack_medium", "weapon_attack_heavy",
    "weapon_combo", "weapon_combo_crit", "weapon_critical", "weapon_break", "weapon_drop",
    // Distance
    "throw_prepare", "throw_weapon", "throw_followthrough", "catch_weapon",
    // Défense & Esquive
    "block", "shield_block", "parry", "counter_stance", "counter_attack",
    "dodge_left", "dodge_right", "sidestep", "duck", "jump_evade", "backflip",
    // Réactions
    "hit_light", "hit_medium", "hit_heavy", "stagger", "knockback", "knockdown",
    // Divers
    "critical_prepare", "critical_attack", "critical_finish", "disarm_attack", "weapon_lost", "weapon_fall",
    "fall_front", "fall_back", "trip", "stand_up", "recover",
    "ko_front", "ko_back", "ko_spin", "ko_airborne",
    "special_skill", "special_cast", "special_release",
    "pet_spawn", "pet_entry", "pet_attack", "pet_hit", "pet_death",
    "victory", "victory_weapon", "victory_taunt", "victory_celebration",
    "defeat_idle", "defeat_fall", "spawn", "despawn", "enter_arena", "exit_arena", "taunt", "focus", "prepare"
];

export const Easing = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOutElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
};

export const WEAPON_HOLD_STYLES = {
    unarmed: {
        armUpper_L: { rotation: (f, d) => -57.5 },
        armLower_L: { rotation: (f, d) => -67.5 },
        armUpper_R: { rotation: (f, d) => -32.5 },
        armLower_R: { rotation: (f, d) => -57.5 }
    },
    melee: {
        armLower_R:   { rotation: (f, d) => 3 * Math.sin(2 * Math.PI * f / d) },
        weaponSocket: { rotation: (f, d) => 5 * Math.sin(2 * Math.PI * f / d) }
    },
    ranged: {
        armUpper_R:   { rotation: (f, d) => -30 },
        armLower_R:   { rotation: (f, d) => -50 + 1 * Math.sin(2 * Math.PI * f / d) },
        weaponSocket: { rotation: (f, d) => -20 + 2 * Math.sin(2 * Math.PI * f / d) }
    },
    thrown: {
        armUpper_R:   { rotation: (f, d) => 15 },
        armLower_R:   { rotation: (f, d) => -20 + 4 * Math.sin(2 * Math.PI * (f / d + 0.25)) },
        weaponSocket: { rotation: (f, d) => 10 + 6 * Math.sin(2 * Math.PI * (f / d + 0.25)) }
    }
};

export const WEAPON_HOLD_OVERLAY_TARGETS = [];
{
    const seen = new Set();
    for(const style of Object.values(WEAPON_HOLD_STYLES)) {
        for(const [nodeId, props] of Object.entries(style)) {
            for(const prop of Object.keys(props)) {
                const key = nodeId + '.' + prop;
                if(!seen.has(key)) { seen.add(key); WEAPON_HOLD_OVERLAY_TARGETS.push([nodeId, prop]); }
            }
        }
    }
}

// Placeholder pour les "skills" (compétences) — non implémentées dans ce moteur,
// mais gérées par le jeu. Même mécanisme additif que WEAPON_HOLD_STYLES : le jeu
// pourra peupler SKILL_HOLD_STYLES (ex: { fireball_charge: { armUpper_R: {...} } })
// et piloter fighter.skillStyle (cf. Fighter.setSkillStyle). Tant que vide, la
// 2e passe d'overlay dans Animator.update() est un no-op.
export const SKILL_HOLD_STYLES = {
    none: {}
};

export const SKILL_HOLD_OVERLAY_TARGETS = [];
{
    const seen = new Set();
    for(const style of Object.values(SKILL_HOLD_STYLES)) {
        for(const [nodeId, props] of Object.entries(style)) {
            for(const prop of Object.keys(props)) {
                const key = nodeId + '.' + prop;
                if(!seen.has(key)) { seen.add(key); SKILL_HOLD_OVERLAY_TARGETS.push([nodeId, prop]); }
            }
        }
    }
}

export const WEAPON_ATTACK_UNARMED_OVERLAY = {
    armUpper_R: -35,
    armLower_R: -60,
    armUpper_L: -55,
    armLower_L: -70
};

export const WEAPON_REACH = {
    unarmed: 0,
    melee: 80,
    ranged: 40,
    thrown: 50
};

export const WEAPON_DRAWN_ANIMS = ["weapon_draw", "weapon_attack_light", "weapon_attack_medium", "weapon_attack_heavy", "weapon_critical", "weapon_combo", "weapon_combo_crit", "disarm_attack"];
