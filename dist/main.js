const keyActions = {
    119: {
        direction: 'up',
        player: 1
    },
    115: {
        direction: 'down',
        player: 1
    },
    97: {
        direction: 'left',
        player: 1
    },

    100: {
        direction: 'right',
        player: 1
    },
    105: {
        direction: 'up',
        player: 2
    },
    107: {
        direction: 'down',
        player: 2
    },
    106: {
        direction: 'left',
        player: 2
    },
    108: {
        direction: 'right',
        player: 2
    }
}

let gameOn = false;
let rush
let render

$('#start').on('click', function () {
    const rows = parseInt($('#r-input').val())
    const columns = parseInt($('#c-input').val())
    if (!rows || !columns || columns < 0 || rows < 0) {
        console.log('in the if',rows, columns)
        alert('insert proper values for rows and columns')
        return
    }
    $('#r-input').val('')
    $('#c-input').val('')
    rush = new GoldRush(rows, columns)
    renderer = new Renderer()
    renderer.render(rush.getMatrix(), rush.getScores())
    gameOn = true
})

$(document).keypress(function (e) {
    if (gameOn) {
        if (keyActions[e.which]) {
            rush.movePlayer(keyActions[e.which].player, keyActions[e.which].direction)
        }
        renderer.render(rush.getMatrix(), rush.getScores())
        if (rush.isGameOver()) {
            const winner = rush.getWinner()
            gameOn = false
            const winnerColor = winner.sign === 1 ? "red" : "blue"
            setTimeout(function () { alert('The winner is player ' + winnerColor); }, 0);
        }
    }
})