var $cards = $(".card")
var $imgsContainer = $(".element")
var $imgs = $(".element img")
var $restartBtn = $("button")
var $numberOfMoves = $(".moves")
var $bestScore = $(".best--score")
var $bestTime = $(".best--time")
var $time = $(".time")
var $totalTime = $(".tot-time")
var $totalMoves = $(".tot-moves")
var $done = $(".done")
var $again = $(".again")

var activeCard,
    numberOfActiveCards = 0,
    solved = 0,
    moves = 0,
    best = -1,
    best_Time = -1,
    intervalId = null,
    elapsedTime = null

var startTimer = () => {
    if (intervalId) {
        clearInterval(intervalId)
    }

    elapsedTime = 0
    $time.text(elapsedTime)

    intervalId = setInterval(() => {
        elapsedTime++
        $time.text(elapsedTime)
    }, 1000)
}

var updateMoves = (moves) => {
    $numberOfMoves.text(moves)
}

var generateRandomimgs = () => {
    var arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
    arr.sort(() => Math.random() - 0.5)
    for (var i = 0; i < 16; i++) {
        $imgs.eq(i).attr("src", `img/${arr[i]}.jpg`)
    }
};

var init = () => {
    generateRandomimgs()
    $imgsContainer.css({
        opacity: 0,
        transform: "translate(-50%, -50%) rotateY(-180deg)"
    })

    $cards.css("transform", "translate(-50%, -50%) rotateY(180deg)")

    startTimer()
    $numberOfMoves.text("0")
    solved = 0

    $bestScore.text(best === -1 ? "" : best)
    $bestTime.text(best_Time === -1 ? "" : best_Time)

    $done.addClass("hidden")
    moves = 0
};

$restartBtn.on("click", init)

init()

$cards.on("click", function () {
    var $card = $(this)

    if (Number($card.children().css("opacity")) === 0) {
        $card.css("transform", "translate(-50%, -50%) rotateY(-180deg)")
        $card.children().css({
            transform: "translate(-50%, -50%) rotateY(-180deg)",
            opacity: 1
        })

        moves++
        numberOfActiveCards++
        updateMoves(moves);

        if (numberOfActiveCards === 1) {
            activeCard = $card
        } else {
            numberOfActiveCards = 0

            if (activeCard.find("img").attr("src") === $card.find("img").attr("src")) {
                activeCard.children().css("opacity", "50%")
                $card.children().css("opacity", "50%")
                solved++
            } else {
                setTimeout(() => {
                    $card.css("transform", "translate(-50%, -50%) rotateY(180deg)")
                    $card.children().css({
                        transform: "translate(-50%, -50%) rotateY(-180deg)",
                        opacity: 0
                    });

                    activeCard.css("transform", "translate(-50%, -50%) rotateY(180deg)")
                    activeCard.children().css({
                        transform: "translate(-50%, -50%) rotateY(-180deg)",
                        opacity: 0
                    });
                }, 600)
            }
        }

        if (solved === 8) {
            solved = 0
            clearInterval(intervalId)

            if (best === -1 || moves < best) best = moves
            if (best_Time === -1 || elapsedTime < best_Time) best_Time = elapsedTime

            $totalMoves.text(moves)
            $totalTime.text(elapsedTime)
            
            setTimeout(() => {
                $done.removeClass("hidden")
            }, 500)

            $again.on("click", init)
        }
    }
});
