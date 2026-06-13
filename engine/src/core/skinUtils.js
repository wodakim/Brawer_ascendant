import { SKIN_COUNTS } from '../config/constants.js';

/**
 * Hash djb2 déterministe : même nom → même index → même skin.
 * @param {string} playerName  Nom du joueur
 * @param {number} skinCount   Nombre de variantes disponibles pour cette partie
 * @returns {number} Index entre 0 et skinCount-1
 */
export function getCharacterIndex(playerName, skinCount = 1) {
    let hash = 5381;
    const str = (playerName || 'default').toLowerCase().trim();
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
        hash = hash & hash; // 32-bit
    }
    return Math.abs(hash) % skinCount;
}

/**
 * Retourne le dictionnaire de chemins SVG pour les nœuds VISUELS du rig.
 * Seuls les 12 nœuds ayant un SVG dans ../characters/ sont mappés.
 *
 * @param {string} playerName  Nom du joueur (détermine le skin via hash)
 * @param {Object} skinCounts  Optionnel : { partName: nbVariantes } pour chaque partie
 * @returns {Object} Map nodeId → chemin SVG
 */
export function getCharacterParts(playerName, skinCounts = SKIN_COUNTS) {
    const base = '../characters/';
    const idx  = n => getCharacterIndex(playerName, n);

    return {
        head:       `${base}head/${idx(skinCounts.head || 1)}.svg`,
        torso:      `${base}torso/${idx(skinCounts.torso || 1)}.svg`,
        armUpper_L: `${base}arm_left_up/${idx(skinCounts.arm_left_up || 1)}.svg`,
        armLower_L: `${base}arm_left_down/${idx(skinCounts.arm_left_down || 1)}.svg`,
        hand_L:     `${base}hand_left/${idx(skinCounts.hand_left || 1)}.svg`,
        armUpper_R: `${base}arm_right_up/${idx(skinCounts.arm_right_up || 1)}.svg`,
        armLower_R: `${base}arm_right_down/${idx(skinCounts.arm_right_down || 1)}.svg`,
        hand_R:     `${base}hand_right/${idx(skinCounts.hand_right || 1)}.svg`,
        legUpper_L: `${base}leg_left/${idx(skinCounts.leg_left || 1)}.svg`,
        legLower_L: `${base}leg_down_left/${idx(skinCounts.leg_down_left || 1)}.svg`,
        legUpper_R: `${base}leg_right/${idx(skinCounts.leg_right || 1)}.svg`,
        legLower_R: `${base}leg_down_right/${idx(skinCounts.leg_down_right || 1)}.svg`,
        foot_L:     `${base}feet_left/${idx(skinCounts.feet_left || 1)}.svg`,
        foot_R:     `${base}feet_right/${idx(skinCounts.feet_right || 1)}.svg`
    };
}
