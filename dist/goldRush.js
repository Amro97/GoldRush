const EMPTY_CELL = '.';
const COIN_CELL = 'c';
const BLOCK_CELL = 'b'
const P1_CELL = 1;
const P2_CELL = 2;
const SCORE_PER_COIN = 10;
const RIGHT = 'right'
const LEFT = 'left'
const DOWN = 'down'
const UP = 'up'

class GoldRush extends Matrix {
    constructor(r, c) {
        super(r, c)
        this.p1 = { sign: 1, x: 0, y: 0, score: 0}
        this.p2 = { sign: 2, x: c - 1, y: r - 1, score: 0}
        this.matrix[this.p1.y][this.p1.x] = P1_CELL
        this.matrix[this.p2.y][this.p2.x] = P2_CELL
        this.totalCoins = ((r*c)-((r * c) / 3)-2)
        this.wonCoins = 0
        this.generateCoins(r, c)
        this.generateBlocks(r, c)
    }

    generateCoins(r, c) {
        this.generateCells(r, c, COIN_CELL, this.totalCoins)
    }

    generateBlocks(r, c) {
        const numOfBlocks = Math.floor((r * c) / 3)
        this.generateCells(r, c, BLOCK_CELL, numOfBlocks)
    }
    generateCells(r, c, cell, numOfCells){
        let cellsCount = 0
        while (cellsCount < numOfCells) {
            const randomCell = { x: Math.floor(Math.random() * c), y: Math.floor(Math.random() * r) }
            if (this.get(randomCell.y, randomCell.x) === EMPTY_CELL) {
                this.alter(randomCell.y, randomCell.x, cell)
                cellsCount++
            }
        }
    }

    getMatrix() {
        return this.matrix
    }

    getScores() {
        return {
            p1score: this.p1.score,
            p2score: this.p2.score
        }
    }

    updateScore(player) {
        player.score += SCORE_PER_COIN
        this.wonCoins++
    }

    canMoveTo(y, x) {
        if (this.matrix[y]) {
            const cell = this.get(y, x)
            return (cell === EMPTY_CELL || cell === COIN_CELL)
        }
        return false
    }

    moveRight(player) {
        if (this.canMoveTo(player.y, player.x + 1)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y, player.x + 1)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            this.alter(player.y, player.x + 1, player.sign)
            player.x++
        }
    }

    moveLeft(player) {
        if (this.canMoveTo(player.y, player.x - 1)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y, player.x - 1)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            this.alter(player.y, player.x - 1, player.sign)
            player.x--
        }
    }

    moveDown(player) {
        if (this.canMoveTo(player.y + 1, player.x)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y + 1, player.x)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            this.alter(player.y + 1, player.x, player.sign)
            player.y++
        }
    }

    moveUp(player) {
        if (this.canMoveTo(player.y - 1, player.x)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y - 1, player.x)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            this.alter(player.y - 1, player.x, player.sign)
            player.y--
        }
    }

    movePlayer(p, direction) {
        let player = p === 1 ? this.p1 : this.p2

        if (direction === RIGHT) {
            this.moveRight(player)
        } else if (direction === LEFT) {
            this.moveLeft(player)
        } else if (direction === DOWN) {
            this.moveDown(player)
        } else if (direction === UP) {
            this.moveUp(player)
        }
    }

    isGameOver() {
        return this.wonCoins === this.totalCoins
    }

    getWinner() {
        return (this.p1.score > this.p2.score) ? this.p1 : this.p2
    }
}