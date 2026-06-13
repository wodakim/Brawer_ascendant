export const batch7 = {
    weapon_attack_light: {
        duration: 28, loop: false,
        weaponAttackOverlay: true,
        impactFrame: 11,
        tracks: {
            torso: { rotation: [{f:0, v:0}, {f:5, v:-9, e:'easeOutQuad'}, {f:11, v:17, e:'easeInQuad'}, {f:28, v:0, e:'easeOutQuad'}] },
            head: { rotation: [{f:0, v:0}, {f:11, v:9}, {f:28, v:0, e:'easeOutQuad'}] },
            hip: {
                x: [{f:0, v:0}, {f:5, v:-6}, {f:11, v:17, e:'easeOutQuad'}, {f:28, v:0, e:'easeOutQuad'}],
                y: [{f:0, v:-70}, {f:5, v:-67}, {f:11, v:-75, e:'easeOutQuad'}, {f:28, v:-70, e:'easeOutQuad'}]
            },
            legUpper_R: { rotation: [{f:0, v:0}, {f:5, v:13}, {f:11, v:-9}, {f:28, v:0, e:'easeOutQuad'}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:5, v:-9}, {f:11, v:13}, {f:28, v:0, e:'easeOutQuad'}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:5, v:22, e:'easeOutQuad'}, {f:11, v:-100, e:'easeInQuad'}, {f:17, v:-105}, {f:28, v:-10, e:'easeOutQuad'}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:5, v:-72, e:'easeOutQuad'}, {f:11, v:8, e:'easeInQuad'}, {f:17, v:12}, {f:28, v:-30, e:'easeOutQuad'}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:5, v:-32}, {f:11, v:58, e:'easeInQuad'}, {f:28, v:10, e:'easeOutQuad'}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:5, v:-15}, {f:11, v:-78}, {f:28, v:-20, e:'easeOutQuad'}] },
            weaponSocket: { rotation: [{f:0, v:0}, {f:5, v:18, e:'easeOutQuad'}, {f:11, v:-28, e:'easeInQuad'}, {f:17, v:-15}, {f:28, v:0, e:'easeOutQuad'}] }
        }
    },
    weapon_attack_medium: {
        duration: 35, loop: false,
        weaponAttackOverlay: true,
        impactFrame: 14,
        tracks: {
            torso: { rotation: [{f:0, v:0}, {f:6, v:-20, e:'easeOutQuad'}, {f:14, v:35, e:'easeInQuad'}, {f:22, v:24}, {f:35, v:0, e:'easeOutQuad'}] },
            head: { rotation: [{f:0, v:0}, {f:6, v:-8}, {f:14, v:18}, {f:22, v:12}, {f:35, v:0, e:'easeOutQuad'}] },
            hip: {
                x: [{f:0, v:0}, {f:6, v:-12}, {f:14, v:24, e:'easeOutQuad'}, {f:22, v:14}, {f:35, v:0, e:'easeOutQuad'}],
                y: [{f:0, v:-70}, {f:6, v:-65}, {f:14, v:-77, e:'easeOutQuad'}, {f:35, v:-70, e:'easeOutQuad'}]
            },
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:22}, {f:14, v:-18}, {f:35, v:0, e:'easeOutQuad'}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:-15}, {f:14, v:22}, {f:35, v:0, e:'easeOutQuad'}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:75, e:'easeOutQuad'}, {f:14, v:-105, e:'easeInQuad'}, {f:22, v:-110}, {f:35, v:-10, e:'easeOutQuad'}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-58}, {f:14, v:-78}, {f:22, v:-83}, {f:35, v:-30, e:'easeOutQuad'}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:-42}, {f:14, v:58}, {f:35, v:10, e:'easeOutQuad'}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-12}, {f:14, v:-80}, {f:35, v:-20, e:'easeOutQuad'}] },
            weaponSocket: { rotation: [{f:0, v:0}, {f:6, v:22, e:'easeOutQuad'}, {f:14, v:-28, e:'easeInQuad'}, {f:22, v:-14}, {f:35, v:0, e:'easeOutQuad'}] }
        }
    },
    weapon_attack_heavy: {
        duration: 50, loop: false,
        weaponAttackOverlay: true,
        impactFrame: 24,
        tracks: {
            torso: {
                rotation: [
                    {f:0, v:0}, {f:6, v:-18, e:'easeOutQuad'}, {f:18, v:-28, e:'easeInOutQuad'},
                    {f:24, v:30, e:'easeInQuad'}, {f:32, v:18}, {f:50, v:0, e:'easeInOutQuad'}
                ],
                scaleX: [
                    {f:0, v:1}, {f:18, v:1.08},
                    {f:24, v:0.72, e:'easeInQuad'}, {f:30, v:1.06}, {f:50, v:1, e:'easeInOutQuad'}
                ],
                scaleY: [
                    {f:0, v:1}, {f:18, v:0.92},
                    {f:24, v:1.38, e:'easeInQuad'}, {f:30, v:0.96}, {f:50, v:1, e:'easeInOutQuad'}
                ]
            },
            head: {
                rotation: [
                    {f:0, v:0}, {f:6, v:-10}, {f:18, v:-18},
                    {f:24, v:22, e:'easeInQuad'}, {f:35, v:8}, {f:50, v:0, e:'easeInOutQuad'}
                ]
            },
            hip: {
                x: [
                    {f:0, v:0}, {f:6, v:-10, e:'easeOutQuad'}, {f:18, v:-15},
                    {f:24, v:28, e:'easeInQuad'}, {f:35, v:10}, {f:50, v:0, e:'easeInOutQuad'}
                ],
                y: [
                    {f:0, v:-70}, {f:6, v:-74, e:'easeOutQuad'}, {f:18, v:-78},
                    {f:24, v:-64, e:'easeInQuad'}, {f:35, v:-70}, {f:50, v:-70}
                ]
            },
            armUpper_R: {
                rotation: [
                    {f:0, v:-10}, {f:6, v:-55, e:'easeOutQuad'}, {f:18, v:-155, e:'easeInOutQuad'},
                    {f:24, v:-30, e:'easeInQuad'}, {f:30, v:45}, {f:50, v:-10, e:'easeInOutQuad'}
                ]
            },
            armLower_R: {
                rotation: [
                    {f:0, v:-30}, {f:6, v:-55, e:'easeOutQuad'}, {f:18, v:90, e:'easeInOutQuad'},
                    {f:24, v:-15, e:'easeInQuad'}, {f:30, v:-45}, {f:50, v:-30, e:'easeInOutQuad'}
                ]
            },
            armUpper_L: {
                rotation: [
                    {f:0, v:10}, {f:6, v:40, e:'easeOutQuad'}, {f:18, v:70, e:'easeInOutQuad'},
                    {f:24, v:-25, e:'easeInQuad'}, {f:35, v:-5}, {f:50, v:10, e:'easeInOutQuad'}
                ]
            },
            armLower_L: {
                rotation: [
                    {f:0, v:-20}, {f:6, v:-50}, {f:18, v:-80},
                    {f:24, v:-10, e:'easeInQuad'}, {f:35, v:-30}, {f:50, v:-20, e:'easeInOutQuad'}
                ]
            },
            legUpper_R: {
                rotation: [
                    {f:0, v:0}, {f:8, v:-10}, {f:18, v:-14},
                    {f:24, v:18, e:'easeInQuad'}, {f:35, v:5}, {f:50, v:0, e:'easeInOutQuad'}
                ]
            },
            legUpper_L: {
                rotation: [
                    {f:0, v:0}, {f:8, v:12}, {f:18, v:16},
                    {f:24, v:-14, e:'easeInQuad'}, {f:35, v:-3}, {f:50, v:0, e:'easeInOutQuad'}
                ]
            },
            legLower_R: {
                rotation: [
                    {f:0, v:0}, {f:8, v:10}, {f:18, v:14},
                    {f:24, v:6}, {f:50, v:0, e:'easeInOutQuad'}
                ]
            },
            legLower_L: {
                rotation: [
                    {f:0, v:0}, {f:8, v:12}, {f:18, v:16},
                    {f:24, v:8}, {f:50, v:0, e:'easeInOutQuad'}
                ]
            },
            weaponSocket: {
                rotation: [
                    {f:0, v:0}, {f:6, v:18, e:'easeOutQuad'}, {f:18, v:28},
                    {f:24, v:-28, e:'easeInQuad'}, {f:32, v:-12}, {f:50, v:0, e:'easeInOutQuad'}
                ]
            }
        }
    },
    weapon_critical: {
        duration: 60, loop: false,
        weaponAttackOverlay: true,
        impactFrame: 21,
        tracks: {
            torso: {
                rotation: [
                    {f:0, v:0}, {f:8, v:-15, e:'easeOutQuad'}, {f:20, v:-35, e:'easeInOutQuad'},
                    {f:21, v:40, e:'easeInQuad'}, {f:30, v:22}, {f:45, v:8}, {f:60, v:0, e:'easeInOutQuad'}
                ],
                scaleX: [
                    {f:0, v:1}, {f:20, v:1.1, e:'easeInOutQuad'},
                    {f:21, v:0.65, e:'easeInQuad'}, {f:30, v:1.12}, {f:45, v:1.02}, {f:60, v:1, e:'easeInOutQuad'}
                ],
                scaleY: [
                    {f:0, v:1}, {f:20, v:0.9, e:'easeInOutQuad'},
                    {f:21, v:1.5, e:'easeInQuad'}, {f:30, v:0.9}, {f:45, v:1.0}, {f:60, v:1, e:'easeInOutQuad'}
                ]
            },
            head: {
                rotation: [
                    {f:0, v:0}, {f:8, v:-10}, {f:20, v:-22, e:'easeInOutQuad'},
                    {f:21, v:28, e:'easeInQuad'}, {f:30, v:15}, {f:45, v:5}, {f:60, v:0, e:'easeInOutQuad'}
                ]
            },
            hip: {
                x: [
                    {f:0, v:0}, {f:8, v:-10, e:'easeOutQuad'}, {f:20, v:-20, e:'easeInOutQuad'},
                    {f:21, v:40, e:'easeInQuad'}, {f:30, v:22}, {f:45, v:6}, {f:60, v:0, e:'easeInOutQuad'}
                ],
                y: [
                    {f:0, v:-70}, {f:8, v:-73, e:'easeOutQuad'}, {f:20, v:-76, e:'easeInOutQuad'},
                    {f:21, v:-60, e:'easeInQuad'}, {f:30, v:-70}, {f:60, v:-70}
                ]
            },
            armUpper_R: {
                rotation: [
                    {f:0, v:-10}, {f:8, v:20, e:'easeOutQuad'}, {f:20, v:50, e:'easeInOutQuad'},
                    {f:21, v:-65, e:'easeInQuad'}, {f:30, v:-45}, {f:45, v:-25}, {f:60, v:-10, e:'easeInOutQuad'}
                ]
            },
            armLower_R: {
                rotation: [
                    {f:0, v:-30}, {f:8, v:-65, e:'easeOutQuad'}, {f:20, v:-100, e:'easeInOutQuad'},
                    {f:21, v:15, e:'easeInQuad'}, {f:30, v:-5}, {f:45, v:-20}, {f:60, v:-30, e:'easeInOutQuad'}
                ]
            },
            armUpper_L: {
                rotation: [
                    {f:0, v:10}, {f:8, v:-25, e:'easeOutQuad'}, {f:20, v:-50, e:'easeInOutQuad'},
                    {f:21, v:50, e:'easeInQuad'}, {f:30, v:25}, {f:45, v:15}, {f:60, v:10, e:'easeInOutQuad'}
                ]
            },
            armLower_L: {
                rotation: [
                    {f:0, v:-20}, {f:8, v:-40, e:'easeOutQuad'}, {f:20, v:-60, e:'easeInOutQuad'},
                    {f:21, v:-70, e:'easeInQuad'}, {f:30, v:-40}, {f:45, v:-25}, {f:60, v:-20, e:'easeInOutQuad'}
                ]
            },
            legUpper_R: {
                rotation: [
                    {f:0, v:0}, {f:8, v:-12}, {f:20, v:-22, e:'easeInOutQuad'},
                    {f:21, v:32, e:'easeInQuad'}, {f:30, v:8}, {f:60, v:0, e:'easeInOutQuad'}
                ]
            },
            legUpper_L: {
                rotation: [
                    {f:0, v:0}, {f:8, v:12}, {f:20, v:22, e:'easeInOutQuad'},
                    {f:21, v:-26, e:'easeInQuad'}, {f:30, v:-6}, {f:60, v:0, e:'easeInOutQuad'}
                ]
            },
            legLower_R: {
                rotation: [
                    {f:0, v:0}, {f:8, v:10}, {f:20, v:18, e:'easeInOutQuad'},
                    {f:21, v:10}, {f:60, v:0, e:'easeInOutQuad'}
                ]
            },
            legLower_L: {
                rotation: [
                    {f:0, v:0}, {f:8, v:12}, {f:20, v:20, e:'easeInOutQuad'},
                    {f:21, v:12}, {f:60, v:0, e:'easeInOutQuad'}
                ]
            },
            weaponSocket: {
                rotation: [
                    {f:0, v:0}, {f:8, v:15, e:'easeOutQuad'}, {f:20, v:25, e:'easeInOutQuad'},
                    {f:21, v:0, e:'easeInQuad'}, {f:30, v:-8}, {f:45, v:-2}, {f:60, v:0, e:'easeInOutQuad'}
                ]
            }
        }
    },
    weapon_combo: {
        duration: 40, loop: false,
        weaponAttackOverlay: true,
        impactFrame: [11, 29],
        tracks: {
            torso: { rotation: [{f:0, v:0}, {f:5, v:-14, e:'easeOutQuad'}, {f:11, v:30, e:'easeInQuad'}, {f:16, v:18}, {f:23, v:-8, e:'easeOutQuad'}, {f:29, v:-30, e:'easeInQuad'}, {f:40, v:0, e:'easeOutQuad'}] },
            head: { rotation: [{f:0, v:0}, {f:5, v:-7}, {f:11, v:16}, {f:16, v:9}, {f:23, v:-5}, {f:29, v:-14}, {f:40, v:0, e:'easeOutQuad'}] },
            hip: {
                x: [{f:0, v:0}, {f:5, v:-9, e:'easeOutQuad'}, {f:11, v:25, e:'easeOutQuad'}, {f:16, v:11}, {f:23, v:-4}, {f:29, v:35, e:'easeOutQuad'}, {f:40, v:0, e:'easeOutQuad'}],
                y: [{f:0, v:-70}, {f:5, v:-73, e:'easeOutQuad'}, {f:11, v:-77, e:'easeOutQuad'}, {f:16, v:-72}, {f:23, v:-71}, {f:29, v:-76, e:'easeOutQuad'}, {f:40, v:-70, e:'easeOutQuad'}]
            },
            legUpper_R: { rotation: [{f:0, v:0}, {f:5, v:18}, {f:11, v:-14}, {f:16, v:-6}, {f:23, v:10}, {f:29, v:-16}, {f:40, v:0, e:'easeOutQuad'}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:5, v:-12}, {f:11, v:16}, {f:16, v:8}, {f:23, v:-8}, {f:29, v:14}, {f:40, v:0, e:'easeOutQuad'}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:5, v:62, e:'easeOutQuad'}, {f:11, v:-70, e:'easeInQuad'}, {f:16, v:-104}, {f:23, v:20, e:'easeOutQuad'}, {f:29, v:-45, e:'easeInQuad'}, {f:40, v:-10, e:'easeOutQuad'}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:5, v:-56, e:'easeOutQuad'}, {f:11, v:10, e:'easeInQuad'}, {f:16, v:-82}, {f:23, v:-60, e:'easeOutQuad'}, {f:29, v:30, e:'easeInQuad'}, {f:40, v:-30, e:'easeOutQuad'}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:5, v:-30, e:'easeOutQuad'}, {f:11, v:55, e:'easeInQuad'}, {f:16, v:35}, {f:23, v:-20, e:'easeOutQuad'}, {f:29, v:-45, e:'easeInQuad'}, {f:40, v:10, e:'easeOutQuad'}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:5, v:-10, e:'easeOutQuad'}, {f:11, v:-75, e:'easeInQuad'}, {f:16, v:-55}, {f:23, v:-25, e:'easeOutQuad'}, {f:29, v:-15, e:'easeInQuad'}, {f:40, v:-20, e:'easeOutQuad'}] },
            weaponSocket: { rotation: [{f:0, v:0}, {f:5, v:20, e:'easeOutQuad'}, {f:11, v:-15, e:'easeInQuad'}, {f:16, v:-12}, {f:23, v:12, e:'easeOutQuad'}, {f:29, v:20, e:'easeInQuad'}, {f:40, v:0, e:'easeOutQuad'}] }
        }
    },
    weapon_combo_crit: {
        duration: 63, loop: false,
        weaponAttackOverlay: true,
        impactFrame: [11, 29, 39],
        tracks: {
            torso: {
                rotation: [{f:0, v:0}, {f:5, v:-14, e:'easeOutQuad'}, {f:11, v:30, e:'easeInQuad'}, {f:16, v:18}, {f:23, v:-8, e:'easeOutQuad'}, {f:29, v:-30, e:'easeInQuad'}, {f:38, v:-40, e:'easeInOutQuad'}, {f:39, v:45, e:'easeInQuad'}, {f:48, v:22}, {f:63, v:0, e:'easeInOutQuad'}],
                scaleX: [{f:0, v:1}, {f:29, v:1}, {f:38, v:1.08, e:'easeInOutQuad'}, {f:39, v:0.65, e:'easeInQuad'}, {f:48, v:1.1}, {f:63, v:1, e:'easeInOutQuad'}],
                scaleY: [{f:0, v:1}, {f:29, v:1}, {f:38, v:0.92, e:'easeInOutQuad'}, {f:39, v:1.5, e:'easeInQuad'}, {f:48, v:0.92}, {f:63, v:1, e:'easeInOutQuad'}]
            },
            head: { rotation: [{f:0, v:0}, {f:5, v:-7}, {f:11, v:16}, {f:16, v:9}, {f:23, v:-5}, {f:29, v:-14}, {f:38, v:-25, e:'easeInOutQuad'}, {f:39, v:30, e:'easeInQuad'}, {f:48, v:12}, {f:63, v:0, e:'easeInOutQuad'}] },
            hip: {
                x: [{f:0, v:0}, {f:5, v:-9, e:'easeOutQuad'}, {f:11, v:25, e:'easeOutQuad'}, {f:16, v:11}, {f:23, v:-4}, {f:29, v:35, e:'easeOutQuad'}, {f:38, v:-10, e:'easeInOutQuad'}, {f:39, v:42, e:'easeInQuad'}, {f:48, v:20}, {f:63, v:0, e:'easeInOutQuad'}],
                y: [{f:0, v:-70}, {f:5, v:-73, e:'easeOutQuad'}, {f:11, v:-77, e:'easeOutQuad'}, {f:16, v:-72}, {f:23, v:-71}, {f:29, v:-76, e:'easeOutQuad'}, {f:38, v:-78, e:'easeInOutQuad'}, {f:39, v:-62, e:'easeInQuad'}, {f:48, v:-72}, {f:63, v:-70, e:'easeInOutQuad'}]
            },
            legUpper_R: { rotation: [{f:0, v:0}, {f:5, v:18}, {f:11, v:-14}, {f:16, v:-6}, {f:23, v:10}, {f:29, v:-16}, {f:38, v:-24, e:'easeInOutQuad'}, {f:39, v:30, e:'easeInQuad'}, {f:48, v:6}, {f:63, v:0, e:'easeInOutQuad'}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:5, v:-12}, {f:11, v:16}, {f:16, v:8}, {f:23, v:-8}, {f:29, v:14}, {f:38, v:22, e:'easeInOutQuad'}, {f:39, v:-26, e:'easeInQuad'}, {f:48, v:-6}, {f:63, v:0, e:'easeInOutQuad'}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:5, v:62, e:'easeOutQuad'}, {f:11, v:-70, e:'easeInQuad'}, {f:16, v:-104}, {f:23, v:20, e:'easeOutQuad'}, {f:29, v:-45, e:'easeInQuad'}, {f:38, v:80, e:'easeInOutQuad'}, {f:39, v:-65, e:'easeInQuad'}, {f:48, v:-40}, {f:63, v:-10, e:'easeInOutQuad'}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:5, v:-56, e:'easeOutQuad'}, {f:11, v:10, e:'easeInQuad'}, {f:16, v:-82}, {f:23, v:-60, e:'easeOutQuad'}, {f:29, v:30, e:'easeInQuad'}, {f:38, v:-85, e:'easeInOutQuad'}, {f:39, v:10, e:'easeInQuad'}, {f:48, v:-10}, {f:63, v:-30, e:'easeInOutQuad'}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:5, v:-30, e:'easeOutQuad'}, {f:11, v:55, e:'easeInQuad'}, {f:16, v:35}, {f:23, v:-20, e:'easeOutQuad'}, {f:29, v:-45, e:'easeInQuad'}, {f:38, v:-65, e:'easeInOutQuad'}, {f:39, v:50, e:'easeInQuad'}, {f:48, v:22}, {f:63, v:10, e:'easeInOutQuad'}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:5, v:-10, e:'easeOutQuad'}, {f:11, v:-75, e:'easeInQuad'}, {f:16, v:-55}, {f:23, v:-25, e:'easeOutQuad'}, {f:29, v:-15, e:'easeInQuad'}, {f:38, v:-45, e:'easeInOutQuad'}, {f:39, v:-70, e:'easeInQuad'}, {f:48, v:-38}, {f:63, v:-20, e:'easeInOutQuad'}] },
            weaponSocket: { rotation: [{f:0, v:0}, {f:5, v:20, e:'easeOutQuad'}, {f:11, v:-15, e:'easeInQuad'}, {f:16, v:-12}, {f:23, v:12, e:'easeOutQuad'}, {f:29, v:20, e:'easeInQuad'}, {f:38, v:28, e:'easeInOutQuad'}, {f:39, v:0, e:'easeInQuad'}, {f:48, v:-10}, {f:63, v:0, e:'easeInOutQuad'}] }
        }
    }
};
