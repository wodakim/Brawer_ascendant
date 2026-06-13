export const batch2 = {
    walk_backward: {
        duration: 44, loop: true,
        moveX: -2,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            hip: { y: [{f:0, v:-70}, {f:11, v:-73}, {f:22, v:-70}, {f:33, v:-73}, {f:44, v:-70}] },
            torso: { rotation: [{f:0, v:-10}, {f:22, v:-2}, {f:44, v:-10}] },
            head: { rotation: [{f:0, v:2}, {f:11, v:-2}, {f:33, v:2}, {f:44, v:2}] },
            legUpper_L: { rotation: [{f:0, v:20}, {f:22, v:-20}, {f:44, v:20}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:22, v:0}, {f:33, v:35}, {f:44, v:0}] },
            legUpper_R: { rotation: [{f:0, v:-20}, {f:22, v:20}, {f:44, v:-20}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:11, v:35}, {f:22, v:0}, {f:44, v:0}] },
            armUpper_L: { rotation: [{f:0, v:-20}, {f:22, v:20}, {f:44, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:20}, {f:22, v:-20}, {f:44, v:20}] },
            armLower_L: { rotation: [{f:0, v:-25}, {f:22, v:-38}, {f:44, v:-25}] },
            armLower_R: { rotation: [{f:0, v:-35}, {f:22, v:-22}, {f:44, v:-35}] }
        }
    },
    run_forward: {
        duration: 28, loop: true,
        moveX: 6,
        tracks: {
            hip: { y: [{f:0, v:-70}, {f:7, v:-85}, {f:14, v:-70}, {f:21, v:-85}, {f:28, v:-70}] },
            torso: { rotation: [{f:0, v:10}, {f:14, v:14}, {f:28, v:10}] },
            head: { rotation: [{f:0, v:-3}, {f:14, v:3}, {f:28, v:-3}] },
            legUpper_L: { rotation: [{f:0, v:45}, {f:14, v:-45}, {f:28, v:45}] },
            legLower_L: { rotation: [{f:0, v:5}, {f:7, v:65}, {f:14, v:5}, {f:28, v:5}] },
            legUpper_R: { rotation: [{f:0, v:-45}, {f:14, v:45}, {f:28, v:-45}] },
            legLower_R: { rotation: [{f:0, v:5}, {f:14, v:5}, {f:21, v:65}, {f:28, v:5}] },
            armUpper_L: { rotation: [{f:0, v:-50}, {f:14, v:50}, {f:28, v:-50}] },
            armUpper_R: { rotation: [{f:0, v:50}, {f:14, v:-50}, {f:28, v:50}] },
            armLower_L: { rotation: [{f:0, v:-95}, {f:14, v:-80}, {f:28, v:-95}] },
            armLower_R: { rotation: [{f:0, v:-80}, {f:14, v:-95}, {f:28, v:-80}] }
        }
    },
    run_backward: {
        duration: 32, loop: true,
        moveX: -4,
        tracks: {
            hip: { y: [{f:0, v:-70}, {f:8, v:-85}, {f:16, v:-70}, {f:24, v:-85}, {f:32, v:-70}] },
            torso: { rotation: [{f:0, v:-10}, {f:16, v:-14}, {f:32, v:-10}] },
            head: { rotation: [{f:0, v:-3}, {f:16, v:3}, {f:32, v:-3}] },
            legUpper_L: { rotation: [{f:0, v:30}, {f:16, v:-30}, {f:32, v:30}] },
            legLower_L: { rotation: [{f:0, v:5}, {f:16, v:5}, {f:24, v:45}, {f:32, v:5}] },
            legUpper_R: { rotation: [{f:0, v:-30}, {f:16, v:30}, {f:32, v:-30}] },
            legLower_R: { rotation: [{f:0, v:5}, {f:8, v:45}, {f:16, v:5}, {f:32, v:5}] },
            armUpper_L: { rotation: [{f:0, v:-34}, {f:16, v:34}, {f:32, v:-34}] },
            armUpper_R: { rotation: [{f:0, v:34}, {f:16, v:-34}, {f:32, v:34}] },
            armLower_L: { rotation: [{f:0, v:-93}, {f:16, v:-83}, {f:32, v:-93}] },
            armLower_R: { rotation: [{f:0, v:-83}, {f:16, v:-93}, {f:32, v:-83}] }
        }
    },
    step_forward: {
        duration: 18, loop: false,
        moveX: 5,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            hip: { y: [{f:0, v:-70}, {f:9, v:-74}, {f:18, v:-70}] },
            torso: { rotation: [{f:0, v:0}, {f:9, v:8}, {f:18, v:0}] },
            head: { rotation: [{f:0, v:0}, {f:9, v:-3}, {f:18, v:0}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:-15}, {f:14, v:25}, {f:18, v:0}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:6, v:35}, {f:14, v:5}, {f:18, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:9, v:-12}, {f:18, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:9, v:10}, {f:18, v:0}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:5}, {f:14, v:-25}, {f:18, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-22}, {f:14, v:-35}, {f:18, v:-30}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:9, v:20}, {f:18, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:9, v:-28}, {f:18, v:-20}] }
        }
    },
    step_backward: {
        duration: 18, loop: false,
        moveX: -3,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            hip: { y: [{f:0, v:-70}, {f:9, v:-74}, {f:18, v:-70}] },
            torso: { rotation: [{f:0, v:0}, {f:9, v:-8}, {f:18, v:0}] },
            head: { rotation: [{f:0, v:0}, {f:9, v:3}, {f:18, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:15}, {f:14, v:-25}, {f:18, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:6, v:35}, {f:14, v:5}, {f:18, v:0}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:9, v:12}, {f:18, v:0}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:9, v:10}, {f:18, v:0}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:-5}, {f:14, v:25}, {f:18, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-12}, {f:14, v:-25}, {f:18, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:9, v:-20}, {f:18, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:9, v:-38}, {f:18, v:-30}] }
        }
    },
    turn_right: {
        duration: 12, loop: false,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            root: { flipX: [{f:0, v:1}, {f:6, v:0}, {f:12, v:-1}] },
            torso: {
                scaleY: [{f:0, v:1}, {f:6, v:0.85}, {f:12, v:1}],
                rotation: [{f:0, v:0}, {f:6, v:5}, {f:12, v:0}]
            },
            head: { rotation: [{f:0, v:0}, {f:6, v:-6}, {f:12, v:0}] },
            hip: { y: [{f:0, v:-70}, {f:6, v:-73}, {f:12, v:-70}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:25}, {f:12, v:0}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:6, v:20}, {f:12, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:-15}, {f:12, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:6, v:10}, {f:12, v:0}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:-5}, {f:12, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-35}, {f:12, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:5}, {f:12, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-45}, {f:12, v:-30}] }
        }
    },
    turn_left: {
        duration: 12, loop: false,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            root: { flipX: [{f:0, v:1}, {f:6, v:0}, {f:12, v:-1}] },
            torso: {
                scaleY: [{f:0, v:1}, {f:6, v:0.85}, {f:12, v:1}],
                rotation: [{f:0, v:0}, {f:6, v:-5}, {f:12, v:0}]
            },
            head: { rotation: [{f:0, v:0}, {f:6, v:6}, {f:12, v:0}] },
            hip: { y: [{f:0, v:-70}, {f:6, v:-73}, {f:12, v:-70}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:-25}, {f:12, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:6, v:20}, {f:12, v:0}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:15}, {f:12, v:0}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:6, v:10}, {f:12, v:0}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:5}, {f:12, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-45}, {f:12, v:-30}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:-5}, {f:12, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-35}, {f:12, v:-20}] }
        }
    }
};
