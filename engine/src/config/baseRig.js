export const BASE_RIG = {
    root:       { z: 0, w: 10, h: 10, pX: 5, pY: 5, x: 0, y: 0, parent: null },
    hip:        { z: 5, w: 40, h: 30, pX: 20, pY: 15, x: 0, y: -70, parent: 'root' },
    
    // Jambe Gauche (Arrière plan)
    legUpper_L: { z: 1, w: 24, h: 45, pX: 12, pY: 5, x: -4, y: 5, parent: 'hip' },
    legLower_L: { z: 1, w: 20, h: 50, pX: 10, pY: 5, x: 0, y: 40, parent: 'legUpper_L' },
    foot_L:     { z: 1, w: 35, h: 15, pX: 10, pY: 5, x: -3, y: 48, scaleY: 1.5, parent: 'legLower_L' },
    
    // Bras Gauche (Arrière plan) — z=0 pour passer DERRIERE la jambe gauche (z=1)
    armUpper_L: { z: 0, w: 20, h: 45, pX: 10, pY: 10, x: -20, y: -50, parent: 'torso' },
    armLower_L: { z: 0, w: 18, h: 45, pX: 9,  pY: 10, x: 0,   y: 37,  parent: 'armUpper_L' },
    hand_L:     { z: 0, w: 22, h: 18, pX: 11, pY: 5,  x: 0,   y: 35,  parent: 'armLower_L' },

    // Torse et Tête (Milieu)
    torso:      { z: 4, w: 50, h: 70, pX: 25, pY: 60, x: 0, y: -10, parent: 'hip' },
    head:       { z: 6, w: 50, h: 50, pX: 25, pY: 45, x: 0, y: -65, parent: 'torso' },
    face:       { z: 7, w: 40, h: 40, pX: 20, pY: 20, x: 5, y: -10, parent: 'head' },
    hair:       { z: 8, w: 60, h: 60, pX: 30, pY: 30, x: 0, y: -15, parent: 'head' },

    // Jambe Droite (Premier plan)
    legUpper_R: { z: 9, w: 24, h: 45, pX: 12, pY: 5, x: 1, y: 5, parent: 'hip' },
    legLower_R: { z: 9, w: 20, h: 50, pX: 10, pY: 5, x: 0, y: 40, parent: 'legUpper_R' },
    foot_R:     { z: 9, w: 35, h: 15, pX: 10, pY: 5, x: -1, y: 49, scaleY: 1.5, parent: 'legLower_R' },

    // Bras Droit (Premier plan)
    armUpper_R: { z: 10, w: 20, h: 45, pX: 4, pY: 0, x: -1, y: -48, parent: 'torso' },
    armLower_R: { z: 10, w: 18, h: 45, pX: 9,  pY: 10, x: 13,  y: 48,  parent: 'armUpper_R' },
    hand_R:     { z: 10, w: 22, h: 18, pX: 11, pY: 5,  x: 0,  y: 35,  parent: 'armLower_R' },
    
    // Arme
    weaponSocket:{z: 11, w: 10, h: 10, pX: 5, pY: 5, x: 0, y: 35, parent: 'armLower_R' },
    weapon:      {z: 12, w: 100, h: 20, pX: 20, pY: 10, x: 0, y: 0, parent: 'weaponSocket'}
};
