import {BreadthFirstSearch} from './BreadthFirstSearch';

const map = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
const floodFillDistance1 = [{x: 1, y: 1}, {x: 0, y: 1}, {x: 2, y: 1}, {x: 1, y: 0}, {x: 1, y: 2}];
const floodFillDistance2 = [{x: 1, y: 1}, {x: 0, y: 1}, {x: 2, y: 1}, {x: 1, y: 0}, {x: 1, y: 2}, {x: 0, y: 0}, {x: 0, y: 2}, {x: 2, y: 0}, {x:2, y: 2}];

let bfs = new BreadthFirstSearch(map);

it("Filling empty map with range 1 should return all tiles", () => {
    expect(bfs.findReachableTiles({x: 1, y: 1}, 1)).toHaveLength(floodFillDistance1.length);
    expect(bfs.findReachableTiles({x: 1, y: 1}, 1)).toEqual(expect.arrayContaining(floodFillDistance1));
});


it("Filling empty map with range 2 should return all tiles", () => {
    expect(bfs.findReachableTiles({x: 1, y: 1}, 2)).toHaveLength(floodFillDistance2.length);
    expect(bfs.findReachableTiles({x: 1, y: 1}, 2)).toEqual(expect.arrayContaining(floodFillDistance2));
});