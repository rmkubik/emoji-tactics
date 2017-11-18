export class GameState {
    constructor(firstPlayer) {
        this.history = [];
        this.currentPlayer = firstPlayer;
        this.winner = null;
    }

    copy() {
        let newGameState = new GameState(this.currentPlayer);
        newGameState.history = this.history;
        newGameState.winner = this.winner;
        return newGameState;
    }
}