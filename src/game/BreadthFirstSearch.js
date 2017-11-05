export class BreadthFirstSearch {
    constructor(map) {
        this.map = map;
    }

    calculateManhattanDistance(origin, destination) {
        return Math.abs(destination.x - origin.x) + Math.abs(destination.y - origin.y)
    }

    tileInMapBounds(tile, map) {
        return tile.x >= 0 && tile.y >= 0 && tile.x < map[0].length && tile.y < map.length;
    }

    isTargetInArray(target, array) {
        let found = false;
        for (let value of array) {
            if (value.x === target.x && value.y === target.y) {
                found = true;
            }
        }
        return found;
    }

    checkNeighbor(tile, tilesToCheck, visitedTiles) {
        if (
            !this.isTargetInArray(tile, tilesToCheck)
            && !this.isTargetInArray(tile, visitedTiles)
            && this.tileInMapBounds(tile, this.map)
            // add conditional here to check if tile is a blocker/obstacle
        ) {
            tilesToCheck.push(tile);
        }
    }

    addNeighbors(tile, tilesToCheck, visitedTiles) {
        this.checkNeighbor({x: tile.x - 1, y: tile.y}, tilesToCheck, visitedTiles);
        this.checkNeighbor({x: tile.x + 1, y: tile.y}, tilesToCheck, visitedTiles);
        this.checkNeighbor({x: tile.x, y: tile.y - 1}, tilesToCheck, visitedTiles);
        this.checkNeighbor({x: tile.x, y: tile.y + 1}, tilesToCheck, visitedTiles);
    }

    findReachableTiles(origin, range) {
        let reachableTiles = [origin];
        let tilesToCheck = [];
        this.addNeighbors(origin, tilesToCheck, reachableTiles);
        while (tilesToCheck.length > 0) {
          let nextTile = tilesToCheck.shift();
          reachableTiles.push(nextTile);
          if (this.calculateManhattanDistance(origin, nextTile) < range) {
              this.addNeighbors(nextTile, tilesToCheck, reachableTiles);
          }
        }
        return reachableTiles;
    }

    isTileReachable(target, origin, range) {
        let reachable = false;
        let reachableTiles = this.findReachableTiles(origin, range);
        for (let reachableTile of reachableTiles) {
            if (reachableTile.x === target.x && reachableTile.y === target.y) {
                reachable = true;
            }
        }
        return reachable;
    }
}