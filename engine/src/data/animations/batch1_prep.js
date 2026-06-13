export const batch1 = {
    idle_breathing: {
        duration: 80, loop: true,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            torso: {
                scaleY: [
                    {f:0,  v:1,    e:'easeInOutQuad'},
                    {f:20, v:0.94, e:'easeInOutQuad'},
                    {f:40, v:1.03, e:'easeInOutQuad'},
                    {f:60, v:0.97, e:'easeInOutQuad'},
                    {f:80, v:1}
                ],
                scaleX: [
                    {f:0,  v:1,    e:'easeInOutQuad'},
                    {f:20, v:1.03, e:'easeInOutQuad'},
                    {f:40, v:0.98, e:'easeInOutQuad'},
                    {f:60, v:1.02, e:'easeInOutQuad'},
                    {f:80, v:1}
                ],
                y: [
                    {f:0,  v:-10, e:'easeInOutQuad'},
                    {f:20, v:-8,  e:'easeInOutQuad'},
                    {f:40, v:-13, e:'easeInOutQuad'},
                    {f:60, v:-9,  e:'easeInOutQuad'},
                    {f:80, v:-10}
                ]
            },
            head: {
                y: [
                    {f:0,  v:-65, e:'easeInOutQuad'},
                    {f:25, v:-62, e:'easeInOutQuad'},
                    {f:45, v:-67, e:'easeInOutQuad'},
                    {f:65, v:-63, e:'easeInOutQuad'},
                    {f:80, v:-65}
                ],
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:25, v:3,  e:'easeInOutQuad'},
                    {f:45, v:-4, e:'easeInOutQuad'},
                    {f:65, v:2,  e:'easeInOutQuad'},
                    {f:80, v:0}
                ]
            },
            hip: {
                y: [
                    {f:0,  v:-70, e:'easeInOutQuad'},
                    {f:20, v:-68, e:'easeInOutQuad'},
                    {f:40, v:-72, e:'easeInOutQuad'},
                    {f:60, v:-69, e:'easeInOutQuad'},
                    {f:80, v:-70}
                ]
            },
            armUpper_L: {
                rotation: [
                    {f:0,  v:10,  e:'easeInOutQuad'},
                    {f:25, v:16,  e:'easeInOutQuad'},
                    {f:45, v:8,   e:'easeInOutQuad'},
                    {f:65, v:14,  e:'easeInOutQuad'},
                    {f:80, v:10}
                ]
            },
            armLower_L: {
                rotation: [
                    {f:0,  v:-20, e:'easeInOutQuad'},
                    {f:25, v:-28, e:'easeInOutQuad'},
                    {f:45, v:-18, e:'easeInOutQuad'},
                    {f:65, v:-25, e:'easeInOutQuad'},
                    {f:80, v:-20}
                ]
            },
            armUpper_R: {
                rotation: [
                    {f:0,  v:-10, e:'easeInOutQuad'},
                    {f:25, v:-17, e:'easeInOutQuad'},
                    {f:45, v:-8,  e:'easeInOutQuad'},
                    {f:65, v:-15, e:'easeInOutQuad'},
                    {f:80, v:-10}
                ]
            },
            armLower_R: {
                rotation: [
                    {f:0,  v:-30, e:'easeInOutQuad'},
                    {f:25, v:-38, e:'easeInOutQuad'},
                    {f:45, v:-27, e:'easeInOutQuad'},
                    {f:65, v:-35, e:'easeInOutQuad'},
                    {f:80, v:-30}
                ]
            }
        }
    },
    prepare: {
        duration: 25, loop: false,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            hip: {
                y: [
                    {f:0,  v:-70, e:'easeInOutQuad'},
                    {f:12, v:-60, e:'easeOutQuad'},
                    {f:25, v:-63, e:'easeOutQuad'}
                ]
            },
            torso: {
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:8,  v:-8, e:'easeOutQuad'},
                    {f:18, v:12, e:'easeOutQuad'},
                    {f:25, v:10, e:'easeInOutQuad'}
                ],
                scaleY: [
                    {f:0,  v:1,    e:'easeInOutQuad'},
                    {f:12, v:0.93, e:'easeOutQuad'},
                    {f:25, v:0.96, e:'easeInOutQuad'}
                ],
                scaleX: [
                    {f:0,  v:1,    e:'easeInOutQuad'},
                    {f:12, v:1.05, e:'easeOutQuad'},
                    {f:25, v:1.02, e:'easeInOutQuad'}
                ]
            },
            head: {
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:11, v:-5, e:'easeOutQuad'},
                    {f:21, v:5,  e:'easeOutQuad'},
                    {f:25, v:3,  e:'easeInOutQuad'}
                ]
            },
            legUpper_L: {
                rotation: [
                    {f:0,  v:0,   e:'easeInOutQuad'},
                    {f:12, v:-36, e:'easeOutQuad'},
                    {f:25, v:-30, e:'easeInOutQuad'}
                ]
            },
            legLower_L: {
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:12, v:57, e:'easeOutQuad'},
                    {f:25, v:49, e:'easeInOutQuad'}
                ]
            },
            legUpper_R: {
                rotation: [
                    {f:0,  v:0,   e:'easeInOutQuad'},
                    {f:12, v:-36, e:'easeOutQuad'},
                    {f:25, v:-30, e:'easeInOutQuad'}
                ]
            },
            legLower_R: {
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:12, v:57, e:'easeOutQuad'},
                    {f:25, v:49, e:'easeInOutQuad'}
                ]
            },
            armUpper_L: {
                rotation: [
                    {f:0,  v:10, e:'easeInOutQuad'},
                    {f:15, v:-2, e:'easeOutQuad'},
                    {f:25, v:0,  e:'easeInOutQuad'}
                ]
            },
            armLower_L: {
                rotation: [
                    {f:0,  v:-20, e:'easeInOutQuad'},
                    {f:15, v:-37, e:'easeOutQuad'},
                    {f:25, v:-35, e:'easeInOutQuad'}
                ]
            },
            armUpper_R: {
                rotation: [
                    {f:0,  v:-10, e:'easeInOutQuad'},
                    {f:15, v:-22, e:'easeOutQuad'},
                    {f:25, v:-20, e:'easeInOutQuad'}
                ]
            },
            armLower_R: {
                rotation: [
                    {f:0,  v:-30, e:'easeInOutQuad'},
                    {f:15, v:-47, e:'easeOutQuad'},
                    {f:25, v:-45, e:'easeInOutQuad'}
                ]
            }
        }
    },
    focus: {
        duration: 40, loop: false,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme/skill (cf. weapon_idle)
        tracks: {
            torso: {
                scaleY: [
                    {f:0,  v:1,    e:'easeInOutQuad'},
                    {f:10, v:0.97, e:'easeInOutQuad'},
                    {f:20, v:0.95, e:'easeInOutQuad'},
                    {f:30, v:0.96, e:'easeInOutQuad'},
                    {f:40, v:0.96}
                ],
                scaleX: [
                    {f:0,  v:1,    e:'easeInOutQuad'},
                    {f:10, v:1.02, e:'easeInOutQuad'},
                    {f:20, v:1.04, e:'easeInOutQuad'},
                    {f:40, v:1.03}
                ],
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:15, v:8,  e:'easeOutQuad'},
                    {f:40, v:8}
                ]
            },
            head: {
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:18, v:10, e:'easeOutQuad'},
                    {f:40, v:10}
                ],
                y: [
                    {f:0,  v:-65},
                    {f:20, v:-66},
                    {f:25, v:-65},
                    {f:30, v:-66},
                    {f:35, v:-65},
                    {f:40, v:-65}
                ]
            },
            hip: {
                y: [
                    {f:0,  v:-70, e:'easeInOutQuad'},
                    {f:15, v:-65, e:'easeOutQuad'},
                    {f:40, v:-65}
                ]
            },
            armUpper_L: {
                rotation: [
                    {f:0,  v:10,  e:'easeInOutQuad'},
                    {f:15, v:-38, e:'easeOutQuad'},
                    {f:25, v:-36, e:'easeOutQuad'},
                    {f:30, v:-39, e:'easeOutQuad'},
                    {f:35, v:-37, e:'easeOutQuad'},
                    {f:40, v:-38}
                ]
            },
            armLower_L: {
                rotation: [
                    {f:0,  v:-20, e:'easeInOutQuad'},
                    {f:15, v:-44, e:'easeOutQuad'},
                    {f:25, v:-46, e:'easeOutQuad'},
                    {f:30, v:-43, e:'easeOutQuad'},
                    {f:40, v:-45}
                ]
            },
            armUpper_R: {
                rotation: [
                    {f:0,  v:-10, e:'easeInOutQuad'},
                    {f:15, v:-52, e:'easeOutQuad'},
                    {f:25, v:-50, e:'easeOutQuad'},
                    {f:30, v:-53, e:'easeOutQuad'},
                    {f:35, v:-51, e:'easeOutQuad'},
                    {f:40, v:-52}
                ]
            },
            armLower_R: {
                rotation: [
                    {f:0,  v:-30, e:'easeInOutQuad'},
                    {f:15, v:-54, e:'easeOutQuad'},
                    {f:25, v:-56, e:'easeOutQuad'},
                    {f:30, v:-53, e:'easeOutQuad'},
                    {f:40, v:-55}
                ]
            },
            legUpper_L: {
                rotation: [
                    {f:0,  v:0,   e:'easeInOutQuad'},
                    {f:15, v:-26, e:'easeOutQuad'},
                    {f:40, v:-26}
                ]
            },
            legLower_L: {
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:15, v:42, e:'easeOutQuad'},
                    {f:40, v:42}
                ]
            },
            legUpper_R: {
                rotation: [
                    {f:0,  v:0,   e:'easeInOutQuad'},
                    {f:15, v:-26, e:'easeOutQuad'},
                    {f:40, v:-26}
                ]
            },
            legLower_R: {
                rotation: [
                    {f:0,  v:0,  e:'easeInOutQuad'},
                    {f:15, v:42, e:'easeOutQuad'},
                    {f:40, v:42}
                ]
            }
        }
    }
};
