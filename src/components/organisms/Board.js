import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tile} from '../molecules/Tile.js'
import {BreadthFirstSearch} from '../../game/BreadthFirstSearch.js';

export class Board extends Component {
    static propTypes = {
        tiles: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
        selectedTileCoords: PropTypes.object,
        history: PropTypes.object
    }

    // renderTile(x, y) {
    //     return (
    //         <Tile 
    //             value={this.props.tiles[y][x]}
    //             onClick={() => this.props.onClick(x, y)}
    //         />
    //     );
    // }
    
    render() {
        let highlightedTiles = [];
        const selectedTile = this.props.tiles[this.props.selectedTileCoords.y][this.props.selectedTileCoords.x];
        if (selectedTile) {
            let bfs = new BreadthFirstSearch(this.props.tiles);
            switch (selectedTile.fsm.currentState) {
                case 'unmoved':
                    highlightedTiles = bfs.findReachableTiles(this.props.selectedTileCoords, selectedTile.moves)
                    break;
                case 'moved':
                    highlightedTiles = bfs.findReachableTiles(this.props.selectedTileCoords, selectedTile.range)
                    break;
                case 'tookAction':
                    break;
                default:
                    break;
            }
        }
        const rows = this.props.tiles.map((tileRow, rowNumber) => {
            const row = tileRow.map((tile, colNumber) => {
                let tileSelected = false;
                if (rowNumber === this.props.selectedTileCoords.y && colNumber === this.props.selectedTileCoords.x) {
                    tileSelected = true;
                }
                let tileMoveHighlighted = false;
                let tileActionHighlighted = false;
                for (let highlightedTile of highlightedTiles) {
                    if (!tileSelected && highlightedTile.y === rowNumber && highlightedTile.x === colNumber) {
                        switch (selectedTile.fsm.currentState) {
                            case 'unmoved':                            
                                tileMoveHighlighted = true;
                                break;
                            case 'moved':
                                tileActionHighlighted = true;
                                break;
                            default:
                                break;
                        }
                    }
                }
                return (
                    <Tile 
                        key={rowNumber * this.props.tiles.length + colNumber}
                        unit={this.props.tiles[rowNumber][colNumber]}
                        onClick={() => this.props.onClick(colNumber, rowNumber)}
                        tileSelected={tileSelected}
                        tileMoveHighlighted={tileMoveHighlighted}
                        tileActionHighlighted={tileActionHighlighted}
                    />
                )
            });
            return (      
                <div 
                    className="board-row"
                    key={rowNumber}>
                        {row}
                </div>
            )
        });

        return (
            <div>
                {rows}
            </div>
        );
    }
}