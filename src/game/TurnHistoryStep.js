export class TurnHistoryStep {
    constructor(tiles, action) {
        this.tiles = tiles;
        this.action = action;
    }
}

export class GameAction {
    constructor(player, unit, action, target) {
        this.player = player;
        this.unit = unit; // 
        this.action = action;
        this.target = target; // x,y coords
    }
}