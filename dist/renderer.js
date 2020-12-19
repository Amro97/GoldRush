class Renderer {

    renderCells(matrix) {

        const rowsNum = matrix.length;
        const columnsNum = matrix[0].length
        const height = (100 / rowsNum).toString() + '%';
        const width = (100 / columnsNum).toString() + '%';

        const source = $('#cell-temp').html();
        const template = Handlebars.compile(source)
        $('#game-div').empty()
        for (let r = 0; r < rowsNum; r++) {
            for (let c = 0; c < columnsNum; c++) {
                const cell = {}
                if (matrix[r][c] === 'c') {
                    cell.coin = true;
                } else if (matrix[r][c] === 1) {
                    cell.p1 = true;
                } else if (matrix[r][c] === 2) {
                    cell.p2 = true
                } else if (matrix[r][c] === 'b') {
                    cell.block = true;
                }else{
                    cell.empty = true
                }
                let cellHTML = template({ cell })
                $('#game-div').append(cellHTML)
            }
        }
        $('.cell').css('height', height)
        $('.cell').css('width', width)
    }

    renderScores(scores) {
        const source1 = $('#score-temp').html();
        const source2 = $('#score-temp').html();
        const template1 = Handlebars.compile(source1)
        const template2 = Handlebars.compile(source2)
        const p1score = { score: scores.p1score }
        const p2score = { score: scores.p2score }
        let scores1HTML = template1(p1score)
        let scores2HTML = template2(p2score)
        $('#player1-score').empty().append(scores1HTML)
        $('#player2-score').empty().append(scores2HTML)
    }

    render(matrix, scores) {
        this.renderCells(matrix)
        this.renderScores(scores)
    }
}