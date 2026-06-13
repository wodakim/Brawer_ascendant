export const batch6 = {
    weapon_draw: {
        duration: 35, loop: false,
        tracks: {
            torso: { rotation: [{f:0, v:0}, {f:8, v:-8, e:'easeOutQuad'}, {f:18, v:-12, e:'easeInQuad'}, {f:27, v:-5}, {f:35, v:0, e:'easeOutQuad'}] },
            head: { rotation: [{f:0, v:0}, {f:8, v:-6}, {f:18, v:-10}, {f:27, v:-3}, {f:35, v:0}] },
            hip: {
                x: [{f:0, v:0}, {f:8, v:-5}, {f:18, v:-8, e:'easeOutQuad'}, {f:27, v:-3}, {f:35, v:0}],
                y: [{f:0, v:-70}, {f:8, v:-68}, {f:18, v:-66, e:'easeOutQuad'}, {f:27, v:-69}, {f:35, v:-70}]
            },
            legUpper_R: { rotation: [{f:0, v:0}, {f:8, v:5}, {f:18, v:8}, {f:27, v:3}, {f:35, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:8, v:-3}, {f:18, v:-5}, {f:27, v:-2}, {f:35, v:0}] },
            // Bras droit : plonge vers la hanche/ceinture (pic f18, main proche de la
            // hanche — c'est là que l'arme apparaît via le pop weaponSocket ci-dessous),
            // puis remonte vers une position de garde (f27→f35).
            armUpper_R: { rotation: [{f:0, v:-10}, {f:8, v:50, e:'easeOutQuad'}, {f:18, v:75, e:'easeInQuad'}, {f:27, v:20}, {f:35, v:-10, e:'easeOutQuad'}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:8, v:-85, e:'easeOutQuad'}, {f:18, v:-115, e:'easeInQuad'}, {f:27, v:-55}, {f:35, v:-30}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:8, v:-15}, {f:18, v:20}, {f:27, v:5}, {f:35, v:10}] }, // Contre-balancier
            armLower_L: { rotation: [{f:0, v:-20}, {f:8, v:-35}, {f:18, v:-10}, {f:27, v:-25}, {f:35, v:-20}] },
            weapon: {
                scaleX: [{f:0, v:0}, {f:17, v:0}, {f:18, v:1}],
                scaleY: [{f:0, v:0}, {f:17, v:0}, {f:18, v:1}]
            }
        }
    },
    weapon_idle: {
        duration: 50, loop: true,
        weaponStyleOverlay: true, // Animator.update() appliquera additivement la surcouche d'arme
        tracks: {
            torso: {
                scaleY: [{f: 0, v: 1, e: 'easeInOutQuad'}, {f: 25, v: 0.96, e: 'easeInOutQuad'}, {f: 50, v: 1}],
                scaleX: [{f:0, v:1, e:'easeInOutQuad'}, {f:25, v:1.02, e:'easeInOutQuad'}, {f:50, v:1}],
                y: [{f: 0, v: -10}, {f: 25, v: -8}, {f: 50, v: -10}]
            },
            head: { y: [{f: 0, v: -65}, {f: 25, v: -63}, {f: 50, v: -65}], rotation: [{f: 0, v: 0}, {f: 25, v: 2}, {f: 50, v: 0}] },
            armUpper_L: { rotation: [{f: 0, v: 10}, {f: 25, v: 15}, {f: 50, v: 10}] },
            armLower_L: { rotation: [{f: 0, v: -20}, {f: 25, v: -25}, {f: 50, v: -20}] },
            armUpper_R: { rotation: [{f: 0, v: -10}, {f: 25, v: -15}, {f: 50, v: -10}] },
            armLower_R: { rotation: [{f: 0, v: -30}, {f: 25, v: -35}, {f: 50, v: -30}] }
        }
    }
};
