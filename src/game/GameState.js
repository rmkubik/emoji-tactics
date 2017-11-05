export class GameState {
    constructor(firstPlayer) {
        this.history = [];
        this.currentPlayer = firstPlayer;
        this.winner = null;
    }
}