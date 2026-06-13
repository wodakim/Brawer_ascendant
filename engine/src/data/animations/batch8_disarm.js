export const batch8 = {
    disarm_attack: {
        duration: 30, loop: false,
        weaponAttackOverlay: true,
        impactFrame: 12,
        tracks: {
            torso: {
                rotation: [{f:0, v:0}, {f:6, v:-15, e:'easeOutQuad'}, {f:12, v:25, e:'easeInQuad'}, {f:18, v:15}, {f:30, v:0, e:'easeInOutQuad'}],
                scaleX: [{f:0, v:1}, {f:12, v:0.8, e:'easeInQuad'}, {f:18, v:1.05}, {f:30, v:1, e:'easeInOutQuad'}],
                scaleY: [{f:0, v:1}, {f:12, v:1.25, e:'easeInQuad'}, {f:18, v:0.95}, {f:30, v:1, e:'easeInOutQuad'}]
            },
            head: {
                rotation: [{f:0, v:0}, {f:6, v:-8}, {f:12, v:15, e:'easeInQuad'}, {f:18, v:5}, {f:30, v:0, e:'easeInOutQuad'}]
            },
            hip: {
                x: [{f:0, v:0}, {f:6, v:-10, e:'easeOutQuad'}, {f:12, v:25, e:'easeInQuad'}, {f:18, v:8}, {f:30, v:0, e:'easeInOutQuad'}],
                y: [{f:0, v:-70}, {f:6, v:-65}, {f:12, v:-78, e:'easeOutQuad'}, {f:30, v:-70}]
            },
            legUpper_R: {
                rotation: [{f:0, v:0}, {f:6, v:15}, {f:12, v:-12, e:'easeInQuad'}, {f:30, v:0, e:'easeInOutQuad'}]
            },
            legUpper_L: {
                rotation: [{f:0, v:0}, {f:6, v:-12}, {f:12, v:14, e:'easeInQuad'}, {f:30, v:0, e:'easeInOutQuad'}]
            },
            armUpper_R: {
                rotation: [{f:0, v:-10}, {f:6, v:-130, e:'easeOutQuad'}, {f:12, v:-20, e:'easeInQuad'}, {f:18, v:-45}, {f:30, v:-10, e:'easeOutQuad'}]
            },
            armLower_R: {
                rotation: [{f:0, v:-30}, {f:6, v:-90, e:'easeOutQuad'}, {f:12, v:0, e:'easeInQuad'}, {f:18, v:-30}, {f:30, v:-30, e:'easeOutQuad'}]
            },
            armUpper_L: {
                rotation: [{f:0, v:10}, {f:6, v:-25}, {f:12, v:50, e:'easeInQuad'}, {f:30, v:10, e:'easeInOutQuad'}]
            },
            armLower_L: {
                rotation: [{f:0, v:-20}, {f:6, v:-15}, {f:12, v:-70}, {f:30, v:-20, e:'easeInOutQuad'}]
            },
            weaponSocket: {
                rotation: [{f:0, v:0}, {f:6, v:-30, e:'easeOutQuad'}, {f:12, v:5, e:'easeInQuad'}, {f:18, v:-20}, {f:30, v:0, e:'easeOutQuad'}]
            }
        }
    },

    // weapon_break : réaction du combattant qui reçoit le désarmement.
    // Son bras armé tressaille violemment (impact sur hand_R) → oscillation amortie → bras retombant.
    // Après cette animation, le combattant transite vers weapon_lost (bras vide).
    weapon_break: {
        duration: 20, loop: false,
        disarmsOnComplete: true, // Retire l'arme (setWeaponStyle 'unarmed') à la fin
        tracks: {
            torso: {
                rotation: [{f:0, v:0}, {f:3, v:-20, e:'easeOutQuad'}, {f:8, v:12}, {f:13, v:-6}, {f:20, v:0, e:'easeInOutQuad'}],
                scaleX: [{f:0, v:1}, {f:3, v:1.1}, {f:8, v:0.95}, {f:20, v:1, e:'easeInOutQuad'}],
                scaleY: [{f:0, v:1}, {f:3, v:0.92}, {f:8, v:1.04}, {f:20, v:1, e:'easeInOutQuad'}]
            },
            head: {
                rotation: [{f:0, v:0}, {f:3, v:-25, e:'easeOutQuad'}, {f:8, v:15}, {f:13, v:-5}, {f:20, v:0, e:'easeInOutQuad'}]
            },
            hip: {
                x: [{f:0, v:0}, {f:3, v:-12, e:'easeOutQuad'}, {f:8, v:6}, {f:20, v:0, e:'easeInOutQuad'}],
                y: [{f:0, v:-70}, {f:3, v:-67}, {f:10, v:-72}, {f:20, v:-70}]
            },
            // Bras armé (droit) : tressaillement violent sur 3f, puis oscillation amortie
            armUpper_R: {
                rotation: [{f:0, v:-10}, {f:3, v:30, e:'easeOutQuad'}, {f:8, v:-30, e:'easeInQuad'}, {f:13, v:5}, {f:20, v:-15, e:'easeInOutQuad'}]
            },
            armLower_R: {
                rotation: [{f:0, v:-30}, {f:3, v:-80, e:'easeOutQuad'}, {f:8, v:20, e:'easeInQuad'}, {f:13, v:-40}, {f:20, v:-50, e:'easeInOutQuad'}]
            },
            // L'arme dans le socket vibre / se tord (scaleX -1 bref au pic du choc)
            weaponSocket: {
                rotation: [{f:0, v:0}, {f:3, v:-30, e:'easeOutQuad'}, {f:6, v:28, e:'easeInQuad'}, {f:10, v:-18}, {f:15, v:10}, {f:20, v:0, e:'easeInOutQuad'}],
                scaleX:   [{f:0, v:1}, {f:3, v:-1}, {f:6, v:1}, {f:20, v:1}]
            },
            // Bras gauche : réaction d'équilibre
            armUpper_L: {
                rotation: [{f:0, v:10}, {f:3, v:-20, e:'easeOutQuad'}, {f:8, v:25}, {f:20, v:10, e:'easeInOutQuad'}]
            },
            armLower_L: {
                rotation: [{f:0, v:-20}, {f:3, v:-10}, {f:8, v:-35}, {f:20, v:-20, e:'easeInOutQuad'}]
            }
        }
    },

    // weapon_drop : suite directe de weapon_break. Le combattant lâche volontairement
    // son arme — le bras armé s'ouvre, le weaponSocket pivote vers le bas et libère l'arme,
    // puis le corps se stabilise vers une posture "unarmed".
    // f0 reprend la pose de fin de weapon_break (armUpper_R=-15°, armLower_R=-50°).
    weapon_drop: {
        duration: 15, loop: false,
        disarmsOnComplete: true,
        tracks: {
            torso: {
                rotation: [{f:0, v:0}, {f:5, v:-10, e:'easeOutQuad'}, {f:8, v:-15}, {f:15, v:0, e:'easeOutQuad'}]
            },
            head: {
                rotation: [{f:0, v:0}, {f:5, v:4, e:'easeOutQuad'}, {f:8, v:5}, {f:12, v:7}, {f:15, v:0, e:'easeOutQuad'}]
            },
            hip: {
                x: [{f:0, v:0}, {f:8, v:4, e:'easeOutQuad'}, {f:15, v:0, e:'easeInOutQuad'}],
                y: [{f:0, v:-70}, {f:8, v:-71}, {f:15, v:-70}]
            },
            legUpper_R: {
                rotation: [{f:0, v:0}, {f:8, v:4, e:'easeOutQuad'}, {f:15, v:0, e:'easeInOutQuad'}]
            },
            legUpper_L: {
                rotation: [{f:0, v:0}, {f:8, v:-4, e:'easeOutQuad'}, {f:15, v:0, e:'easeInOutQuad'}]
            },
            // Bras armé : s'ouvre et libère l'arme (continuité avec weapon_break)
            armUpper_R: {
                rotation: [{f:0, v:-15}, {f:5, v:20, e:'easeOutQuad'}, {f:8, v:24}, {f:15, v:30, e:'easeOutQuad'}]
            },
            armLower_R: {
                rotation: [{f:0, v:-50}, {f:5, v:-90, e:'easeOutQuad'}, {f:8, v:-95}, {f:15, v:-100, e:'easeOutQuad'}]
            },
            // L'arme glisse hors de la main : le socket bascule vers le bas
            weaponSocket: {
                rotation: [{f:0, v:0}, {f:5, v:0}, {f:8, v:85, e:'easeInQuad'}, {f:15, v:100, e:'easeOutQuad'}]
            },
            // Bras gauche : réaction d'équilibre
            armUpper_L: {
                rotation: [{f:0, v:10}, {f:5, v:-5, e:'easeOutQuad'}, {f:8, v:-8}, {f:15, v:10, e:'easeOutQuad'}]
            },
            armLower_L: {
                rotation: [{f:0, v:-20}, {f:5, v:-30, e:'easeOutQuad'}, {f:8, v:-32}, {f:15, v:-20, e:'easeOutQuad'}]
            }
        }
    },

    // weapon_lost : suite de weapon_drop. PAS un choc/impact (≠ weapon_break) — le
    // combattant, brusquement privé du contrepoids de l'arme, perd l'équilibre et
    // trébuche en arrière. Le poids du corps recule (hip.x), la jambe arrière fait
    // un pas de rattrapage tandis que l'avant se relève, les deux bras s'écartent en
    // moulinet symétrique pour rétablir l'équilibre (PAS de squash/stretch — aucun
    // impact n'a lieu). Puis le corps repasse vers l'avant (rattrapage) et settle
    // vers une posture "unarmed" relâchée (micro-oscillation, tête en léger différé).
    // f0 reprend la pose de fin de weapon_drop (armUpper_R=30°, armLower_R=-100°,
    // armUpper_L=10°, armLower_L=-20°, weaponSocket=100°).
    weapon_lost: {
        duration: 25, loop: false,
        disarmsOnComplete: true,
        tracks: {
            // Bascule arrière progressive (PAS de snap, PAS de squash)
            torso: {
                rotation: [{f:0, v:0}, {f:9, v:-12, e:'easeOutQuad'}, {f:17, v:6, e:'easeInOutQuad'}, {f:21, v:-2}, {f:25, v:0, e:'easeInOutQuad'}]
            },
            // Secondary motion : la tête suit le torse avec ~3f de décalage
            head: {
                rotation: [{f:0, v:0}, {f:12, v:-8, e:'easeOutQuad'}, {f:20, v:3, e:'easeInOutQuad'}, {f:25, v:0, e:'easeInOutQuad'}]
            },
            // Le poids du corps recule (trébuchement) puis rattrape vers l'avant
            hip: {
                x: [{f:0, v:0}, {f:9, v:-18, e:'easeOutQuad'}, {f:17, v:8, e:'easeInOutQuad'}, {f:25, v:0, e:'easeInOutQuad'}],
                y: [{f:0, v:-70}, {f:9, v:-67, e:'easeOutQuad'}, {f:17, v:-71, e:'easeOutQuad'}, {f:25, v:-70, e:'easeInOutQuad'}]
            },
            // Jambe droite : pas de rattrapage en arrière puis plante/pousse
            legUpper_R: {
                rotation: [{f:0, v:0}, {f:9, v:-35, e:'easeOutQuad'}, {f:17, v:8, e:'easeInOutQuad'}, {f:25, v:0, e:'easeInOutQuad'}]
            },
            // Jambe gauche : se relève/avance en contrepoids puis se replante
            legUpper_L: {
                rotation: [{f:0, v:0}, {f:9, v:20, e:'easeOutQuad'}, {f:17, v:-6, e:'easeInOutQuad'}, {f:25, v:0, e:'easeInOutQuad'}]
            },
            // Bras droit (vide) : moulinet vers l'arrière pour l'équilibre, puis redescend
            armUpper_R: {
                rotation: [{f:0, v:30}, {f:9, v:-60, e:'easeOutQuad'}, {f:17, v:-5, e:'easeInOutQuad'}, {f:25, v:-10, e:'easeOutQuad'}]
            },
            armLower_R: {
                rotation: [{f:0, v:-100}, {f:9, v:-30, e:'easeOutQuad'}, {f:17, v:-25, e:'easeInOutQuad'}, {f:25, v:-20, e:'easeOutQuad'}]
            },
            // Bras gauche : moulinet symétrique (même mécanique que le bras droit)
            armUpper_L: {
                rotation: [{f:0, v:10}, {f:9, v:-50, e:'easeOutQuad'}, {f:17, v:5, e:'easeInOutQuad'}, {f:25, v:10, e:'easeOutQuad'}]
            },
            armLower_L: {
                rotation: [{f:0, v:-20}, {f:9, v:-30, e:'easeOutQuad'}, {f:17, v:-25, e:'easeInOutQuad'}, {f:25, v:-20, e:'easeOutQuad'}]
            },
            // weaponSocket revient à 0° (l'arme n'est plus en jeu pour cette anim)
            weaponSocket: {
                rotation: [{f:0, v:100}, {f:9, v:40, e:'easeOutQuad'}, {f:17, v:10, e:'easeInOutQuad'}, {f:25, v:0, e:'easeOutQuad'}]
            }
        }
    },

    // weapon_fall : ALTERNATIVE à weapon_lost, branchant depuis la même pose de fin
    // de weapon_drop (armUpper_R=30°, armLower_R=-100°, weaponSocket=100°). Ici PAS de
    // perte d'équilibre : le combattant reste stable et regarde son arme tomber au sol.
    // weaponSocket poursuit la rotation de chute amorcée par weapon_drop (100°→~180°,
    // gravité), rebondit au sol (squash/rebond localisé sur weaponSocket.scaleY — PAS
    // sur le torse, car le choc concerne l'arme, pas le combattant). Le bras droit
    // (vide) suit passivement la chute par inertie. Tête + torse anticipent en
    // s'inclinant vers le bas (regard vers l'arme) puis reviennent au neutre.
    weapon_fall: {
        duration: 20, loop: false,
        disarmsOnComplete: true,
        tracks: {
            torso: {
                rotation: [{f:0, v:0}, {f:8, v:5, e:'easeOutQuad'}, {f:10, v:-2, e:'easeOutQuad'}, {f:20, v:0, e:'easeInOutQuad'}]
            },
            // Tête suit le torse avec ~1f de décalage, regard vers l'arme qui tombe
            head: {
                rotation: [{f:0, v:0}, {f:9, v:15, e:'easeOutQuad'}, {f:14, v:5, e:'easeInQuad'}, {f:20, v:0, e:'easeInOutQuad'}]
            },
            hip: {
                x: [{f:0, v:0}, {f:8, v:2, e:'easeOutQuad'}, {f:20, v:0, e:'easeInOutQuad'}],
                y: [{f:0, v:-70}, {f:8, v:-73, e:'easeOutQuad'}, {f:10, v:-71, e:'easeOutQuad'}, {f:20, v:-70, e:'easeInOutQuad'}]
            },
            legUpper_R: {
                rotation: [{f:0, v:0}, {f:8, v:3, e:'easeOutQuad'}, {f:20, v:0, e:'easeInOutQuad'}]
            },
            legUpper_L: {
                rotation: [{f:0, v:0}, {f:8, v:-3, e:'easeOutQuad'}, {f:20, v:0, e:'easeInOutQuad'}]
            },
            // Bras droit (vide) : reste quasi figé pendant la chute (f0-f10, c'est
            // weaponSocket qui pilote la rotation de l'arme), puis retombe inerte
            // une fois l'arme au sol (f10-f20, son orientation n'a plus d'importance
            // visuelle puisque l'arme disparaît à la fin via disarmsOnComplete).
            armUpper_R: {
                rotation: [{f:0, v:30}, {f:8, v:33, e:'easeOutQuad'}, {f:10, v:34}, {f:14, v:15, e:'easeInQuad'}, {f:20, v:-10, e:'easeInOutQuad'}]
            },
            armLower_R: {
                rotation: [{f:0, v:-100}, {f:8, v:-96, e:'easeOutQuad'}, {f:10, v:-94}, {f:14, v:-55, e:'easeInQuad'}, {f:20, v:-20, e:'easeInOutQuad'}]
            },
            // Bras gauche : micro-réaction décalée (~1f), aucun rôle d'équilibre actif
            armUpper_L: {
                rotation: [{f:0, v:10}, {f:9, v:5, e:'easeOutQuad'}, {f:20, v:10, e:'easeInOutQuad'}]
            },
            armLower_L: {
                rotation: [{f:0, v:-20}, {f:9, v:-25, e:'easeOutQuad'}, {f:20, v:-20, e:'easeInOutQuad'}]
            },
            // weaponSocket : pilote la chute (l'arme, déjà inclinée à 100° en sortie
            // de weapon_drop, pivote jusqu'à pointer quasi droit vers le bas — la
            // pointe touche le sol), rebondit légèrement au-delà de la verticale
            // (overshoot), puis oscille avant de se stabiliser. Squash/rebond sur
            // scaleY = impact de l'arme contre le sol (PAS un impact sur le corps).
            weaponSocket: {
                rotation: [{f:0, v:100}, {f:8, v:154, e:'easeInQuad'}, {f:10, v:165, e:'easeOutQuad'}, {f:14, v:145, e:'easeOutQuad'}, {f:20, v:130, e:'easeOutBounce'}],
                scaleY: [{f:0, v:1}, {f:8, v:1}, {f:10, v:0.7, e:'easeInQuad'}, {f:13, v:1.2, e:'easeOutQuad'}, {f:20, v:1, e:'easeInOutQuad'}]
            }
        }
    }
};
