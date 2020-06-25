const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function round() {
    $('.game-field').removeClass("target");
    let divSelector = randomDivId();
    console.log(divSelector);
    $(divSelector).addClass("target");
    $(divSelector).text(hits+1);
    if(hits === 0){
        firstHitTime = getTimestamp();
    }
    if (hits === maxHits) {
        endGame();
    }
}

function endGame() {
    $(".game-area").addClass('d-none');
    let totalPlayedMillis = getTimestamp() - firstHitTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    let totalScore = hits - miss;
    $("#total-time-played").text(totalPlayedSeconds);
    $("#total-score-played").text(totalScore);

    $("#win-message").removeClass("d-none");
}

function handleClick(event) {
    if ($(event.target).hasClass("target")) {
        $(event.target).text('');
        hits = hits + 1;
        round();
    } else {
        $(event.target).addClass('miss');
        miss++;
    }
}

function init() {
    $("#button-start").click(function() {
        $("#button-reload").removeClass('d-none');
        $(".game-area").removeClass('d-none');
        $(this).addClass('d-none');
        round();
    });

    $(".game-field").click(handleClick);

    $("#button-reload").click(function() {
        hits = 0;
        miss = 0;
        firstHitTime = 0;
        $(".game-field").text('');
        $(".game-field").removeClass('miss');
        $(".game-field").removeClass('target');
        $(".game-area").removeClass('d-none');
        $("#win-message").addClass('d-none');
        round();
    });
}

$(document).ready(init);
