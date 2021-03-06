import {GameState} from './GameState.js'
import {TurnHistoryStep, GameAction} from './TurnHistoryStep.js'
import {Unit} from './Unit.js'
import {Player} from './Player.js'

const bombIcon = '\uD83D\uDCA3';
const moonIcon = '\ud83c\udf1c';
const bowIcon = '\ud83c\udff9';
const raceCarIcon = '\ud83c\udfce';
const turtleIcon = '\ud83d\udc22';
const swordIcon ='\ud83d\udde1';


export class GameLogic {
    constructor() {
        // need new players
        this.players = [];
        this.players.push(new Player(0));
        this.players.push(new Player(1));
        
        // setup initial game state
        this.gameState = new GameState(this.players[0]);

        // setup initial board/history step
        const height = 12;
        const width = 10;
        let tiles = [];
        for (let i = 0; i < height; i++) {
            tiles.push(Array(width).fill(null));
        }

        this.players[0].units.push(new Unit(moonIcon, 5, 4, 4, 3, this.players[0]));
        this.players[0].units.push(new Unit(bowIcon, 5, 2, 5, 3, this.players[0]));
        this.players[0].units.push(new Unit(raceCarIcon, 4, 7, 1, 4, this.players[0]));
        this.players[0].units.push(new Unit(turtleIcon, 15, 3, 1, 1, this.players[0]));
        this.players[1].units.push(new Unit(moonIcon, 5, 4, 4, 3, this.players[1]));
        this.players[1].units.push(new Unit(bowIcon, 5, 2, 5, 3, this.players[1]));
        this.players[1].units.push(new Unit(raceCarIcon, 4, 7, 1, 4, this.players[1]));
        this.players[1].units.push(new Unit(turtleIcon, 15, 3, 1, 1, this.players[1]));

        tiles[2][5] = this.players[0].units[0];
        tiles[2][6] = this.players[0].units[1];
        tiles[2][3] = this.players[0].units[2];
        tiles[2][4] = this.players[0].units[3];
        tiles[9][5] = this.players[1].units[0];
        tiles[9][4] = this.players[1].units[1];
        tiles[9][6] = this.players[1].units[2];
        tiles[9][3] = this.players[1].units[3];
        this.gameState.history = this.gameState.history.concat(new TurnHistoryStep(tiles, null));
    }

    takeAction(playerId, action, origin, target) {
        // confirm correct player
        if (playerId !== this.gameState.currentPlayer.id) {
            return;
        }
        
        // get current state of the game before new move
        const history = this.gameState.history.slice(0, this.gameState.history.length);
        const current = this.gameState.history[history.length - 1];
        const tiles = current.tiles.map(
            (row) => {
                return row.slice();
            }
        );
        
        // confirm this is a valid unit
        if (tiles[origin.y][origin.x] !== null) {
            let unit = tiles[origin.y][origin.x];
            if (unit.owner === this.gameState.currentPlayer) {
                if (unit.isInputValid(action, origin, target, tiles)) {
                    unit.handleInput(action, origin, target, tiles);

                    // record the move in new history step 
                    this.gameState.history = history.concat([{
                        tiles: tiles,
                        action: new GameAction(
                            this.gameState.currentPlayer,
                            unit,
                            action,
                            target
                        )
                    }])
                }
            }
        }
        
        // Did this action end the game? (only one team has alive units)
        let playersWithAliveUnits = this.players.filter((player) => {
            return player.units.some((unit) => {
                return unit.fsm.currentState !== 'dead';
            });
        })
        if (playersWithAliveUnits.length === 1) {
            this.gameState.winner = playersWithAliveUnits[0];
        } else if (playersWithAliveUnits.length === 0) {
            this.gameState.winner = "draw";
        }

        // has current player moved all units?
        const finishedTurn = this.gameState.currentPlayer.units.every((unit) => {
            return unit.fsm.currentState === 'tookAction' || unit.fsm.currentState === 'dead'
        })
        if (finishedTurn) {
            // move this logic to a standby phase, or opening turn phase
            for(let unit of this.gameState.currentPlayer.units) {
                unit.handleInput('reset');
            }
            this.gameState.currentPlayer = this.getNextPlayer();
        }
    }

    // get current game state
    getCurrentGameState() {
        return this.gameState.copy();
    }

    getNextPlayer() {
        if (this.gameState.currentPlayer.id < this.players.length - 1) {
            return this.players[this.gameState.currentPlayer.id + 1];
        } else {
            return this.players[0];
        }
    }
}