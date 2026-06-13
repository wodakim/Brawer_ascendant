export const batch4 = {
    kick_right: {
        duration: 35, loop: false,
        impactFrame: 15,
        tracks: {
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:20, e:'easeOutQuad'}, {f:12, v:-80, e:'easeInQuad'}, {f:15, v:-95, e:'easeOutQuad'}, {f:22, v:-40}, {f:35, v:0, e:'easeOutQuad'}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:6, v:65, e:'easeOutQuad'}, {f:12, v:-8, e:'easeInQuad'}, {f:15, v:-12}, {f:22, v:25}, {f:35, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:-8}, {f:12, v:8}, {f:22, v:-5}, {f:35, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:6, v:10}, {f:12, v:15}, {f:22, v:8}, {f:35, v:0}] },
            torso: { rotation: [{f:0, v:0}, {f:6, v:-10, e:'easeOutQuad'}, {f:12, v:-18, e:'easeInQuad'}, {f:22, v:-8}, {f:35, v:0, e:'easeOutQuad'}] },
            head: { rotation: [{f:0, v:0}, {f:6, v:-5}, {f:12, v:-10}, {f:22, v:-3}, {f:35, v:0}] },
            hip: { y: [{f:0, v:-70}, {f:6, v:-68}, {f:12, v:-76, e:'easeOutQuad'}, {f:22, v:-72}, {f:35, v:-70}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:40}, {f:12, v:110, e:'easeInQuad'}, {f:22, v:50}, {f:35, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-35}, {f:12, v:-60}, {f:22, v:-30}, {f:35, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:-25}, {f:12, v:30}, {f:22, v:0}, {f:35, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-40}, {f:12, v:-15}, {f:22, v:-25}, {f:35, v:-30}] }
        }
    },
    kick_left: {
        duration: 35, loop: false,
        impactFrame: 15,
        tracks: {
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:20, e:'easeOutQuad'}, {f:12, v:-80, e:'easeInQuad'}, {f:15, v:-95, e:'easeOutQuad'}, {f:22, v:-40}, {f:35, v:0, e:'easeOutQuad'}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:6, v:65, e:'easeOutQuad'}, {f:12, v:-8, e:'easeInQuad'}, {f:15, v:-12}, {f:22, v:25}, {f:35, v:0}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:-8}, {f:12, v:8}, {f:22, v:-5}, {f:35, v:0}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:6, v:10}, {f:12, v:15}, {f:22, v:8}, {f:35, v:0}] },
            torso: { rotation: [{f:0, v:0}, {f:6, v:-10, e:'easeOutQuad'}, {f:12, v:-18, e:'easeInQuad'}, {f:22, v:-8}, {f:35, v:0, e:'easeOutQuad'}] },
            head: { rotation: [{f:0, v:0}, {f:6, v:-5}, {f:12, v:-10}, {f:22, v:-3}, {f:35, v:0}] },
            hip: { y: [{f:0, v:-70}, {f:6, v:-68}, {f:12, v:-76, e:'easeOutQuad'}, {f:22, v:-72}, {f:35, v:-70}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:20}, {f:12, v:90, e:'easeInQuad'}, {f:22, v:30}, {f:35, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-45}, {f:12, v:-70}, {f:22, v:-40}, {f:35, v:-30}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:-5}, {f:12, v:50}, {f:22, v:20}, {f:35, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-30}, {f:12, v:-5}, {f:22, v:-15}, {f:35, v:-20}] }
        }
    },
    heavy_kick: {
        duration: 45, loop: false,
        impactFrame: 20,
        tracks: {
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:35, e:'easeOutQuad'}, {f:14, v:-60, e:'easeInQuad'}, {f:20, v:-100, e:'easeOutQuad'}, {f:32, v:-30}, {f:45, v:0, e:'easeInOutQuad'}] },
            legLower_R: { rotation: [{f:0, v:0}, {f:6, v:65, e:'easeOutQuad'}, {f:14, v:10, e:'easeInQuad'}, {f:20, v:-15, e:'easeOutQuad'}, {f:32, v:20}, {f:45, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:-10}, {f:14, v:5}, {f:20, v:15}, {f:32, v:5}, {f:45, v:0}] },
            legLower_L: { rotation: [{f:0, v:0}, {f:6, v:8}, {f:14, v:20}, {f:20, v:35}, {f:32, v:15}, {f:45, v:0}] },
            torso: {
                rotation: [{f:0, v:0}, {f:6, v:12, e:'easeOutQuad'}, {f:14, v:-15, e:'easeInQuad'}, {f:20, v:-22, e:'easeOutQuad'}, {f:32, v:-8}, {f:45, v:0, e:'easeInOutQuad'}],
                scaleX: [{f:0, v:1}, {f:14, v:1.1}, {f:20, v:0.8, e:'easeOutQuad'}, {f:26, v:1.05}, {f:45, v:1}],
                scaleY: [{f:0, v:1}, {f:14, v:0.95}, {f:20, v:1.15, e:'easeOutQuad'}, {f:26, v:0.97}, {f:45, v:1}]
            },
            head: { rotation: [{f:0, v:0}, {f:6, v:6}, {f:14, v:-8}, {f:20, v:-12}, {f:32, v:-3}, {f:45, v:0}] },
            hip: { y: [{f:0, v:-70}, {f:6, v:-67}, {f:14, v:-74}, {f:20, v:-78, e:'easeOutQuad'}, {f:32, v:-73}, {f:45, v:-70}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:35}, {f:14, v:90}, {f:20, v:120, e:'easeOutQuad'}, {f:32, v:50}, {f:45, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-30}, {f:14, v:-55}, {f:20, v:-70}, {f:32, v:-35}, {f:45, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:-30}, {f:14, v:25}, {f:20, v:40}, {f:32, v:5}, {f:45, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-45}, {f:14, v:-10}, {f:20, v:-5}, {f:32, v:-20}, {f:45, v:-30}] }
        }
    }
};
