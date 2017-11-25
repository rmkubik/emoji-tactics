import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Board} from './components/organisms/Board.js';
import {TurnHistoryList} from './components/organisms/TurnHistoryList.js';
import {GameLogic} from './game/GameLogic.js'; 
import {TileInfo} from './components/organisms/TileInfo.js';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.gameLogic = new GameLogic();
        this.state = {
            gameState: this.gameLogic.getCurrentGameState(),
            turnHistoryStep: 0,
            selectedTileCoords: {x: 0, y: 0}
        }
    }

    jumpTo(step) {
        this.setState({
            turnHistoryStep: step
        });
    }

    handleClick(x, y) {
        const history = this.state.gameState.history;
        const current = history[this.state.turnHistoryStep];
        const unit = current.tiles[this.state.selectedTileCoords.y][this.state.selectedTileCoords.x];
        let action = null;
        if (unit) {
            switch (unit.fsm.currentState) {
                case 'unmoved':
                    action = 'move';
                    break;
                case 'moved':
                    action = 'takeAction';
                    break;
                default:
                    break;
            }
            if (unit === current.tiles[y][x]) {
                action = 'skip';
            }
            if (action !== null) {
                this.gameLogic.takeAction(this.state.gameState.currentPlayer.id, action, this.state.selectedTileCoords, {x: x, y: y})
                const newGameState = this.gameLogic.getCurrentGameState();
                this.setState({
                    gameState: newGameState,
                    turnHistoryStep: newGameState.history.length - 1
                });
            }
        }
        if (action === null || action == 'move') {
            this.setState({
                selectedTileCoords: {x: x, y: y}
            });
        }
    }

    render() {
        const history = this.state.gameState.history;
        const current = history[this.state.turnHistoryStep];

        const status = 'Next player: ' + this.state.gameState.currentPlayer.id;

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        tiles={current.tiles} 
                        selectedTileCoords={this.state.selectedTileCoords}
                        history={history}
                        onClick={(x, y) => this.handleClick(x, y)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <TurnHistoryList
                        history={history}
                        currentTurnNumber={this.state.turnHistoryStep}
                        itemOnClick={(turnHistoryStep) => this.jumpTo(turnHistoryStep)}
                    />
                    <TileInfo
                        unit={current.tiles[this.state.selectedTileCoords.y][this.state.selectedTileCoords.x]}
                    />
                </div>
                <span  
                    className="game-end-text" 
                    style={{display: this.state.gameState.winner ? "block" : "none"}}
                >
                    Victory!
                </span>
            </div>
        );
    }
}