export function getNeighbours(x: number, y: number, map: string[][]) {
    const neighbors = [];
    if (x > 0) neighbors.push([x - 1, y]);
    if (y < map[0].length - 1) neighbors.push([x, y + 1]);
    if (x < map.length - 1) neighbors.push([x + 1, y]);
    if (y > 0) neighbors.push([x, y - 1]);
    return neighbors;
}