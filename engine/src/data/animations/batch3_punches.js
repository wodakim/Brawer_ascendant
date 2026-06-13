export const batch3 = {
    punch_left: {
        duration: 30, loop: false,
        impactFrame: 20,
        tracks: {
            torso: { rotation: [{f:0, v:0}, {f:10, v:15, e: 'easeOutQuad'}, {f:15, v:-25, e: 'easeInQuad'}, {f:30, v:0, e:'easeOutQuad'}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:10, v:60}, {f:15, v:-70}, {f:20, v:-80}, {f:30, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:10, v:-70}, {f:15, v:10}, {f:20, v:20}, {f:30, v:-20}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:10, v:-60}, {f:15, v:40}, {f:30, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:10, v:-20}, {f:15, v:-90}, {f:30, v:-30}] },
            head: { rotation: [{f:0, v:0}, {f:15, v:-10}, {f:30, v:0}] },
            hip: {
                x: [{f:0, v:0}, {f:10, v:-10}, {f:15, v:25}, {f:30, v:0}],
                y: [{f:0, v:-70}, {f:10, v:-65}, {f:15, v:-75}, {f:30, v:-70}]
            },
            legUpper_L: { rotation: [{f:0, v:0}, {f:10, v:-15}, {f:15, v:10}, {f:30, v:0}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:10, v:10}, {f:15, v:-15}, {f:30, v:0}] }
        }
    },
    double_punch: {
        duration: 45, loop: false,
        impactFrame: [12, 36],
        tracks: {
            torso: { rotation: [{f:0, v:0}, {f:6, v:-15, e:'easeOutQuad'}, {f:9, v:25, e:'easeInQuad'}, {f:18, v:0, e:'easeOutQuad'}, {f:27, v:15, e:'easeOutQuad'}, {f:32, v:-25, e:'easeInQuad'}, {f:45, v:0, e:'easeOutQuad'}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:6, v:40}, {f:9, v:-90}, {f:12, v:-100}, {f:18, v:-10}, {f:27, v:-60}, {f:32, v:40}, {f:45, v:-10}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:6, v:-80}, {f:9, v:0}, {f:12, v:10}, {f:18, v:-30}, {f:27, v:-20}, {f:32, v:-90}, {f:45, v:-30}] },
            armUpper_L: { rotation: [{f:0, v:10}, {f:6, v:-40}, {f:9, v:60}, {f:18, v:10}, {f:27, v:60}, {f:32, v:-70}, {f:36, v:-80}, {f:45, v:10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:6, v:-10}, {f:9, v:-80}, {f:18, v:-20}, {f:27, v:-70}, {f:32, v:10}, {f:36, v:20}, {f:45, v:-20}] },
            head: { rotation: [{f:0, v:0}, {f:9, v:10}, {f:18, v:0}, {f:32, v:-10}, {f:45, v:0}] },
            hip: {
                x: [{f:0, v:0}, {f:6, v:-10}, {f:9, v:25}, {f:18, v:0}, {f:27, v:-10}, {f:32, v:25}, {f:45, v:0}],
                y: [{f:0, v:-70}, {f:6, v:-65}, {f:9, v:-75}, {f:18, v:-70}, {f:27, v:-65}, {f:32, v:-75}, {f:45, v:-70}]
            },
            legUpper_R: { rotation: [{f:0, v:0}, {f:6, v:15}, {f:9, v:-10}, {f:18, v:0}, {f:27, v:10}, {f:32, v:-15}, {f:45, v:0}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:6, v:-10}, {f:9, v:15}, {f:18, v:0}, {f:27, v:-15}, {f:32, v:10}, {f:45, v:0}] }
        }
    },
    headbutt: {
        duration: 28, loop: false,
        impactFrame: 12,
        tracks: {
            torso: {
                rotation: [{f:0, v:0}, {f:3, v:-10, e:'easeOutQuad'}, {f:8, v:40, e:'easeOutQuad'}, {f:12, v:25, e:'easeInQuad'}, {f:18, v:8}, {f:28, v:0, e:'easeOutQuad'}],
                scaleY: [{f:0, v:1}, {f:8, v:0.95}, {f:12, v:1.05}, {f:28, v:1}]
            },
            head: { rotation: [{f:0, v:0}, {f:3, v:-5}, {f:8, v:5}, {f:12, v:60, e:'easeOutQuad'}, {f:18, v:20, e:'easeInQuad'}, {f:28, v:0}] },
            hip: {
                x: [{f:0, v:0}, {f:3, v:-8}, {f:8, v:18, e:'easeOutQuad'}, {f:18, v:5}, {f:28, v:0}],
                y: [{f:0, v:-70}, {f:8, v:-66}, {f:12, v:-72}, {f:28, v:-70}]
            },
            armUpper_L: { rotation: [{f:0, v:10}, {f:8, v:25}, {f:18, v:0}, {f:28, v:10}] },
            armUpper_R: { rotation: [{f:0, v:-10}, {f:8, v:-25}, {f:18, v:0}, {f:28, v:-10}] },
            armLower_L: { rotation: [{f:0, v:-20}, {f:8, v:-30}, {f:18, v:-15}, {f:28, v:-20}] },
            armLower_R: { rotation: [{f:0, v:-30}, {f:8, v:-40}, {f:18, v:-25}, {f:28, v:-30}] },
            legUpper_L: { rotation: [{f:0, v:0}, {f:8, v:8}, {f:18, v:-3}, {f:28, v:0}] },
            legUpper_R: { rotation: [{f:0, v:0}, {f:8, v:8}, {f:18, v:-3}, {f:28, v:0}] }
        }
    }
};
