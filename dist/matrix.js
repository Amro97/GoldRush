class Matrix {

    constructor(r, c) {
        this.matrix = this.generateMatrix(r, c)
    }

    generateMatrix(r, c) {
        let matrix = [];
        for (let i = 0; i < r; i++) {
            let row = []
            for (let j = 0; j < c; j++) {
                row.push(EMPTY_CELL)
            }
            matrix.push(row)
        }
        return matrix
    }

    print() {
        for (let i = 0; i < this.matrix.length; i++) {
            let line = ""
            for (let j = 0; j < this.matrix[i].length; j++) {
                line += (this.matrix[i][j] + "\t")
            }
            console.log(line)
        }
    }

    get(r, c) {
        return this.matrix[r][c]
    }

    alter(r, c, value) {
        this.matrix[r][c] = value
    }

    printRow(r) {
        console.log(this.matrix[r])
    }

    printColumn(c) {
        for (let r of this.matrix) {
            console.log(r[c])
        }
    }

    findCoordinate(value) {
        let rowCounter = 0
        for (let r of this.matrix) {
            for (let c in r) {
                if (r[c] === value) {
                    return { x: c, y: rowCounter }
                }
            }
            rowCounter++
        }
    }
}