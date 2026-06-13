export const baseAnims = {
    idle: {
        duration: 60, loop: true,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            torso: {
                scaleY: [{f: 0, v: 1, e: 'easeInOutQuad'}, {f: 30, v: 0.96, e: 'easeInOutQuad'}, {f: 60, v: 1}],
                scaleX: [{f: 0, v: 1, e: 'easeInOutQuad'}, {f: 30, v: 1.02, e: 'easeInOutQuad'}, {f: 60, v: 1}],
                y: [{f:0, v: -10}, {f:30, v: -8}, {f:60, v: -10}]
            },
            head: { y: [{f:0, v: -65}, {f:30, v: -63}, {f:60, v: -65}], rotation: [{f:0, v:0}, {f:30, v:2}, {f:60, v:0}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:30, v:15}, {f:60, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:30, v:-25}, {f:60, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:30, v:-15}, {f:60, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:30, v:-35}, {f:60, v:-30}] }
        }
    },
    walk_forward: {
        duration: 40, loop: true,
        moveX: 3,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            hip: { y: [{f:0, v:-70}, {f:10, v:-73}, {f:20, v:-70}, {f:30, v:-73}, {f:40, v:-70}] },
            torso: { rotation: [{f:0, v:5}, {f:20, v:-5}, {f:40, v:5}] },
            legUpper_L: { rotation: [{f:0, v:30}, {f:20, v:-30}, {f:40, v:30}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:10, v:50}, {f:20, v:0}, {f:40, v:0}] },
            legUpper_R: { rotation: [{f:0, v:-30}, {f:20, v:30}, {f:40, v:-30}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:30, v:50}, {f:40, v:0}] },
            armUpper_L: { rotation: [{f:0, v:-30}, {f:20, v:30}, {f:40, v:-30}] },
            armUpper_R: { rotation: [{f:0, v:30}, {f:20, v:-30}, {f:40, v:30}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:20, v:-40}, {f:40, v:-20}] },
            armLower_R: { rotation: [{f:0, v:-40}, {f:20, v:-20}, {f:40, v:-40}] }
        }
    },
    punch_right: {
        duration: 30, loop: false,
        impactFrame: 20,
        tracks: {
            torso: { rotation: [{f:0, v:0}, {f:10, v:-15, e: 'easeOutQuad'}, {f:15, v:25, e: 'easeInQuad'}, {f:30, v:0, e:'easeOutQuad'}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:10, v:40}, {f:15, v:-90}, {f:20, v:-100}, {f:30, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:10, v:-80}, {f:15, v:0}, {f:20, v:10}, {f:30, v:-30}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:10, v:-40}, {f:15, v:60}, {f:30, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:10, v:-10}, {f:15, v:-80}, {f:30, v:-20}] },
            head: { rotation: [{f:0, v:0}, {f:15, v:10}, {f:30, v:0}] },
            hip: { 
                x: [{f:0, v:0}, {f:10, v:-10}, {f:15, v:25}, {f:30, v:0}],
                y: [{f:0, v:-70}, {f:10, v:-65}, {f:15, v:-75}, {f:30, v:-70}]
            },
            legUpper_R: { rotation: [{f:0, v:0}, {f:10, v:15}, {f:15, v:-10}, {f:30, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:10, v:-10}, {f:15, v:15}, {f:30, v:0}] }
        }
    },
    hit_light: {
        duration: 25, loop: false,
        tracks: {
            hip: { x: [{f:0, v:0}, {f:3, v:-15, e:'easeOutQuad'}, {f:12, v:-15}, {f:25, v:0, e:'easeInOutQuad'}] },
            torso: { 
                rotation: [{f:0, v:0}, {f:3, v:-35, e:'easeOutQuad'}, {f:12, v:10, e:'easeInQuad'}, {f:25, v:0}],
                scaleX: [{f:0, v:1}, {f:2, v:0.8}, {f:8, v:1.1}, {f:25, v:1}],
                scaleY: [{f:0, v:1}, {f:2, v:1.2}, {f:8, v:0.9}, {f:25, v:1}]
            },
            head: { rotation: [{f:0, v:0}, {f:5, v:-50, e:'easeOutQuad'}, {f:15, v:15}, {f:25, v:0}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:4, v:80}, {f:15, v:-30}, {f:25, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:4, v:-10}, {f:15, v:-70}, {f:25, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:4, v:60}, {f:15, v:-40}, {f:25, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:4, v:-20}, {f:15, v:-80}, {f:25, v:-30}] }
        }
    },
    hit_heavy: {
        duration: 40, loop: false,
        tracks: {
            hip: { 
                x: [{f:0, v:0}, {f:4, v:-40, e:'easeOutQuad'}, {f:20, v:-45}, {f:40, v:0, e:'easeInOutQuad'}],
                y: [{f:0, v:-70}, {f:4, v:-80}, {f:20, v:-65}, {f:40, v:-70}]
            },
            torso: { rotation: [{f:0, v:0}, {f:4, v:-55, e:'easeOutQuad'}, {f:20, v:20, e:'easeInOutQuad'}, {f:40, v:0}] },
            head: { rotation: [{f:0, v:0}, {f:6, v:-75, e:'easeOutQuad'}, {f:22, v:25}, {f:40, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:4, v:-40}, {f:20, v:15}, {f:40, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:4, v:50}, {f:20, v:10}, {f:40, v:0}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:4, v:110}, {f:20, v:-50}, {f:40, v:10}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:4, v:90}, {f:20, v:-60}, {f:40, v:-10}] }
        }
    },
    ko_back: {
        duration: 60, loop: false,
        tracks: {
            hip: { 
                x: [{f:0, v:0}, {f:10, v:-60, e:'linear'}, {f:25, v:-120, e:'easeOutQuad'}, {f:60, v:-120}],
                y: [{f:0, v:-70}, {f:10, v:-160, e:'easeOutQuad'}, {f:25, v:-20, e:'easeInQuad'}, {f:35, v:-45, e:'easeOutQuad'}, {f:45, v:-15, e:'easeInQuad'}, {f:60, v:-15}]
            },
            torso: { rotation: [{f:0, v:0}, {f:10, v:-60}, {f:25, v:-85}, {f:35, v:-70}, {f:45, v:-95}, {f:60, v:-95}] },
            head: { rotation: [{f:0, v:0}, {f:12, v:-85}, {f:25, v:-70}, {f:35, v:-100}, {f:60, v:-90}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:10, v:45}, {f:25, v:-15}, {f:45, v:10}, {f:60, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:10, v:20}, {f:25, v:-10}, {f:60, v:0}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:10, v:70}, {f:25, v:-25}, {f:45, v:5}, {f:60, v:0}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:10, v:130}, {f:25, v:-110}, {f:35, v:-80}, {f:60, v:-130}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:10, v:-10}, {f:25, v:-50}, {f:60, v:-10}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:10, v:110}, {f:25, v:-100}, {f:35, v:-70}, {f:60, v:-120}] }
        }
    },
    dodge_backward: {
        duration: 30, loop: false,
        tracks: {
            hip: { x: [{f:0, v:0}, {f:10, v:-30, e: 'easeOutQuad'}, {f:30, v:0}], rotation: [{f:0, v:0}, {f:10, v:-15}, {f:30, v:0}] },
            torso: { rotation: [{f:0, v:0}, {f:10, v:-20}, {f:30, v:0}] }
        }
    }
};
