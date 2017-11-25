export class GameState {
    constructor(firstPlayer) {
        this.history = [];
        this.currentPlayer = firstPlayer;
        this.winner = null;
    }

    copy() {
        let newGameState = new GameState(this.currentPlayer);
        newGameState.history = this.history; // copy each unit out of history instead of a reference to each unit
        newGameState.winner = this.winner;
        return newGameState;
    }
}